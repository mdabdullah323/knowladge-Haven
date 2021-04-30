import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { EditBookContext } from '../Admin/Admin';

const EditBook = () => {
    const [isSendingData, setIsSendingData] = useState(false);
    const [bookForEdit] = useContext(EditBookContext);
    const [newBookInfo, setNewBookInfo] = useState({
        name: '',
        author: '',
        price: '',
    });

    useEffect(() => {
        document.getElementById("bookName").value = bookForEdit.name || '';
        document.getElementById("author").value = bookForEdit.author || '';
        document.getElementById("price").value = bookForEdit.price || '';
    }, [bookForEdit])

    const handleInputField = event => {
        const bookInfo = { ...newBookInfo };
        bookInfo[event.target.name] = event.target.value;
        setNewBookInfo(bookInfo);
    }

    const handleFormSubmit = event => {
        setIsSendingData(true);
        fetch(`https://rhubarb-cobbler-88648.herokuapp.com/updateBook/${bookForEdit._id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBookInfo),
        }).then(res => res.json())
        .then(result => {
            setIsSendingData(false);
            if(result){
                alert('Book Info Updated Successfully.');
            } else{
                alert('Failed to Updated Book Info!');
            }
        }).catch(() =>{
            setIsSendingData(false);
            alert('Failed to Updated Book Info!');
        })
        event.preventDefault();
    }

    return (
        <>{
            isSendingData
                ? <div style={{ width: "100%", height: "80vh" }} className="d-flex justify-content-center align-items-center">
                    <CircularProgress
                        size={100}
                        thickness={4}
                    />
                </div>
                : <div>
                    {
                        !bookForEdit.name && 
                        <h2 className="text-danger">Please, Select a Book for Edit at <i>Manage Books</i> Tab</h2>
                    }
                    <h3>Edit Book</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Edit Book Name</Form.Label>
                            <Form.Control name="name" onBlur={handleInputField} id="bookName" required type="text" placeholder="Book Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Edit Author Name</Form.Label>
                            <Form.Control name="author" onBlur={handleInputField} id="author" required type="text" placeholder="Author Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Edit Price</Form.Label>
                            <Form.Control name="price" onBlur={handleInputField} id="price" required type="number" placeholder="Edit Price" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            }
        </>
    );
};

export default EditBook;
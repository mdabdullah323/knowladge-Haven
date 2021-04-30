import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../../App';
import BookDetails from '../BookDetails/BookDetails';
const ManageBooks = () => {
    const [user] = useContext(UserContext);
    const { email } = user;
    const [addedBooks, setAddedBooks] = useState([]);
    const [isFetchData, setIsFetchData] = useState(false);

    const fetchAddedBooksData = userEmail => {
        setIsFetchData(true);
        fetch(`https://rhubarb-cobbler-88648.herokuapp.com/addedBooks/${userEmail}`)
        .then(res => res.json())
        .then(data => {
            setIsFetchData(false);
            setAddedBooks(data);
        });
    }

    useEffect(() => {
        fetchAddedBooksData(email);
    }, [email])

    const handleDelete = id => {
        setIsFetchData(true);
        fetch(`https://rhubarb-cobbler-88648.herokuapp.com/deleteBook/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(result => {
            setIsFetchData(false);
            if (result) {
                fetchAddedBooksData(email);
                alert('Book Deleted Successfully!');
            }
        })
    }

    return (
        <>{
            isFetchData
                ? <div style={{ width: "100%", height: "80vh" }} className="d-flex justify-content-center align-items-center">
                    <CircularProgress
                        size={100}
                        thickness={4}
                    />
                </div>
                : <Container>
                    <Table striped bordered hover variant="dark" responsive className="mt-3">
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                addedBooks.map(book => <BookDetails book={book} handleDelete={handleDelete} />)
                            }
                        </tbody>
                    </Table>
                </Container>
            }
        </>
    );
};

export default ManageBooks;
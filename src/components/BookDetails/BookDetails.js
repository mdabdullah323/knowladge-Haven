import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { EditBookContext, TabContext } from '../Admin/Admin';

const BookDetails = ({book, handleDelete}) => {
    const {name, price, author, _id} = book;
    const setTabValue = useContext(TabContext);
    const [bookForEdit, setBookForEdit] = useContext(EditBookContext);

    const handleEdit = () => {
        setBookForEdit(book);
        setTabValue(2);
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{author}</td>
            <td>{price}</td>
            <td>
                <IconButton color="primary" style={{color: '#3BC83B'}} onClick={handleEdit}>
                    <EditIcon />
                </IconButton>
                
                <IconButton color="secondary" onClick={() => handleDelete(_id)}>
                    <DeleteIcon />
                </IconButton>
            </td>
        </tr>
    );
};

export default BookDetails;
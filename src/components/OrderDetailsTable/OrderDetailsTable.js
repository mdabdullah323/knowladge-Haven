import { Container } from '@material-ui/core';
import React from 'react';
import { Table } from 'react-bootstrap';

const OrderDetailsTable = ({ order }) => {
    const { date, name, author, price } = order;
    return (
        <Container>
            <Table striped bordered hover variant="dark" responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Order Submission Date</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{new Date(date).toDateString("dd/MM/yyyy")}</td>
                        <td>{name}</td>
                        <td>{author}</td>
                        <td>{price}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default OrderDetailsTable;
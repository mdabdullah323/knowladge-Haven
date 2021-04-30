import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { CheckoutContext, UserContext } from '../../App';

const Checkout = () => {
    const [user] = useContext(UserContext);
    const [checkoutProduct, setCheckoutProduct] = useContext(CheckoutContext);
    const [bookDetails, setBookDetails] = useState({});
    const [isSendingData, setIsSendingData] = useState(false);
    document.title = 'Checkout - Knowledge Haven';

    useEffect(() => {
        fetch(`https://rhubarb-cobbler-88648.herokuapp.com/productDetails/${checkoutProduct}`)
            .then(res => res.json())
            .then(data => setBookDetails(data));
    }, [checkoutProduct]);

    const { name, author, price } = bookDetails;

    const handleCheckout = () => {
        setIsSendingData(true);
        const orderDetails = {
            buyer: user.name,
            buyerEmail: user.email,
            date: new Date(),
            productId: checkoutProduct,
            name,
            author,
            price
        }

        fetch('https://rhubarb-cobbler-88648.herokuapp.com/orderBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails),
        })
        .then(result => {
            setIsSendingData(false);
            if (result) {
                setCheckoutProduct(null);
                alert("Book Ordered Successfully");
            }
        });
    }

    return (
        <>{isSendingData
            ? <div style={{ width: "80vw", height: "80vh" }} className="d-flex justify-content-center align-items-center">
                <CircularProgress
                    size={100}
                    thickness={4}
                />
            </div>
            : <div>
                {
                    !checkoutProduct
                        ? <h1>Nothing For Checkout</h1>
                        : <Container>
                            {
                                checkoutProduct && !bookDetails.name
                                    ? <div style={{ width: "80vw", height: "80vh" }} className="d-flex justify-content-center align-items-center">
                                        <CircularProgress
                                            size={100}
                                            thickness={4}
                                        />
                                    </div>
                                    : <div>
                                        <Table striped bordered hover responsive className="mt-5">
                                            <thead>
                                                <tr>
                                                    <th>Book Name</th>
                                                    <th>Author</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{name}</td>
                                                    <td>{author}</td>
                                                    <td>{price}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <Container className="text-right">
                                            <Button variant="success" onClick={handleCheckout}>Checkout</Button>
                                        </Container>
                                    </div>
                            }
                        </Container>

                }
            </div>}
        </>
    );
};

export default Checkout;
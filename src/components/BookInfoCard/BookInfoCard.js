import React, { useContext } from 'react';
import { Button, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CheckoutContext } from '../../App';

const BookInfoCard = ({ book }) => {
    const { _id, name, author, price, imgUrl } = book;
    const [checkoutProduct, setCheckoutProduct] = useContext(CheckoutContext);
    return (
        <Col sm={12} md={6} lg={4} className="p-3">
            <Card className="p-3 shadow ">
                <div className="p-4 bg-light" style={{borderRadius: "10px"}}>
                    <Card.Img as={Image} variant="top" src={imgUrl} fluid />
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{author}</Card.Text>
                    <div className="d-flex justify-content-between" style={{width: "100%"}}>
                        <h3>${price}</h3>
                        <Button as={Link} to='/checkout' onClick={() => setCheckoutProduct(_id)} variant="primary">Buy Now</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BookInfoCard;
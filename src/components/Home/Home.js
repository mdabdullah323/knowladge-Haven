import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import BookInfoCard from '../BookInfoCard/BookInfoCard';

const Home = () => {
    const [allBooks, setAllBooks] = useState([]);
    document.title = 'Home - Knowledge Haven';

    useEffect(() => {
        fetch('https://rhubarb-cobbler-88648.herokuapp.com/allBooks')
        .then(res => res.json())
        .then(data => setAllBooks(data));
    }, []);

    return (
        <Container>
            { !allBooks[0] ? <div style={{width: "80vw", height: "80vh"}} className="d-flex justify-content-center align-items-center">
                <CircularProgress
                    size={100}
                    thickness={4}
                />
            </div>
            : <Row>
                {
                    allBooks.map(book => <BookInfoCard book={book} key={book._id}/>)
                }
            </Row>
            }
        </Container>
    );
};

export default Home;
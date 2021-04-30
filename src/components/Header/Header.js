import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';

const Header = () => {
    const [user] = useContext(UserContext);
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Navbar.Brand as={Link} to="/" className="nav-item">Knowledge Haven</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/home" className="nav-item mx-3">Home</Nav.Link>
                    <Nav.Link as={Link} to="/orders" className="nav-item mx-3">Orders</Nav.Link>
                    <Nav.Link as={Link} to="/admin" className="nav-item mx-3">Admin</Nav.Link>
                    <Nav.Link as={Link} to="/deals" className="nav-item mx-3">Deals</Nav.Link>
                    {user.name && <Nav.Link as={Link} to="/checkout" className="nav-item mx-3">Checkout</Nav.Link>}
                    {
                        !user.name
                        ? <Nav.Link as={Link} to="/login" className="nav-item btn btn-primary text-white mx-3">Login</Nav.Link>
                        : <Nav.Link as={Link} to="/userProfile" className="nav-item mx-3 border text-primary">{user.name.split(' ')[0]}</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
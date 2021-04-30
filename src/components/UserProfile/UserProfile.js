import React, { useContext } from 'react';
import { Col, Image, Row, Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import { logOut } from '../Login/firebaseManager';

const UserProfile = () => {
    const [user, setUser] = useContext(UserContext);
    const handleLogOut = () => {
        logOut().then(() => {
            setUser({});
        })
    }
    document.title = `${user.name.split(' ')[0]} - Knowledge Haven`;

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.photo
                && <Row className="justify-content-center">
                        <Col xs={6} md={4}>
                            <Image src={user.photo} roundedCircle />
                        </Col>
                    </Row>
            }
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
            <Button variant="danger" className="navBar-link" onClick={handleLogOut}>Log Out</Button>
        </div>
    );
};

export default UserProfile;
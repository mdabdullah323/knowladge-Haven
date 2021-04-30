import { Button, Link, TextField, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { createUser, facebookSignIn, googleSignIn, initializeFirebase, signInWithEmailAndPassword } from './firebaseManager';
import { UserContext } from '../../App';
import {
    useHistory,
    useLocation
} from "react-router-dom";

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const [isNewUser, setIsNewUser] = useState(false);
    initializeFirebase();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPasswordMatched, setIsPasswordMatched] = useState(true);
    const userData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
    }
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    document.title = 'Login - Knowledge Haven';

    const isValid = e => {
        if (e.target.name === 'email') {
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) ? setIsEmailValid(true) : setIsEmailValid(false);
        }
        if (e.target.name === 'password') {
            userData.password.length >= 8 ? setIsPasswordValid(true) : setIsPasswordValid(false);
        }
        if (e.target.name === 'confirmPassword') {
            userData.password !== userData.confirmPassword ? setIsPasswordMatched(false) : setIsPasswordMatched(true);
        }
    }

    const handleInputField = event => {
        userData[event.target.name] = event.target.value;
        isValid(event);
    }

    const handleFormSubmit = event => {
        if (isNewUser && isEmailValid && isPasswordValid && isPasswordMatched) {
            createUser(userData.email, userData.password)
                .then(res => {
                    res.updateProfile({
                        displayName: userData.name,
                    }).then(function () {
                        setUser(userData);
                        history.replace(from);
                    }).catch(error => {
                        alert('Failed to Create an User Account\n', error);
                    });
                });
        }
        if (!isNewUser && isEmailValid && isPasswordValid && isPasswordMatched) {
            signInWithEmailAndPassword(userData.email, userData.password)
                .then(res => {
                    const { displayName, photoURL } = res;
                    userData.name = displayName;
                    userData.photo = photoURL;
                    setUser(userData);
                    history.replace(from);
                })
                .catch(error => {
                    alert('Failed to Sign in with This Account!\nPlease Try Again Letter!\n', error);
                });
        }

        event.preventDefault();
    }

    const updateUserData = data => {
        const { displayName, email, photoURL } = data;
        userData.name = displayName;
        userData.email = email;
        userData.photo = photoURL;
        setUser(userData);
        history.replace(from);
    }

    const handleFacebookSignIn = () => {
        facebookSignIn().then(res => {
            updateUserData(res);
        }).catch(err => {
            alert('Failed to Sign in with This Account!\nPlease Try Again Letter!\n', err);
        });
    }

    const handleGoogleSignIn = () => {
        googleSignIn().then(res => {
            updateUserData(res);
        }).catch(err => {
            alert('Failed to Sign in with This Account!\nPlease Try Again Letter!\n', err);
        });
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col sm={12} md={9} lg={6} className="bg-light border border-warning border-3 rounded p-3">
                    <div>
                        <Typography variant="h4" gutterBottom>
                            {isNewUser ? "Create an Account" : "Login"}
                        </Typography>
                        <form onSubmit={handleFormSubmit}>
                            {
                                isNewUser && <TextField type="text" name="name" onBlur={handleInputField} label="Name" className="form-item" />
                            }
                            <br />
                            <TextField type="email" name="email" onBlur={handleInputField} label="Email" className="form-item" />
                            {
                                !isEmailValid
                                && <p className="text-warning">Please Enter Valid Email Address</p>
                            }
                            <br />
                            <TextField type="password" name="password" onBlur={handleInputField} label="Password" className="form-item" />
                            {
                                !isPasswordValid
                                && <p className="text-warning">Password must be Greater then or equal to 8 Charecter</p>
                            }
                            <br />
                            {
                                isNewUser && <TextField type="password" onBlur={handleInputField} name="confirmPassword" label="Confrim Password" className="form-item" />
                            }
                            {
                                !isPasswordMatched
                                && <p className="text-warning">Re-Enter Your Password</p>
                            }
                            <br />
                            {
                                isNewUser
                                    ? <Button type="submit" variant="contained" color="primary" className="form-item">Create an Account</Button>
                                    : <Button type="submit" variant="contained" color="primary" className="form-item">Login</Button>
                            }
                        </form>
                        {
                            isNewUser
                                ? <Typography variant="h6" gutterBottom className="text-center">
                                    Already have an account?
                                    <Link className="text-link" onClick={() => setIsNewUser(!isNewUser)}>
                                        Login
                                    </Link>
                                </Typography>
                                : <Typography variant="h6" gutterBottom className="text-center">
                                    Don’t have an account?
                                    <Link className="text-link" onClick={() => setIsNewUser(!isNewUser)}>
                                        Create an account
                                    </Link>
                                </Typography>

                        }
                        <div className="text-center border-top border-info">
                            <Typography variant="h6" gutterBottom>
                                Or, Continue With
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<FacebookIcon />}
                                onClick={handleFacebookSignIn}
                            >
                                Facebook
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<FontAwesomeIcon icon={faGoogle} />}
                                style={{ marginLeft: "10px" }}
                                onClick={handleGoogleSignIn}
                            >
                                Google
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
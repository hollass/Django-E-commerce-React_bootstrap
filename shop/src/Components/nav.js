import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function Navig() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" className="bg-body" data-bs-theme="white">
                <Container className='me-auto'>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form inline>
                            <Row className="me-auto">
                                <div className="search">
                                    <div className="search_text">

                                        <Col>
                                            <Form.Control
                                                type="text"
                                                placeholder="Найти..."
                                            />
                                        </Col>
                                    </div>

                                    <div className="search_button">
                                        <Button type='submit' variant="link">
                                            <img
                                                src={'https://img.icons8.com/?size=100&id=XU3XKgdpT0qG&format=png&color=000000'}
                                                width='35px'>
                                            </img>
                                        </Button>
                                    </div>
                                </div>

                            </Row>
                        </Form>

                        <Container>
                            <Nav className="me-auto">
                                <div className="header_right">
                                    <a href="#features">
                                        <span>
                                            <img onClick={handleShow}
                                                 src='https://img.icons8.com/?size=100&id=87&format=png&color=000000'
                                                 width='30px'/> Избранные
                                        </span>
                                    </a>
                                    <a href="#pricing">
                                        <span>
                                            <img onClick={handleShow}
                                                 src='https://img.icons8.com/?size=100&id=9671&format=png&color=000000'
                                                 width='30px'/> Корзина
                                        </span>
                                    </a>
                                    <a href="#pricing">
                                        <span>
                                            <img onClick={handleShow}
                                                 src='https://img.icons8.com/?size=100&id=ckaioC1qqwCu&format=png&color=000000'
                                                 width='30px'/> Профиль
                                        </span>
                                    </a>
                                </div>
                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Container>

                <div className="modal_login">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email"/>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" placeholder="Пароль"/>
                                </Form.Group>
                                <div className="login_btn">
                                    <Button variant="link" type="submit" href={'/profile'}>
                                        Log in
                                    </Button>
                                </div>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>


            </Navbar>
        </div>
    );

}
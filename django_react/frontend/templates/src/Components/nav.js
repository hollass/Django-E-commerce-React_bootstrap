import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, Image} from "react-bootstrap";
import {useEffect, useState} from "react";
import {redirect} from "react-router-dom";
import Menu_cats from "./menu";
import axios from "axios";

export default function Navig() {

    const [show, setShow] = useState(false);
    const [name, setname] = useState('')
    useEffect(() => {
        getAuth()
    }, [])


    const [isAuth, setIsAuth] = useState(false);

    function isLogin() {
        if (!isAuth) {
            return ['/login', '/login', '/login'];
        } else {
            return ['/profile', '/basket', '/favorites'];
        }
    }

    const getAuth = () => {
        try {
            const csrftoken = document.cookie.split('; ')
                .find(row => row.startsWith('csrftoken=')).split('=')[1];
            setIsAuth(true)
            const nameInf = document.cookie.split('; ')
                .find(row => row.startsWith('loginInfo=')).split('=')[1];
            setname(nameInf)


        } catch (e) {
            setIsAuth(false)
            console.log("Not autorization")
        }
    }


    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" className="bg-body" data-bs-theme="white">
                <Container className='me-auto'>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Button type={'submit'} variant={'link'} onClick={() => setShow(true)}>
                            <Image src={'https://img.icons8.com/?size=100&id=36389&format=png&color=000000'}
                                   width={'30px'}/>
                        </Button>
                        <div className={'cats_modal'}>
                            <Modal
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="modal-90w"
                                fullscreen={true}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        Категории
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                            <Menu_cats/>
                                </Modal.Body>
                            </Modal>
                        </div>
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
                                    <a href={isLogin()[2]}>
                                        <span>
                                            <img
                                                src='https://img.icons8.com/?size=100&id=87&format=png&color=000000'
                                                width='30px'/> Избранные
                                        </span>
                                    </a>
                                    <a href={isLogin()[1]}>
                                        <span>
                                            <img
                                                src='https://img.icons8.com/?size=100&id=9671&format=png&color=000000'
                                                width='30px'/> Корзина
                                        </span>
                                    </a>
                                    <a href={isLogin()[0]}>
                                        <span>
                                            <img
                                                src='https://img.icons8.com/?size=100&id=ckaioC1qqwCu&format=png&color=000000'
                                                width='30px'/> Профиль
                                        </span>
                                    </a>
                                </div>
                            </Nav>
                        </Container>
                    </Navbar.Collapse>


                </Container>

            </Navbar>


        </div>
    );

}
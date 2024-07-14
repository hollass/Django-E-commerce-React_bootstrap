import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, Image, Card, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {redirect} from "react-router-dom";
import axios from "axios";

export default function Favorites() {

    return (
        <div className={'favorites_panel'}>
            <div className={'favorites_settings bg-white'}>
                <Container>
                    <Row className={'favorites_block_cats'}>
                        <Col>
                            <p>Катеории</p>
                        </Col>
                        <div className={'favorites_list_cats'}>
                            <ul>
                            <li><a href="#">Категория 1</a></li>
                            <li> <a href="#">Категория 2</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>                            <li><a href="#">Категория 1</a></li>
                            <li> <a href="#">Категория 2</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>                            <li><a href="#">Категория 1</a></li>
                            <li> <a href="#">Категория 2</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>
                            <li><a href="#">Категория 3</a></li>
</ul>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <p>Цена</p>
                        </Col>
                        <InputGroup>
                            <InputGroup.Text>от</InputGroup.Text>
                            <Form.Control type="number" min={1}/>
                            <InputGroup.Text>до</InputGroup.Text>
                            <Form.Control type="number" min={1}/>
                        </InputGroup>
                        <Button className={'favorites_btn btn btn-primary bg-white '}>Сохранить фильтры</Button>
                        <Button className={'favorites_btn btn btn-primary bg-white '}>Сбросить фильтры</Button>
                    </Row>
                </Container>

            </div>
            <Container className={'favorites_list'}>
                <Card className={'favorites_card'}>
                    <Card.Img variant={"top"}
                              src="https://www.expertentesten.de/wp-content/uploads/2016/02/fachhandel-2.jpg"/>
                    <Card.Body>
                        <Card.Title>999 Р</Card.Title>
                    </Card.Body>
                    <Card.Text>123</Card.Text>
                    <Button className={'favorites_btn btn btn-primary bg-white'}>Купить</Button>
                </Card>


            </Container>
        </div>
    )
}
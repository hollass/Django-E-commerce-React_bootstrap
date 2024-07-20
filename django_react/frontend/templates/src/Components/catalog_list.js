import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, Image, Card, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {redirect, useParams} from "react-router-dom";
import axios from "axios";

export default function Catalog() {
    const serverUrl = 'http://localhost:8000/'
    const params = useParams();

    const prodParent = params.parent;
    const prodChild = params.child || null;
    const prodLvl3 = params.lvl3 || null;

    const [isPage, setisPage] = useState(1)
    const [isProducts, setisProducts] = useState([])

    // pagination
    const [fetch, setFetch] = useState(true)


    useEffect(() => {
        if (fetch) {
            console.log('da')
            view_cat()
        }
        scrollHandler()
    }, [fetch])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])


    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetch(true)
        }
    }


    const view_cat = () => {
        axios.post(serverUrl + 'api/cat_info/', {url: [prodParent, prodChild, prodLvl3], page: isPage})
            .then((res) => {
                setisProducts([...isProducts, ...res.data.data])
                setisPage(isPage + 1)

            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setFetch(false)

            });
    }


    return (
        <div className={'favorites_panel'}>
            <div className={'favorites_settings bg-white'}>
                <Container>
                    <Row className={'favorites_block_cats'}>
                        <Col>
                            <p>Катеории</p>
                            <p>{prodParent}</p>
                            <p>{prodChild}</p>
                            <p>{prodLvl3}</p>
                        </Col>
                        <div className={'favorites_list_cats'}>
                            <ul>
                                <li><a href="#">Категория 1</a></li>
                                <li><a href="#">Категория 2</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 1</a></li>
                                <li><a href="#">Категория 2</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 3</a></li>
                                <li><a href="#">Категория 1</a></li>
                                <li><a href="#">Категория 2</a></li>
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
                {isProducts.map(product => (
                    <Card className={'favorites_card'}>
                        <img src={'https://www.expertentesten.de/wp-content/uploads/2016/02/fachhandel-2.jpg'}/>
                        <Card.Body>
                            <Card.Title>{Number(product.price.product) / 100} Р</Card.Title>
                        </Card.Body>
                        <Card.Text>{product.name}</Card.Text>
                        <Button className={'favorites_btn btn btn-primary bg-white'}>Купить</Button>
                    </Card>
                ))}


            </Container>
        </div>
    )
}
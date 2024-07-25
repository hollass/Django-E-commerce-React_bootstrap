import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Container, Row, Col, Card, Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Basket() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        view_cart()
    }, []);

    const increment = (productId) => {
        updateProductCount(productId, (prevCount): number => prevCount + 1);
        console.log(products)
    };

    const decrement = (productId) => {
        updateProductCount(productId, (prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };


    const updateProductCount = (id, updater) => {
        setProducts(prevProducts => prevProducts.map(product =>
            product.id === id ? {...product, count: updater(product.count)} : product
        ));
    };

    const serverUrl = 'http://localhost:8000/'
    const user = document.cookie.split('; ')
        .find(row => row.startsWith('loginInfo=')).split('=')[1];
    const view_cart = (product) => {
        axios.post(serverUrl + 'api/view_cart/', {
            user: user
        })
            .then((res) => {
                console.log(res.data.data);
                setProducts(res.data.data)
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const add_cart = () => {
        axios.post(serverUrl + 'api/add_cart/', {
            user: user,
            cart: 2,
            product: products
        })
            .then((res) => {
                return (
                    <div className="modal show" style={{display: 'block', position: 'initial'}}>
                        < Modal.Dialog>
                            < Modal.Header closeButton>
                                <Modal.Title>Заказ создан</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Ваш заказ успешно создан!
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" href={'/'}>
                                    Ок!
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                )
            })
            .catch((err) => {
                console.error(err);
            });
    }


    const handleRemoveItem = (itemId) => {
        setTimeout(() => {
            setProducts(prevItems => prevItems.filter(item => item.id !== itemId));
        }, 300); // 300ms - продолжительность анимацииR
        setProducts(prevItems => prevItems.filter(item => item.id !== itemId));
    };


    // Функция для подсчета общей стоимости
    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            return total + product.count * product.price / 100;
        }, 0);
    };

    return (
        <section className="h-100 h-custom">
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col size="12">
                        <Card className="card-registration card-registration-2" style={{borderRadius: "15px"}}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    <Col lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <Card.Text tag="h1" className="fw-bold mb-0 text-black">
                                                    Корзина
                                                </Card.Text>
                                                <Card.Text className="mb-0 text-muted">
                                                    3 items
                                                </Card.Text>
                                            </div>

                                            <hr className="my-4"/>

                                            {products.map((product) => (
                                                    <Row
                                                        className="mb-4 d-flex justify-content-between align-items-center">
                                                        <Col md="2" lg="2" xl="2">
                                                            <Card.Img
                                                                src='https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg'
                                                                fluid className="rounded-3" alt="Cotton T-shirt"/>
                                                        </Col>
                                                        <Col md="3" lg="3" xl="3">
                                                            <Card.Text tag="h6" className="text-bold fw-bold">
                                                                {product.name}
                                                            </Card.Text>
                                                            <Card.Text tag="h6" className="text-muted small ">
                                                                {product.description.brand}
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={3} lg={3} xl={3} className="d-flex align-items-center">

                                                            <div key={product.id} className="d-flex align-items-center">
                                                                <Button variant="link" className="px-2"
                                                                        onClick={() => decrement(product.id)}>
                                                                    -
                                                                </Button>
                                                                <Form.Control
                                                                    value={product.count}
                                                                    type="number"
                                                                    min={0}
                                                                    readOnly
                                                                />
                                                                <Button variant="link" className="px-2"
                                                                        onClick={() => increment(product.id)}>
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                        <Col md="3" lg="2" xl="2" className="text-end">
                                                            <Card.Text tag="h6" className="mb-0">
                                                                Р {product.count * product.price / 100}
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md="1" lg="1" xl="1" className="text-end">
                                                            <Button className='cart-item' variant="danger"
                                                                    onClick={() => handleRemoveItem(product.id)}>
                                                                Удалить
                                                            </Button>
                                                        </Col>
                                                        <hr className="my-4"/>
                                                    </Row>
                                                )
                                            )
                                            }


                                            <div className="pt-5">
                                                <Card.Text tag="h6" className="mb-0">
                                                    <Card.Text tag="a" href="#!" className="text-body"> Back
                                                        to shop
                                                    </Card.Text>
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="4" className="bg-grey">
                                        <div className="p-5">
                                            <Card.Text tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                                                Summary
                                            </Card.Text>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-4">
                                                <Card.Text tag="h5" className="text-uppercase">
                                                    items 3
                                                </Card.Text>
                                                <Card.Text tag="h5">{calculateTotalPrice()}</Card.Text>
                                            </div>


                                            <Card.Text tag="h5" className="text-uppercase mb-3">
                                                Give code
                                            </Card.Text>

                                            <div className="mb-5">
                                                <Form.Control size="lg" label="Enter your code"/>
                                                <Button className='check_promo'>Проверить</Button>
                                            </div>

                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-5">
                                                <Card.Text tag="h5" className="text-uppercase">
                                                    Total price
                                                </Card.Text>
                                                <Card.Text
                                                    tag="h5">{calculateTotalPrice()}</Card.Text>
                                            </div>

                                            <Button color="dark" block size="lg" onClick={() => {
                                                add_cart()
                                            }}>
                                                Register
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

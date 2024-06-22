import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import {useState} from "react";

function ProductCounter({initialCount}) { // Передаем начальное значение счетчика
    const [count, setCount] = useState(initialCount);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(Math.max(count - 1, 0));
    };

    return (
        <>
            <Button color="link" className="px-2" onClick={decrement}>
                -
            </Button>

            <Form.Control
                type="number"
                min="0"
                value={count}
                size="xl"
                onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
            />

            <Button color="link" className="px-2" onClick={increment}>
                +
            </Button>
        </>
    );
}


export default function Basket() {

    const increment = (productId) => {
        updateProductCount(productId, (prevCount) => prevCount + 1);
    };

    const decrement = (productId) => {
        updateProductCount(productId, (prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
    const [products, setProducts] = useState(
        [
            {
                id: 1,
                name: 'Name',
                count: 1,
                price: 11,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 2,
                name: 'Name',
                count: 1,
                price: 10,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 3,
                name: 'Name',
                count: 1,
                price: 20,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 4,
                name: 'Name',
                count: 1,
                price: 30,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 5,
                name: 'Name',
                count: 1,
                price: 40,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 6,
                name: 'Name',
                count: 1,
                price: 50,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 7,
                name: 'Name',
                count: 1,
                price: 60,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 8,
                name: 'Name',
                count: 1,
                price: 70,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 9,
                name: 'Name',
                count: 1,
                price: 10,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 10,
                name: 'Name',
                count: 1,
                price: 20,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 11,
                name: 'Name',
                count: 1,
                price: 30,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 12,
                name: 'Name',
                count: 1,
                price: 40,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 13,
                name: 'Name',
                count: 1,
                price: 50,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 14,
                name: 'Name',
                count: 1,
                price: 60,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },
            {
                id: 15,
                name: 'Name',
                count: 1,
                price: 70,
                photo: "https://ir-2.ozone.ru/s3/multimedia-6/wc1000/6606982194.jpg"
            },

        ]);


    const updateProductCount = (id, updater) => {
        setProducts(prevProducts => prevProducts.map(product =>
            product.id === id ? {...product, count: updater(product.count)} : product
        ));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        // Обновляем количество товара в корзине
        setProducts(prevItems => {
            return prevItems.map(item =>
                item.id === itemId ? {...item, count: newQuantity} : item
            );
        });
    };


    const handleRemoveItem = (itemId) => {

        // 3. Удаляем элемент из DOM после завершения анимации
        setTimeout(() => {
            setProducts(prevItems => prevItems.filter(item => item.id !== itemId));
        }, 300); // 300ms - продолжительность анимацииR
        setProducts(prevItems => prevItems.filter(item => item.id !== itemId));
    };


    // Функция для подсчета общей стоимости
    const calculateTotalPrice = () => {
        return products.reduce((total, product) => {
            return total + product.count * product.price;
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
                                                                src={product.photo}
                                                                fluid className="rounded-3" alt="Cotton T-shirt"/>
                                                        </Col>
                                                        <Col md="3" lg="3" xl="3">
                                                            <Card.Text tag="h6" className="text-muted">
                                                                {product.name}
                                                            </Card.Text>
                                                            <Card.Text tag="h6" className="text-black mb-0">
                                                                {product.name}
                                                            </Card.Text>
                                                        </Col>
                                                        <Col md={3} lg={3} xl={3} className="d-flex align-items-center">

                                                            <div key={product.id} className="d-flex align-items-center">
                                                                <Button variant="link" className="px-2"
                                                                        onClick={() => decrement(product.id)}>
                                                                    -
                                                                </Button>
                                                                <Form.Control
                                                                    value={product.count} // Отображаем текущее количество
                                                                    readOnly // Делаем поле только для чтения
                                                                />
                                                                <Button variant="link" className="px-2"
                                                                        onClick={() => increment(product.id)}>
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                        <Col md="3" lg="2" xl="2" className="text-end">
                                                            <Card.Text tag="h6" className="mb-0">
                                                                € {product.price}
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
                                                <Card.Text tag="h5">€ {calculateTotalPrice()}</Card.Text>
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
                                                    tag="h5">€ {calculateTotalPrice()}</Card.Text>
                                            </div>

                                            <Button color="dark" block size="lg">
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

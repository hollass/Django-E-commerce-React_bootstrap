import 'bootstrap/dist/css/bootstrap.min.css';
import '../card.css';
import '../App.css'
import {Button, Container, Row, Col, Form, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

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
    const [fetchs, setFetch] = useState(true)


    useEffect(() => {
        if (fetchs) {
            view_cat()
        }
        scrollHandler()

    }, [fetchs])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    function useHover() {
        const [hoveredId, setHoveredId] = useState(null);

        const onHoverProps = (id) => ({
            onMouseEnter: () => setHoveredId(id),
            onMouseLeave: () => setHoveredId(null),
        });

        return [hoveredId, onHoverProps];
    }

    const [isName, setIsName] = useHover()


    const user = document.cookie.split('; ')
                .find(row => row.startsWith('loginInfo=')).split('=')[1];


    const add_cart = (product) => {
        axios.post(serverUrl + 'api/add_cart/', {
                user: user,
                cart: 1,
                product: product
        })
            .catch((err) => {
                console.error(err);
            });
    }
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

    function add(prdct) {
        add_cart(prdct)
    }



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
            <Container className={'all_product'}>
                <Col>
                    <Row>
                        {isProducts.map(Product => (
                            <div
                                key={Product.id}
                                className="card__id"
                                {...setIsName(Product.id)}
                            >
                                <img
                                    src="https://basket-09.wbbasket.ru/vol1243/part124302/124302874/images/big/1.webp"
                                    className="card__image" alt=""/>
                                <div className="card__overlay">
                                    <div className="card__header">
                                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                                            <path/>
                                        </svg>
                                        <div className="card__header-text">
                                            <span
                                                className="card__status">{Number(Product.price.product) / 100} Р</span>
                                            <h3 className="card__title">
                                                {isName === Product.id
                                                    ? Product.name
                                                    : Product.name.slice(0, 16) + '...'}
                                            </h3>

                                            <p className="card__brand small">{isName === Product.id
                                                    ? Product.description.brand
                                                    : Product.description.brand.slice(0, 16) + '...'}</p>
                                        </div>
                                    </div>
                                    <div className="card__button">
                                        <Button className={'card__button_buy'}
                                                variant="link" onClick={() => add(Product.id)}>В корзину</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </Col>


            </Container>
        </div>
    )
}
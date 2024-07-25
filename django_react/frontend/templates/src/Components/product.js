import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Image, Row} from 'react-bootstrap';
import '../card.css'
import '../App.css'
import {useEffect, useState} from "react";

export default function Product_list() {
    const [Products, set] = (useState([
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},
        {name: 'name', value: 222, brand: 'brand'},

    ]))

    return (
        <div className="all_product">
            <Col>
                <Row>
                    {Products.map(Product => (
                        <div href="" className="card__id">
                            <img src="https://basket-09.wbbasket.ru/vol1243/part124302/124302874/images/big/1.webp"
                                 className="card__image" alt=""/>
                            <div className="card__overlay">
                                <div className="card__header">
                                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <div className="card__header-text">
                                        <span className="card__status">{Product.value} Р</span>
                                        <h3 className="card__title">{Product.name}</h3>
                                        <p className="card__brand small">{Product.description.brand}</p>
                                    </div>
                                </div>
                                <div className="card__button">
                                    <Button className={'card__button_buy'} variant="link">В корзину</Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Row>
            </Col>
        </div>
    );
}

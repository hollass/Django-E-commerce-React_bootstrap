import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, DropdownDivider, Offcanvas} from "react-bootstrap";
import {useState} from "react";

export default function Product_id() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className={'product_id'}>

            <div className={'photo_product'}>
                <img src={'https://ir-2.ozone.ru/s3/multimedia-1-l/wc1000/6914779365.jpg'}
                     alt={'product_id'}/>

            </div>
            <div className={'product'}>
                <div className={'info_product'}>
                    <div className={'name_product'}>
                        <h1>Название товара</h1>
                    </div>
                    <h4>Характеристики товара</h4>
                    <div className={'specific_product'}>

                        <div className={'specific_product_block'}>
                            <p>Тип товара</p>
                            <hr/>
                            <p>Длина</p>
                            <hr/>
                            <p>Ширина</p>
                            <hr/>
                            <p>Вес</p>
                            <hr/>
                            <p>Высоты</p>
                        </div>
                        <div className={'specific_product_block'}>
                            <p>1223</p>
                            <hr/>
                            <p>321</p>
                            <hr/>
                            <p>321123 2</p>
                            <hr/>
                            <p>132123 2</p>
                            <hr/>
                            <p>132123 2</p>
                        </div>


                    </div>
                    <div className={'description_product'}>
                        <Button variant="link" onClick={handleShow} className="me-2">
                            Открыть описание
                        </Button>

                        <Offcanvas show={show} onHide={handleClose} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                Some text as placeholder. In real life you can have the elements you
                                have chosen. Like, text, images, lists, etc.
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
                <div className={'price_product'}>
                    <div className={'price_block'}>
                        <h1>500 ₽</h1>
                        <p>500 ₽ за 1 шт.</p>
                        <div className={'button_product'}>
                            <Button variant="primary">Купить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
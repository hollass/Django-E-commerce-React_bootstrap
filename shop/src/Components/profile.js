import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Tab, Tabs, Navbar, Nav, Button, Container, Row, Col, Form, Modal, Image} from "react-bootstrap";
import {useState} from "react";


export default function Profile() {
    const [user] = useState(
        {
            id: 1, name: 'Name', date: '26.03.2000', gender: 0, tel: '+79990000000',
            email: 'qwe@mail.ru', password: '123'
        });
    return (
        <Tab.Container defaultActiveKey="first" id="justify-tab-example" className="mb-3" justify unmountOnExit>
            <div className="page-profeile">
                <Col className='profile_nav'>
                    <Nav className='tab-nav'>
                        <Nav.Item className={'tab-link active'}>
                            <Nav.Link eventKey="first" color={'8d8d8d'} className={'tab-link-text'}>
                                Профиль
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className={'tab-link'}>
                            <Nav.Link eventKey="second" className={'tab-link-text'}>
                                Заказы
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className={'tab-link'}>
                            <Nav.Link eventKey="third" className={'tab-link-text'}>
                                Платежные системы
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col className="settings_info">
                    <Tab.Content>
                        <Tab.Pane eventKey="first" className="profile_item active">
                            <div className="main_info">
                                <div className="block-one">
                                    <h2>Учетные данные</h2>
                                    <ul className="block-info">

                                        <li className={'block-info-li'}>
                                            <div className={'block-item-info'}>
                                                <p>ФИО</p>
                                                <div>{user.name}</div>
                                            </div>
                                            <div className={'block-item-info'}>
                                                <p>День рождения</p>
                                                <div>
                                                    {user.date}
                                                </div>
                                            </div>
                                            <div className={'block-item-info'}>
                                                <p>Пол</p>

                                                <div>{user.gender === 1 ? "Мужской" : "Женский"}</div>
                                            </div>
                                        </li>
                                        <li className={'block-info-li'}>
                                            <div className={'block-item-info'}>
                                                <p>Телефон</p>
                                                <div>
                                                    {user.tel}
                                                </div>
                                            </div>
                                            <div className={'block-item-info'}>
                                                <p>Почта</p>
                                                <div>
                                                    {user.email}
                                                </div>

                                            </div>

                                        </li>

                                    </ul>
                                    <Button className={'update_profile'}>Изменить</Button>
                                </div>
                                <div className="block-one">
                                    <h2>Публичные данные</h2>
                                    <ul className="block-info">

                                        <li className={'block-info-li'}>
                                            <div className={'block-item-info'}>
                                                <p>ФИО</p>
                                                <div>
                                                    {user.name}
                                                </div>


                                            </div>
                                            <div className={'block-item-info'}>
                                                <p>День рождения</p>
                                                <div>
                                                    {user.date}
                                                </div>
                                            </div>

                                        </li>
                                        <li className={'block-info-li'}>
                                            <div className={'block-item-info'}>
                                                <p>Пол</p>
                                                <div>
                                                    <div>{user.gender === 1 ? "Мужской" : "Женский"}</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className="profile_item">
                            <div className="orders">
                                <div className="main_info_order">
                                    <div className='block-order'>
                                        <h2>Заказы</h2>
                                        <div className={'orders-item'}>
                                            <section className={'block-order-section'}>
                                                <div className={'order-item'}>
                                                    <h4>Заказ</h4>
                                                    <p>123</p>
                                                    <article className={'order-info'}>
                                                        <div className={'order-item-info'}>
                                                            <div className={'order-item-info-block'}>
                                                                <div className={'order-item-info-status'}>
                                                                    <h6>Статус доставки: </h6>
                                                                    <p>Отмена</p>
                                                                </div>
                                                                <div className={'order-item-info-date'}>
                                                                    <h6>Дата доставки: </h6>
                                                                    <p>123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'order-item-info'}>
                                                            <h4>photo</h4>
                                                        </div>

                                                    </article>
                                                </div>
                                                <div className={'order-item'}>
                                                    <h4>Заказ</h4>
                                                    <p>123</p>
                                                    <article className={'order-info'}>
                                                        <div className={'order-item-info'}>
                                                            <div className={'order-item-info-block'}>
                                                                <div className={'order-item-info-status'}>
                                                                    <h6>Статус доставки: </h6>
                                                                    <p>Отмена</p>
                                                                </div>
                                                                <div className={'order-item-info-date'}>
                                                                    <h6>Дата доставки: </h6>
                                                                    <p>123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'order-item-info'}>
                                                            <h4>photo</h4>
                                                        </div>

                                                    </article>
                                                </div>
                                                <div className={'order-item'}>
                                                    <h4>Заказ</h4>
                                                    <p>123</p>
                                                    <article className={'order-info'}>
                                                        <div className={'order-item-info'}>
                                                            <div className={'order-item-info-block'}>
                                                                <div className={'order-item-info-status'}>
                                                                    <h6>Статус доставки: </h6>
                                                                    <p>Отмена</p>
                                                                </div>
                                                                <div className={'order-item-info-date'}>
                                                                    <h6>Дата доставки: </h6>
                                                                    <p>123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'order-item-info'}>
                                                            <h4>photo</h4>
                                                        </div>

                                                    </article>
                                                </div>
                                                <div className={'order-item'}>
                                                    <h4>Заказ</h4>
                                                    <p>123</p>
                                                    <article className={'order-info'}>
                                                        <div className={'order-item-info'}>
                                                            <div className={'order-item-info-block'}>
                                                                <div className={'order-item-info-status'}>
                                                                    <h6>Статус доставки: </h6>
                                                                    <p>Отмена</p>
                                                                </div>
                                                                <div className={'order-item-info-date'}>
                                                                    <h6>Дата доставки: </h6>
                                                                    <p>123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'order-item-info'}>
                                                            <h4>photo</h4>
                                                        </div>

                                                    </article>
                                                </div>
                                                <div className={'order-item'}>
                                                    <h4>Заказ</h4>
                                                    <p>123</p>
                                                    <article className={'order-info'}>
                                                        <div className={'order-item-info'}>
                                                            <div className={'order-item-info-block'}>
                                                                <div className={'order-item-info-status'}>
                                                                    <h6>Статус доставки: </h6>
                                                                    <p>Отмена</p>
                                                                </div>
                                                                <div className={'order-item-info-date'}>
                                                                    <h6>Дата доставки: </h6>
                                                                    <p>123</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={'order-item-info'}>
                                                            <h4>photo</h4>
                                                        </div>

                                                    </article>
                                                </div>


                                            </section>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third" className="profile_item">ddd
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </div>
        </Tab.Container>


    );

}
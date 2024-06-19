import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal} from "react-bootstrap";
import {useState} from "react";


export default function Profile() {
    return (
        <div className='settings'>
            <div className='profile_nav'>
                <div className="vertical_menu_prof">
                    <div className='tab-nav'>
                        <a className={'tab-link'} href="#setting-1">
                            <img src="https://img.icons8.com/?size=100&id=87366&format=png&color=000000"
                                 alt="profile" width='60px' className="profile_img"/>
                        </a>
                        <a className={'tab-link'} href="#setting-2">
                            <img src="https://img.icons8.com/?size=100&id=85093&format=png&color=000000"
                                 alt="profile" width='60px' className="profile_img"/>
                        </a>
                        <a className={'tab-link'} href="#setting-3">
                            <img src="https://img.icons8.com/?size=100&id=W9i5MqwH_clj&format=png&color=000000"
                                 alt="profile" width='60px' className="profile_img"/>
                        </a>

                    </div>


                </div>
            </div>
            <div className="settings_info">
                <div className="profile_item" id={'setting-1'}>
                    <div className="main_info">
                        <div className="block-one">
                            <h2>Учетные данные</h2>
                            <ul className="block-info">

                                <li className={'block-info-li'}>
                                    <div className={'block-item-info'}>
                                        <p>ФИО</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>День рождения</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>Пол</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                </li>
                                <li className={'block-info-li'}>
                                    <div className={'block-item-info'}>
                                        <p>Телефон</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>Почта</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="block-one">
                            <h2>Публичные данные</h2>
                            <ul className="block-info">

                                <li className={'block-info-li'}>
                                    <div className={'block-item-info'}>
                                        <p>ФИО</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>День рождения</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>Пол</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                </li>
                                <li className={'block-info-li'}>
                                    <div className={'block-item-info'}>
                                        <p>Телефон</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                    <div className={'block-item-info'}>
                                        <p>Почта</p>
                                        <div>
                                            инфа
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div
                    className="profile_item" id={'setting-2'}>
                    <div className="orders">
                        <div className="main_info">
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
                </div>
                <div
                    className="profile_item" id={'setting-3'}>ddd
                </div>
            </div>
        </div>


    );

}
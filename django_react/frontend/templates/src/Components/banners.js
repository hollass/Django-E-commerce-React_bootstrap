import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, Carousel, Image} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function Banner_carousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className={'Carousel_banner'} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <div className={'CarouselImage'}>
                    <Image
                        src="https://img.goodfon.ru/wallpaper/original/1/c9/grand-teton-national-park-3450.jpg"
                        alt="First slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className={'CarouselImage'}>
                    <Image
                        src="https://i.artfile.ru/2560x1600_835577_[www.ArtFile.ru].jpg"
                        alt="Second slide"
                    />
                </div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
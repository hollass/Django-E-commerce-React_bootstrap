import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Nav, Container, Row, Modal, Image, Card, CardImgOverlay, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Menu_cats() {
    const serverUrl = 'http://localhost:8000/'
    useEffect(() => {
        allcats()
    }, [])

    const [isCats, setisCats] = useState([])

    const allcats = () => {
        axios.post(serverUrl + 'api/cats_info/')
            .then((res) => {
                setisCats(res.data.data)

            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (

        <div className="vertical-menu">
            <Col>
                <Row>
                    {isCats.map((cat) => (
                        <div className="card-category">
                            <Card>
                                <Nav.Link href={cat.url}>
                                    <Image src={'https://i.artfile.ru/2560x1600_835577_[www.ArtFile.ru].jpg'}/>
                                    <p>{cat.name}</p>

                                </Nav.Link>
                            </Card>
                        </div>
                    ))}
                </Row>
            </Col>
        </div>
    );
}
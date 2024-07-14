import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Button, Container, Row, Col, Form, Modal, Image, Card, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {redirect, useParams} from "react-router-dom";
import axios from "axios";

export default function Shop_page_cat() {
    const params = useParams();
    const prodId = params.id;

    

    return(
        <div>
            {prodId}
        </div>
    )


}
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Navbar, Nav, Link, Button, NavDropdown, Container, Row, Col, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">Copyright &copy; 2021</p>
                    </div>
                </div>
            </div>
        </div>

    )

}
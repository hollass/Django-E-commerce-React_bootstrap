import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Navbar, Row} from 'react-bootstrap';
import Product from './Components/product';
import Navig from './Components/nav';
import Profile from './Components/profile';
import Menu from './Components/menu';
import Footer from "./Components/footer";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import product_id from "./Components/id";
import Product_id from "./Components/id";
import Basket from "./Components/basket";


function App() {
    return (
        <div className="App">
            <Navig/>
            <Router>
                <Routes>
                    <Route path='/' element={<Product/>}/>
                    <Route path='/about'/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/id' element={<Product_id/>}/>
                    <Route path='/basket' element={<Basket/>}/>

                </Routes>
            </Router>
            {/*<Container className="App-header">*/}
            {/*    <Row>*/}
            {/*        <div className='menu'>*/}
            {/*            <Menu/>*/}
            {/*        </div>*/}
            {/*        <Routes>*/}
            {/*            <Route path='/' element={<Product/>}/>*/}
            {/*            <Route path='/about' />*/}
            {/*            /!*<Route path='/contact' component={Contact}/>*!/*/}
            {/*            /!*<Route path='/product' component={Product}/>*!/*/}
            {/*            /!*<Route path='/cart' component={Cart}/>*!/*/}
            {/*            /!*<Route path='/login' component={Login}/>*!/*/}
            {/*            /!*<Route path='/register' component={Register}/>*!/*/}
            {/*            /!*<Route path='/checkout' component={Checkout}/>*!/*/}
            {/*            /!*<Route path='/cart' component={Cart}/>*!/</Routes>*/}
            {/*        /!*<div className='all_product'>*!/*/}
            {/*        /!*    <Product/>*!/*/}
            {/*        /!*</div>*!/*/}

            {/*    </Row>*/}
            {/*</Container>*/}
            <Footer/>
        </div>
    )
}

export default App;

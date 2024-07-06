import './App.css';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './Components/product';
import Navig from './Components/nav';
import Profile from './pages/profile';
import Menu from './Components/menu';
import Footer from "./Components/footer";
import {Route, Routes, BrowserRouter as Router, Navigate} from "react-router-dom";
import Product_id from "./pages/id";
import Basket from "./pages/basket";
import axios from "axios";
import Register from "./pages/register";
import Notfound from "./pages/notfound";
import Login from "./pages/login";


function Logout() {
    localStorage.clear()
    return <Navigate to="/login"/>
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

class App extends React.Component {
    state = { details: [],}

    componentDidMount() {
        let data;
        axios.get('http://127.0.0.1:8000/')
            .then(res => {
                data = res.data;
                this.setState({details: data});

            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (

        <div className="App">
            <Navig/>
            <Router>
                <Routes>
                    <Route path='/' element={<Product/>}/>
                    <Route path='/about'/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/id' element={<Product_id/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    {/*<Route path='/basket' element={<Basket/>}/>*/}
                    <Route path='*' element={<Notfound/>}/>

                </Routes>
            </Router>
            <Footer/>
        </div>
        )
}
}
export default App;

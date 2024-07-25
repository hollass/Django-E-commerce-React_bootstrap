import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import '../App.css'
import Menu from "../Components/menu";
import Banner_carousel from "../Components/banners";
import Product_list from "../Components/product";

export default function Product() {
    return (
        <div className='home'>
            <Banner_carousel />

        </div>
    );
}

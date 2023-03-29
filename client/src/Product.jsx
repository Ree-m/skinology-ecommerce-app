import { useState } from 'react';
import { Link } from "react-router-dom";
import "./styles/product.css"

const Product = ({ product, _id, name, brand,quantity, price,image }) => {


    return (
        <div className="product center">

            <div className="product-image">
                <Link to={`/product/${_id}`}>
                    <img src={`http://localhost:9000/${image}`} alt={`Image of ${name}`} />
                </Link>
            </div>
            <div className="product-title">
                <Link to={`/product/${_id}`}>
                    <h1>[{brand}] {name}</h1>
                </Link>
            </div>

            <div className="product-details">
                <span>${price}</span>

            </div>



        </div>
    );
}

export default Product;
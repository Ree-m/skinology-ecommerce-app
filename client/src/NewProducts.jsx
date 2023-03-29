import { useState, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import "./styles/newProducts.css"
const NewProducts = () => {
    const [newProducts, setNewProducts] = useState([])

    // get new products 
    useEffect(() => {
        fetch("http://localhost:9000/newProducts")
            .then(res => {
                res.json()
                    .then(products => {
                        setNewProducts(products)
                    })
            })
    }, [])

    return (
        <div className="newProducts">
            <Link to={`/newProducts`}>
                <h1 className="title-large title-padding center">New</h1>
            </Link>
            <div className="newProducts-products">
                {newProducts && newProducts.length > 0 && newProducts.map((product) => (
                    <div key={product._id}>
                        <Product product={product} {...product} />

                    </div>
                ))}
            </div>

        </div>
    );
}

export default NewProducts;
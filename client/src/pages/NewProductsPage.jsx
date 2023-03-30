import { useState, useEffect } from "react"
import Product from "../Product"
import "../styles/newProductsPage.css"

const NewProductsPage = () => {

    const [newProducts, setNewProducts] = useState([])
    useEffect(() => {
        fetch("http://localhost:9000/allNewProducts")
            .then(res => {
                res.json()
                    .then(products => {
                        setNewProducts(products)
                    })
            })
    }, [])

    return (
        <div className="new-products-page">
            <h1 className="title-large center">New Products</h1>
            <div className="products">
                {newProducts && newProducts.length > 0 && newProducts.map((product) => (
                    <div key={product._id}>
                        <Product product={product} {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewProductsPage;
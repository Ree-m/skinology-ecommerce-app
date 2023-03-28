import { useState,useEffect } from "react"
import Product from "../Product"

const NewProductsPage = () => {

const [newProducts,setNewProducts]=useState([])
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
        <>
            <h1>New Products</h1>

            {newProducts && newProducts.length > 0 && newProducts.map((product) => (
                <div key={product._id}>
                    <Product product={product} {...product} />
                </div>
            ))}
        </>
     );
}
 
export default NewProductsPage;
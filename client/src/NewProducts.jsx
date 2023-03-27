import { useState, useEffect } from "react";
import Product from "./Product";
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
        <>
            <h1>New</h1>
            {newProducts && newProducts.length > 0 && newProducts.map((product) => (
                <div key={product._id}>
                    <Product product={product} {...product} />


                </div>
            ))}
        </>
    );
}

export default NewProducts;
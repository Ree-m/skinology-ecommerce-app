import { useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import "../styles/productPage.css"
import NewProducts from '../NewProducts';
import "../styles/newProducts.css"
import Product from "../Product"
import { FaRegEdit } from "react-icons/fa";




const ProductPage = ({ addToCart,addToGuestCart }) => {
    const [product, setProduct] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [cart, setCart] = useState([])
    const { id } = useParams() //this is productid 
    const { userInfo } = useContext(UserContext)
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:9000/product/${id}`).then(res => {
            res.json().then(product => {
                setProduct(product)
            })
        })
    }, [])
    async function deleteProduct(e) {
        e.preventDefault()

        const response = fetch(`http://localhost:9000/deleteProduct/${id}`, {
            method: "DELETE"
        })
        setRedirect(true)
        console.log(response)

    }

    if (redirect) {
        return navigate("/")
    }
    if (!product) return ""

    return (
        <div className="product-page">

            <div className="product-page-sub-1">
                <img className="product-page-main-img" src={`http://localhost:9000/${product.image}`} alt={`Image of ${product.name}`} />

                <div className="product-details">
                    <div className="product-info">
                        <h1 className="title-medium">[{product.brand}] {product.name}</h1>
                        <span>${product.price}</span>
                        <br />
                    </div>
 
                    {userInfo && (
                        <div className="btn-container">
                            <button className="btn" onClick={() => addToCart(product._id, userInfo.id, 1, product.name,product.brand, product.price, product.image)}>Add to cart</button>
                        </div>
                    )}
  
                    {!userInfo &&(
                        <div className="btn-container">
                            <button className="btn" onClick={()=>addToGuestCart(product)}>Add to cart</button>
                        </div>
                    )}

                    <div className="product-content">

                        <div>
                            <h3 className="title-small font-600">Description</h3>
                            <p>{product.description}</p>
                            <br />
                            <p>{product.quantity}ml</p>
                        </div>

                        <div>
                            <h3 className="title-small font-600">How to use</h3>
                            <p>{product.use}</p>
                        </div>

                        <div>
                            <h3 className="title-small font-600">Ingredients</h3>
                            <p>{product.ingredients}</p>
                            <br />
                            <p><strong>Disclaimer:</strong> Please note ingredients are subject to change at manufacturer's discretion. For the most complete and up-to-date list of ingredients, please refer to product packaging.</p>
                        </div>

                    </div>



                    {userInfo && userInfo.username === "reemreem" && (
                        <div className="edit-row">
                            <Link to={`/edit/${product._id}`}>

                                <FaRegEdit className="edit-btn" />
                                Edit this product
                            </Link>
                        </div>

                    )}
                    {userInfo && userInfo.username === "reemreem" && (
                        <button className="btn" onClick={deleteProduct}>delete</button>

                    )}


                </div>

            </div>
            <div className="product-page-sub-2">
                <NewProducts />
            </div>
        </div>
    );
}

export default ProductPage;
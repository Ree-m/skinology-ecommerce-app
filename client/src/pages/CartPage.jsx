
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import Product from '../Product';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import "../styles/cartPage.css"
import { MdDelete } from "react-icons/md";


const CartPage = ({ cartItems, setCartItems }) => {

    const { userInfo } = useContext(UserContext)
    const navigate = useNavigate();
    const [deleteUpdate, setDeleteUpdate] = useState(false); // set to true to refresh when deleted/updated

    async function removeFromCart(productId) {
        try {
            await fetch(`http://localhost:9000/cart/${userInfo.id}/${productId}`, {
                method: "DELETE",
                credentials: "include"
            })
            setDeleteUpdate(true)
            setCartItems(() => cartItems[0].products.filter((item) => item.productId !== productId)) //cart items with productId not equal to the deleted productid stay
        } catch (error) {
            console.error(error);

        }
    }

    async function updateQuantity(productId, newQuantity) {
        try {
            const response = await fetch(`http://localhost:9000/cart/updateQuantity/${userInfo.id}/${productId}/${newQuantity}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newQuantity })
            });
            const data = await response.json()
            setCartItems(data);
            setDeleteUpdate(true)
        } catch (error) {
            console.error(error);
        }
    }

    const handleMinusClick = (productId, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handlePlusClick = (productId, quantity) => {
        const newQuantity = quantity + 1;
        updateQuantity(productId, newQuantity);
    }

    useEffect(() => {
        if (deleteUpdate) {
            setDeleteUpdate(false); // reset to avoid infinite loop
            window.location.reload(); // page refreshes
        }
    }, [deleteUpdate])


    // for non-loggedIn users,guest cart

    const guestCart = JSON.parse(localStorage.getItem("guestCart"))  //get the guestCart from localStorage
    const isUserLoggedIn = !!userInfo 

    if (!isUserLoggedIn) {
        return (
            <div className="cart-page">
                <h2 className="center">Cart</h2>
                {Object.values(guestCart).map((item) => (  
                    <div key={item._id}>
                        <p>{item.name}</p>
                        <p>{item.brand}</p>
                        <p>{item.price}</p>
                        <p>{item.quantity}</p>
                    </div>
                ))}
            </div>
        )
    }


    return (
        <div className="cart-page">
            <h2 className="center">Cart</h2>
            {cartItems === undefined || cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length === 0 ? ("Cart is empty") : cartItems && cartItems[0] && cartItems[0].products && (
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="capital"  >Product Name</th>
                            <th className="capital">Price</th>
                            <th className="capital">Quantity</th>
                            <th className="capital">SubTotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems[0].products.map((item) => (
                            <tr key={item._id}>
                                <td><img src={`http://localhost:9000/${item.image}`} alt={`Image of {item.an}`} /></td>
                                <td>
                                    [{item.brand}] {item.name}
                                </td>
                                <td>${item.price}</td>
                                <td>
                                    <div className="quantity-container">
                                        <button onClick={() => handleMinusClick(item.productId, item.quantity)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handlePlusClick(item.productId, item.quantity)}>+</button>
                                    </div>
                                </td>

                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <MdDelete className="deleteIcon" onClick={() => removeFromCart(item.productId)} />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>Total:</td>

                            <td>${cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.reduce((acc, item) => acc + item.price * item.quantity, 0)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
            <div className="cart-buttons">
                <button className="btn" onClick={() => navigate("/")}>Continue Shopping</button>
                <button className="btn">Buy</button>
            </div>
        </div>
    );
};

export default CartPage;





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


    const removeFromGuestCart = (itemId) => {
        // get the guest cart
        let guestCart = JSON.parse(localStorage.getItem("guestCart"))

        // delete
        delete guestCart[itemId]

        // save
        localStorage.setItem("guestCart", JSON.stringify(guestCart))
    }


    const updateGuestQunatity = (itemId, newQuantity) => {
        // get the guest cart
        let guestCart = JSON.parse(localStorage.getItem("guestCart"))

        // get the item to be updated
        let item = guestCart[itemId]

        // If the item exists in the cart and the new quantity is valid, update the quantity and save to local storage

        if (item) {
            if (newQuantity === 0) {
                delete guestCart[itemId]  //if newQuantity=0,delete
            } else {

                item.quantity = newQuantity  //+1 or -1 the quantity

                // save the updated item in localStorage
                guestCart[itemId] = item
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart))

        }

    }

    const handleGuestPlusClick = (itemId) => {
        // get guestCart
        let guestCart = JSON.parse(localStorage.getItem("guestCart"))

        // get qunatity and +1
        let quantity = guestCart[itemId].quantity
        const newQuantity = quantity + 1

        updateGuestQunatity(itemId, newQuantity)
    }


    const handleGuestMinusClick = (itemId) => {
        // get cart
        let guestCart = JSON.parse(localStorage.getItem("guestCart"))

        // get qunatity of cart and -1
        let quantity = guestCart[itemId].quantity
        const newQuantity = quantity - 1


        updateGuestQunatity(itemId, newQuantity)
    }

    const guestCart = JSON.parse(localStorage.getItem("guestCart"))  //get the guestCart from localStorage
    const isUserLoggedIn = !!userInfo

    if (!isUserLoggedIn) {
        return (
            <div className="cart-page">
                <h2 className="center">Cart</h2>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="capital" >Product Name</th>
                            <th className="capital" >Price</th>
                            <th className="capital">Qunatity</th>
                            <th className="capital">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(guestCart).map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <img src={`http://localhost:9000/${item.image}`} alt={`Image of ${item.name}`} />
                                </td>
                                <td>
                                    [{item.brand}] {item.name}
                                </td>
                                <td>
                                    <span>{item.price}</span>
                                </td>

                                <td>
                                    <div className="quantity-container">
                                        <button onClick={() => handleGuestMinusClick(item._id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleGuestPlusClick(item._id)}>+</button>
                                    </div>
                                </td>

                                <td>${item.price * item.quantity}</td>

                                <td>
                                    <MdDelete className="deleteIcon" onClick={() => removeFromGuestCart(item._id)} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="cart-buttons">
                    <button className="btn" onClick={() => navigate("/")}>Continue Shopping</button>
                    <button className="btn">Buy</button>
                </div>

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




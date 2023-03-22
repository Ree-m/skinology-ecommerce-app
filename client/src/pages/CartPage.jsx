import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import Product from '../Product';

const CartPage = () => {

    const { userInfo } = useContext(UserContext)
    const [cartItems, setCartItems] = useState(null)
    const [quantity, setQuantity] = useState()


  useEffect(() => {
    fetch(`http://localhost:9000/cart/${userInfo.id}`, {
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("this is data", data); // check the response from the server
            setCartItems(data);
        })
        .catch((error) => console.error(error));
}, [userInfo.id]);


    if (cartItems) {
        console.log("this is cartItems", cartItems[0], cartItems)


    }

    async function removeFromCart(productId) {
        try {
            await fetch(`http://localhost:9000/cart/${userInfo.id}/${productId}`, {
                method: "DELETE",
                credentials: "include"
            })
            setCartItems(() => cartItems[0].products.filter((item) => item.productId !== productId)) //cart items with productId not equal to the deleted productid stay

        } catch (error) {
            console.error(error);

        }
    }


    async function handleMinusClick(quantity, productId) {
        const newQuantity = quantity - 1;
       
            try {
                const response = await fetch(`http://localhost:9000/cart/updateQuantity/${userInfo.id}/${productId}/${newQuantity}`, {
                    method: 'PUT',
                    headers:{"Content-Tye":"application/json"},
                    body:JSON.stringify({newQuantity})
                });
                const data = await response.json();
                setCartItems(data)
                console.log("this is update data",data);
            } catch (error) {
                console.error(error);
            
        }
    }
    
    async function handlePlusClick(quantity,productId) {
        const newQuantity = quantity + 1;
        
        try {
          const response = await fetch(`http://localhost:9000/cart/updateQuantity/${userInfo.id}/${productId}/${newQuantity}`, {
            method: 'PUT',
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
    

    }




    return (
        <>
            <h2>Cart</h2>
            {cartItems && cartItems[0].products.length <0 ? ("Cart is empty") : cartItems && cartItems[0].products.map((item) => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <div>
                        <button onClick={() => handleMinusClick(item.quantity, item.productId)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handlePlusClick(item.quantity,item.productId)}>+</button>
                    </div>
                    <p>Price: ${item.price}</p>
                    <img src={`http://localhost:9000/${item.image}`} alt={item.name}/>
                    <button onClick={() => removeFromCart(item.productId)}>Remove from cart</button>
                </div>
            ))}

        </>
    );
}

export default CartPage;
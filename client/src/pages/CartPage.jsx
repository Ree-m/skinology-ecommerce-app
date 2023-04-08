import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../styles/cartPage.css";
import { MdDelete } from "react-icons/md";
import { API_URL } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = ({
  cartItems,
  setCartItems,
  isUserLoggedIn,
  removeFromGuestCart,
  handleGuestMinusClick,
  handleGuestPlusClick,
}) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const onClick = () => {
    console.log("click click");
    toast.info("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  async function removeFromCart(productId) {
    try {
      await fetch(`${API_URL}/cart/${userInfo.id}/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setCartItems((prevCartItems) => {
        const newCartItems = prevCartItems[0].products.filter(
          (item) => item.productId !== productId
        ); //new cart after deleting
        return newCartItems.length ? [{ products: newCartItems }] : []; // if there are no items in cart, return an empty array
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function updateQuantity(productId, newQuantity) {
    try {
      const response = await fetch(
        `${API_URL}/cart/updateQuantity/${userInfo.id}/${productId}/${newQuantity}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newQuantity }),
        }
      );
      const data = await response.json();
      console.log("this is cartItems,before update", data);
      //   setCartItems(data);
      console.log("this is new cartItems,after update", data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleMinusClick = (productId, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
      setCartItems((prevCartItems) => {
        const newCartItems = [...prevCartItems]; // create a new array with the same items as the previous one
        const productIndex = newCartItems[0].products.findIndex(
          (item) => item.productId === productId
        ); //find the index the item i just updated
        newCartItems[0].products[productIndex].quantity = newQuantity; // update the quantity of the item in the existing state object
        return newCartItems;
      });
    }
  };

  const handlePlusClick = (productId, quantity) => {
    const newQuantity = quantity + 1;

    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems]; // create a new array with the same items as the previous one
      const productIndex = newCartItems[0].products.findIndex(
        (item) => item.productId === productId
      ); //find the index the item i just updated
      newCartItems[0].products[productIndex].quantity = newQuantity; // update the quantity of the item in the existing state object
      return newCartItems;
    });
  };

  // for non-loggedIn users,guest cart

  const guestCart = JSON.parse(localStorage.getItem("guestCart")); //get the guestCart from localStorage
  // const isUserLoggedIn = !!userInfo

  if (!isUserLoggedIn) {
    return (
      <div className="cart-page">
        <h2 className="center">Cart</h2>
        {!guestCart || (guestCart && Object.keys(guestCart).length === 0)
          ? "Cart is empty"
          : Object.keys(guestCart).length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th className="capital">Name</th>
                    <th className="capital">Price</th>
                    <th className="capital">Quantity</th>
                    <th className="capital">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(guestCart).map((item) => (
                    <tr key={item._id}>
                      <td>
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={`${API_URL}/${item.image}`}
                            alt={`Image of ${item.name}`}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/product/${item._id}`}
                          className="table-name"
                        >
                          [{item.brand}] {item.name}
                        </Link>
                      </td>
                      <td>${item.price}</td>

                      <td>
                        <div className="quantity-container">
                          <button
                            onClick={() => handleGuestMinusClick(item._id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleGuestPlusClick(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>${item.price * item.quantity}</td>

                      <td>
                        <MdDelete
                          className="deleteIcon"
                          onClick={() => removeFromGuestCart(item._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

        <div className="cart-buttons">
          <button className="btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button className="btn" onClick={onClick}>
            Buy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="center">Cart</h2>
      {cartItems &&
      cartItems[0] &&
      cartItems[0].products &&
      cartItems[0].products.length === 0
        ? "Cart is empty"
        : cartItems &&
          cartItems[0] &&
          cartItems[0].products && (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th className="capital">Name</th>
                  <th className="capital">Price</th>
                  <th className="capital">Quantity</th>
                  <th className="capital">SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems[0].products.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Link to={`/product/${item.productId}`}>
                        <img
                          src={`${API_URL}/${item.image}`}
                          alt={`Image of {item.an}`}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/product/${item.productId} className="table-name"`}
                      >
                        [{item.brand}] {item.name}
                      </Link>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <div className="quantity-container">
                        <button
                          onClick={() =>
                            handleMinusClick(item.productId, item.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handlePlusClick(item.productId, item.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>${item.price * item.quantity}</td>
                    <td>
                      <MdDelete
                        className="deleteIcon"
                        onClick={() => removeFromCart(item.productId)}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}>Total:</td>

                  <td>
                    $
                    {cartItems &&
                      cartItems[0] &&
                      cartItems[0].products &&
                      cartItems[0].products.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          )}
      <div className="cart-buttons">
        <button className="btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
        <button className="btn" onClick={onClick}>
          Buy
        </button>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default CartPage;

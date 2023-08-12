import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddPage from "./pages/AddPage";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
import CartPage from "./pages/CartPage";
import SearchedProductsPage from "./pages/SearchedProductsPage";
import NewProductsPage from "./pages/NewProductsPage";
import BestPage from "./pages/BestSellersPage";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import AboutPage from "./pages/AboutPage";
import { API_URL } from "./constants";
import HealthCheck from "./pages/HealthCheck";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(null);
  const [isInCart,setIsInCart] =useState(false)
  const [isInGuestCart,setIsInGuestCart] =useState(false)
  const [cart, setCart] = useState([]);
  const [guestCart, setGuestCart] = useState(
    JSON.parse(localStorage.getItem("guestCart")) || {}
  );
  const { setUserInfo, userInfo } = useContext(UserContext);

  // const { userInfo } = useContext(UserContext)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // get profile and isUserLoggedIn
  useEffect(() => {
    console.log("starting to fetch profile");
    fetch(`${API_URL}/profile`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user profile.");
        }
      })
      .then((userInfo) => {
        setIsUserLoggedIn(true);
        setUserInfo(userInfo);
        console.log("Fetching profile worked");
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, []);

  // get all products in homepage
  useEffect(() => {
    fetch(`${API_URL}/allProducts`).then((res) => {
      res.json().then((products) => {
        setProducts(products);
      });
    });
  }, []);

  // get cart
  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetch(`${API_URL}/cart/${userInfo.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("this is cartItems", data[0].products); // check the response from the server
          setCartItems(data);
        })
        .catch((error) => console.error(error));
    }
  }, [userInfo]);

  // add to cart
  async function addToCart(
    productId,
    userId,
    quantity,
    name,
    brand,
    price,
    image
  ) {
    console.log("adding to cart...");
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          quantity,
          name,
          brand,
          price,
          image,
        }),
      });
      const data = await response.json();

      // fetch the latest cart data from the server
      fetch(`${API_URL}/cart/${userInfo.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("this is updated cartItems", data[0].products); // check the response from the server
          setCartItems(data);
          setIsInCart(true)

        })
        .catch((error) => console.error(error));
      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // add to guest cart
  function addToGuestCart(item) {
    if (guestCart) {
      // of guestCart is there, add
      console.log("adding to guest cart", { item });

      // Add the item to the guest cart
      const addedGuestCart = {
        ...guestCart,
        [item._id]: {
          ...item,
          quantity: guestCart[item._id] ? guestCart[item._id].quantity + 1 : 1, //if the guestCart hass the item,increment the quantity or else set quantity to 1
        },
      };
      setIsInGuestCart(true)
      setGuestCart(addedGuestCart);

      // Save the guest cart to local storage
      localStorage.setItem("guestCart", JSON.stringify(addedGuestCart));
      console.log("reem", "finished adding to guest cart", { item });
    } else {
      // initialize guestCart with the item
      const initialGuestCart = {
        [item._id]: {
          ...item,
          quantity: 1,
        },
      };
      setIsInGuestCart(true)
      setGuestCart(initialGuestCart);
      localStorage.setItem("guestCart", JSON.stringify(initialGuestCart));
    }
  }

  // remove from guestCart

  function removeFromGuestCart(itemId) {
    const deletedGuestCart = { ...guestCart };

    // delete
    delete deletedGuestCart[itemId];
    setGuestCart(deletedGuestCart);

    // save
    localStorage.setItem("guestCart", JSON.stringify(deletedGuestCart));
  }

  const updateGuestQunatity = (itemId, newQuantity) => {
    const updatedGuestcart = { ...guestCart };

    // get the item to be updated
    let item = updatedGuestcart[itemId];

    // If the item exists in the cart and the new quantity is valid, update the quantity and save to local storage

    if (item) {
      if (newQuantity === 0) {
        delete updatedGuestcart[itemId]; //if newQuantity=0,delete
      } else {
        item.quantity = newQuantity; //+1 or -1 the quantity

        // save the updated item in localStorage
        updatedGuestcart[itemId] = item;
      }
      setGuestCart(updatedGuestcart);

      localStorage.setItem("guestCart", JSON.stringify(updatedGuestcart));
    }
  };

  const handleGuestPlusClick = (itemId) => {
    // get guestCart
    const updatedGuestCart = { ...guestCart };

    // get qunatity and +1
    let quantity = updatedGuestCart[itemId].quantity;
    const newQuantity = quantity + 1;
    updatedGuestCart[itemId].quantity = newQuantity;

    setGuestCart(updatedGuestCart);

    updateGuestQunatity(itemId, newQuantity);
  };

  const handleGuestMinusClick = (itemId) => {
    // get guestCart
    const updatedGuestCart = { ...guestCart };

    // get qunatity and -1
    let quantity = updatedGuestCart[itemId].quantity;
    const newQuantity = quantity - 1;
    // updatedGuestCart[itemId] = item;
    updatedGuestCart[itemId].quantity = newQuantity;

    setGuestCart(updatedGuestCart);

    updateGuestQunatity(itemId, newQuantity);
  };

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Layout
            cartItems={cartItems}
            setCartItems={setCartItems}
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        }
      >
        <Route
          index
          element={<HomePage products={products} setProducts={setProducts} />}
        />

        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route
          path="/product/:id"
          element={
            <ProductPage
              addToCart={addToCart}
              isInCart={isInCart}
              isInGuestCart={isInGuestCart}
              addToGuestCart={addToGuestCart}
              isUserLoggedIn={isUserLoggedIn}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/edit/:id" element={<EditProductPage />} />
        <Route
          path="/cart/:userId"
          element={
            <CartPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              isUserLoggedIn={isUserLoggedIn}
              removeFromGuestCart={removeFromGuestCart}
            />
          }
        />
        <Route
          path="/cart/guest"
          element={
            <CartPage
              removeFromGuestCart={removeFromGuestCart}
              isUserLoggedIn={isUserLoggedIn}
              handleGuestMinusClick={handleGuestMinusClick}
              handleGuestPlusClick={handleGuestPlusClick}
            />
          }
        />
        <Route path="/search" element={<SearchedProductsPage />} />
        <Route path="/newProducts" element={<NewProductsPage />} />
        <Route path="/bestSellersPage" element={<BestPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/healthCheck" element={<HealthCheck />} />

      </Route>
    </Routes>
  );
}

export default App;

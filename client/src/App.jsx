import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Layout from './Layout';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddPage from './pages/AddPage';
import { UserContextProvider } from './UserContext'
import ProductPage from './pages/ProductPage';
import EditProductPage from './pages/EditProductPage';
import CartPage from './pages/CartPage';
import SearchedProductsPage from './pages/SearchedProductsPage'
import NewProductsPage from './pages/NewProductsPage'
import BestPage from './pages/BestSellersPage'
import Checkout from './Checkout'
import { useContext } from 'react';
import { UserContext } from './UserContext';


function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(null)
  const { userInfo } = useContext(UserContext)
  const [add,setAdd]=useState(false)


// get all products in homepage
  useEffect(() => {
    fetch("http://localhost:9000/allProducts")
        .then(res => {
            res.json()
                .then(products => {
                    setProducts(products)
                })
        })
}, [])

// get cart
  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetch(`http://localhost:9000/cart/${userInfo.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("this is data", data); // check the response from the server
          setCartItems(data);


        })
        .catch((error) => console.error(error));
    
      }

  }, [userInfo]);

  useEffect(()=>{
    if(add){
      setAdd(false) //to avoid an infinite loop
      window.location.reload(); // page refreshes

    }

  },[add])


  // add to cart
  async function addToCart(productId, userId, quantity, name, price, image) {

    try {
      const response = await fetch("http://localhost:9000/cart/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity, name, price, image }),
      });
      const data = await response.json();
      setAdd(true); // trigger page refreshs
      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  }



  return (
      <Routes>
        <Route path={"/"} element={<Layout cartItems={cartItems} setCartItems={setCartItems} />} >

          <Route index element={<HomePage products={products} setProducts={setProducts} />} />
          
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/product/:id" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/cart/:userId" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/search" element={<SearchedProductsPage />} />
          <Route path="/newProducts" element={<NewProductsPage/>} />
          <Route path="/bestSellersPage" element={<BestPage/>} />
          <Route path="/checkout" element={<Checkout/>} />

        </Route>
      </Routes>

  )
}

export default App

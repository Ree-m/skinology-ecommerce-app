import { useState, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import "./styles/newProducts.css";
import { API_URL } from "./constants";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  // get new products
  useEffect(() => {
    console.log("this is API_URL",API_URL)
    fetch(`${API_URL}/newProducts`).then((res) => {
      res.json().then((products) => {
        setNewProducts(products);
      });
    });
  }, []);

  return (
    <div className="newProducts">
      <Link to={`/newProducts`}>
        <h1 className="title-large title-padding center">New</h1>
      </Link>
      <div className="newProducts-products">
        {newProducts &&
          newProducts.length > 0 &&
          newProducts.map((product) => (
            <div key={product._id}>
              <Product product={product} {...product} />
            </div>
          ))}
      </div>

      <div className="btn-container">
        <Link to={"/newProducts"}>
          <button className="btn">View all products</button>
        </Link>
      </div>
    </div>
  );
};

export default NewProducts;

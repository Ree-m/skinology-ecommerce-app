import { useState, useEffect } from "react";
import Product from "../Product";
import "../styles/bestProductsPage.css";
import { API_URL } from "../constants";

const BestPage = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}bestProducts`)
      .then((res) => res.json())
      .then((products) => {
        setBestProducts(products);
      });
  });
  return (
    <div className="best-products-page">
      <h1 className="title-large center">Best</h1>
      <div className="products">
        {bestProducts &&
          bestProducts.length > 0 &&
          bestProducts.map((product) => (
            <div key={product._id}>
              <Product product={product} {...product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestPage;

import { useState, useEffect } from "react";
import Product from "../Product";
import "../styles/bestProductsPage.css";
import { API_URL } from "../constants";
import Loading from "../loading";

const BestPage = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetch(`${API_URL}/bestProducts`)
      .then((res) => res.json())
      .then((products) => {
        setBestProducts(products);
        setLoading(false)
      });
  });

  if(loading){
    return <Loading/>
  }
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

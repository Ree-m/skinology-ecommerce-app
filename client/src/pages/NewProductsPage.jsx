import { useState, useEffect } from "react";
import Product from "../Product";
import "../styles/newProductsPage.css";
import { API_URL } from "../constants";
import Loading from "../loading";

const NewProductsPage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetch(`${API_URL}/allNewProducts`).then((res) => {
      res.json().then((products) => {
        setNewProducts(products);
        setLoading(false)
      });
    });
  }, []);

  if(loading){
    return <Loading/>
  }

  return (
    <div className="new-products-page">
      <h1 className="title-large center">New Products</h1>
      <div className="products">
        {newProducts &&
          newProducts.length > 0 &&
          newProducts.map((product) => (
            <div key={product._id}>
              <Product product={product} {...product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewProductsPage;

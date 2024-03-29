import { useState, useEffect } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import "./styles/newProducts.css";
import { API_URL } from "./constants";
import Loading from "./loading";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading,setLoading]=useState(true)
console.log("API_Url",API_URL)
  // get new products
  useEffect(() => {
    fetch(`${API_URL}/newProducts`).then((res) => {
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

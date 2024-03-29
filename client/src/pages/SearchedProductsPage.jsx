import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/searchProductsPage.css";
import { API_URL } from "../constants";
import Loading from "../loading";

const SearchedProductsPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetch(`${API_URL}/search/${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "this is data");
        setResults(data);
        setLoading(false)
      });
  }, [query]);
  
  if(loading){
    return <Loading/>
  }

  return (
    <div className="search-products-page">
      <h1>Search Results for "{query}"</h1>
      {results.length === 0 ? (
        "No results matched"
      ) : (
        <ul>
          {results.map((item) => (
            <div className="products" key={item._id}>
              <Link to={`/product/${item._id}`}>
                <img
                  src={`${API_URL}/${item.image}`}
                  alt={`Image of ${item.name}`}
                />
              </Link>
              <Link to={`/product/${item._id}`}>
                <p>
                  [{item.brand}] {item.name}
                </p>
              </Link>
              <div className="search-price">
                <span>${item.price}</span>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchedProductsPage;

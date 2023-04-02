import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../styles/searchProductsPage.css"


const SearchedProductsPage = () => {
  const [results, setResults] = useState([])
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');


  useEffect(() => {
    fetch(`http://localhost:9000/search/${query}`).
      then(res => res.json())
      .then(data => {
        console.log(data, "this is data")
        setResults(data)
      })

  }, [query])
 
  return (
    <div className="search-products-page">
      <h1>Search Results for "{query}"</h1>
      {results.length === 0 ? (
        "No results matched"
      ) : (
        <ul>
          {results.map((item) => (
            <div className="products" key={item._id}>

              <img src={`http://localhost:9000/${item.image}`} alt="" />
              <Link to={`/product/${item._id}`}><p>[{item.brand}] {item.name}</p></Link>
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

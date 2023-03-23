import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const SearchedProductsPage = () => {
  const [results,setResults]=useState([])
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');


useEffect(()=>{
 fetch(`http://localhost:9000/search/${query}`).
 then(res=>res.json())
 .then(data=>{
  console.log(data,"this is data")
  setResults(data)
 })
   
},[query])

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      { results.length=== 0 ? (
        "No results matched"
      ) : (
        <ul>
          {results.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.brand}</p>
              <img src={`http://localhost:9000/${item.image}`} alt="" />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchedProductsPage;

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
  console.log(data,data[0],"this is results")
  setResults(data)
 })
   
},[query])
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {results === [] ? (
        <p>No results matched</p>
      ) : (
        <ul>
          {results?.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchedProductsPage;

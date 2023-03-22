
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
// import { Redirect } from 'react-router-dom';


import SearchedProductsPage from "./pages/SearchedProductsPage";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);


  const fetchData = (e) => {
    e.preventDefault();
    console.log(query);
    setRedirect(true)
  }


  if (redirect) {
    return <Navigate to={`/search?query=${query}`} />;
  }


  // useEffect(() => {  //this is so i dont get an infinte loop
  //   if (redirect) {
  //     setRedirect(false)
  //   }
  // }, [redirect])

  return (
    <div className="search-bar">
      <form onSubmit={fetchData}>
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

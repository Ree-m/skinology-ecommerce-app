import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/searchProductsPage.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

import SearchedProductsPage from "./pages/SearchedProductsPage";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    navigate(`/search?query=${query}`);
    setQuery(""); //to empty the input after search
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
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

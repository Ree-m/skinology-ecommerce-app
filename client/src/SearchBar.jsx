import { useState, useEffect } from "react";
import SearchedProductsPage from "./pages/SearchedProductsPage";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([]);
    const [redirect,setRedirect]=useState(false)


    const fetchData = async (e) => {
        e.preventDefault();
        console.log(query)
        const response = await fetch(`http://localhost:9000/search/${query}`)
        const data = await response.json()
        console.log(data, "this is data")
        setResults(data)


    }
    
    return (


        <div className="search-bar">
            <form onSubmit={fetchData}>
                <input type="text" value={query} placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>

            <ul>
                {results.length > 0 && results.map(item => (
                    <div key={item._id}>
                            <SearchedProductsPage item={item} />
                    </div>
                ))}
            </ul>

        </div >
    );
}

export default SearchBar;
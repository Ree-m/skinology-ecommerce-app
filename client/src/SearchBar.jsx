
import { useState ,useEffect} from "react";
import { Navigate } from "react-router-dom";
import SearchedProductsPage from "./pages/SearchedProductsPage";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();
    console.log(query);
    const response = await fetch(`http://localhost:9000/search/${query}`);
    const data = await response.json();
    console.log(data[0],data, "this is data");
    setResults(data)
    setRedirect(true)

  };


  useEffect(() => {  //this is so i dont get an infinte loop
    if (redirect) {
      setRedirect(false)
    }
  }, [redirect])

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

      {redirect && (
        <Navigate
          to={{
            pathname: "/search",
            state: { results },
          }}
        />
      )}
{/* 
      <ul>
        {results === [] ? ("No results matched"):results && results.length > 0 &&
          results.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
            </div>
          ))}
      </ul> */}
    </div>
  );
};

export default SearchBar;

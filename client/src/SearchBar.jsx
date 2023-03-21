import { useState, useEffect } from "react";
const SearchBar = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([]);


    const fetchData = async (e) => {
        e.preventDefault();
        console.log(query)
        const response = await fetch(`http://localhost:9000/search/${query}`)
        const data = await response.json()
        console.log(data,"this is data")
        setResults(data)


    }
    
    
    return (


        <div className="search-bar">
            <form onSubmit={fetchData}>
                <input type="text"  value={query} placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>

             <ul>
                {results.length > 0 && results.map(item => (
                    <div key={item._id}>
                        <p>{item.name}</p>
                    </div>
                ))}
            </ul> 
        
        </div >
     );
}

export default SearchBar;
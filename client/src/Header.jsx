import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/header.css"
import SearchBar from "./SearchBar";



const Header = ({ cartItems, setCartItems }) => {
    const { setUserInfo, userInfo } = useContext(UserContext)


    useEffect(() => {
        fetch("http://localhost:9000/profile/", {
            credentials: "include",
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    // To logout the cookie needs to be invalid
    function logout() {
        fetch("http://localhost:9000/logout", {
            method: "POST",
            credentials: "include"
        })
        setUserInfo(null)
    }

    const isUserLoggedIn = !!userInfo;  //if userInfo.id is there,true,boolean value
    if (!isUserLoggedIn) {
        return (
            <header className="header">
                <Link to={"/"} className="logo">SkinShop</Link>
                <nav>
                    
                    <>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/signup"}>Signup</Link>
                        <SearchBar />

                    </>
                    

                </nav>
            </header >

        )
    }
    const username = userInfo?.username //if userInfo is there,give me username
    return (
        <header className="header">
            <Link to={"/"} className="logo">SkinShop</Link>
            <nav>
                {username && username == "reemreem" && (
                    <>
                        <Link to="/add">Add new product</Link>
                        <a className="logout" onClick={logout}>Logout ({username})</a>
                        <SearchBar />

                        <Link to={"/cart/" + userInfo.id}>

                            <div className="cart">
                                <span>
                                    <i className="fas fa-cart-plus"></i>
                                </span>

                                <span>{cartItems && cartItems[0].products.length}</span>
                            </div>
                        </Link>
                    </>
                )}
                {username && username !== "reemreem" && (
                    <>
                        <a className="logout" onClick={logout}>Logout({username})</a>
                        <SearchBar />

                        <Link to={"/cart/" + userInfo.id}>

                            <div className="cart">
                                <span>
                                    <i className="fas fa-cart-plus"></i>
                                </span>
                                <span>{cartItems && cartItems[0].products.length}</span>
                            </div>
                        </Link>


                    </>
                )}




            </nav>
        </header >
    );
}

export default Header;
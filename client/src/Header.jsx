import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/header.css"
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import "./styles/header.css"



const Header = ({ cartItems, setCartItems }) => {
    const { setUserInfo, userInfo } = useContext(UserContext)
    const navigate = useNavigate()


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
        navigate("/")
    }
    const username = userInfo?.username //if userInfo is there,give me username

    const isUserLoggedIn = !!userInfo;  //if userInfo.id is there,true,boolean value


    // Define classes for different user types
    const headerClass = "header"
    const adminClass = username === "reemreem" ? "admin" : ""
    const loggedInClass = isUserLoggedIn ? "logged-in" : ""
    const notLoggedInClass = !isUserLoggedIn ? "not-logged-in" : ""


    // `${headerClass} ${adminClass} ${loggedInClass} ${notLoggedInClass}`

    if (!isUserLoggedIn) {
        return (
            <header className="header">
                <Link to={"/cart/guest"} className="logo">SKINOLOGY</Link>
                {!username && (
                    <>
                        <Link to={"/login"}>login</Link>
                        <Link to={"/signup"}>signup</Link>

                        <div className="cart">
                            <span>
                                <Link to={"/login"}>
                                    <i className="fas fa-cart-plus"></i>
                                </Link>
                            </span>

                        </div>

                        <SearchBar />
                    </>
                )}
            </header>
        )
    }

    return (
        <header className="header">
            <Link to={"/"} className="logo">SKINOLOGY</Link>
            <nav>
                {/* for admin */}
                {username && username == "reemreem" && (
                    <>
                        <Link to="/add">Add new product</Link>
                        <a className="logout" onClick={logout}>Logout ({username})</a>
                        <SearchBar />


                        <div className="cart">
                            <span>
                                <Link to={"/cart/" + userInfo.id}>

                                    <i className="fas fa-cart-plus"></i>
                                </Link>

                            </span>
                            <span>{cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length === 0 ? null : cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length}</span>

                        </div>
                    </>
                )}

                {username && username !== "reemreem" && (
                    <>
                        <a className="logout" onClick={logout}>Logout({username})</a>
                        <SearchBar />

                        <Link to={"/cart/" + userInfo.id}>

                            <div className="cart">
                                <span>
                                    <FontAwesomeIcon icon={faCartPlus} />

                                </span>

                                <span>{cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length === 0 ? ("") : cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length}</span>
                            </div>
                        </Link>


                    </>
                )}



                {/* if i want the red circle to show for up,put in span */}


            </nav>
        </header >
    );

}

export default Header;



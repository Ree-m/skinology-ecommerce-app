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
    const guestCart = JSON.parse(localStorage.getItem("guestCart"))  //get the guestCart from localStorage


    // Define classes for different user types
    const headerClass = "header"
    const adminClass = username === "reemreem" ? "admin" : ""
    const loggedInClass = isUserLoggedIn ? "logged-in" : ""
    const notLoggedInClass = !isUserLoggedIn ? "not-logged-in" : ""


    // `${headerClass} ${adminClass} ${loggedInClass} ${notLoggedInClass}`

    if (!isUserLoggedIn) {
        return (
            <header className="header">
                <div className="flex">
                    <Link to={"/"} className="logo">SKINOLOGY</Link>
                </div>

                {!username && (
                    <nav className="nav-1">

                        <div className="nav-main">
                            <Link to={"/login"}>login</Link>
                            <Link to={"/signup"}>signup</Link>

                            <Link className="cart" to={"/cart/guest"}>
                                <i className="fas fa-cart-plus"></i>
                                <span>{Object.keys(guestCart).length}</span>
                            </Link>

                            <SearchBar />


                        </div>


                        <div className="nav-2 flex">
                            <Link to={"/bestSellersPage"} className="" >Best</Link>
                            <Link to={"/newProducts"} className="">New </Link>
                        </div>




                    </nav>
                )}
            </header>
        )
    }

    return (
        <header className="header">
            <div className="flex">
                <Link to={"/"} className="logo">SKINOLOGY</Link>
            </div>

            <nav>
                {/* for admin */}
                {username && username == "reemreem" && (
                    <nav>
                        <div className="nav-main">
                            <Link to="/add">Add new product</Link>
                            <a className="logout" onClick={logout}>Logout ({username})</a>


                            <Link to={"/cart/" + userInfo.id} className="cart">
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span>{cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length === 0 ? ("") : cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length}</span>
                            </Link>

                            <SearchBar />
                        </div>


                        <div className="nav-2 flex">
                            <Link to={"/bestSellersPage"} className="" >Best</Link>
                            <Link to={"/newProducts"} className="">New </Link>
                        </div>




                    </nav>
                )}

                {username && username !== "reemreem" && (
                    <nav>
                        <div className="nav-main">
                            <a className="logout" onClick={logout}>Logout({username})</a>

                            <Link to={"/cart/" + userInfo.id} className="cart">
                                <FontAwesomeIcon icon={faCartPlus} />
                                <span>{cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length === 0 ? ("") : cartItems && cartItems[0] && cartItems[0].products && cartItems[0].products.length}</span>
                            </Link>

                            <SearchBar />
                        </div>

                        <div className="nav-2 flex">
                            <Link to={"/bestSellersPage"} className="" >Best</Link>
                            <Link to={"/newProducts"} className="">New </Link>
                        </div>




                    </nav>
                )}



                {/* if i want the red circle to show for up,put in span */}


            </nav>
        </header >
    );

}

export default Header;



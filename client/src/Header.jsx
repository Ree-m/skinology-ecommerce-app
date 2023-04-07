import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./styles/header.css";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles/header.css";
import { API_URL } from "./constants";
// import Cookies from 'js-cookie';

const Header = ({
  cartItems,
  setCartItems,
  isUserLoggedIn,
  setIsUserLoggedIn,
}) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const jwtToken = Cookies.get('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (isProfileFetched) {
      setIsUserLoggedIn(!!userInfo);
    } else {
      fetch(`${API_URL}/profile`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch user profile.");
          }
        })
        .then((userInfo) => {
          setUserInfo(userInfo);
          setIsProfileFetched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isProfileFetched, setUserInfo, setIsUserLoggedIn, userInfo]);

  // To logout the cookie needs to be invalid
  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    setIsUserLoggedIn(false);
    setIsProfileFetched(false);
    navigate("/");
  }
  const username = userInfo?.username; //if userInfo is there,give me username

  // const isUserLoggedIn = !!userInfo;  //if userInfo.id is there,true,boolean value
  const guestCart = JSON.parse(localStorage.getItem("guestCart")); //get the guestCart from localStorage

  //in localStorage,the cart items are objects stored in an object.To make them an array,we use Object.values

  if (!isUserLoggedIn) {
    return (
      <header className="header">
        <div className="flex logo-container">
          <Link to={"/"} className="logo">
            SKINOLOGY
          </Link>
        </div>

        <nav className="nav-1">
          <div className="nav-main">
            <Link to={"/login"}>login</Link>
            <Link to={"/signup"}>signup</Link>

            <Link className="cart" to={"/cart/guest"}>
              <i className="fas fa-cart-plus"></i>

              {guestCart && Object.keys(guestCart).length > 0 && (
                <span>{Object.keys(guestCart).length}</span>
              )}
            </Link>

            <SearchBar />
          </div>

          <div className="nav-2 flex">
            <Link to={"/"} className="">
              Home
            </Link>
            <Link to={"/bestSellersPage"} className="">
              Best
            </Link>
            <Link to={"/newProducts"} className="">
              New{" "}
            </Link>
          </div>

          <div className="mobile">
            <div className="mobile-main">
              <button
                className="mobile-menu-icon"
                onClick={() => setIsMobile(!isMobile)}
              >
                {isMobile ? (
                  <i className="fas fa-times"></i>
                ) : (
                  <i className="fas fa-bars"></i>
                )}
              </button>

              <Link to={"/"}>
                <h1 className="logo">SKINOLOGY</h1>
              </Link>

              <Link className="cart" to={"/cart/guest"}>
                <i className="fas fa-cart-plus"></i>

                {guestCart && Object.keys(guestCart).length > 0 && (
                  <span>{Object.keys(guestCart).length}</span>
                )}
              </Link>
            </div>

            {/* Mobile Menu */}
            {isMobile && (
              <div className="mobile-menu">
                <SearchBar />
                <Link to={"/"} className="" onClick={() => setIsMobile(false)}>
                  Home
                </Link>
                <Link
                  to={"/bestSellersPage"}
                  className=""
                  onClick={() => setIsMobile(false)}
                >
                  Best
                </Link>
                <Link
                  to={"/newProducts"}
                  className=""
                  onClick={() => setIsMobile(false)}
                >
                  New
                </Link>
                <Link
                  to={"/login"}
                  className=""
                  onClick={() => setIsMobile(false)}
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className=""
                  onClick={() => setIsMobile(false)}
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  } else if (isUserLoggedIn) {
    return (
      <header className="header">
        <div className="flex logo-container">
          <Link to={"/"} className="logo">
            SKINOLOGY
          </Link>
        </div>

        <nav>
          {/* for admin */}
          {username && username == "admin" && (
            <nav>
              <div className="nav-main">
                <Link to="/add">Add new product</Link>
                <a className="logout" onClick={logout}>
                  Logout ({username})
                </a>

                <Link to={"/cart/" + userInfo.id} className="cart">
                  <FontAwesomeIcon icon={faCartPlus} />

                  {cartItems &&
                  cartItems[0] &&
                  cartItems[0].products &&
                  cartItems[0].products.length === 0
                    ? ""
                    : cartItems &&
                      cartItems[0] &&
                      cartItems[0].products && (
                        <span>{cartItems[0].products.length}</span>
                      )}
                </Link>

                <SearchBar />
              </div>

              <div className="nav-2 flex">
                <Link to={"/"} className="">
                  Home
                </Link>
                <Link to={"/bestSellersPage"} className="">
                  Best
                </Link>
                <Link to={"/newProducts"} className="">
                  New{" "}
                </Link>
              </div>

              <div className="mobile">
                <div className="mobile-main">
                  <button
                    className="mobile-menu-icon"
                    onClick={() => setIsMobile(!isMobile)}
                  >
                    {isMobile ? (
                      <i className="fas fa-times"></i>
                    ) : (
                      <i className="fas fa-bars"></i>
                    )}
                  </button>

                  <Link to={"/"}>
                    <h1 className="logo">SKINOLOGY</h1>
                  </Link>

                  <Link to={"/cart/" + userInfo.id} className="cart">
                    <FontAwesomeIcon icon={faCartPlus} />

                    {cartItems &&
                    cartItems[0] &&
                    cartItems[0].products &&
                    cartItems[0].products.length === 0
                      ? ""
                      : cartItems &&
                        cartItems[0] &&
                        cartItems[0].products && (
                          <span>{cartItems[0].products.length}</span>
                        )}
                  </Link>
                </div>

                {/* Mobile Menu */}
                {isMobile && (
                  <div className="mobile-menu">
                    <SearchBar />
                    <Link
                      to={"/"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to={"/bestSellersPage"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      Best
                    </Link>
                    <Link
                      to={"/newProducts"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      New
                    </Link>
                    <Link to={"/add"} onClick={() => setIsMobile(false)}>
                      Add new product
                    </Link>
                    <a
                      className="logout"
                      onClick={() => {
                        logout();
                        setIsMobile(false);
                      }}
                    >
                      Logout({username})
                    </a>
                  </div>
                )}
              </div>
            </nav>
          )}

          {username && username !== "admin" && (
            <nav>
              <div className="nav-main">
                <a className="logout" onClick={logout}>
                  Logout({username})
                </a>

                <Link to={"/cart/" + userInfo.id} className="cart">
                  <FontAwesomeIcon icon={faCartPlus} />

                  {cartItems &&
                  cartItems[0] &&
                  cartItems[0].products &&
                  cartItems[0].products.length === 0
                    ? ""
                    : cartItems &&
                      cartItems[0] &&
                      cartItems[0].products && (
                        <span>{cartItems[0].products.length}</span>
                      )}
                </Link>

                <SearchBar />
              </div>

              <div className="nav-2 flex">
                <Link to={"/"} className="">
                  Home
                </Link>
                <Link to={"/bestSellersPage"} className="">
                  Best
                </Link>
                <Link to={"/newProducts"} className="">
                  New{" "}
                </Link>
              </div>

              <div className="mobile">
                <div className="mobile-main">
                  <button
                    className="mobile-menu-icon"
                    onClick={() => setIsMobile(!isMobile)}
                  >
                    {isMobile ? (
                      <i className="fas fa-times"></i>
                    ) : (
                      <i className="fas fa-bars"></i>
                    )}
                  </button>

                  <Link to={"/"}>
                    <h1 className="logo">SKINOLOGY</h1>
                  </Link>

                  <Link to={"/cart/" + userInfo.id} className="cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    {cartItems &&
                    cartItems[0] &&
                    cartItems[0].products &&
                    cartItems[0].products.length === 0
                      ? ""
                      : cartItems &&
                        cartItems[0] &&
                        cartItems[0].products && (
                          <span> {cartItems[0].products.length}</span>
                        )}
                  </Link>
                </div>

                {/* Mobile Menu */}
                {isMobile && (
                  <div className="mobile-menu">
                    <SearchBar />
                    <Link
                      to={"/"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      Home
                    </Link>
                    <Link
                      to={"/bestSellersPage"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      Best
                    </Link>
                    <Link
                      to={"/newProducts"}
                      className=""
                      onClick={() => setIsMobile(false)}
                    >
                      New
                    </Link>
                    <a
                      className="logout"
                      onClick={() => {
                        logout();
                        setIsMobile(false);
                      }}
                    >
                      Logout({username})
                    </a>
                  </div>
                )}
              </div>
            </nav>
          )}
        </nav>
      </header>
    );
  }
};

export default Header;

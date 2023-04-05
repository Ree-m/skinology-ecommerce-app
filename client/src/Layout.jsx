import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = ({cartItems,setCartItems,isUserLoggedIn,setIsUserLoggedIn,userInfo,setUserInfo}) => {
    return ( 
        <main>
            <Header cartItems={cartItems} setCartItems={setCartItems} isUserLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo}s />
            <Outlet />
            <Footer />

        </main>
     );
}
 
export default Layout;
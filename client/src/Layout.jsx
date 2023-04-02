import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = ({cartItems,setCartItems}) => {
    return ( 
        <main>
            <Header cartItems={cartItems} setCartItems={setCartItems} />
            <Outlet />
            <Footer />

        </main>
     );
}
 
export default Layout;
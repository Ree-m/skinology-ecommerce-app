import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = ({cartItems,setCartItems}) => {
    return ( 
        <main>
            <Header cartItems={cartItems} setCartItems={setCartItems} />
            <Outlet />
        </main>
     );
}
 
export default Layout;
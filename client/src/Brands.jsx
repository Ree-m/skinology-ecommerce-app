import boj from "./assets/logo-images/beauty-of-joseon-logo.png"
import canmake from "./assets/logo-images/canmake-logo.webp"
import cosrx from "./assets/logo-images/COSRX_LOGO_Final-1.png"
import drceuracle from "./assets/logo-images/dr-ceuracle-logo.png"
import drjart from "./assets/logo-images/drj-logo-black.png"
import etude from "./assets/logo-images/Etude_Logo.png"
import haruharuwonder from "./assets/logo-images/haruharu-new-logo-brandpage.png"
import heimish from "./assets/logo-images/heimish-logo-brand-banner.png"
import innisfree from "./assets/logo-images/Innisfree-Logo-PNG.png"
import isntree from "./assets/logo-images/Isntree-logo-brand-banner.png"
import jumiso from "./assets/logo-images/jumiso-logo.webp"
import dhc from "./assets/logo-images/dhc-logo.png"
import kao from "./assets/logo-images/Kao-corp-logo.svg.png"
import kose from "./assets/logo-images/KOSÉ_company_logo.png"
import laneige from "./assets/logo-images/Laneige_Logo.svg.png"
import mentholatum from "./assets/logo-images/Mentholatum-logo.png"
import naturie from "./assets/logo-images/naturie-logo.png"
import purito from "./assets/logo-images/purito-logo.png"
import skii from "./assets/logo-images/Logo_SK-II.png"
import shiseido from "./assets/logo-images/Shiseido_logo.svg.png"
import tocobo from "./assets/logo-images/TOCOBO_LOGO.png"
import "./styles/brands.css"




const Brands = () => {
    return (
        <div className="brands">
            <h1 className="title-large title-padding center">Popular Brands</h1>
            <div className="brands-img">
                <img src={boj} alt="logo of beauty of joseon" />
                <img src={canmake} alt="logo of canmake" />
                <img src={cosrx} alt="logo of cosrx" />
                <img src={drceuracle} alt="logo of drceuracle" />
                <img src={drjart} alt="logo of drjart" />
                <img src={etude} alt="logo of etude" />
                <img src={haruharuwonder} alt="logo of haruharuwonder" />
                <img src={kao} alt="logo of kao " />
                <img src={kose} alt="logo of kao " />
                <img src={heimish} alt="logo of heimish" />
                <img src={innisfree} alt="logo of innisfree" />
                <img src={isntree} alt="logo of isntree" />
                <img src={jumiso} alt="logo of jumiso" />
                <img src={laneige} alt="logo of  laneige" />
                <img src={mentholatum} alt="logo of mentholatum" />
                <img src={naturie} alt="logo of naturie" />
                <img src={purito} alt="logo of purito " />
                <img src={skii} alt="logo of sk ii " />
                <img src={shiseido} alt="logo of shiseido" />
                <img src={tocobo} alt="logo of tocobo" />

            </div>
        </div>

    );
}

export default Brands;
import { Link } from "react-router-dom";
import "./styles/footer.css"
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-main">
                <div>
                    <h4 className="title-small font-600">About</h4>
                    <p>Skinology is your one stop online shop to purchase the trendiest Korean and japanese beauty products. We aim to bring a wide range and affordable selection, as well as sharing with you the latest tips and secrets in beauty.</p>
                </div>


                <div>
                    <h4 className="title-small font-600">More Info</h4>
                    <nav className="footer-nav">
                        <Link className="footer-link"><p>About Skinology</p></Link>
                        <Link className="footer-link"><p>Terms & Condidtions</p></Link>

                        <Link className="footer-link"><p>Shipping</p></Link>

                        <Link className="footer-link"><p>Privacy Policy</p></Link>

                    </nav>
                </div>
                <div className="footer-3">
                    <h4 className="title-small font-600">Contact Us</h4>
                    <Link>
                        <FaGithub className="footer-icon" />
                    </Link>
                </div>

            </div>

            <div className="footer-end">
                <span>&#169;2023 SKINOLOGY. All Rights Reserved.</span>
            </div>

        </div>
    );
}

export default Footer;
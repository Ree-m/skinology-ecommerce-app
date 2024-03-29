import { Link } from "react-router-dom";
import "./styles/footer.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const onIconClick = () => {
    window.open("https://github.com/Ree-m", "_blank");
  };
  return (
    <div className="footer">
      <div className="footer-main">
        <div>
          <h4 className=" title-small font-600">About</h4>
          <p className="paragraph">
            Skinology is your one stop online shop to purchase the trendiest
            skincare products. We aim to bring a wide range and affordable
            selection, as well as sharing with you the latest tips and secrets
            in skincare.
          </p>
        </div>

        <div>
          <h4 className="title-small font-600">More Info</h4>
          <div className="footer-nav">
            <Link to={"/aboutPage"} className="footer-link">
              <p>About Skinology</p>
            </Link>
      
          </div>
        </div>
        <div className="footer-3">
          <h4 className="title-small font-600">Contact Us</h4>
          <Link>
            <FaGithub onClick={onIconClick} className="footer-icon" />
          </Link>
        </div>
      </div>

      <div className="footer-end">
        <span>&#169;2023 SKINOLOGY. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default Footer;

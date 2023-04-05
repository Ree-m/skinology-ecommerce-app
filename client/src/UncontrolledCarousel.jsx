import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import image1 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/carousel-image-blue.webp";
import image2 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/boj-carousel_auto_x2_toned_light_ai.jpg";
import image3 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/carousel-img-many-products.png";

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={image3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;

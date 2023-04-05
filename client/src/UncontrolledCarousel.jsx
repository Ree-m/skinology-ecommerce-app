import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import image1 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/carousel-image-blue.webp"
import image2 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/boj-carousel.webp"
import image3 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/carousel-img-many-products.png"
import image4 from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/carousel-image4.jpg"
function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />
      </Carousel.Item>

      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image4}
          alt="Fourth slide"
        />
      </Carousel.Item>

     
    </Carousel>
  );
}

export default UncontrolledExample;
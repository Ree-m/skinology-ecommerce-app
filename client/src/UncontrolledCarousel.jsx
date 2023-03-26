import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import black from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/black.jpeg"
import pink from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/pink.png"

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={black}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pink}
          alt="Second slide"
        />

       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={black}
          alt="Third slide"
        />

        
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
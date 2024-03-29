import { useState, useEffect } from "react";
import Product from "../Product";
import MyCarousel from "../Carousel";
import UncontrolledCarousel from "../UncontrolledCarousel";
import NewProducts from "../NewProducts";
import Brands from "../Brands";
import { API_URL } from "../constants";
// import Loading from "../loading";

const HomePage = ({ products, setProducts }) => {
  const [carouselItems, setCarouselItems] = useState([]);
  // const [loading,setLoading]=useState(true)

  useEffect(() => {
    fetch(`${API_URL}/allCarouselProducts`)
      .then((res) => res.json())
      .then((products) => setCarouselItems(products));
      // setLoading(false)

  }, []);

  // if(loading){
  //   return <Loading/>
  // }
  return (
    <div className="home-page">
      <UncontrolledCarousel />
      <div className="padded">
        <MyCarousel
          carouselItems={carouselItems}
          setCarouselItems={setCarouselItems}
        />
        <NewProducts />

        <Brands />
      </div>
    </div>
  );
};

export default HomePage;

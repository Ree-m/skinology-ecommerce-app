import { useState, useEffect } from "react"
import Product from "../Product"
import MyCarousel from "../Carousel";
import UncontrolledCarousel from "../UncontrolledCarousel";


const HomePage = ({products,setProducts}) => {
    const [carouselItems,setCarouselItems]=useState([])

useEffect(()=>{
    fetch("http://localhost:9000/allProducts")
    .then(res=>res.json())
    .then(products=>
        setCarouselItems(products)
        )
        console.log("carouselItems",products)

},[])


    return (
        <div className="home-page">
            <UncontrolledCarousel />
            <MyCarousel carouselItems={carouselItems} setCarouselItems={setCarouselItems} />

            {products && products.length > 0 && products.map(product => (
                <div key={product._id}>
                    <Product product={product} {...product} />
                </div>
            ))
            }
        </div >


    );
}

export default HomePage;
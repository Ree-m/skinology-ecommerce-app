import { useState, useEffect } from "react"
import Product from "../Product"
import MyCarousel from "../Carousel";
import UncontrolledCarousel from "../UncontrolledCarousel";
import NewProducts from "../NewProducts";
import Brands from "../Brands";

const HomePage = ({ products, setProducts }) => {
    const [carouselItems, setCarouselItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:9000/allProducts")
            .then(res => res.json())
            .then(products =>
                setCarouselItems(products)
            )
        console.log("carouselItems", products)

    }, [])


    return (
        <div className="home-page">
            <UncontrolledCarousel />
            <MyCarousel carouselItems={carouselItems} setCarouselItems={setCarouselItems} />
            <NewProducts />
            {/* <h1>All Products</h1>
            {products && products.length > 0 && products.map(product => (
                <div key={product._id}>
                    <Product product={product} {...product} />
                </div>
            ))
            } */}
            <Brands />

        </div >


    );
}

export default HomePage;
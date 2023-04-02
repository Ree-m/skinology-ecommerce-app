import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Product from "./Product";


const MyCarousel = ({ carouselItems, setCarouselItems }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div>
            <Link to={"/bestSellersPage"}>
                <h1 className="title-large title-padding center">Best</h1>
            </Link>
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                // showDots={true}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlaySpeed={1000}
                // keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">


                {carouselItems && carouselItems.length > 0 && carouselItems.map(product => {
                    console.log("this is carouselitems", product);
                    return (
                        <div key={product._id}>
                            <Product product={product} {...product} />

                        </div>
                    );
                })}

            </Carousel>
            <div className="btn-container">
                <Link to={"/bestSellersPage"}>
                    <button className="btn">View all products</button>
                </Link>
            </div>

        </div>
    );
};

export default MyCarousel;

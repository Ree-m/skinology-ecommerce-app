// import React from 'react';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';

// const handleDragStart = (e) => e.preventDefault();

// //Responsiveness 
// const responsive = {
//     0: { items: 1 },
//     568: { items: 4 },
//     1024: { items: 6 },
// };



// const items = [
//     <img src={image} onDragStart={handleDragStart} role="presentation" />,
//     <img src={pink} onDragStart={handleDragStart} role="presentation" />,
//     <img src={image} onDragStart={handleDragStart} role="presentation" />,
//     <img src={pink} onDragStart={handleDragStart} role="presentation" />,
//     <img src={image} onDragStart={handleDragStart} role="presentation" />,
//     <img src={pink} onDragStart={handleDragStart} role="presentation" />,

// ];

// const Carousel = ({ carouselItems, setCarouselItems }) => {
//     return (
//         <>
//             <h1>Best</h1>
//             <AliceCarousel
//                 mouseTracking
//                 // items={carouselItems && carouselItems.length > 0 && carouselItems.map(item => (
//                 //     <img key={item._id}
//                 //         src={`http://localhost:9000/${item.image}`}
//                 //         onDragStart={handleDragStart}
//                 //         role="presentation" />

//                 // ))
//                 // }
//                 items={carouselItems && carouselItems.length > 0 && carouselItems.map(item => {
//                     console.log("this is carouselitems",item);
//                     return (
//                         <img key={item._id}
//                             src={`http://localhost:9000/${item.image}`}
//                             onDragStart={handleDragStart}
//                             role="presentation" />
//                     );
//                 })}
//                 // items={items}
//                 responsive={responsive}
//                 controlsStrategy="alternate"
//                 infinite={true} />



//         </>

//     );
// }

// export default Carousel;

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/black.jpeg"
import pink from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/pink.png"
import { Link } from "react-router-dom";


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
            <h1>Best</h1>

            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlaySpeed={1000}
                // keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px">


                {carouselItems && carouselItems.length > 0 && carouselItems.map(item => {
                    console.log("this is carouselitems", item);
                    return (
                        <div>
                            <Link to={`/product/${item._id}`}>
                                <img key={item._id}
                                    src={`http://localhost:9000/${item.image}`}
                                    alt={`Image of ${item.name}`} />

                            </Link>
                            <Link to={`/product/item._id`}>
                                <p>{item.brand}-{item.name}</p>
                            </Link>

                            <spn>{item.price}</spn>

                        </div>
                    );
                })}

            </Carousel>
        </div>
    );
};

export default MyCarousel;

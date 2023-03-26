import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import image from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/black.jpeg"
import pink from "/home/remi/ecommerce-cosmetics/client/src/assets/carouselImages/pink.png"
const handleDragStart = (e) => e.preventDefault();

//Responsiveness 
const responsive = {
    0: { items: 1 },
    568: { items: 4 },
    1024: { items: 6 },
};



const items = [
    <img src={image} onDragStart={handleDragStart} role="presentation" />,
    <img src={pink} onDragStart={handleDragStart} role="presentation" />,
    <img src={image} onDragStart={handleDragStart} role="presentation" />,
    <img src={pink} onDragStart={handleDragStart} role="presentation" />,
    <img src={image} onDragStart={handleDragStart} role="presentation" />,
    <img src={pink} onDragStart={handleDragStart} role="presentation" />,

];

const Carousel = ({ carouselItems, setCarouselItems }) => {
    return (
        <>
            <h1>Best</h1>
            <AliceCarousel
                mouseTracking
                // items={carouselItems && carouselItems.length > 0 && carouselItems.map(item => (
                //     <img key={item._id}
                //         src={`http://localhost:9000/${item.image}`}
                //         onDragStart={handleDragStart}
                //         role="presentation" />

                // ))
                // }
                items={items}
                responsive={responsive}
                controlsStrategy="alternate"
                infinite={true} />



        </>

    );
}

export default Carousel;



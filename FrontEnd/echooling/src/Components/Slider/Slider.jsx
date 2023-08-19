import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Styles  from './Slider.module.css';
const SliderCom = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <h2>Slider Example</h2>
            <Slider {...settings}>
                <div>
                    <img src="image1.jpg" alt="Slide 1" />
                </div>
                <div>
                    <img src="image2.jpg" alt="Slide 2" />
                </div>
                {/* Add more slides */}
            </Slider>
        </div>
    );
}

export default SliderCom;

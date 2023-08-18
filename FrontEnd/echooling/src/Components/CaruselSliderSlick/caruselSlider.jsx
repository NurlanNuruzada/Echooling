import React from "react";
import Slider from "react-slick";
import Style from "../CaruselSliderSlick/caruselSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../Images/Student1.png";
import image2 from "../../Images/Student2.png";
import image3 from "../../Images/Student3.png";
import image4 from "../../Images/Student4.png";
import image5 from "../../Images/Student5.png";
import image6 from "../../Images/Student6.png";

const SynchronizedSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    pauseOnHover: true,
    draggable: true,
    slidesToShow: 4, // Default number of slides

    responsive: [
      {
        breakpoint: 1980, // Large screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1200, // Large screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900, // Large screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div  className={Style.SliderConatiner} >
      <p className={Style.about}>Our graduates</p>
      <Slider {...settings} className={Style.CustomSlider}>
        <div>
          <img className={Style.customSlide} src={image1} alt="Slide 1" />
        </div>
        <div>
          <img className={Style.customSlide} src={image2} alt="Slide 2" />
        </div>
        <div>
          <img className={Style.customSlide} src={image3} alt="Slide 3" />
        </div>
        <div>
          <img className={Style.customSlide} src={image4} alt="Slide 4" />
        </div>
        <div>
          <img className={Style.customSlide} src={image5} alt="Slide 5" />
        </div>
        <div>
          <img className={Style.customSlide} src={image6} alt="Slide 6" />
        </div>
        <div>
          <img className={Style.customSlide} src={image4} alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
};

export default SynchronizedSlider;

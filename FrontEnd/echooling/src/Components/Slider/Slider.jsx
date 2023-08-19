import React from "react";
import Slider from "react-slick";
import Styles from "./Slider.module.css"; // Your custom styles
import "slick-carousel/slick/slick.css"; // Main slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Slick theme CSS
import image1 from "../../Images/Student1.png";
import image2 from "../../Images/Student2.png";
import image3 from "../../Images/Student3.png";
import { Button } from "@chakra-ui/react";
import { faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SliderCom = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false, // Disable default arrows
    pauseOnHover: true,
    draggable: true,
    slidesToShow: 1,
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className={Styles.SliderContainer}>
      <Slider ref={sliderRef} {...settings} className={Styles.CustomSlider}>
      <div>
          <img className={Styles.customSlide} src={image1} alt="Slide 1" />
        </div>
        <div>
          <img className={Styles.customSlide} src={image2} alt="Slide 2" />
        </div>
        <div>
          <img className={Styles.customSlide} src={image3} alt="Slide 3" />
        </div>
      </Slider>
      <div className={Styles.CustomButtonContainer}>
        <Button className={Styles.CustomButton} onClick={handlePrevClick}>
        <FontAwesomeIcon icon={faChevronLeft} style={{color: "#1a212e",}} />
        </Button>
        <Button className={Styles.CustomButton} onClick={handleNextClick}>
        <FontAwesomeIcon icon={faChevronRight} style={{color: "#1a212e",}} />
        </Button>
      </div>
    </div>
  );
};

export default SliderCom;


 
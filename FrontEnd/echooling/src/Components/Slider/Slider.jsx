import React from "react";
import Slider from "react-slick";
import Styles from "./Slider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image2 from "../../Images/Slider2.jpeg";
import image3 from "../../Images/Slider3.jpeg";
import image1 from "../../Images/Slider1.jpeg";
import { Button } from "@chakra-ui/react";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { getSliders } from "../../Services/SliderService";
import { useQuery } from "react-query";

const SliderCom = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sliders"],
    queryFn: getSliders,
    staleTime: 0,

});
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: true,
    arrows: false,
    pauseOnHover: true,
    draggable: true,
    slidesToShow: 1,
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };
  const navigate = useNavigate();
  const handleGoAbout = () => {
    navigate("/about");
  };
  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };
  return (
    <div className={Styles.SliderContainer}>
      <Slider ref={sliderRef} {...settings} className={Styles.CustomSlider}>
        {data?.data.map((slider, index) => (
          <div key={index} className={Styles.slideContainer}>
            <img  className={Styles.customSlide}  alt={`slider - ${index}`} src={`/Uploads/Sliders/${slider.imageRoutue}`}/>
            <div className={`${Styles.slideText} ${Styles.fadeInAnimation}`}>
              <h2>Slide {index + 1}</h2>
              <div
            
                className={Styles.TextContainer}
              >
                <h1
               
                  className={Styles.MainTitle}
                >
                  {slider.title}{" "}
                </h1>
                <h1
              
                  className={Styles.SeccondTitle}
                >
                  {slider.seccondTile}{" "}
                </h1>
                <p
                  
                  className={Styles.Desctiption}
                >
                  {slider.description}{" "}
                </p>
                <Button
                  onClick={handleGoAbout}
                  className={Styles.Button}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className={Styles.CustomButtonContainer}>
        <Button className={Styles.CustomButton} onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ color: "#1a212e" }} />
        </Button>
        <Button className={Styles.CustomButton} onClick={handleNextClick}>
          <FontAwesomeIcon icon={faChevronRight} style={{ color: "#1a212e" }} />
        </Button>
      </div>
    </div>
  );
};

export default SliderCom;

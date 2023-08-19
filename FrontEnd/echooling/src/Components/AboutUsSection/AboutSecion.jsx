import React from "react";
import Styles from "./AboutUsSection.module.css";
import BackgroundImage1 from "../../Images/shape_02.png";
import BackgroundImage2 from "../../Images/shape_1.png";
import BackgroundImage3 from "../../Images/shape_03.png";
import BackgroundImage4 from "../../Images/shape_04.png";
import BackgoundVideo from "../../Videos/BACKGROUNDVIDEO.mov";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";
const AboutSecion = () => {
  const navigate = useNavigate();
  const handleGoAbout = () => {
    navigate("/about");
  };
  return (
    <div className={Styles.MainContainer1}>
      <div className={Styles.MainContainer}>
        <div className={Styles.LeftSideContainer}>
          <div className={Styles.BackgroundVideoContainer}>
            <video className={Styles.BackgroundVideo} autoPlay muted loop>
              <source src={BackgoundVideo} type="video/mp4" />
            </video>
          </div>
          <img
            className={Styles.bakcgoundItem1}
            src={BackgroundImage1}
            alt=""
          />
          <img
            className={Styles.bakcgoundItem2}
            src={BackgroundImage4}
            alt=""
          />
          <img
            className={Styles.bakcgoundItem3}
            src={BackgroundImage2}
            alt=""
          />
          <img
            className={Styles.bakcgoundItem4}
            src={BackgroundImage3}
            alt=""
          />
        </div>
        <div className={Styles.rightSideContainer}>
          <h1 className={Styles.title1}>One of The Largest,</h1>
          <h1 className={Styles.title2}>Most Online Course</h1>
          <p className={Styles.title3}>
            Why I say old chap that is spiffing in my flat such a fibber mufty
            mush, porkies barney pukka only a quid a what a load of rubbish good
            time.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div>
                <div className={Styles.Check}>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <span>Access more then 100K online courses</span>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <div className={Styles.Check}>
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <span>Upskill your organization.</span>
            </div>
          </div>
          <Button onClick={handleGoAbout} color="#3270fc" mt={10}>
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutSecion;

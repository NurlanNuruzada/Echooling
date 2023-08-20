import React, { useEffect, useState } from "react";
import Styles from "../TransparantEffect/EffectImage.module.css"; // Adjust the path

import { Link, useNavigate } from "react-router-dom";
const EffectImage = ({ to ,pageName,imageLink,showCenter}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(to);
  };
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={Styles.ParallaxContainer}>
      <div
        className={Styles.TransparentImage}
        style={{
          backgroundImage: `url(${imageLink})`,
          backgroundPositionY: `${-scrollOffset * 0.5}px`,
        }}
      ></div>
      <div className={Styles.UpText}>
        <a  className={Styles.Text1} onClick={handleNavigate}>Home</a>
        <span>-  {pageName}</span>
        {showCenter ? <h1>{pageName}</h1> : null}
      </div>
    </div>
  );
};

export default EffectImage;

import React from "react";
import EffectImage from "../Components/TransparantEffect/EffectImage";
import image from "../Images/ContactUs3.jpeg";
import Maps from "../Components/Map/Map";
const Contact = () => {
    const Image = image
  return(
    <>
      <Maps />
      <EffectImage showCenter={false} imageLink={Image} pageName="Contact" to="/" />
    </>
  ) 
};

export default Contact;

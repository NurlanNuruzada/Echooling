import React from "react";
import EffectImage from "../Components/TransparantEffect/EffectImage";
import image from "../Images/ContactUs2.jpeg";
import Maper from "../Components/Map/Map";

const Contact = () => {
  const Image = image;
  return (
    <>
      {/* <EffectImage
        showCenter={false}
        imageLink={Image}
        pageName="Contact"
        to="/"
      /> */}
      <div style={{ width:"100%",height:"200px"}}>
        <Maper />
      </div>
    </>
  );
};

export default Contact;

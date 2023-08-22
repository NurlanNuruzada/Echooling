import React from "react";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import image from "../../Images/ContactUs3.jpeg";
import News from "../../Components/News/News";
import ContactUsForm from "../../Components/ContactUs/ContactUsForm";
const Contact = () => {
  const Image = image;
  return (
    <>
      <EffectImage imageLink={Image} pageName="Contact" to="/" />
      <ContactUsForm
        title={"Questions?"}
        secondTitle={"Feel free to contact uo."}
        address={" 1800 Abbot Kinney Blvd. Unit D & E Venice "}
        HourOfOperation={
          "Monday - Friday: 09:00 - 20:00Sunday & Junday: 10:30 - 22:00"
        }
        Mobile={"Mobile: (+88) - 1990 - 6886"}
        Mail={"Mail: contact@echooling.com"}
      />
      <News />
    </>
  );
};

export default Contact;

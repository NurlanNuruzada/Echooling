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
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9356.910404735041!2d-118.45815454596611!3d33.98823375432028!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba95d4200dd1%3A0x2fd876de791d2bc5!2sPonut%20Organics%20Pvt%20Ltd!5e0!3m2!1sen!2saz!4v1692740168328!5m2!1sen!2saz"
        width="100%"
        height="550" 
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <News></News>
    </>
  );
};

export default Contact;

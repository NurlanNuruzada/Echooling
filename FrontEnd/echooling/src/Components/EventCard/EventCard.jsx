import React from "react";
import Styles from "./EventCard.module.css";
import image1 from "../../Images/event 1.png";
import image2 from "../../Images/event2.png";
import image3 from "../../Images/event3.png";
const EventCard = () => {
    const date ="2023-12-4 12:00:00.0000000"
  return (
    <div className={Styles.EventCard}>
      <div className={Styles.Up}>
        <img src={image1} alt="" />
      </div>
      <div className={Styles.Down}>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default EventCard;

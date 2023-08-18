import React from "react";
import Styles from "./CourseCard.module.css";
import Stars from "../Starts/Stars";
import ReactStars from "react-rating-stars-component";
const CourseCard = ({ image, title, price,CreatorImage }) => {
  const raiting = 3.5;
  const RaitedPersonNumber = 1200;
  function truncateTitle(title) {
    const maxLength = 55;
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  }

  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.ImageContainer}>
        <img className={Styles.Image} src={image} alt="" />
        <div className={Styles.Category}>Category</div>
      </div>
      <div className={Styles.down}>
        <div className={Styles.title}>
          <p className={Styles.text}>{truncateTitle(title)}</p>
          <div className={Styles.CreateContainer}>
            <img className={Styles.image} src={CreatorImage} alt="user" />
            <p className={Styles.CreatedBy}>Someone</p>
          </div>
        </div>
        <div>
          <Stars
            RaitingPerson={RaitedPersonNumber}
            initialRating={raiting}
            isEditable={false}
          />
        </div>
        <div className={Styles.CoursePrice}>{price}</div>
      </div>
    </div>
  );
};

export default CourseCard;

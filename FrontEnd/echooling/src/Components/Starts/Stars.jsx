import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"; // Import the solid icons
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"; // Import the empty star icon
import Styles from "./stars.module.css";

library.add(faStar, faStarHalfAlt, farStar); // Add the icons to the library

function Stars({ isEditable, initialRating, RaitingPerson }) {
  const [rating, setRating] = useState(initialRating || 0);

  const ratingExample = {
    size: 10,
    count: 5,
    color: "lightgray",
    activeColor: "orange",
    value: rating, // Use the state rating value
    a11y: true,
    isHalf: true,
    emptyIcon: <FontAwesomeIcon icon={faStar} />,
    halfIcon: <FontAwesomeIcon icon={["fas", "star-half-alt"]} color="lightgray" />,
    filledIcon: <FontAwesomeIcon icon={["fas", "star"]} />,
  };
  
  const formatRating = (value) => {
    if (value >= 1000) {
      return (value / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 }) + "K";
    }
    return value;
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update the state with the new rating
  };

  if (isEditable) {
    return (
      <div>
        <ReactStars {...ratingExample} onChange={handleRatingChange} />
      </div>
    );
  } else {
    return (
      <div className={Styles.rating}>
        <p className={Styles.Rate}>{initialRating}</p>
        <ReactStars {...ratingExample} edit={false} />
        <p className={Styles.RaitingByNum}>({formatRating(RaitingPerson)})</p>
      </div>
    );
  }
}

export default Stars;

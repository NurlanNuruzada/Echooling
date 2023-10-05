import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"; // Import the solid icons
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons"; // Import the empty star icon
import Styles from "./stars.module.css";
import { Flex } from "@chakra-ui/react";

library.add(faStar, faStarHalfAlt, farStar); // Add the icons to the library

function Stars({ handleRate, size, isEditable, initialRating, RaitingPerson }) {
  const [rating, setRating] = useState(initialRating || 0);
  const ratingExample = {
    size: size,
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
    handleRate(newRating); // Pass the new rating to the handleRate function
  };
  if (isEditable) {
    return (
      <div>
        <ReactStars {...ratingExample} onChange={(e) => handleRatingChange(e)} />
      </div>
    );
  } else {
    return (
      <div className={Styles.rating}>
        <Flex alignItems={"center"}>
          <p className={Styles.Rate}>({initialRating})</p>
          <div>
            <ReactStars {...ratingExample} edit={false} />
          </div>
          <p className={Styles.RaitingByNum}></p>
        </Flex>
      </div>
    );
  }
}

export default Stars;

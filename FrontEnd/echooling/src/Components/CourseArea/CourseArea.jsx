import React, { useState } from "react";
import Styles from "./CourseAre.module.css";
import Button from "../Button/Button";
import Courses from "../Courses/Courses";
const CourseArea = () => {
  const categoryies = [
    "See All",
    "Trending",
    "Most Recomented",
    "Most Popular",
  ];
  const defaultClickedIndex = categoryies.findIndex(
    (category) => category === "Most Popular"
  );

  const [clickedIndex, setClickedIndex] = useState(defaultClickedIndex);

  const handleButtonClick = (index) => {
    setClickedIndex(index);
  };
  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.MainHeaderCurse}>
        <div className={Styles.GridItem3}>
          <h1 className={Styles.title}>Most Popular Courses</h1>
          <h1 className={Styles.SecondTitle}>What you will learn next </h1>
        </div>
        <div className={Styles.buttons}>
          {categoryies.map((category, index) => (
            <Button
              key={index}
              category={category}
              isClicked={index === clickedIndex}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </div>
      <Courses />
    </div>
  );
};

export default CourseArea;

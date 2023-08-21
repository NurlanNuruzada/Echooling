import React, { useState } from "react";
import Styles from "./CourseAre.module.css";
import CourseCard from "../CourseCard/CourseCard";
import { Grid, GridItem } from "@chakra-ui/react";
import image1 from "../../Images/Course1.jpg";
import image2 from "../../Images/Course2.jpg";
import image3 from "../../Images/Course3.jpg";
import image4 from "../../Images/Course4.jpg";
import image5 from "../../Images/Course5.jpg";
import image6 from "../../Images/Course6.jpg";
import image7 from "../../Images/Teacher1.png";
import image8 from "../../Images/Teacher2.png";
import image9 from "../../Images/teacher3.png";
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

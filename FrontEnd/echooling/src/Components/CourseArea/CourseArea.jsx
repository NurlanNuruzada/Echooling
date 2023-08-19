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
const CourseArea = () => {
  const courseTitle =
    "C# .NET Core 7 with MS SQL Complete Beginner to Master 2023";
  const Price = "$60.99";
  const categoryies = [
    "See All",
    "Trending",
    "Most Recomented",
    "Most Popular",
  ];
  const defaultClickedIndex = categoryies.findIndex(category => category === "Most Popular");

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
            <Button   key={index}
            category={category}
            isClicked={index === clickedIndex}
            onClick={() => handleButtonClick(index)} />
          ))}
        </div>
      </div>
      <div className={Styles.Conatiner}>
        <Grid
          className={Styles.GridBox}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 0fr)",
            md: "repeat(2, 0fr)",
            lg: "repeat(3, 0fr)",
            xl: "repeat(5, 0fr)",
          }}
        >
          <GridItem>
            <CourseCard
              CreatorImage={image7}
              price={Price}
              title={courseTitle}
              image={image1}
            />
          </GridItem>
       
          <GridItem>
            <CourseCard
              CreatorImage={image9}
              price={Price}
              title={courseTitle}
              image={image2}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image7}
              price={Price}
              title={courseTitle}
              image={image4}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image8}
              price={Price}
              title={courseTitle}
              image={image5}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image9}
              price={Price}
              title={courseTitle}
              image={image6}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image7}
              price={Price}
              title={courseTitle}
              image={image2}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image8}
              price={Price}
              title={courseTitle}
              image={image4}
            />
          </GridItem>
          <GridItem>
            <CourseCard
              CreatorImage={image7}
              price={Price}
              title={courseTitle}
              image={image5}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default CourseArea;

import React, { useState } from "react";
import Styles from '../Courses/courses.module.css'
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
const Courses = ({Course}) => {
    const courseTitle =
    "C# .NET Core 7 with MS SQL Complete Beginner to Master 2023";
  const Price = "$60.99";
  return (
    <div className={Styles.Conatiner}>
      <Grid
        className={Styles.GridBox}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 0fr)",
          md: "repeat(2, 0fr)",
          lg: "repeat(2, 0fr)",
          xl: "repeat(3, 0fr)",
        }}
        gap={5}
      >
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image7}
            price={Price}
            title={courseTitle}
            image={image1}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image9}
            price={Price}
            title={courseTitle}
            image={image2}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image7}
            price={Price}
            title={courseTitle}
            image={image4}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image8}
            price={Price}
            title={courseTitle}
            image={image5}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image9}
            price={Price}
            title={courseTitle}
            image={image6}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image7}
            price={Price}
            title={courseTitle}
            image={image2}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image8}
            price={Price}
            title={courseTitle}
            image={image4}
          />
        </GridItem>
        <GridItem data-aos="zoom-in-down" data-aos-duration="800">
          <CourseCard
            CreatorImage={image7}
            price={Price}
            title={courseTitle}
            image={image5}
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Courses;

import React, { useEffect, useState } from "react";
import Styles from "./CourseAre.module.css";
import Button from "../Button/Button";
import Courses from "../Courses/Courses";
import { Flex, Grid, GridItem, styled } from "@chakra-ui/react";
import image1 from "../../Images/Course1.jpg";
import { Link } from "react-router-dom";
import { getAllCourseByExpression, getallCourses } from "../../Services/CourseService";
import { useMutation, useQuery } from "react-query";
import CourseCard from "../CourseCard/CourseCard";

const CourseArea = () => {
  const categoryies = [
    "Most Popular",
  ];
  const defaultClickedIndex = categoryies.findIndex(
    (category) => category == "Most Popular"
  );
  const [clickedIndex, setClickedIndex] = useState(defaultClickedIndex);

  const handleButtonClick = (index) => {
    setClickedIndex(index);
  };
  const [Course, SetCourse] = useState([]);
  const { mutate } = useMutation(
    (Data) => getAllCourseByExpression("","",4),
    {
        onSuccess: (resp) => {
          SetCourse(resp?.data || []); 
        },
        onError: (error) => {
            console.error(error);
        },
    }
);
useEffect(()=>{
  mutate()
},[])
  return (
    <div  className={Styles.MainContainer}>
      <div className={Styles.MainHeaderCurse}>
        <div className={Styles.GridItem3}>
          <h1 className={Styles.title}>Most Popular Courses</h1>
          <h1 className={Styles.SecondTitle}>What you will learn next </h1>
        </div>
        <div  className={Styles.buttons}>
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
      <Flex justifyContent={'center'}>
      <Grid
        className={Styles.GridBox}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm:  "repeat(1, 1fr)" ,
          md:  "repeat(2, 1fr)",
          lg:  "repeat(3, 1fr)",
          xl:  "repeat(3, 1fr)",
        }}
        gap={5}
      >
        {Course.length>0 ? Course.map((Data, index) => (
          <Link  to={`/CourseDetails/${Data.guId}`} key={index}>
            <GridItem  data-aos="zoom-in-down" data-aos-duration="800">
              <CourseCard 
                CreatorImage={Data?.image || ""} // Use optional chaining to handle undefined data
                price={Data.price+"$"}
                title={Data?.title || ""} // Use optional chaining to handle undefined data
                image={Data?.imageRoutue}
                category = {Data?.subject}
                Creatorname = {Data.instructor}
                CourseRate = {Data.rate}
              />
            </GridItem>
          </Link>
        )) : <Flex style={{columnSpan:"4"}} ><h1  className={Styles.notFound}>Course not Found!</h1></Flex>}
      </Grid>
      </Flex>
    </div>
  );
};

export default CourseArea;

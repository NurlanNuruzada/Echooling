import React, { useEffect, useState } from "react";
import Styles from "../Courses/courses.module.css";
import CourseCard from "../CourseCard/CourseCard";
import { Flex, Grid, GridItem, styled } from "@chakra-ui/react";
import image1 from "../../Images/Course1.jpg";
import { Link } from "react-router-dom";
import { getAllCourseByExpression, getallCourses } from "../../Services/CourseService";
import { useMutation, useQuery } from "react-query";
const Courses = ({filterData}) => {
  const courseTitle =
    "C# .NET Core 7 with MS SQL Complete Beginner to Master 2023";
  const Price = "$60.99";
  const [Course, SetCourse] = useState([]);
  const { mutate } = useMutation(
    (Data) => getAllCourseByExpression(Data.title,Data.category,Data.rating),
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
  mutate(filterData)
},[filterData])
  return (
<div className={Course.length <= 0 ? `${Styles.Conatiner2} ` : Styles.Conatiner}>
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
          <Link to={`/CourseDetails/${Data.guId}`} key={index}>
            <GridItem data-aos="zoom-in-down" data-aos-duration="800">
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
    </div>
  );
};

export default Courses;

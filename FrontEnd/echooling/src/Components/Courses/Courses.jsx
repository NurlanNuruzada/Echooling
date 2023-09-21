import React, { useState } from "react";
import Styles from "../Courses/courses.module.css";
import CourseCard from "../CourseCard/CourseCard";
import { Grid, GridItem } from "@chakra-ui/react";
import image1 from "../../Images/Course1.jpg";
import { Link } from "react-router-dom";
import { getallCourses } from "../../Services/CourseService";
import { useQuery } from "react-query";
const Courses = () => {
  const courseTitle =
    "C# .NET Core 7 with MS SQL Complete Beginner to Master 2023";
  const Price = "$60.99";
  const [Course, SetCourse] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Courses"],
    queryFn: getallCourses,
    staleTime: 0,
    onSuccess: (data) => {
      SetCourse(data?.data || []); // Use optional chaining to handle undefined data
    },
  });
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
        {Course.map((Data, index) => (
          <Link to={`/CourseDetails/${Data.guId}`} key={index}>
            <GridItem data-aos="zoom-in-down" data-aos-duration="800">
              <CourseCard
                CreatorImage={Data?.image || ""} // Use optional chaining to handle undefined data
                price={Data.price+"$"}
                title={Data?.title || ""} // Use optional chaining to handle undefined data
                image={Data?.imageRoutue}
                category = {Data?.subject}
                Creatorname = {Data.instructor}
              />
            </GridItem>
          </Link>
        ))}
      </Grid>
    </div>
  );
};

export default Courses;

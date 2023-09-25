// Parent Course component
import React, { useState } from "react";
import Courses from "../../Components/Courses/Courses";
import Category from "../../Components/CategorySellection/Category";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import News from '../../Components/News/News'
import Styles from '../Course/course.module.css'
import image from '../../Images/Courses.jpeg'
import EffectImage from "../../Components/TransparantEffect/EffectImage";

const Course = () => {
  const [filterData, setFilterData] = useState({
    title: "",
    category: "",
    rating: ""
  });

  const handleFilterDataChange = (newData) => {
    setFilterData({ ...newData });
  };

  return (
    <div>
      <EffectImage
        showCenter={true}
        imageLink={image}
        pageName="Courses"
        to="/"
      />
      <Flex justifyContent={'center'} flexWrap={'wrap'} gap={4}>
        <Category  SetFilterData={handleFilterDataChange} />
        <Courses filterData={filterData} />
      </Flex>
      <News />
    </div>
  );
};

export default Course;

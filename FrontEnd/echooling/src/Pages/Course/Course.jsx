import React from "react";
import Courses from "../../Components/Courses/Courses";
import Category from "../../Components/CategorySellection/Category";
import { Grid, GridItem } from "@chakra-ui/react";
import News from '../../Components/News/News'
import Styles from '../Course/course.module.css'
import image from '../../Images/Courses.jpeg'
import EffectImage from "../../Components/TransparantEffect/EffectImage";
const Course = () => {
  return (
    <div>
     <EffectImage
        showCenter={true}
        imageLink={image}
        pageName="Courses"
        to="/"
      />
      <Grid
         className={Styles.GridBox}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 0fr)",
          lg: "repeat(2, 0fr)",
          xl: "repeat(2, 0fr)",
        }}
      >
        <GridItem className={Styles.GridItems}>
          <Category />
        </GridItem>
        <GridItem className={Styles.GridItems}>
          <Courses />
        </GridItem>
      </Grid>
      <News/>

    </div>
  );
};

export default Course;

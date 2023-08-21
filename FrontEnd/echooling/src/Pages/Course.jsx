import React from "react";
import Courses from "../Components/Courses/Courses";
import Category from "../Components/CategorySellection/Category";
import { Grid, GridItem } from "@chakra-ui/react";
import SearchInputCom from "../Components/SeacthInput/SearchInput2";
import News from '../../src/Components/News/News'
import Styles from '../Styles/course.module.css'
import image from '../../src/Images/Courses.jpeg'
import EffectImage from "../Components/TransparantEffect/EffectImage";
const Course = () => {
  return (
    <div>
   
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

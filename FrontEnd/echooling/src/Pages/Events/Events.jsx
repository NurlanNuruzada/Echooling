import React from "react";
import EventCard from "../../Components/EventCard/EventCard";
import Styles from "../Events/Events.module.css";
import EventImage from "../../Images/UpcomingEvents.jpeg";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  styled,
  Button,
} from "@chakra-ui/react";
import image1 from "../../Images/Course1.jpg";
import image2 from "../../Images/Course2.jpg";
import image3 from "../../Images/Course3.jpg";
import image4 from "../../Images/Course4.jpg";
import image5 from "../../Images/Course5.jpg";
import image6 from "../../Images/Course6.jpg";
import image7 from "../../Images/Teacher1.png";
import image8 from "../../Images/Teacher2.png";
import image9 from "../../Images/teacher3.png";
import theme from "../../Images/basketball.jpeg";
import SearchInput from "../../Components/SeacthInput/SearchInput2";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import { Grid, GridItem } from "@chakra-ui/react";
import News from "../../Components/News/News";
const Blog = () => {
  const Categorylist = [
    "  CSS Engineering (10)",
    "Political Science (12)",
    "Micro Biology (08)",
    "HTML5 & CSS3 (15)",
    "Web Design (20)",
    "PHP (23)",
  ];
  const SkillLevel = ["Beginner", "Intermediate", "Advanced"];
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
  ];
  return (
    <div className={Styles.MainContainer}>
      <EffectImage
        showCenter={false}
        imageLink={EventImage}
        pageName="Contact"
        to="/"
      />
      <div className={Styles.MainContent}>
        <Grid
          className={Styles.GridBoxMain}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 0fr)",
            md: "repeat(1, 0fr)",
            lg: "repeat(1, 0fr)",
            xl: "repeat(2, 0fr)",
          }}
          gap={5} // Adjust gap as needed
        >
          <GridItem className={Styles.TopSideContainer}>
            <div className={Styles.TopSide}>
              <div className={Styles.SeachArea}>
                <h1 className={Styles.titleSeach}> Search Event</h1>
                <div className={Styles.Input}>
                  <label htmlFor="search">Search by name</label>
                  <Input name="search" placeholder="Enter name" />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="start">Start Date</label>
                  <Input
                    type="datetime-local"
                    id="start"
                    placeholder="Select start date..."
                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="end">End Date</label>
                  <Input
                    type="datetime-local"
                    id="end"
                    placeholder="Select end date..."
                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="city">City</label>
                  <Input name="city" placeholder="Enter city" />
                </div>
                <Button color={"white"} backgroundColor={"#3270fc"}>
                  Seacrh
                </Button>
              </div>
              <div className={Styles.list}>
                <h1>Categories</h1>
                <ul>
                  {Categorylist.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
              <div className={Styles.Poster}>
                <h1>Best Education theme</h1>
              </div>
            </div>
          </GridItem>
          <GridItem className={Styles.MainGridItem}>
            <div className={Styles.Leftside}>
              <Grid
                className={Styles.GridBox}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 0fr)",
                  lg: "repeat(2, 0fr)",
                  xl: "repeat(3, 0fr)",
                }}
                gap={5} // Adjust gap as needed
              >
                {images.map((image, index) => (
                  <GridItem className={Styles.GridItemMain} key={index}>
                    <EventCard
                      IsShadow={true}
                      ColorTitle={"#28292b"}
                      ColorDetail={"gray"}
                      image={image}
                    />
                  </GridItem>
                ))}
              </Grid>
            </div>
          </GridItem>
          <GridItem className={Styles.MainGridItem}>
            <div className={Styles.Rightside}>
              <div className={Styles.SeachArea}>
                <h1 className={Styles.titleSeach}> Search Event</h1>
                <div className={Styles.Input}>
                  <label htmlFor="search">Search by name</label>
                  <Input name="search" placeholder="Enter name" />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="start">Start Date</label>
                  <Input
                    type="datetime-local"
                    id="start"
                    placeholder="Select start date..."
                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="end">End Date</label>
                  <Input
                    type="datetime-local"
                    id="end"
                    placeholder="Select end date..."
                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="city">City</label>
                  <Input name="city" placeholder="Enter city" />
                </div>
                <Button color={"white"} backgroundColor={"#3270fc"}>
                  Seacrh
                </Button>
              </div>
              <div className={Styles.list}>
                <h1>Categories</h1>
                <ul>
                  {Categorylist.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
              <div className={Styles.Poster}>
                <h1>Best Education theme</h1>
              </div>
            </div>
          </GridItem>
        </Grid>
      </div>
      <News />
    </div>
  );
};

export default Blog;

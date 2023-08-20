import React from "react";
import { Box, Flex, Grid, GridItem, styled } from "@chakra-ui/react";
import Styles from "./events.module.css";
import EventCard from "../EventCard/EventCard";
import image1 from "../../Images/event 1.png";
import image2 from "../../Images/event2.png";
import image3 from "../../Images/event3.png";
const Events = () => {
  return (
    <div className={Styles.mainContainer}>
      <p className={Styles.Header}>Upcoming Events</p>
      <div className={Styles.Conatiner}>
        <Grid
          className={Styles.GridBox}
          style={{ margin: "auto" }}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(2, 3fr)",
            xl: "repeat(4, 1fr)",
          }}
        >
          <GridItem className={Styles.GridItem}>
            <EventCard image={image1} />
          </GridItem>
          <GridItem className={Styles.GridItem}>
            <EventCard image={image2} />
          </GridItem>
          <GridItem className={Styles.GridItem}>
            <EventCard image={image3} />
          </GridItem>
          <GridItem className={Styles.GridItem}>
            <EventCard image={image1} />
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default Events;

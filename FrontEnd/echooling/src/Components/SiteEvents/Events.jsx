import React, { useState } from "react";
import { Box, Flex, Grid, GridItem, styled } from "@chakra-ui/react";
import Styles from "./events.module.css";
import EventCard from "../EventCard/EventCard";
import image1 from "../../Images/event 1.png";
import image2 from "../../Images/event2.png";
import image3 from "../../Images/event3.png";
import { useQuery } from "react-query";
import { getallEvents } from "../../Services/EventService";

const Events = () => {
  const [Events, SetEvent] = useState([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Event"],
    queryFn: getallEvents,
    staleTime: 0,
    onSuccess: (data) => {
      SetEvent(data?.data || []); // Use optional chaining to handle undefined data
    },
  });

  // Slice the Events array to show only the first 4 events
  const displayedEvents = Events.slice(0, 4);

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
          {displayedEvents.map((queryResult, index) => (
            <GridItem className={Styles.GridBox} key={index}>
              <EventCard
                IsShadow={false}
                image={queryResult?.imageRoutue}
                Title={queryResult?.eventTitle}
                StartDate={queryResult?.eventStartDate}
                EndTime={queryResult?.eventFinishDate}
                Location={queryResult?.location}
                Category={queryResult?.categoryname}
                guId={queryResult.guId}
              />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Events;

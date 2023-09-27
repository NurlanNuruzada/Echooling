import React, { useState } from "react";
import Styles from "../../Pages/Eventdetail/EventDetail.module.css";
import {
  faTicket,
  faPerson,
  faArrowRight,
  faUser,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Button, Center, GridItem } from "@chakra-ui/react";
import { Divider, Drawer, Flex, Grid } from "@chakra-ui/react";
import Poster from "../../Components/poster/poster";
import image from "../../Images/event 1.png";
import Lastestpost from "../../Components/LastestPost/Lastestpost";
import Atendee from "../../Components/Atendee/Atendee";
import AtendeeImage from "../../Images/teacher/teacher1.jpg";
import News from "../../Components/News/News";
import ContactUs from "../../Components/ContactUs/ContactUsForm";
import EventImage from "../../Images/UpcomingEvents.jpeg";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import { GetEventId, getEventById, getUserByEventId, getallwithttake } from "../../Services/EventService";
import { GetUStaffUsers, getById } from "../../Services/StaffService";
const EventDetails = () => {
  const { id } = useParams();
  const [Event, SetEvent] = useState([]);
  const [User, SetUser] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Courses"],
    queryFn: () => getEventById(id), // Pass the function itself
    staleTime: 0,
    onSuccess: (data) => {
      SetEvent(data || []); // Use optional chaining to handle undefined data
      console.log(data);
    },
  });
  const { data: LastEvents } = useQuery({
    queryKey: ["last"],
    queryFn: () => getallwithttake(3), // Pass the function itself
    staleTime: 0,
    onSuccess: (data) => {
      SetEvent(data || []); // Use optional chaining to handle undefined data
      console.log(data);
    },
  });
  const { data: Staff } = useQuery({
    queryKey: ["Staff"],
    queryFn: () => getUserByEventId(id), // Pass the function itself
    staleTime: 0,
    onSuccess: (data) => {
      console.log(data);
      SetUser(data)
    },
  });
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format eventStartDate
  const eventStartDate = new Date(data?.eventStartDate);
  const StartDate = eventStartDate?.toLocaleDateString('en-US', options);

  // Format eventFinishDate
  const eventFinishDate = new Date(data?.eventFinishDate);
  const EndDate = eventFinishDate?.toLocaleDateString('en-US', options);
  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(undefined, options);
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
  
    return `${formattedDate} ${hours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  }

  return (
    <div className={Styles.MainContainer}>
      <EffectImage
        showCenter={false}
        imageLink={EventImage}
        pageName="Events"
        to="/"
      />
      <Grid
        className={Styles.GridContainer}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 0fr)",
          md: "repeat(1, 0fr)",
          lg: "repeat(1, 0fr)",
          xl: "repeat(2, 0fr)",
        }}
        rowGap={5}
      >
        <div className={Styles.right}>
          <div className={Styles.ImageConatainer}>
            <img className={Styles.EventImage} src={`/Uploads/Event/${data?.imageRoutue}`} alt="" />
            <div>
              <h1 className={Styles.EventTitle}>{Event?.eventTitle}</h1>
              <p>
                {Event.aboutEvent}
              </p>
            </div>
            <div className={Styles.AtendanceList}>
              <h1 className={Styles.AtendanceHeader}>Atendances</h1>
              <Grid
                className={Styles.AtendaceGrid}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                rowGap={5}
              >
                {Staff?.map((staff, index) => (
                  <Atendee
                    key={index}
                    image={AtendeeImage}
                    title={staff.fullname}
                    Profesion={staff.profession}
                  />
                ))}
                {Staff?.map((staff, index) => (
                  <Atendee
                    key={index}
                    image={AtendeeImage}
                    title={staff.fullname}
                    Profesion={staff.profession}
                  />
                ))}
              </Grid>
            </div>
          </div>
        </div>
        <Grid
          className={Styles.left}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(1, 1fr)",
          }}
        >
          <div className={Styles.MainInfoContainer}>
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon
                  className={Styles.Icon}
                  icon={faTicket}
                  style={{ color: "#000000" }}
                />
                <p>Const :</p>
              </Flex>
              <h3>{Event.cost}$</h3>
            </Flex>
            <Divider />
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {User[0] &&
                <Flex alignItems={"center"}>
                  <FontAwesomeIcon className={Styles.Icon} icon={faUser} />
                  <p>organizer 1: </p>
                </Flex>
              }
              <h4>{User[0]?.fullname}</h4>
            </Flex>
            {User[1] &&
              <Flex
                className={Styles.Icon}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex alignItems={"center"}>
                  <FontAwesomeIcon className={Styles.Icon} icon={faUser} />
                  <p>organizer 2: </p>
                </Flex>
                <h4>{User[1]?.fullname}</h4>
              </Flex>
            }
            <Divider />
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faBookmark} />
                <p>Subject : </p>
              </Flex>
              <h4>{Event.categoryname}</h4>
            </Flex>
            <Divider />
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faPerson} />
                <p>Total Slot :</p>
              </Flex>
              <h4>{Event?.totalSlot}</h4>
            </Flex>
            <Divider />
            <Button className={Styles.Button}>
              Join Now!{" "}
              <FontAwesomeIcon className={Styles.arrow} icon={faArrowRight} />
            </Button>
            <Flex
              className={Styles.share}
              justifyContent={"center"}
              alignItems={"center"}
              gap={10}
            >
              <h5>Share this Event</h5>
              <FontAwesomeIcon color="#3270fc" icon={faShareNodes} />
            </Flex>
          </div>
          <div className={Styles.DetatilsContainer}>
            <h1>date:</h1>
            <p>{StartDate} - {EndDate}</p>
            <h1>time:</h1>
            <p>10:00 AM - 11:30PM bu qalib</p>
            <h1>loaction:</h1>
            <p>{Event?.location}</p>
            <h1>Orginazer Phone 1:</h1>
            {/* <p>{Staff[0]?.phoneNumber}</p> */}
            <h1>Orginazer Phone 2:</h1>
            {User[1] &&
              <p>{User[1]?.phoneNumber}</p>
            }
          </div>
          <div className={Styles.DetatilsContainer}>
            <Poster className={Styles.poster} />
          </div>
          <div className={Styles.LastestEvents}>
            <h1>Lastest post</h1>
              <Flex className={Styles.Contentitem1}>
            {LastEvents?.data?.map((staff, index) => (
                <Lastestpost
                  image={`/Uploads/Event/${staff.imageRoutue}`}
                  dateAndtime={`${staff.orginazer} / ${formatDateTime(staff.eventStartDate)}`}
                  Title={"Lastest Events"}
                  SecconTitle={`${staff.eventTitle}`}
                />
              ))}
              </Flex>
          </div>
        </Grid>
      </Grid>
      <ContactUs />
      <News />
    </div>
  );
};

export default EventDetails;

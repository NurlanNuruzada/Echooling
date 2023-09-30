import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery } from "react-query";
import { BuyEvent, GetEventId, getEventById, getUserByEventId, getallwithttake } from "../../Services/EventService";
import { GetUStaffUsers, getById } from "../../Services/StaffService";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import Done from "../../Components/DoneModal/Done";


const EventDetails = () => {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [Event, SetEvent] = useState([]);
  const [buyError, SetBuyErorr] = useState('');
  const [User, SetUser] = useState([]);

  const { token } = useSelector((state) => state.auth); // Update the selector
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var UserId =
      decodedToken[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
  }
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false); // Set it to false to hide the modal
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);

  const { mutate: getCategory } = useMutation(() => getEventById(id), {
    onSuccess: (resp) => {
      SetEvent(resp || []);
    },
  });
  const { mutate: Buy } = useMutation(() => BuyEvent(UserId, id), {
    onSuccess: (resp) => {
      setSuccess(true)
    },
    onError: (error) => {
      // Check if the error object has a customMessage property
      if (error.customMessage) {
        SetBuyErorr(error.customMessage);
      } else {
        // If customMessage is not available, use a default error message
        SetBuyErorr('you already bought this.');
      }
    },
  });
  const handeBuyCourse = () => {
    Buy()
  }
  useEffect(() => {
    getCategory();
    const handleClick = () => {
      getCategory();
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  const { data: LastEvents } = useQuery({
    queryKey: ["last"],
    queryFn: () => getallwithttake(3), // Pass the function itself
    staleTime: 0,
    onSuccess: (data) => {
      SetEvent(data || []);
    },
  });
  const { data: Staff } = useQuery({
    queryKey: ["Staff"],
    queryFn: () => getUserByEventId(id),
    staleTime: 0,
    onSuccess: (data) => {
      SetUser(data)
    },
  });
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format eventStartDate
  const eventStartDate = new Date(Event?.eventStartDate);
  const StartDate = eventStartDate?.toLocaleDateString('en-US', options);

  // Format eventFinishDate
  const eventFinishDate = new Date(Event?.eventFinishDate);
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
      {success && <Done firstTitle={"Bought Succesfully"} seccondTitle={"you succesfully bouth this Event! thanks!"} />}
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
            <img className={Styles.EventImage} src={`/Uploads/Event/${Event?.imageRoutue}`} alt="" />
            <div>
              <h1 className={Styles.EventTitle}>{Event?.eventTitle}</h1>
              <p>
                {Event.aboutEvent}
              </p>
            </div>
            <div className={Styles.AtendanceList}>
              <h1 className={Styles.AtendanceHeader}>Orginazer</h1>
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
              <h3>{Event?.cost}$</h3>
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
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faPerson} />
                <p>Enrolled :</p>
              </Flex>
              <h4>{Event?.enrolled}</h4>
            </Flex>
            <Divider />
            <Button onClick={() => handeBuyCourse()} className={Styles.Button}>
              Join Now!{" "}
              <FontAwesomeIcon className={Styles.arrow} icon={faArrowRight} />
            </Button>
            <Flex color={'red'} justifyContent={'center'}>
              {!success ? <h1>{buyError}</h1> : ""}
            </Flex>
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
            <p>{User[0]?.phoneNumber}</p>
            {User[1] && <h1>Orginazer Phone 2:</h1>}
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
                <Link to={`/EventDetail/${staff.guId}`}>
                  <Lastestpost
                    image={`/Uploads/Event/${staff.imageRoutue}`}
                    dateAndtime={`${staff.orginazer} / ${formatDateTime(staff.eventStartDate)}`}
                    Title={"Lastest Events"}
                    SecconTitle={`${staff.eventTitle}`}
                  />
                </Link>
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

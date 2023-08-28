import React from "react";
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
const EventDetails = () => {
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
            <img className={Styles.EventImage} src={image} alt="" />
            <div>
              <h1 className={Styles.EventTitle}>Event title</h1>
              <p>
                I must explain to you how all this a mistaken idea of denouncing
                great explorer of the rut the is lder of human happiness pcias
                unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                asnatur aut odit aut fugit, sed quia consequuntur magni dolores
                eos qui
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
                <Atendee
                  image={AtendeeImage}
                  title={"Nurlan Nuruzada"}
                  Profesion={"Student"}
                />
                <Atendee
                  image={AtendeeImage}
                  title={"Nurlan Nuruzada"}
                  Profesion={"Student"}
                />
                <Atendee
                  image={AtendeeImage}
                  title={"Nurlan Nuruzada"}
                  Profesion={"Student"}
                />
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
                  icon={faBookmark}
                  style={{ color: "#000000" }}
                />
                <p>Const :</p>
              </Flex>
              <h3>$72.00</h3>
            </Flex>
            <Divider />
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faUser} />
                <p>organizer : </p>
              </Flex>
              <h4>Penny Tool</h4>
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
              <h4>250</h4>
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
            <p>15 January, 2022 - December 14, 2022</p>
            <h1>time:</h1>
            <p>10:00 AM - 11:30PM</p>
            <h1>loaction:</h1>
            <p>IAC Building, New York</p>
            <h1>Phone:</h1>
            <p>+(624) 763 552 420</p>
          </div>
          <div className={Styles.DetatilsContainer}>
            <Poster className={Styles.poster} />
          </div>
          <div className={Styles.LastestEvents}>
            <h1>Lastest post</h1>
            <Flex className={Styles.Contentitem1}>
              <Lastestpost
                image={image}
                dateAndtime={"By Alex / June 20, 2022"}
                Title={"Lastest Events"}
                SecconTitle={"Advance Web Design and Develop"}
              />
              <Lastestpost
                image={image}
                dateAndtime={"By Alex / June 20, 2022"}
                Title={"Lastest Events"}
                SecconTitle={"Advance Web Design and Develop"}
              />
              <Lastestpost
                image={image}
                dateAndtime={"By Alex / June 20, 2022"}
                Title={"Lastest Events"}
                SecconTitle={"Advance Web Design and Develop"}
              />
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
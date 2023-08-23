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
import { Button, Center } from "@chakra-ui/react";
import { Divider, Drawer, Flex } from "@chakra-ui/react";
import Poster from "../../Components/poster/poster";
const EventDetails = () => {
  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.left}>
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
      </div>
      <div className={Styles.DetatilsContainer}>
        <Poster className={Styles.poster} />
      </div>
      <div className={Styles.right}></div>
    </div>
  );
};

export default EventDetails;

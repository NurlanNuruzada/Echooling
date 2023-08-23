import React from "react";
import Styles from "../../Pages/Eventdetail/EventDetail.module.css";
import {
  faTicket,
  faPerson,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Button from "../../Components/Button/Button";
import { Divider, Drawer, Flex } from "@chakra-ui/react";
const EventDetails = () => {
  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.left}>
        <div>
          <Flex alignItems={"center"}>
            <FontAwesomeIcon icon={faBookmark} style={{ color: "#000000" }} />
            <p>Const:</p>
          </Flex>
          <Divider />
          <Flex alignItems={"center"}>
            <FontAwesomeIcon icon={faPerson} />
            <p>Total Slot:</p>
          </Flex>
          <Divider />
         <Button>Join Now</Button>
        </div>
      </div>
      <div className={Styles.right}></div>
    </div>
  );
};

export default EventDetails;

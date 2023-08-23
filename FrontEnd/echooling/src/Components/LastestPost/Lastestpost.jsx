import React from "react";
import Styles from "../LastestPost/lastestPost.module.css";
import { Flex } from "@chakra-ui/react";
const Lastestpost = ({ SecconTitle, dateAndtime, image }) => {
  return (
    <div  className={Styles.Container}>
      <div className={Styles.mainContainer}>
        <div className={Styles.leftImage}>
          <img src={image} alt="" />
        </div>
        <div className={Styles.right}>
          <Flex flexFlow={"column"} className={Styles.ContentData}>
            <h2>{SecconTitle}</h2>
            <h3>{dateAndtime}</h3>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Lastestpost;

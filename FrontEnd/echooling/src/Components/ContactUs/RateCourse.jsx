import React from "react";
import Styles from "./RateCourse.module.css";
import {
  Grid,
  Flex,
  GridItem,
  Input,
  Textarea,
  Button,
  ColorModeContext,
} from "@chakra-ui/react";
import Starts from "../../Components/Starts/Stars";
import image1 from "../../Images/FormImage1.png";
import image2 from "../../Images/FormImage2.png";
import image3 from "../../Images/FormImage3.png";
import ReviewMessage from "../ReviewMessage/ReviewMessage";
const RateCourse = ({
  title,
  secondTitle,
  address,
  HourOfOperation,
  Mobile,
  Mail,
}) => {
  return (
    <div className={Styles.mainContainer}>
        <div className={Styles.right}>
          <div className={Styles.formTitleContainer}>
            <h1>{title}</h1>
            <h2>{secondTitle}</h2>
          </div>
          <div className={Styles.formContainer}>
            <Input
            placeholder="Add a comment..."
              variant="flushed"
              className={Styles.Input}
            />
            <Flex pt={2} pb={2}  gap={10} alignItems={"center"}>
              <h1>rate this Course:</h1>
              <Starts  size={25} isEditable={true} />
            </Flex>
            <Button  className={Styles.Button}>
              Send Message
            </Button>
          </div>
        </div>
    </div>
  );
};

export default RateCourse;

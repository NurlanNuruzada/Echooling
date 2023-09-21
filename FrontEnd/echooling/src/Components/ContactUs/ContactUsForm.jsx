import React from "react";
import Styles from "./Contactus.module.css";
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
const ContactUsForm = ({
  title,
  secondTitle,
  address,
  HourOfOperation,
  Mobile,
  Mail,
}) => {
  return (
    <div className={Styles.mainContainer}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <div className={Styles.left}>
          <ul>
            <li className={Styles.leftList}>
              <div>
                <img src={image1} alt="" />
              </div>
              <div>
                <h1>Adress</h1>
                <h2>517 Tarkiln Hill Street
                  La Vergne, TN 37086</h2>
              </div>
            </li>
            <li className={Styles.leftList}>
              <div>
                <img src={image2} alt="" />
              </div>
              <div>
                <h1>Contact</h1>
                <h2>(780) 439-4163</h2>
                <h3>nurlangn@code.edu.az</h3>
              </div>
            </li>
            <li className={Styles.leftList}>
              <div>
                <img src={image3} alt="" />
              </div>
              <div>
                <h1>Hour of operation</h1>
                <h2>Our doors are open to welcome you every day from 10 AM to 12 PM. we're here to serve you during these hours.</h2>
              </div>
            </li>
          </ul>
        </div>
        <div className={Styles.right}>
          <div className={Styles.formTitleContainer}>
            <h1>{title}</h1>
            <h2>{secondTitle}</h2>
          </div>
          <div className={Styles.formContainer}>
            <Grid
              className={Styles.GridContainer}
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(2, 1fr)",
              }}
              rowGap={5}
              columnGap={5}
            >
              <Input
                size="md"
                className={Styles.Input}
                variant="flushed"
                placeholder="Name"
              />
              <Input
                size="md"
                className={Styles.Input}
                variant="flushed"
                placeholder="Surname"
              />
              <Input
                size="md"
                className={Styles.Input}
                variant="flushed"
                placeholder="Subject"
              />
              <Input
                size="md"
                className={Styles.Input}
                variant="flushed"
                placeholder="Phone"
              />
            </Grid>
            <Textarea
              variant="flushed"
              className={Styles.Input}
              placeholder="Message"
            />
            <Button m={5} className={Styles.Button}>
              Send Message
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default ContactUsForm;

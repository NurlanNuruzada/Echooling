import { Box, Flex, Grid, GridItem, styled } from "@chakra-ui/react";
import Styles from "../Styles/Footer.module.css";
import React from "react";
import ListItems from "../Components/List/ListItems";
import SocialMediaLinks from "../Components/SocialMedia/SocialMediaLinks";
import SynchronizedSlider from "../Components/CaruselSliderSlick/caruselSlider";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const invertedFacebookIcon = (
  <FontAwesomeIcon
    size="lg"
    icon={faFacebook}
    fa-md
    style={{ color: "#000000", filter: "invert(1)" }}
  />
);
const invertedTwitterIcon = (
  <FontAwesomeIcon
    size="lg"
    icon={faTwitter}
    fa-md
    style={{ color: "#000000", filter: "invert(1)" }}
  />
);
const invertedInstagram = (
  <FontAwesomeIcon
    size="lg"
    icon={faInstagram}
    fa-md
    style={{ color: "#000000", filter: "invert(1)" }}
  />
);
let Contact = [
  "88 broklyn street, New York USA",
  "needhelp@company.com",

  "92 888 666 0000",
];
const GotoInstagram = "https://www.instagram.com/";
const Gotofacebook = "https://www.facebook.com/";
const GotoTwittter = "https://www.twitter.com/";
let Courses = [
  "UI/UX Design",
  "WordPress Development",
  "Business Strategy",
  "Software Development",
  "Business English",
];

let Links = ["About Us", "Overview", "Teachers", "Join Us", "Our News"];

const Footer = () => {
  return (
    <div className={Styles.FooterContainer}>
      <div className={Styles.MainContent}>
        <Grid
          className={Styles.GridBox}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
        >
          <GridItem className={Styles.MainLogo}></GridItem>
          <GridItem className={Styles.List}>
            <Link to={"/Courses"}>
              <ListItems ListItems={Courses} ListHeader="Courses" />
            </Link>
          </GridItem>
          <GridItem className={Styles.List}>
            <Flex flexFlow={'column'}>
              <h2 className={Styles.ListHeader} color="white">Links</h2>
              <ul>
                <Link to={'/'}>
                  <li className={Styles.ListItems} >Home</li>
                </Link>
                <Link to={'/About'}>
                  <li className={Styles.ListItems} >About</li>
                </Link>
                <Link to={'/Courses'}>
                  <li className={Styles.ListItems} >Courses</li>
                </Link>
                <Link to={'/Events'}>
                  <li className={Styles.ListItems} >Events</li>
                </Link>
                <Link to={'/Staff'}>
                  <li className={Styles.ListItems} >Staff</li>
                </Link>
              </ul>
            </Flex>
          </GridItem>
          <GridItem className={Styles.List}>
            {" "}
            <ListItems ListItems={Contact} ListHeader="Contact" />
          </GridItem>
          <GridItem className={Styles.List}>
            <div className={Styles.Container}>
              <p style={{ color: "white", fontWeight: "500" }}>
                {" "}
                Newsletter{" "}
              </p>
              <p style={{ color: "#aeb2c2", margin: "40px 0" }}>
                Get the latest Echooling news delivered to you inbox
              </p>
              <div className={Styles.SeacContainer}>
                <input
                  placeholder="Enter your email"
                  className={Styles.InputEmail}
                  type="text"
                />
                <button className={Styles.SeacrhIcon}>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </div>
          </GridItem>
        </Grid>
        <div className={Styles.Line}>
          <p className={Styles.Right}>
            © 2023{" "}
            <a style={{ color: "#aeb2c2" }} href="">
              Echooling.
            </a>{" "}
            All Rights Reserved
          </p>
          <div className={Styles.SocialMedia}>
            <p>Follow Us</p>
            <SocialMediaLinks to={Gotofacebook} Icon={invertedFacebookIcon} />
            <SocialMediaLinks to={GotoTwittter} Icon={invertedTwitterIcon} />
            <SocialMediaLinks to={GotoInstagram} Icon={invertedInstagram} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

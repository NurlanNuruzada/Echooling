import React from "react";
import Styles from "./CourseDetails.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  faTicket,
  faPerson,
  faArrowRight,
  faUser,
  faTag,
  faShareNodes,
  faLanguage,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckIcon } from "@chakra-ui/icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Button, Center, GridItem } from "@chakra-ui/react";
import { Divider, Drawer, Flex, Grid, Box } from "@chakra-ui/react";
import Poster from "../../Components/poster/poster";
import image from "../../Images/event 1.png";
import Lastestpost from "../../Components/LastestPost/Lastestpost";
import Atendee from "../../Components/Atendee/Atendee";
import AtendeeImage from "../../Images/teacher/teacher1.jpg";
import News from "../../Components/News/News";
import ContactUs from "../../Components/ContactUs/ContactUsForm";
import EventImage from "../../Images/UpcomingEvents.jpeg";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const CourseDetails = () => {
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
          lg: "repeat(2, 0fr)",
          xl: "repeat(2, 0fr)",
        }}
        rowGap={5}
      >
        <div className={Styles.right}>
          <div className={Styles.ImageConatainer}>
            <img className={Styles.EventImage} src={image} alt="" />
            <div>
              <h1 className={Styles.EventTitle}>Course title</h1>
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

            <div>
              <Tabs className={Styles.tabs} isManual variant="enclosed">
                <TabList>
                  <Tab>Teacher</Tab>
                  <Tab>What you will learn</Tab>
                  <Tab>Course Content</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className={Styles.AtendanceList}>
                      <Atendee
                        image={AtendeeImage}
                        title={"Nurlan Nuruzada"}
                        Profesion={"Student"}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <List spacing={3}>
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                      <ListItem>
                        <ListIcon as={CheckIcon} color="green.500" />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      </ListItem>
                    </List>
                  </TabPanel>
                  <TabPanel>
                    <Accordion defaultIndex={[0]} allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              Section 1 title
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </AccordionPanel>
                      </AccordionItem>

                    </Accordion>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>
        <Grid
          className={Styles.left}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(1, 1fr)",
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
                <p>Instructor : </p>
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
                <FontAwesomeIcon icon={faClock} />
                <p>Duration : </p>
              </Flex>
              <h4>2 weeks</h4>
            </Flex>
            <Divider />
            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon icon={faLanguage} />
                <p>Languge : </p>
              </Flex>
              <h4>English</h4>
            </Flex>
            <Divider />

            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faTag} />
                <p>Subject : </p>
              </Flex>
              <h4>IT & Software</h4>
            </Flex>
            <Divider />

            <Flex
              className={Styles.Icon}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex alignItems={"center"}>
                <FontAwesomeIcon className={Styles.Icon} icon={faPerson} />
                <p>Enrolled :</p>
              </Flex>
              <h4>250 Student</h4>
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
            <h1>This Course icludes</h1>
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
            <h1>Lastest Courses</h1>
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
      <ContactUs
        title={"Write a Review"}
        secondTitle={
          "Your email address will not be published. Required fields are marked *"
        }
      />
      <News/>
    </div>
  );
};

export default CourseDetails;
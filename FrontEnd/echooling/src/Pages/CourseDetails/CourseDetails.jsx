import React from "react";
import Styles from "./CourseDetails.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Link,
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
import EventImage from "../../Images/Courses.jpeg";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { GetCourseId, getCourseTeachers, getLastestWithCount, getallCourses } from "../../Services/CourseService";
import Stars from "../../Components/Starts/Stars";
import ContactUsForm from "../../Components/ContactUs/ContactUsForm";
import RateCourse from "../../Components/ContactUs/RateCourse";
import CommentArea1 from "../../Components/Review/CommentArea";
import CommentAreas1 from "../../Components/Review/CommentArea";
const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [LastestCourses, setLastestCourses] = useState(null);
  const [textToCopy, setTextToCopy] = useState('Text to be copied');
  const [isCopied, setIsCopied] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const currentURL = window.location.href;
  const { mutate, isLoading, error } = useMutation(
    (id) => GetCourseId(id),
    {
      refetchOnWindowFocus: false,
      onSuccess: (resp) => {
        console.log(resp);
        setCourse(resp)
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const { mutate: AllCourse } = useMutation(
    () => getLastestWithCount(3, course.courseCategoryId),
    {
      onSuccess: (resp) => {
        console.log("Course", resp);
        setLastestCourses(resp)
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  useEffect(() => {
    mutate(id);
  }, []);
  useEffect(() => {
    AllCourse()
  }, [course]);
  const { data: TeacherData } = useQuery(
    ["Teachers", id],
    async () => await getCourseTeachers(id),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (resp) => {
        setCourse(resp);
      },
    }
  );
  let number = 0
  console.log(TeacherData);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleCopyClick = () => {
    const shareableLink = `${window.location.origin}/CourseDetails/${course?.guId}`;

    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        // Use setTimeout to reset the "Copied!" message after a short delay
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500); // Adjust the delay (in milliseconds) as needed
      })
      .catch((error) => {
        console.error('Copy failed: ', error);
        setIsCopied(false); // Reset the state in case of an error
      });
  };
  return (
    <div className={Styles.MainContainer}>
      <EffectImage
        showCenter={false}
        imageLink={EventImage}
        pageName="Courses"
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
            <img className={Styles.EventImage} src={course?.imageRoutue ? `/Uploads/Course/${course?.imageRoutue}` : ""} alt="" />
            <div>
              <h1 className={Styles.EventTitle}>{course?.title}</h1>
              <p>
                {course?.aboutCourse}
              </p>
            </div>
            <div>
              <Tabs className={Styles.tabs} isManual variant="enclosed">
                <TabList>
                  <Tab>Course reviews</Tab>
                  <Tab>Teacher</Tab>
                  <Tab>What you will learn</Tab>
                  <Tab>Course Content</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <CommentAreas1 />
                    {/* {TeacherData?.map((data, index) => (
                        <a href={`/StaffDetails/${data.appUserID}`}>
                          <Atendee
                            key={index} // Don't forget to add a unique key prop when mapping
                            image={AtendeeImage}
                            title={data.fullname}
                            Profesion={data.profession}

                          />
                        </a>
                      ))} */}
                  </TabPanel>
                  <TabPanel>
                    <div className={Styles.AtendanceList}>
                      {TeacherData?.map((data, index) => (
                        <a href={`/StaffDetails/${data.appUserID}`}>
                          <Atendee
                            key={index} // Don't forget to add a unique key prop when mapping
                            image={AtendeeImage}
                            title={data.fullname}
                            Profesion={data.profession}

                          />
                        </a>
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <List spacing={3}>
                      {course?.whatWillLearn && course.whatWillLearn.split(',').map((item, index) => (
                        <ListItem key={index}>
                          <ListIcon as={CheckIcon} color="green.500" />
                          {item.trim().replace(/["[\]]/g, '')}
                        </ListItem>
                      ))}
                    </List>
                  </TabPanel>
                  <TabPanel>
                    <Accordion defaultIndex={[0]} allowMultiple>

                      {course?.thisCourseIncludes && course.thisCourseIncludes.split(',').map((item, index) => (
                        <AccordionItem key={index}>

                          <h2>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                This Course Includes  Section {number += 1}
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            {item.trim().replace(/["[\]]/g, '')}
                          </AccordionPanel>
                        </AccordionItem>
                      ))}

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
              <h3>${course?.price}</h3>
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
              <h4>{course?.instructor}</h4>
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
              <h4>{course?.duration}</h4>
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
              <h4>{course?.languge}</h4>
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
              <h4>{course?.subject}</h4>
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
              <h4>{course?.enrolled} Student</h4>
            </Flex>

            <Divider />
            <Button className={Styles.Button}>
              buy Now ! {" "}
              <FontAwesomeIcon className={Styles.arrow} icon={faArrowRight} />
            </Button>
            <Flex
              className={Styles.share}
              justifyContent={"center"}
              alignItems={"center"}
              gap={10}
            >
              <Flex cursor={"pointer"} gap={5} justifyContent={"center"} alignItems={"center"} onClick={handleCopyClick}>
                <h5>Share this Course</h5>
                <FontAwesomeIcon color="#3270fc" icon={faShareNodes} />
                {isCopied ? 'Copied!' : ' '}
              </Flex>
            </Flex>
          </div>
          {TeacherData?.map((data, index) => (
            <div key={index} className={Styles.DetatilsContainer}>
              <h1>This Course icludes</h1>
              <p>15 January, 2022 - December 14, 2022</p>
              <h1>Course Rate:</h1>
              <Stars initialRating={course?.rate} RaitingPerson={course?.enrolled} size={"30px"} />
              <h1>Email Address:</h1>
              <p>{data.emailAddress}</p>
              <h1>Phone:</h1>
              <p>{data.phoneNumber}</p>
            </div>
          ))}
          <div className={Styles.DetatilsContainer}>
            <Poster className={Styles.poster} />
          </div>
          <div className={Styles.LastestEvents}>
            <h1>Lastest Courses In This Category</h1>
            <Flex className={Styles.Contentitem1}>
              {LastestCourses?.map((data, index) => (
                <a href={`/CourseDetails/${data.guId}`}>
                  <Lastestpost
                    key={index}
                    image={`/Uploads/Course/${data.imageRoutue}`}
                    dateAndtime={`By ${data.instructor} / ${data.subject}`}
                    Title={data.title}
                    SecconTitle={data.title.slice(0, 45) + "..."}
                  />
                </a>
              ))}
            </Flex>
          </div>
        </Grid>
      </Grid>
      <RateCourse
        title={"Write a Review for this course"}
        secondTitle={
          "Feel free to write review for this course"
        }
      />
      <ContactUsForm
        title={"Questions?"}
        secondTitle={"Feel free to contact uo."}
      />
      <News />
    </div >
  );
};

export default CourseDetails;

import React from "react";
import Styles from "./CourseDetails.module.css";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
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
  faStar,
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
import { BuyCourse, GetCourseId, getCourseTeachers, getLastestWithCount, getallCourses } from "../../Services/CourseService";
import Stars from "../../Components/Starts/Stars";
import ContactUsForm from "../../Components/ContactUs/ContactUsForm";
import RateCourse from "../../Components/ContactUs/RateCourse";
import CommentAreas1 from "../../Components/Review/CommentArea1";
import ReactStars from "react-rating-stars-component";
import { GetVideosByCourseId } from "../../Services/VideoServce";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import Done from "../../Components/DoneModal/Done";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [LastestCourses, setLastestCourses] = useState(null);
  const [textToCopy, setTextToCopy] = useState('Text to be copied');
  const [isCopied, setIsCopied] = useState(false);
  const [seed, setSeed] = useState(1);
  const [rate, setRate] = useState(course?.rate);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { id } = useParams();
  const [Data, setData] = useState();
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [clicked, setClicked] = useState(false); // State to track if it's clicked
  const queryClient = useQueryClient();
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [buyError, SetBuyErorr] = useState('');
  const [success, setSuccess] = useState(false);
  
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
  const handleClikVideo = (videoName) => {
    setSelectedVideo(videoName);
    setVideoModalOpen(true);
  };
  const reset = () => {
    setSeed(Math.random());
  }
  useEffect(() => {
    setRate(course?.rate);
    reset()
  }, [course?.rate]);
  useEffect(() => {
    GetAllVideo(id)
  }, [id]);
  const currentURL = window.location.href;
  const { isLoading, isError } = useQuery(
    ['course', id],
    () => GetCourseId(id),
    {
      onSuccess: (resp) => {
        setCourse(resp);
      },
      onError: (error) => {
      },
    }
  );
  const { mutate: AllCourse } = useMutation(
    () => getLastestWithCount(UserId, course.guId),
    {
      onSuccess: (resp) => {
        setLastestCourses(resp)
      },
      onError: (error) => {
      },
    }
  );
  const { mutate: Buy, error } = useMutation(
    () => BuyCourse(UserId, course.guId),
    {
      onSuccess: (resp) => {
        setSuccess(true);
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
    }
  );

  const handeBuyCourse = () => {
    Buy()
  }
  const { mutate: GetAllVideo } = useMutation(
    (values) => GetVideosByCourseId(id, 3),
    {
      onSuccess: (resp) => {
        setData(resp.data)
      },
      onError: (error) => {
      },
    }
  );
  useEffect(() => {
    AllCourse()
    queryClient.invalidateQueries(['course', id]);
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
  function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }

  return (
    <div className={Styles.MainContainer}>
      {success && <Done firstTitle={"Bought Succesfully"} seccondTitle={"you succesfully bouth this course! thanks!"} />}
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
                  <Tab>videos</Tab>
                  <Tab>Teacher</Tab>
                  <Tab>What you will learn</Tab>
                  <Tab>Course Content</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <CommentAreas1 id={id} />
                  </TabPanel>
                  <TabPanel>
                    <TableContainer>
                      <Table size='sm'>
                        <Thead>
                          <TableCaption>Course Preview</TableCaption>
                          <Tr>
                            <Th>video Title</Th>
                          </Tr>
                        </Thead>
                        <Tbody>

                          {Data?.map((data, index) => (
                            <Tr
                              key={data.guid}
                              cursor={'pointer'}
                              _hover={{ background: 'lightblue' }}
                              onClick={() => handleClikVideo(`/Uploads/Course/Videos/${data.videoUniqueName}`)}
                            >
                              <Td>{data.videoTitle}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                        <Modal isCentered isOpen={isVideoModalOpen} onClose={() => setVideoModalOpen(false)} size="xxl">
                          <ModalOverlay />
                          <ModalContent>
                            <ModalCloseButton />
                            <ModalBody>
                              <video
                                src={`${selectedVideo}`}
                                controls
                                style={{ display: "block", maxWidth: "100%", margin: "0 auto", boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" }}
                              ></video>
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  <TabPanel>
                    <div className={Styles.AtendanceList}>
                      {TeacherData?.map((data, index) => (
                        <a href={`/TeacherDetails/${data.appUserID}`}>
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
            <Button onClick={() => handeBuyCourse()} className={Styles.Button}>
              buy Now ! {" "}
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
              <Flex alignItems={"center"}>
                <h5 style={{ fontWeight: "600" }}>({rate})</h5>
                <ReactStars
                  key={seed}
                  value={round(rate)}
                  size={20}
                  count={5}
                  color="lightgray"
                  activeColor="orange"
                  isHalf
                  emptyIcon={<FontAwesomeIcon icon={faStar} />}
                  halfIcon={<FontAwesomeIcon icon={["fas", "star-half-alt"]} color="lightgray" />}
                  filledIcon={<FontAwesomeIcon icon={["fas", "star"]} />}
                  edit={false}
                />
              </Flex>
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
        CourseId={id}
        comment={"I did't liked this course teacher is awfull!"}
        rate={1}
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

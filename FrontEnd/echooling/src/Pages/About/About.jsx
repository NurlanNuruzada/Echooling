import React from "react";
import Image from "../../Images/AboutUs.jpeg";
import Image2 from "../../Images/AboutSection1.png";
import Image3 from "../../Images/AboutSection2.png";
import teacher1 from "../../Images/teacher/teacher1.jpg";
import logo from "../../Images/logo2.png";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import Styles from "../About/about.module.css";
import Couter from "../../Components/Counter/Couter";
import News from "../../Components/News/News";
import { useNavigate } from "react-router";
import TeacherCard from "../../Components/TeacherCard/TeacherCard";
import SynchronizedSlider from "../../Components/CaruselSliderSlick/caruselSlider";
import { GetUStaffUsers } from "../../Services/StaffService";
import { useQuery } from "react-query";
import { GetInfo } from "../../Services/Info";
const About = () => {
  const navigator = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getStaff"],
    queryFn: GetUStaffUsers,
    staleTime: 0,
  });
  const { data:Information } = useQuery({
    queryKey: ["info"],
    queryFn: GetInfo,
    staleTime: 0,
  });
  const handleNavigate = (link) => {
    navigator(link);
  };
  const info = [
    { number: Information?.data?.totalStudentCount, Text: "TOTAL STUDENTS" },
    { number: Information?.data?.totalCoursesCount, Text: "TOTAL COURSES" },
    { number: Information?.data?.totalTeachersCount, Text: "TOTAL TEACHERS" },
    { number: Information?.data?.totalEventsCount, Text: "TOTAL EVENTS" },
  ];
  return (
    <>
      <div>
        <EffectImage  to="/" pageName="ABOUT US" imageLink={Image} />
      </div>
      <div>
        <Grid
          className={Styles.GridBox}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(2, 1fr)",
          }}
        >
          <GridItem data-aos="fade-up" className={Styles.LeftGridItems}>
            <h1>Welcome to Echooling.</h1>
            <h2>
              Welcome to <span className={Styles.Enchooling}>Echooling.</span>
            </h2>
            <h3>
              Education is both the act of teaching knowledge to others and the
              act of receiving knowledge from someone else.
            </h3>
            <p>
              Education opens up the mind, expands it and allows you to improve
              your life in so many ways. Turned it up should no valley cousin
              he. Speaking numerous ask did horrible packages set. Ashamed
              herself has distant can studied mrs. Led therefore its middleton
              perpetual fulfilled provision frankness it up should no valley.
            </p>
            <Grid
              className={Styles.CounterContainer}
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                xl: "repeat(2, 1fr)",
              }}
            >
              {info.map((item, index) => (
                <GridItem key={index}>
                  <Couter InlineText={item.Text} MaxNumber={item.number} />
                </GridItem>
              ))}
            </Grid>
            <Button
              onClick={() => handleNavigate("/")}
              mt={10}
              color={"#4586ff"}
            >
              VIEW COURSES
            </Button>
          </GridItem>
          <GridItem>
            <div data-aos="fade-up" className={Styles.ContainerImage}>
              <img src={Image2} alt="" />
              <img className={Styles.SeccondImage} src={Image3} alt="" />
            </div>
          </GridItem>
        </Grid>
      </div>
      <div className={Styles.teachers}>
          <div className={Styles.Header}>
            <img src={logo} alt="" />
            <h1>MEET OUR TEACHERS</h1>
          </div>
          <div>
          <Grid
        className={Styles.teacherContainer}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        rowGap={5}
        >
        {data?.data?.map((staff) => (
            <TeacherCard
            key={staff.appUserID}
            Role = {staff.role}
            image={teacher1}
            userId={staff.appUserID}
            socialMediaLinks={{
              instagram: staff.instagram,
              linkedin: staff.linkedin,
              twitter: staff.twitter,
              facebook: staff.facebook,
          }} 
            teacherName={staff?.fullname}
            Profession={staff?.profession} 
            fa-md="true" 
            />
          ))}
      </Grid>
        </div>
      </div>
      <SynchronizedSlider />
      <News />
    </>
  );
};

export default About;

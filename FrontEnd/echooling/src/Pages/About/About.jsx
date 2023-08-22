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
const About = () => {
  const navigator = useNavigate();
  const handleNavigate = (link) => {
    navigator(link);
  };
  const info = [
    { number: 1643, Text: "STUDENTS" },
    { number: 4573, Text: "COURSES" },
    { number: 1346, Text: "TEACHERS ONLINE" },
    { number: 200, Text: "COUNTRIES" },
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
              className={Styles.TeacherContainer}
              templateColumns={{
                base: "repeat(1, 0fr)",
                sm: "repeat(2, 0fr)",
                md: "repeat(3,0fr)",
                lg: "repeat(4, 0fr)",
                xl: "repeat(5, 0fr)",
              }}
              rowGap={10}
              columnGap={3}
            >
              <TeacherCard
                Profession={"assosiate math professor"}
                teacherName={"Andrew William"}
                image={teacher1}
              />
              <TeacherCard
                Profession={"assosiate math professor"}
                teacherName={"Andrew William"}
                image={teacher1}
              />
              <TeacherCard
                Profession={"assosiate math professor"}
                teacherName={"Andrew William"}
                image={teacher1}
              />
              <TeacherCard
                Profession={"assosiate math professor"}
                teacherName={"Andrew William"}
                image={teacher1}
              />
              <TeacherCard
                Profession={"assosiate math professor"}
                teacherName={"Andrew William"}
                image={teacher1}
              />
            </Grid>
        </div>
      </div>
      <SynchronizedSlider />
      <News />
    </>
  );
};

export default About;

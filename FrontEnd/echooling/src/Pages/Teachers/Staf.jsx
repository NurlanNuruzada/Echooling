import React from "react";
import Styles from "./Staf.module.css";
import TeacherCard from "../../Components/TeacherCard/TeacherCard";
import image from "../../Images/teacher/teacher1.jpg";
import { Grid } from "@chakra-ui/react";
import logo from "../../Images/logo2.png";
import Banner from "../../Images/teacher/teachersImage3.jpeg";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import News from "../../Components/News/News";
import { Link } from "react-router-dom";
const Staf = () => {
  return (
    <div>
      <EffectImage
        showCenter={true}
        imageLink={Banner}
        pageName="Our Staf"
        to="/"
      />
      <div className={Styles.Header}>
        <img src={logo} alt="" />
        <h1>MEET OUR STAF</h1>
      </div>
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
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
        <Link  to={"/TeacherDeatils"}>
          <TeacherCard
          
            image={image}
            teacherName={"Kamran Jabiyev"}
            Profession={"Profesional Programing teacher"}
          />
        </Link>
       
      </Grid>
      <News />
    </div>
  );
};

export default Staf;

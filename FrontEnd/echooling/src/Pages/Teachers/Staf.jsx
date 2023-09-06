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
import { useQueries, useQuery } from "react-query";
import { GetUStaffUsers } from "../../Services/StaffService";
const Staf = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getStaff"],
    queryFn: GetUStaffUsers,
    staleTime: 0,
  });
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {isError.message}</h2>;
  if (isError) return "An error has occured: " + isError.message;
  console.log(data)
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
        {data?.data?.map((staff) => (

        <Link to={"/TeacherDeatils"}>
            <TeacherCard
            key={staff.appUserID}
            image={image}
            teacherName={staff?.hobbies}
            Profession={staff?.profecion}
            fa-md="true" 
            />
        </Link>
          ))}
      </Grid>
      <News />
    </div>
  );
};

export default Staf;

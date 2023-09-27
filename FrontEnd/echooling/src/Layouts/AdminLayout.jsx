import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";
import Header from "../Components/Header/Header";
import AdminPageHeader from "../Components/Header/AdminPageHeader";
import Sidebar from "../Components/CustomSideBar/Sidebar";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Styles from "./AdminLayout.module.css";

export function AdminLayout() {
  const CreateTeacher = [
    {
      LinkName: "Create Course",
      link: "/ControlPanel/CreateEvent"
    },
    {
      LinkName: "My Courses",
      link: "/ControlPanel/MyEvents"
    },
    {
      LinkName: "Stats",
      link: "/ControlPanel/Stats"
    },
    {
      LinkName: "Course Review",
      link: "/ControlPanel/Stats"
    }
  ];
  const CreateStaff = [
  ];
  const [isSmall, setIsSmall] = useState(false);
  const [IsButtonClicked, setIsButtonClicked] = useState(false);

  // Callback function to toggle isSmall
  const toggleIsSmall = () => {
    setIsSmall(!isSmall);
  };

  // Callback function to toggle IsButtonClicked
  const handleButtonClick = () => {
    setIsButtonClicked(!IsButtonClicked);
  };

  return (
      <Grid className={Styles.GridContainer} templateColumns="0fr 1fr">
        <GridItem>
          <Sidebar
            toggleIsSmall={toggleIsSmall}
            IsButtonClicked={IsButtonClicked}
            CreateTeacher={CreateTeacher}
            CreateStaff={CreateStaff}
            isSmall={isSmall}
          />
        </GridItem>
        <GridItem className={Styles.GridItem}>
          <AdminPageHeader
            toggleIsSmall={toggleIsSmall}
            isSmall={isSmall}
            IsButtonClicked={handleButtonClick} // Pass the callback to handle button click
          />
          <Outlet className={Styles.ContentToshow} />
        </GridItem>
      </Grid>
  );
}

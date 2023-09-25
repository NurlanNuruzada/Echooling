import React, { useEffect } from "react";
import EventCard from "../../Components/EventCard/EventCard";
import Styles from "../Events/Events.module.css";
import EventImage from "../../Images/UpcomingEvents.jpeg";
import {
  Input,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import EffectImage from "../../Components/TransparantEffect/EffectImage";
import { Grid, GridItem, Link } from "@chakra-ui/react";
import News from "../../Components/News/News";
import { useState } from "react";
import { useMutation, useQueries, useQuery } from "react-query";
import { getAllEventByExpression, getallEvents } from "../../Services/EventService";
import { useFormik } from "formik";
import { getAllEventCategories } from "../../Services/CategoryService";
const Blog = () => {
  const [category, setCategory] = useState([]);
  const Categorylist = [
    "  CSS Engineering (10)",
    "Political Science (12)",
    "Micro Biology (08)",
    "HTML5 & CSS3 (15)",
    "Web Design (20)",
    "PHP (23)",
  ];
  const [filterData, setFilterData] = useState({
    title: "",
    category: "",
    StartDate: "",
    EndDate: "",
    Location: "",
  });
  const [Events, SetEvent] = useState([]);
  const { mutate } = useMutation(
    (Data) => getAllEventByExpression(Data.title, Data.category, Data.StartDate, Data.EndDate, Data.Location),
    {
      onSuccess: (resp) => {
        SetEvent(resp?.data || []); // Use optional chaining to handle undefined data
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const { mutate: getCategory } = useMutation(() => getAllEventCategories(), {
    onSuccess: (resp) => {
      setCategory(resp);
    },
  });
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    mutate(filterData)
  }, [filterData])
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      StartDate: "",
      EndDate: "",
      Location: "",
    },
    onSubmit: async (values) => {
      mutate(values);
    },
  });
  const currentDateTime = new Date().toISOString().slice(0, 16);
  return (
    <div className={Styles.MainContainer}>
      <EffectImage
        showCenter={false}
        imageLink={EventImage}
        pageName="Events"
        to="/"
      />

      <div className={Styles.MainContent}>
        <Flex
          className={Styles.GridBoxMain}
          gap={10}
          flexWrap={'wrap-reverse'}
        >
          <GridItem className={Styles.MainGridItem}>
            <div className={Styles.Leftside}>
              <Grid
                className={Styles.GridBox}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={5} // Adjust gap as needed
              >
                {Events.length > 0 ? Events.map((queryResult, index) => (
                  <GridItem className={Styles.GridItemMain} key={index}>
                    <EventCard
                      IsShadow={true}
                      ColorTitle={"#28292b"}
                      ColorDetail={"gray"}
                      image={queryResult?.imageRoutue}
                      Title={queryResult?.eventTitle}
                      StartDate={queryResult?.eventStartDate}
                      EndTime={queryResult?.eventFinishDate}
                      Location={queryResult?.location}
                      Category={queryResult?.categoryname}
                      guId={queryResult.guId}
                    />
                  </GridItem>
                )) :<Flex w={"300px"} textAlign={'center'}   style={{columnSpan:"2"}} ><h1 className={Styles.notFound} >Event not Found!</h1></Flex>}
              </Grid>
            </div>
          </GridItem>
          <GridItem className={Styles.MainGridItem}>
            <div className={Styles.Rightside}>
              <div className={Styles.SeachArea}>
                <h1 className={Styles.titleSeach}> Search Event</h1>
                <div className={Styles.Input}>
                  <label htmlFor="search">Search by name</label>
                  <Input name="title" onChange={formik.handleChange} placeholder="Enter name" />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="start">Start Date</label>
                  <Input
                    name="StartDate" onChange={formik.handleChange}
                    type="datetime-local"
                    id="start"
                    placeholder="Select start date..."
                    min={formik.values.EventStartDate}

                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="end">End Date</label>
                  <Input
                    name="EndDate" onChange={formik.handleChange}
                    type="datetime-local"
                    id="end"
                    placeholder="Select end date..."
                  />
                </div>
                <div className={Styles.Input}>
                  <label htmlFor="city">City</label>

                  <Input name="Location"
                    onChange={formik.handleChange}
                    placeholder="Enter city" />
                </div>
                <Button onClick={formik.handleSubmit} color={"white"} backgroundColor={"#3270fc"}>
                  Seacrh
                </Button>
              </div>
              <div className={Styles.list}>
                <h1>Categories</h1>
                <h1>Select Categories</h1>
                <Select
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  name="category"
                  placeholder="Select Category"
                >
                  {category?.data?.map((category, index) => (
                    <option key={index} value={category.category.toString()}>
                      {category.category}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={Styles.Poster}>
                <h1>Best Education theme</h1>
              </div>
            </div>
          </GridItem>
        </Flex>
      </div>
      <News />
    </div>
  );
};

export default Blog;

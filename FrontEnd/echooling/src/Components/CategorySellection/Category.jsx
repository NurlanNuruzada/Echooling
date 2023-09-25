import React, { useEffect, useState } from "react";
import { Button, Flex, Img, Input, Select } from "@chakra-ui/react";
import Stars from "../Starts/Stars";
import Styles from "../CategorySellection/Category.module.css";
import { useMutation, useQuery } from "react-query";
import { getAllCourseategories } from "../../Services/CategoryService";
import { faAngleRight, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import image from '../../Images/logo2.png'
const Category = ({ SetFilterData }) => {
  const Categorylist = [
    "CSS Engineering (10)",
    "Political Science (12)",
    "Micro Biology (08)",
    "HTML5 & CSS3 (15)",
    "Web Design (20)",
    "PHP (23)",
  ];
  const ratings = [1, 2, 3, 4.5];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState([]);

  const { mutate: getCategory } = useMutation(() => getAllCourseategories(), {
    onSuccess: (resp) => {
      setCategory(resp);
    },
  });
  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      rating: "",
    },
    onSubmit: async (values) => {
      SetFilterData({ ...values });
    },
  });

  return (  
    <div className={Styles.Container}>
      <div className={Styles.MainGridItem}>
        <div className={Styles.Rightside}>
          <div ><img style={{ width: "100%", marin: "auto" }} src={image} /></div>
          <div className={Styles.SeachArea}>
            <div className={Styles.Input}>
              <Button
                type="submit"
                onClick={formik.handleSubmit}
                bg={'#3270fc'}
                mb={4}
                w={'100%'}
                color={"white"}
                gap={2}
              >
                Apply Filter
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ color: "white" }}
                />
              </Button>
              <h1 className={Styles.titleSeach}>Search</h1>
              <div className={Styles.SeacContainer}>
                <input
                  placeholder={"search..."}
                  className={Styles.InputEmail}
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </div>
            </div>
          </div>
          <div className={Styles.list}>
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
          <div className={Styles.list}>
            <h1>Rating</h1>
            {ratings.map((rating, index) => (
              <Flex gap={1} key={index}>
                <input
                  onChange={formik.handleChange}
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={formik.values.rating === rating.toString()}
                />
                <Stars initialRating={rating} />
                <span>& Up</span>
              </Flex>
            ))}
          </div>
          <div className={Styles.list}></div>
          <div className={Styles.Poster}>
            <h1>Best Education theme</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

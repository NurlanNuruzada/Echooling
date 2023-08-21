import React, { useState } from "react";
import { Button, Flex, Select } from "@chakra-ui/react";
import SearchInputCom from "../SeacthInput/SearchInput2";
import Stars from "../Starts/Stars";
import Styles from "../CategorySellection/Category.module.css";

const Category = () => {
  const Categorylist = [
    "  CSS Engineering (10)",
    "Political Science (12)",
    "Micro Biology (08)",
    "HTML5 & CSS3 (15)",
    "Web Design (20)",
    "PHP (23)",
  ];
  const SkillLevel = ["Beginner", "Intermediate", "Advanced"];
  const ratings = [1, 2, 3, 4.5];
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleSearch = () => {
    setSelectedRatings([...selectedRatings, searchValue]);
    setSearchValue("");
  };

  const handleCheckboxChange = (item) => {
    if (selectedRatings.includes(item)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== item));
    } else {
      setSelectedRatings([...selectedRatings, item]);
    }
  };

  const filteredCategoryList = Categorylist.filter(category =>
    category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredSkillLevels = SkillLevel.filter(skill =>
    skill.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className={Styles.MainGridItem}>
        <div className={Styles.Rightside}>
          <div className={Styles.SeachArea}>
            <h1 className={Styles.titleSeach}>Search</h1>
            <div className={Styles.Input}>
              <SearchInputCom
                height={"10px"}
                width={"300px"}
                placeholder={"search..."}
                value={searchValue}
                onChange={handleChange}
              />
              <Button onClick={handleSearch}>Add Rating</Button>
            </div>
          </div>
          <div className={Styles.list}>
            <h1>Select Categories</h1>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Select Category"
            >
              {filteredCategoryList.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
          <div className={Styles.list}>
            <h1>Select Skill level</h1>
            <Select
              value={selectedSkill}
              onChange={handleSkillChange}
              placeholder="Select Skill Level"
            >
              {filteredSkillLevels.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
            </Select>
          </div>
          <div className={Styles.Poster}>
            <h1>Best Education theme</h1>
          </div>
          <div className={Styles.list}>
            <h1>Rating</h1>
            {ratings.map((rating, index) => (
              <Flex gap={1} key={index}>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleCheckboxChange(rating)}
                />
                <Stars initialRating={rating} />
                <span>& Up</span>
              </Flex>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

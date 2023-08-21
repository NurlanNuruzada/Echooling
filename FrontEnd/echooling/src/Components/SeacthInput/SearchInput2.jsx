import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Seach.module.css";

const SearchInputCom = ({ width, placeholder, height, onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue); // Call the onSearch function with the input value
  };

  return (
    <div className={Styles.SeacContainer}>
      <input
        style={{ width: width, padding: height  }}
        placeholder={placeholder}
        className={Styles.InputEmail}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        style={{ width: "50px" , padding: `0px ${height}`,   }}
        className={Styles.SeacrhIcon}
        onClick={handleSearchClick} // Handle the button click event
      >
        <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
      </button>
    </div>
  );
};

export default SearchInputCom;

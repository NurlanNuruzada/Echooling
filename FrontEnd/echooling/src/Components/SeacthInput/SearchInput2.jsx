import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Styles from "./Seach.module.css";
const SearchInputCom = ({width}) => {
  return (
    <div className={Styles.SeacContainer}>
      <input style={{width:width}}
        placeholder="Enter your email"
        className={Styles.InputEmail}
        type="text"
      />
      <button  className={Styles.SeacrhIcon}>
        <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
      </button>
    </div>
  );
};

export default SearchInputCom;

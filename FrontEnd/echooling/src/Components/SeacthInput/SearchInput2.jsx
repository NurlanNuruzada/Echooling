import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Styles from "./Seach.module.css";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { sentNotification } from "../../Services/newsService";
import Done from "../DoneModal/Done";

const SearchInputCom = ({ width, placeholder, height, onSearch }) => {
  const [sentSuccess, setSentSuccess] = useState(false);
  const buttonsAndRoute = {
    title: "Successfully registered!"
  };

  const formik = useFormik({
    initialValues: {
      mail: ""
    },
    onSubmit: (values) => {
      console.log(values);
      if (isValidEmail(values.mail)) {
        mutate(values);
      } else {
        formik.setFieldError("mail", "Invalid email address");
      }
    },
    validate: (values) => {
      const errors = {};
      if (!isValidEmail(values.mail)) {
        errors.mail = "Invalid email address";
      }
      return errors;
    }
  });

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { mutate, isLoading: Loginloading, error: Loginerror } =
    useMutation((values) => sentNotification(values), {
      onSuccess: (resp) => {
        setSentSuccess(true);
      },
      onError: (error) => {
        console.log("error");
      },
    });

  useEffect(() => {
    // If sentSuccess is true, start a timer to close the modal after 2.5 seconds
    if (sentSuccess) {
      const timer = setTimeout(() => {
        setSentSuccess(false); // Close the modal
      }, 2500);

      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [sentSuccess]);

  return (
    <div className={Styles.SeacContainer}>
      {sentSuccess && <Done buttonsAndNagivage={buttonsAndRoute} />}
      <input
        style={{ width: width, padding: height }}
        placeholder={placeholder}
        className={Styles.InputEmail}
        type="email"
        name="mail"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.mail}
      />
     
      <button
        style={{ width: "50px", padding: `0px ${height}` }}
        className={Styles.SeacrhIcon}
        onClick={formik.handleSubmit}
      >
        <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
      </button>
      {formik.errors.mail && formik.touched.mail && (
        <div className="error">{formik.errors.mail}</div>
      )}
    </div>
  );
};

export default SearchInputCom;

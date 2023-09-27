import React from "react";
import Styles from "./Contactus.module.css";
import {
  Grid,
  Flex,
  GridItem,
  Input,
  Textarea,
  Button,
  ColorModeContext,
} from "@chakra-ui/react";
import Starts from "../../Components/Starts/Stars";
import image1 from "../../Images/FormImage1.png";
import image2 from "../../Images/FormImage2.png";
import image3 from "../../Images/FormImage3.png";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { ContactUs } from "../../Services/ContactUs";
const ContactUsForm = ({
  title,
  secondTitle,
  address,
  HourOfOperation,
  Mobile,
  Mail,
}) => {
  const { mutate } = useMutation(
    (values) => ContactUs(values),
    {
      onSuccess: (resp) => {
      },
      onError: (error) => {
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      Name: "",
      Surname: "",
      Subject: "",
      Email: "",
      Message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.Name) {
        errors.Name = "Name Required";
      }
      if (!values.Surname) {
        errors.Surname = "Surname Required";
      }
      if (!values.Subject) {
        errors.Subject = "Subject Required";
      }
      if (!values.Email) {
        errors.Email = "Email Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)) {
        errors.Email = "Invalid email address";
      }
      if (!values.Message) {
        errors.Message = "Message Required";
      }
      return errors;
    },
    onSubmit: (values) => {
      mutate(values); // Send the form data to your API or service
    },
  });
  const getAllErrorMessages = () => {
    const errorMessages = [];

    // Check each field for errors and add them to the array
    if (formik.touched.Name && formik.errors.Name) {
      errorMessages.push(formik.errors.Name);
    }
    if (formik.touched.Surname && formik.errors.Surname) {
      errorMessages.push(formik.errors.Surname);
    }
    if (formik.touched.Subject && formik.errors.Subject) {
      errorMessages.push(formik.errors.Subject);
    }
    if (formik.touched.Email && formik.errors.Email) {
      errorMessages.push(formik.errors.Email);
    }
    if (formik.touched.Message && formik.errors.Message) {
      errorMessages.push(formik.errors.Message);
    }

    // Join all error messages with a line break
    return errorMessages.join("\n");
  };
  return (
    <div className={Styles.mainContainer}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          lg: "repeat(2, 1fr)",
          xl: "repeat(2, 1fr)",
        }}
      >
        <div className={Styles.left}>
          <ul>
            <li className={Styles.leftList}>
              <div>
                <img src={image1} alt="" />
              </div>
              <div>
                <h1>Adress</h1>
                <h2>517 Tarkiln Hill Street
                  La Vergne, TN 37086</h2>
              </div>
            </li>
            <li className={Styles.leftList}>
              <div>
                <img src={image2} alt="" />
              </div>
              <div>
                <h1>Contact</h1>
                <h2>(780) 439-4163</h2>
                <h3>nurlangn@code.edu.az</h3>
              </div>
            </li>
            <li className={Styles.leftList}>
              <div>
                <img src={image3} alt="" />
              </div>
              <div>
                <h1>Hour of operation</h1>
                <h2>Our doors are open to welcome you every day from 10 AM to 12 PM. we're here to serve you during these hours.</h2>
              </div>
            </li>
          </ul>
        </div>
        <div className={Styles.right}>
          <div className={Styles.formTitleContainer}>
            <h1>{title}</h1>
            <h2>{secondTitle}</h2>
          </div>
          <div className={Styles.formContainer}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                className={Styles.GridContainer}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(2, 1fr)",
                }}
                rowGap={5}
                columnGap={5}
              >
                <Input
                  size="md"
                  className={Styles.Input}
                  variant="flushed"
                  placeholder="Name"
                  name="Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                />
                
                <Input
                  size="md"
                  className={Styles.Input}
                  variant="flushed"
                  placeholder="Surname"
                  name="Surname"
                  value={formik.values.Surname}
                  onChange={formik.handleChange}
                />
                <Input
                  size="md"
                  className={Styles.Input}
                  variant="flushed"
                  placeholder="Subject"
                  name="Subject"
                  value={formik.values.Subject}
                  onChange={formik.handleChange}
                />
                <Input
                  size="md"
                  className={Styles.Input}
                  variant="flushed"
                  placeholder="Email"
                  name="Email"
                  type="email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Textarea
                variant="flushed"
                className={Styles.Input}
                placeholder="Message"
                name="Message"
                value={formik.values.Message}
                onChange={formik.handleChange}
              />
               {formik.submitCount > 0 && (
                  <div className={`${Styles.error} ${Styles["error-message"]}`}>
                    {getAllErrorMessages()}
                  </div>
                )}
              <Button type="submit" m={5} className={Styles.Button}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default ContactUsForm;

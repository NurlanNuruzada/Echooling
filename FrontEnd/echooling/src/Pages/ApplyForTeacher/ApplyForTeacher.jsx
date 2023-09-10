import React, { useEffect, useState } from "react";
import Styles from "./ApplyForTeacher.module.css"
import { useMutation } from "react-query";
import News from "../../Components/News/News";
import Done from "../../Components/DoneModal/Done";
import { useFormik } from "formik";
import TeacherApplyScema from "../../Valudations/ApplyForTeachers";
import { List, ListItem } from "@chakra-ui/react";
import { Progress } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import {
  Heading,
  Box,
  Button,
  Flex,
  Input,
  tokenToCSSVar,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ApplyAsTeacher, ApplyForTeacherJob } from "../../Services/ApplyForTeacher";
import {  useNavigate, useParams } from "react-router";
import Steps from "../../Components/Steps/Steps";
import jwt_decode from "jwt-decode";
export default function ApplyForTeacher() {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route); 
  };
  const [SentSuccess, setSentSuccess] = useState(false)
  const { select: UserKnowledge } = useParams();
  const { token, Fullname} = useSelector((state) => state.auth);
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
  }
  const formik = useFormik({
    initialValues: {
      hobbies: "",
      faculty: "",
      TotalExperianceHours: 0,
      totalOnlineCourseCount: 0,
      totalStudentCount: 0,
      Facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      profession: "",
      PhoneNumber: "",
      Fullname: Fullname,
      AboutMe: "",
      userKnowledge:UserKnowledge
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema: TeacherApplyScema,
  });
  const { mutate, isLoading, error, } =
    useMutation((values) => ApplyAsTeacher(userId,values), {
      onSuccess: (resp) => {
        setSentSuccess(true)
        console.log(resp);
      },
      onError: (error) => {
        console.log("error");
      },
    });
  const getErrorMessage = (fieldName) => {
    return formik.errors[fieldName] ? formik.errors[fieldName] : "";
  };
  useEffect(() => {
    if (SentSuccess) {
      const timer = setTimeout(() => {
        setSentSuccess(false); // Set it to false to hide the modal
      }, 2500);
      return () => {
        clearTimeout(timer);
        handleNavigate("/");
      };
    }
  }, [SentSuccess]);
  return (
    <>
      <Progress value={100} />
      <Steps CurrentStep={"2"} TotalSteps={"2"}/>
      {SentSuccess && <Done firstTitle={"the Apply request sent Succesfully"} seccondTitle={"we will send email address about your apply check your email address"} />}
      <Flex className={Styles.MainContainer} p={"40px 0"} justifyContent={"center"}>
        <Box minW="0rem">
          <Heading color={"#3270fc"} mb={4}>
            And Lastly Let's fill up the Form 
          </Heading>
          <Flex p={"20px 0"} gap={5} flexFlow={"column"}>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="Your Hobbies (Tenis , gaming)"
                onChange={formik.handleChange}
                name="hobbies"
                value={formik.values.hobbies}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="Your faculty"
                onChange={formik.handleChange}
                name="faculty"
                value={formik.values.faculty}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="Your profession"
                onChange={formik.handleChange}
                name="profession"
                value={formik.values.profession}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="Your Phone number"
                onChange={formik.handleChange}
                name="PhoneNumber"
                value={formik.values.PhoneNumber}
              />
            </Box>
            <Box>
              <Input
                borderColor={"black"}
                variant="flushed"
                pr="4.5rem"
                size="lg"
                placeholder="Tell us about you"
                onChange={formik.handleChange}
                name="AboutMe"
                value={formik.values.AboutMe}
              />
            </Box>
          </Flex>

          <Accordion allowToggle>
            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box  color={"#3270fc"} as="span" flex='1' textAlign='left'>
                    Social Media (Optional)
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel  pb={4}>
                <Box>
                  <Input
                  maxW={360}
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="Facebook Account"
                    onChange={formik.handleChange}
                    name="Facebook"
                    value={formik.values.Facebook}
                  />
                </Box>
                <Box>
                  <Input
                  maxW={360}
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="instagram Account"
                    onChange={formik.handleChange}
                    name="instagram"
                    value={formik.values.instagram}
                  />
                </Box>
                <Box>
                  <Input
                  maxW={360}
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="twitter Account"
                    onChange={formik.handleChange}
                    name="twitter"
                    value={formik.values.twitter}
                  />
                </Box>
                <Box>
                  <Input
                  maxW={360}
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="linkedin Account"
                    onChange={formik.handleChange}
                    name="linkedin"
                    value={formik.values.linkedin}
                  />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          
          <List>
            {Object.keys(formik.errors).map((fieldName) => (
              <ListItem key={fieldName}>
                <div style={{ color: "red", textAlign: "start" }}>
                  {getErrorMessage(fieldName)}
                </div>
              </ListItem>
            ))}
          </List>
          <Flex className={Styles.ButtonContainer} gap={10} flexFlow={"row"}>
            <Button
              className={Styles.Button}
              size="md"
              backgroundColor={"white !important"}
              mt="24px"
              onClick={()=>handleNavigate(`/Applyteacher/teaching-experiance`)}
            >
              Return back
            </Button>
            <Button
              onClick={formik.handleSubmit}
              className={Styles.Button}
              size="md"
              mt="24px"
            >
              Submit Form
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}
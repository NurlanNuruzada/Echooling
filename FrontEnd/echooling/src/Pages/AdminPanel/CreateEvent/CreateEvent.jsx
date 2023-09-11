import Styles from './CreateEvent.module.css'
import { Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import image from '../../../Images/LearnImage.jpg';
import SecondFooter from '../../../Components/Footer/SecondFooter';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import Steps from '../../../Components/Steps/Steps';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    List, ListItem,
    AccordionIcon,
    Heading,
    Box,
    Button,
    Flex,
    Input,
    tokenToCSSVar,
} from "@chakra-ui/react";
import Done from '../../../Components/DoneModal/Done';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
function CreateEvent({ onNext, formData, onPrevious }) {
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };
    const { token, userName, fullname } = useSelector((state) => state.auth);
    if (token != null) {
        var decodedToken = jwt_decode(token);
        var userId =
            decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
    }
    const [step2Data, setStep2Data] = useState("");
    const [SentSuccess, setSentSuccess] = useState(false)
    const handlePreviousClick = () => {
        onPrevious();
    };
    const formik = useFormik({
        initialValues: {
            Cost: "",
            orginazer: "",
            TotalSlot: "",
            Location: "",
            EventTitle: "",
            AboutEvent: "",
            EventFinishDate: "",
            EventStartDate: "",
        },
        onSubmit: (values) => {
            mutate(values);
        },
        // validationSchema: StaffApplyScema,
    });
    const { mutate, isLoading, error, } =
        useMutation((values) => console.log(userId, values), {
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
            }, 4500);
            return () => {
                clearTimeout(timer);
                handleNavigate("/ControlPanel");
            };
        }
    }, [SentSuccess]);
    <button className={Styles.Bu} onClick={handlePreviousClick}>Previus</button>
    return (
        <>
            <Progress value={100} />
            <Steps CurrentStep={"3"} TotalSteps={"3"} />
            {SentSuccess && <Done firstTitle={"the Event Created Succesfully"} seccondTitle={"we will send email address about your Event check your email address"} />}
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
                                placeholder="Event Cost"
                                onChange={formik.handleChange}
                                name="Cost"
                                value={formik.values.Cost}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event EventTitle"
                                onChange={formik.handleChange}
                                name="EventTitle"
                                value={formik.values.EventTitle}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event Location"
                                onChange={formik.handleChange}
                                name="Location"
                                value={formik.values.Location}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event EventStartDate"
                                onChange={formik.handleChange}
                                name="EventStartDate"
                                value={formik.values.EventStartDate}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event EventFinishDate"
                                onChange={formik.handleChange}
                                name="EventFinishDate"
                                value={formik.values.EventFinishDate}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event TotalSlot"
                                onChange={formik.handleChange}
                                name="TotalSlot"
                                value={formik.values.TotalSlot}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event AboutEvent"
                                onChange={formik.handleChange}
                                name="AboutEvent"
                                value={formik.values.AboutEvent}
                            />
                        </Box>
                    </Flex>
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
                            onClick={handlePreviousClick}
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
    );
}

export default CreateEvent
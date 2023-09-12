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
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import Done from '../../../Components/DoneModal/Done';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';

function CreateEvent({ onNext, formData, onPrevious }) {
    const [number, setNumber] = useState(0);

    const format = (val) => {
        return `$${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    const parse = (val) => {
        const parsedValue = parseFloat(val.replace(/[^\d.]/g, ''));
        return isNaN(parsedValue) ? 0 : parsedValue;
    };

    const handleInputChange = (valueString) => {
        // Parse the value from the input
        const parsedValue = parse(valueString);
        setNumber(parsedValue);
    };
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
    const [step3Data, setstep3Data] = useState("");
    const [SentSuccess, setSentSuccess] = useState(false)
    const handlePreviousClick = () => {
        onPrevious();
    };
    const formik = useFormik({
        initialValues: {
            Cost: number,
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
    const currentDateTime = new Date().toISOString().slice(0, 16);

    // Add the missing return statement for your JSX
    return (
        <>
            <Progress value={100} />
            <Steps CurrentStep={"3"} TotalSteps={"3"} />
            {SentSuccess && <Done firstTitle={"the Event Created Succesfully"} seccondTitle={"we will send email address about your Event check your email address"} />}
            <Flex className={Styles.MainContainer} p={"40px 0"} justifyContent={"center"}>
                <Box minW="0rem">
                    <Heading color={"#3270fc"} mb={4}>
                        And Lastly Let's fill up the Event information
                    </Heading>
                    <Flex p={"20px 0"} gap={5} flexFlow={"column"} >
                        <Box >
                            <NumberInput
                                borderColor="black"
                                variant="flushed"
                                size="lg"
                                value={format(number)} // Format the displayed value
                                onChange={(valueString) => handleInputChange(valueString)} // Change this line
                                min={0}
                                step={0.01} // Set the step to 0.01 for two decimal places
                                placeholder="Event Cost"
                                name="Cost"
                                style={{ width: '100%' }}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event Title"
                                onChange={formik.handleChange}
                                name="EventTitle"
                                value={formik.values.EventTitle}
                                className={Styles.Input}
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
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                type="datetime-local"
                                placeholder="EventStartDate"
                                onChange={formik.handleChange}
                                name="EventStartDate"
                                value={formik.values.EventStartDate}
                                className={Styles.Input}
                                min={currentDateTime} // Set the minimum date and time
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                type="datetime-local"
                                placeholder="EventFinishDate"
                                onChange={formik.handleChange}
                                name="EventFinishDate"
                                value={formik.values.EventFinishDate}
                                className={Styles.Input}
                                min={currentDateTime} // Set the minimum date and time
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Event Total Slot"
                                onChange={formik.handleChange}
                                name="TotalSlot"
                                value={formik.values.TotalSlot}
                                className={Styles.Input}
                                type='number'
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="About Event"
                                onChange={formik.handleChange}
                                name="AboutEvent"
                                value={formik.values.AboutEvent}
                                className={Styles.Input}

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

export default CreateEvent;

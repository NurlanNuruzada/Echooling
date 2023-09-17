import Styles from './CreateCourse.module.css'
import { Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';

function CreateCourse({ onNext, formData, onPrevious }) {
    const [number, setNumber] = useState(0);
    const { token, fullname } = useSelector((state) => state.auth); // Update the selector
    const [learningObjectives, setLearningObjectives] = useState([
        '',
        '',
        '',
        '',
    ]);
    const placeholderTexts = [
        "Define the roles and responsibilities of a project manager",
        "Explain key concepts of data analysis",
        "Demonstrate effective communication skills",
        "Discuss best practices in customer service",
    ];
    const initialLearningObjectives = ['', '', '', ''];
    const handleInputChange = (event, index) => {
        const newObjectives = [...formik.values.WhatWillLearn];
        newObjectives[index] = event.target.value;
        formik.setFieldValue('WhatWillLearn', newObjectives);
    };

    const handleAddField = () => {
        setLearningObjectives([...learningObjectives, '']);
    };
    const handleRemoveField = () => {
        if (learningObjectives.length > 4) {
            const newObjectives = [...learningObjectives];
            newObjectives.pop();
            setLearningObjectives(newObjectives);
        }
    };



    const HandleInputChange = (valueString) => {
        setNumber(valueString); // No need to parse, store the string as-is
    };
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };
    const getErrorMessage = (fieldName) => {
        return formik.errors[fieldName] ? formik.errors[fieldName] : "";
    };
    const [step3Data, setstep3Data] = useState("");
    const handleNext = (values) => {
        setstep3Data(values);
        onNext({ step3Data });
    };
    const handlePreviousClick = () => {
        onPrevious();
    };
    const formik = useFormik({
        initialValues: {
            Title: "",
            Rate: '',
            Price: '',
            Instructor: fullname,
            Dutation: '',
            Languge: '',
            Subject: '',
            Enrolled: '',
            ThisCourseIncludes: '',
            AboutCourse: '',
            WhatWillLearn: initialLearningObjectives,
            CounrseContent: '',
            image: '',
        },
        onSubmit: (values) => {
            values.Subject = formData.step2Data[0].category
            // onNext({ step3Data: values });
            console.log(values)
        },
        // validationSchema: CreateEventScema,
    });
    const currentDateTime = new Date().toISOString().slice(0, 16);
    return (
        <>
            <Progress value={75} />
            <Steps CurrentStep={"3"} TotalSteps={"4"} />

            <Flex className={Styles.MainContainer} p={"40px 0"} justifyContent={"center"}>
                <Box minW="0rem">
                    <Heading color={"#3270fc"} mb={4}>
                        And  Let's fill up the Course information
                    </Heading>
                    <Flex p={"20px 0"} gap={5} flexFlow={"column"} >
                        <Box>
                            <NumberInput
                                borderColor="black"
                                variant="flushed"
                                size="lg"
                                value={number} // No need to convert to string
                                onChange={(valueString) => HandleInputChange(valueString)}
                                min={0}
                                step={0.01}
                                placeholder="Event Price"
                                name="Price"
                                style={{ width: '100%' }}
                            >
                                <Flex alignItems={'center'}>
                                    $
                                    <NumberInputField />
                                </Flex>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                        <Box>
                            <h1 className={Styles.FirstTitle}>How about a working title?</h1>
                            <h1 className={Styles.SecondTitle}>It's ok if you can't think of a good title now. You can change it later.</h1>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Title"
                                onChange={formik.handleChange}
                                name="Title"
                                value={formik.values.Title}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <h1 className={Styles.FirstTitle}>How about a working title?</h1>
                            <h1 className={Styles.SecondTitle}>It's ok if you can't think of a good title now. You can change it later.</h1>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="About Course"
                                onChange={formik.handleChange}
                                name="AboutCourse"
                                value={formik.values.AboutCourse}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Languge"
                                onChange={formik.handleChange}
                                name="Languge"
                                value={formik.values.Languge}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="This Course Includes Short"
                                onChange={formik.handleChange}
                                name="ThisCourseIncludes"
                                value={formik.values.ThisCourseIncludes}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <h1 className={Styles.FirstTitle}>What will students learn in your course?</h1>
                            <h1 className={Styles.SecondTitle}>You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.</h1>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="Example: Define the roles and responsibilities of a project manager"
                                onChange={formik.handleChange}
                                name="ThisCourseIncludes"
                                value={formik.values.ThisCourseIncludes}
                                className={Styles.Input}
                            />
                        </Box>
                        <Flex flexDirection={"column"} className={Styles.MainContainer} p={"40px 0"} justifyContent={"center"}>
                            <h1 className={Styles.FirstTitle}>What will students learn in your course?</h1>
                            <h1 className={Styles.SecondTitle}>
                                You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.
                            </h1>
                            {formik.values.WhatWillLearn.map((objective, index) => (
                                <div key={index} className={Styles.InputContainer}>
                                    <Input
                                        borderColor={"black"}
                                        variant="flushed"
                                        pr="4.5rem"
                                        size="lg"
                                        placeholder={"Example: "+placeholderTexts[index] || `Learning Objective ${index + 1}`} // Use the placeholder text or a default text
                                        onChange={(event) => handleInputChange(event, index)}
                                        value={objective}
                                        className={Styles.Input}
                                        name={`WhatWillLearn[${index}]`}
                                    />
                                    {index === formik.values.WhatWillLearn.length - 1 && (
                                        <Button
                                            onClick={handleRemoveField}
                                            className={Styles.RemoveButton}
                                            size="sm"
                                            type="button"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                onClick={handleAddField}
                                size="sm"
                                mt="24px"
                                type="button"
                            >
                                Add Learning Objective
                            </Button>
                        </Flex>

                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            this course includes
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>

                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Flex>
                    {/* <List>
                        {Object.keys(formik.errors).map((fieldName) => (
                            <ListItem key={fieldName}>
                                <div style={{ color: "red", textAlign: "start" }}>
                                    {getErrorMessage(fieldName)}
                                </div>
                            </ListItem>
                        ))}
                    </List> */}
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
                            type="button"
                        >
                            Submit Form
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default CreateCourse;

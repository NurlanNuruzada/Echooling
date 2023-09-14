import Styles from './CreateEvent.module.css'
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

function CreateEvent({ onNext, formData, onPrevious }) {
    const [number, setNumber] = useState(0);

    const parse = (val) => {
        const parsedValue = parseFloat(val.replace(/[^\d.]/g, ''));
        return (parsedValue)
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
          Cost: "",
          orginazer: '',
          TotalSlot: '',
          Location: '',
          EventTitle: '',
          AboutEvent: '',
          EventFinishDate: '',
          EventStartDate: '',
        },
        onSubmit: (values) => {
          onNext({ step3Data: values });
        },
      });
    const currentDateTime = new Date().toISOString().slice(0, 16);
    return (
        <>
            <Progress value={75} />
            <Steps CurrentStep={"3"} TotalSteps={"4"} />

            <Flex className={Styles.MainContainer} p={"40px 0"} justifyContent={"center"}>
                <Box minW="0rem">
                    <Heading color={"#3270fc"} mb={4}>
                        And Lastly Let's fill up the Event information
                    </Heading>
                    <Flex p={"20px 0"} gap={5} flexFlow={"column"} >
                        <Box>
                            <Input
                                borderColor="black"
                                variant="flushed"
                                size="lg"
                                value={formik.values.Cost}
                                onChange={formik.handleChange}
                                min={0}
                                step={0.01}
                                placeholder="Event Cost"
                                name="Cost"
                                style={{ width: '100%' }}
                            >
                            </Input>
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

export default CreateEvent;

import Styles from './CreateEventSteptwo.module.css'
import { Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import image from '../../../Images/LearnImage.jpg';
import SecondFooter from '../../../Components/Footer/SecondFooter';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import Steps from '../../../Components/Steps/Steps';
import { Select } from '@chakra-ui/react'
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
import { getAllEventCategories } from '../../../Services/CategoryService';

export default function CreateEventSteptwo({ onNext, formData, onPrevious }) {
    const [step2Data, setStep2Data] = useState("");
    const [selected, setSelected] = useState(false);
    const [Data, setData] = useState([]);

    const { mutate, isLoading, error } = useMutation(() => getAllEventCategories(), {
        onSuccess: (resp) => {
            console.log(resp);
            setData(resp);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    useEffect(() => {
        mutate();
    }, []);

    const handlePreviousClick = () => {
        onPrevious();
    };

    const handleNext = () => {
        onNext({ step2Data });
    };

    const handleValueChange = (event) => {
        const selectedGuId = event.target.value; // Extract the selected guId from the event
        setStep2Data(selectedGuId);
        setSelected(true);
    };

    return (
        <div>
            <Progress value={66.6} />
            <Steps CurrentStep={2} TotalSteps={3} />
            <div className={Styles.MainContainer}>
                <div className={Styles.container}>
                    <div className={Styles.header}>
                        <h1>Let's add Category</h1>
                        <p>
                           this is very important to select corrrect event category 
                        </p>
                    </div>
                    <div className={Styles.ImageAndRadios}>
                        <Stack>
                            <h1>Please Sellect the Event Category</h1>
                            <Select variant='flushed' placeholder='Select Category' size='lg' onChange={handleValueChange}>
                                {Data.map((data, index) => (
                                    <option key={index} value={data.GuId}>
                                        {data.category}
                                    </option>
                                ))}
                            </Select>
                        </Stack>
                        <img className={Styles.Image} src={image} alt="" />
                    </div>
                </div>
            </div>
            <Flex gap={5}>
                <button className={Styles.Button} onClick={handlePreviousClick}>PREVIUS</button>
                {selected && <button className={Styles.Button} onClick={handleNext}>NEXT</button>}
            </Flex>
        </div>
    );
};

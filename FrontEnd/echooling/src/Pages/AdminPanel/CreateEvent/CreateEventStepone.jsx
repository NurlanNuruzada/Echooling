import React from 'react'
import Styles from './CreateEventStepone.module.css'
import { useState, useEffect } from "react";
import { Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import image from '../../../Images/expand.jpg';
import Steps from '../../../Components/Steps/Steps';
export default function CreateEventStepone({ onNext }) {
    const [step1Data, setStep1Data] = useState("");
    const [selected, setSelected] = useState(false);

    const handleNext = () => {
        onNext({ step1Data });
    };

    const handleValueChange = (newValue) => {
        setStep1Data(newValue);
        setSelected(true)
    };

    // useEffect(() => {
    //   setStep1Data(newValue);
    // }, []);

    return (
        <div>
            <Progress value={33.3} />
            <Steps CurrentStep={1} TotalSteps={3} />
            <div className={Styles.MainContainer}>
                <div className={Styles.container}>
                    <div className={Styles.header}>
                        <h1>Let's learn about you</h1>
                        <p>
                            Over the years we've helped thousands of instructors learn how to event at home. No matter your experience level, you can become a event pro too. We'll equip you with the latest resources, tips, and support to help you succeed.
                        </p>
                    </div>
                    <div className={Styles.ImageAndRadios}>
                        <RadioGroup onChange={handleValueChange} value={step1Data}>
                            <h1>How much "pro" are you in evnets</h1>
                            <Stack>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value="I'm_a_beginner">
                                        I'm a beginner
                                    </Radio>
                                </div>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value='I_have_Some_knowlage'>
                                        I have some knowlage
                                    </Radio>
                                </div>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value="I'm_experiance">
                                        I'm experiance
                                    </Radio>
                                </div>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value="I_have_videos_ready_to_upload">
                                        I have videos ready to upload
                                    </Radio>
                                </div>
                            </Stack>
                        </RadioGroup>
                        <img className={Styles.Image} src={image} alt="" />
                    </div>
                </div>
            </div>
            {selected && <button className={Styles.Button} onClick={handleNext}>NEXT</button>}
        </div>
    );
};

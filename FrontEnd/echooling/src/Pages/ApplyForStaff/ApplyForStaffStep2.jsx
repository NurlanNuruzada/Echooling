import React, { useState } from "react";
import { Flex, Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import Styles from './ApplyForStaff.module.css';
import image from '../../Images/expand.jpg';
import Button from '../../Components/Button/Button';
import Steps from '../../Components/Steps/Steps';

const ApplyStaffFirstStep2 = ({ onNext, onPrevious, formData }) => {
    const [step2Data, setStep2Data] = useState("");
    const [selected, setSelected] = useState(false);

    const handleNext = () => {
        onNext({ step2Data });
    };

    const handlePreviousClick = () => {
        onPrevious();
    };

    const handleValueChange = (newValue) => {
        setStep2Data(newValue);
        setSelected(true);
    };

    return (
        <div>
            <Progress value={66.6} />
            <Steps CurrentStep={2} TotalSteps={3} />
            <div className={Styles.MainContainer}>
                <div className={Styles.container}>
                    <div className={Styles.header}>
                        <h1>Expand your reach</h1>
                        <p>
                            Once you publish your event, you can grow your attendees and make an impact with the support of Echooling's marketplace promotions and also through your own marketing efforts. Together, we'll help the right attendees discover your course.
                        </p>
                    </div>
                    <div className={Styles.ImageAndRadios}>
                        <RadioGroup onChange={handleValueChange} value={step2Data}>
                            <h1>Do you have attendees to share your events with?</h1>
                            <Stack>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value='I_have_small_following'>
                                        I have a small following
                                    </Radio>
                                </div>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value='I_have_sizeable_following'>
                                        I have a sizeable following
                                    </Radio>
                                </div>
                                <div className={Styles.Radio}>
                                    <Radio colorScheme='gray' value='not_at_the_moment'>
                                        Not at the moment
                                    </Radio>
                                </div>
                            </Stack>
                        </RadioGroup>
                        <img className={Styles.Image} src={image} alt="" />
                    </div>
                </div>
            </div>
            <Flex>
                <button className={Styles.Button} onClick={handlePreviousClick}>PREVIOUS</button>
                {selected && <button className={Styles.Button} onClick={handleNext}>NEXT</button>}
            </Flex>
        </div>
    );
};

export default ApplyStaffFirstStep2;

import { Progress, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Steps from '../Steps/Steps';
import Styles from './ApplyTeahcerShareKnowlage.module.css';
import image from '../../Images/LearnImage.jpg';
import SecondFooter from '../Footer/SecondFooter'
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
export default function KnowlageApply() {
  const [value, setValue] = useState();
  const [sellected, setsellected] = useState(false);
  const handleValueChange = (newValue) => {
    setValue(newValue);
    setsellected(true)
  };

  return (
    <div>
      <Progress value={50} />
      <Steps CurrentStep={1} TotalSteps={2} />
      <div className={Styles.MainContainer}>
        <div className={Styles.container}>
          <div className={Styles.header}>
            <h1>Share Your Knowledge</h1>
            <p>
              Echooling courses are video-based experiences that give students
              the chance to learn actionable skills. Whether you have experience
              teaching, or it's your first time, we'll help you package your
              knowledge into an online course that improves student lives.
            </p>
          </div>
          <div className={Styles.ImageAndRadios}>
            <RadioGroup onChange={handleValueChange} value={value}>
              <h1>What kind of teaching have you done before?</h1>
              <Stack>
                <div className={Styles.Radio}>
                  <Radio colorScheme='gray' value='In_person,informally'>
                    In person, informally
                  </Radio>
                </div>
                <div className={Styles.Radio}>
                  <Radio colorScheme='gray' value='In_person,profesionally'>
                    In person, professionally
                  </Radio>
                </div>
                <div className={Styles.Radio}>
                  <Radio colorScheme='gray' value='online'>
                    Online
                  </Radio>
                </div>
                <div className={Styles.Radio}>
                  <Radio colorScheme='gray' value='other'>
                    Other
                  </Radio>
                </div>
              </Stack>
            </RadioGroup>
            <img className={Styles.Image} src={image} alt="" />
          </div>
        </div>
      </div>
      <SecondFooter NavigateTo={`/Applyteacher/${value}`} ShowButton={sellected}/>
    </div>
  );
}

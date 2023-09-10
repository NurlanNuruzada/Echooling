import React from "react";
import Styles from './Steps.module.css'
export default function Steps({TotalSteps,CurrentStep}) {
    return (
        <h1 className={Styles.Steps}>Step {CurrentStep} of {TotalSteps}</h1>
    );
  }
  
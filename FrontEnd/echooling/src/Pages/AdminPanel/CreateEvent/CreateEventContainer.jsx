import React, { useEffect, useState } from "react";
import CreateEventStepone from "./CreateEventStepone";
import CreateEventSteptwo from "./CreateEventSteptwo";
import CreateEvent from "./CreateEvent";
import CreateEventLast from "./CreateEventLast";
import { useMutation } from "react-query";
import { useFormik } from "formik";

export default function CreateEventContainer() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        step1Data: "",
        step2Data: "",
        step3Data: "",
        step4Data: "",
    });

    const handleNext = (data) => {
        setCurrentStep(currentStep + 1);
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };


    //create event 
   
    useEffect(() => {
    }, [formData]);
    
    return (
        <div>
            {currentStep === 1 && <CreateEventStepone onNext={handleNext} />}
            {currentStep === 2 && (
                <CreateEventSteptwo onPrevious={handlePrevious} onNext={handleNext} />
            )}
            {currentStep === 3 && (
                <CreateEvent onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
            {currentStep === 4 && (
                <CreateEventLast onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
        </div>
    );
}

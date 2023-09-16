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
        step2Data: "",
        step3Data: "",
        step4Data: "",
    });

    const handleNext = (data) => {
        setCurrentStep(currentStep + 1);
        setFormData((prevData) => ({ ...prevData, ...data }));
        console.log(formData);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };


    //create event 
   
    useEffect(() => {
    }, [formData]);
    
    return (
        <div>
            {currentStep === 1 && (
                <CreateEventSteptwo  onNext={handleNext} />
            )}
            {currentStep === 2 && (
                <CreateEvent onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
            {currentStep === 3 && (
                <CreateEventLast onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
        </div>
    );
}

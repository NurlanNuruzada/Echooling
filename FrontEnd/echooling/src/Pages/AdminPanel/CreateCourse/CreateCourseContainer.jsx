import React, { useEffect, useState } from "react";
import CreateEventStepone from "./CreateCourseStepone";
import CreateEventSteptwo from "./CreateCourseSteptwo";
import CreateEvent from "./CreateCourse";
import CreateEventLast from "./CreateCourseLast";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import CreateCourseStepone from "./CreateCourseStepone";
import CreateCourseSteptwo from "./CreateCourseSteptwo";
import CreateCourse from "./CreateCourse";
import CreateCourseLast from "./CreateCourseLast";

export default function CreateCourseContainer() {
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
            {currentStep === 1 && <CreateCourseStepone onNext={handleNext} />}
            {currentStep === 2 && (
                <CreateCourseSteptwo onPrevious={handlePrevious} onNext={handleNext} />
            )}
            {currentStep === 3 && (
                <CreateCourse onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
            {currentStep === 4 && (
                <CreateCourseLast onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
        </div>
    );
}

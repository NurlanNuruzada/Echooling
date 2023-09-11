import React, { useEffect, useState } from "react";
import CreateEventStepone from "./CreateEventStepone";
import CreateEvent from "./CreateEvent";

export default function CreateEventContainer() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        step1Data: "",
        step2Data: "",
    });

    const handleNext = (data) => {
        setCurrentStep(currentStep + 1);
        setFormData((prevData) => ({ ...prevData, ...data }));
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        console.log(formData); // Check if formData is updated correctly
    }, [formData]);

    return (
        <div>
            {currentStep === 1 && <CreateEventStepone onNext={handleNext} />}
            {currentStep === 2 && (
                <CreateEvent onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
            )}
        </div>
    );
};

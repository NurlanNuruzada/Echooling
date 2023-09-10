import React, { useEffect, useState } from "react";
import ApplyStaffFirstStep from "./ApplyStaffFirstStep";
import ApplyForStaff from "./ApplyForStaff";
import ApplyStaffFirstStep2 from "./ApplyForStaffStep2";

const ApplyForStaffContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1Data: "",
    step2Data: "",
  });

  const handleNext = (data) => {
    setCurrentStep(currentStep + 1);

    // Use functional updates to ensure the latest state is used
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
      {currentStep === 1 && <ApplyStaffFirstStep onNext={handleNext} />}
      {currentStep === 2 && (
        <ApplyStaffFirstStep2 onPrevious={handlePrevious} onNext={handleNext} formData={formData} />
      )}
      {currentStep === 3 && (
        <ApplyForStaff onPrevious={handlePrevious} formData={formData} />
      )}
    </div>
  );
};

export default ApplyForStaffContainer;

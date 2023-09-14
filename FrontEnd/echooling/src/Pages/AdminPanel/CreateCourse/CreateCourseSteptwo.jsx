import React, { useState, useEffect } from 'react';
import Styles from './CreateCourseSteptwo.module.css';
import {
  Progress,
  Stack,
  Select,
  Flex,
  Input,
} from '@chakra-ui/react';
import image from '../../../Images/LearnImage.jpg';
import Steps from '../../../Components/Steps/Steps';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import { getAllEventCategories } from '../../../Services/CategoryService';
import { getSliders } from '../../../Services/SliderService';

export default function CreateCourseSteptwo({ onNext, formData, onPrevious }) {
  const [step2Data, setStep2Data] = useState('');
  const [selected, setSelected] = useState(false);
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [filteredData, setFilteredData] = useState([]); // Initialize as an empty array

  const { mutate, isLoading, error } = useMutation(() => getAllEventCategories(), {
    onSuccess: (resp) => {
      console.log(resp);
      setOriginalData(resp); // Set the original data
      setFilteredData(resp); // Initialize filtered data with the original data
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
    const selectedGuId = event.target.value;
    setStep2Data(selectedGuId);
    setSelected(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();

    // Filter the original data based on the search query
    const filteredData = originalData.filter((data) =>
      data.category.toLowerCase().includes(query)
    );

    setFilteredData(filteredData); // Update the filtered data

    // Optional: If you want to update the selected option when you search, you can clear the selected state here.
    // setSelected(false);
  };

  return (
    <div>
          <Progress value={50} />
      <Steps CurrentStep={2} TotalSteps={4} />
      <div className={Styles.MainContainer}>
        <div className={Styles.container}>
          <div className={Styles.header}>
            <h1>Let's add Category</h1>
            <p>
              This is very important to select the correct event category.
            </p>
          </div>
          <div className={Styles.ImageAndRadios}>
            <Stack>
              <h1>Please Select the Event Category</h1>
              <Input
                variant='flushed'
                placeholder='Search Category'
                size='lg'
                onChange={handleSearchChange}
              />
              <Select
                variant='flushed'
                placeholder='Select Category'
                size='lg'
                onChange={handleValueChange}
              >
                {filteredData.map((data, index) => (
                  <option key={index} value={data.GuId}>
                    {data.category}
                  </option>
                ))}
              </Select>
            </Stack>
            <img className={Styles.Image} src={image} alt='' />
          </div>
        </div>
      </div>
      <Flex gap={5}>
        <button className={Styles.Button} onClick={handlePreviousClick}>PREVIOUS</button>
        {selected && <button className={Styles.Button} onClick={handleNext}>NEXT</button>}
      </Flex>
    </div>
  );
}

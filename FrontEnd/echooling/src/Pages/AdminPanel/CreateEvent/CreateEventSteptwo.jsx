import React, { useState, useEffect } from 'react';
import Styles from './CreateEventSteptwo.module.css';
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

export default function CreateEventSteptwo({ onNext, formData, onPrevious }) {
  const [step2Data, setStep2Data] = useState('');
  const [selected, setSelected] = useState(false);
  const [Data, setData] = useState({ data: [] }); // Initialize Data as an object with an empty data array
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Initialize filteredData as an empty array

  const { mutate, isLoading, error } = useMutation(() => getAllEventCategories(), {
    onSuccess: (resp) => {
      setData(resp);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    Data.data?.filter((data) =>
      data.category.toLowerCase().includes(query)
    ).map((data) => setFilteredData(data));
    console.log(filteredData)
  }, [searchQuery])

  useEffect(() => {
    mutate();

  }, []);

  const handleNext = () => {
    onNext({ step2Data });
  };

  const handleValueChange = (event) => {
    const selectedGuId = event.target.value;
    console.log(selectedGuId)
    setStep2Data(selectedGuId);
    setSelected(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };
  const handlePreviousClick = () => {
    onPrevious();
};
  return (
    <div>
          <Progress value={33.3} />
      <Steps CurrentStep={1} TotalSteps={3} />
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
                {searchQuery ? <option value={filteredData.guId} >
                  {filteredData.category}
                </option> : Data?.data?.map((data, index) => (
                  <option key={index} value={data.guId}>
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
        {selected && <button className={Styles.Button} onClick={handleNext}>NEXT</button>}
      </Flex>
    </div>
  );
}

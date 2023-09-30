import React, { useState, useEffect } from 'react';
import Styles from './CreateCourseSteptwo.module.css';
import {
  Progress,
  Stack,
  Select,
  Flex,
  Input,
  List,
  ListItem,
} from '@chakra-ui/react';
import image from '../../../Images/LearnImage.jpg';
import Steps from '../../../Components/Steps/Steps';
import { useMutation, useQuery } from 'react-query';
import { getAllCourseategories } from '../../../Services/CategoryService';

export default function CreateCourseSteptwo({ onNext }) {
  const [step2Data, setStep2Data] = useState('');
  const [selected, setSelected] = useState(false);
  const [Data, setData] = useState({ data: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { mutate } = useMutation(() => getAllCourseategories(), {
    onSuccess: (resp) => {
      setData(resp);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredData(Data.data?.filter((data) =>
      data.category.toLowerCase().includes(query)
    ));
  }, [searchQuery, Data.data]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handleNext = () => {
    onNext({ step2Data });
  };

  const handleValueChange = (event) => {
    const selectedValue = event.target.value;
    const [GuId, category] = selectedValue.split(',');
    const selectedData = { GuId, category };
    const selectedDataArray = [selectedData];
    setStep2Data(selectedDataArray);
    setSelected(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <div>
      <Progress value={25} />
      <Steps CurrentStep={1} TotalSteps={4} />
      <div className={Styles.MainContainer}>
        <div className={Styles.container}>
          <div className={Styles.header}>
            <h1>What category best fits the knowledge you'll share?</h1>
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
                {searchQuery ? (
                  filteredData.map((data) => (
                    <option key={data.guId} value={`${data.guId},${data.category}`}>
                      {data.category}
                    </option>
                  ))
                ) : (
                  Data.data?.map((data) => (
                    <option key={data.guId} value={`${data.guId},${data.category}`}>
                      {data.category}
                    </option>
                  ))
                )}
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

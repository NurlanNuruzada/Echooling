import React, { useState, useEffect } from 'react';
import Styles from './CreateEventStepone.module.css';
import {
  Progress,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Input,
} from '@chakra-ui/react';
import image from '../../../Images/expand.jpg';
import Steps from '../../../Components/Steps/Steps';
import { useMutation } from 'react-query';
import { getAllEventCategories } from '../../../Services/CategoryService';
import { GetUStaffUsers } from '../../../Services/StaffService';
import { AddAppUserToEvent } from '../../../Services/EventService';

export default function CreateEventStepone({ onNext }) {
  const [step1Data, setStep1Data] = useState('');
  const [selected, setSelected] = useState(false);
  const [Data, setData] = useState({ data: [] }); // Initialize Data as an object with an empty data array
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); // Initialize filteredData as an empty array

  const { mutate, isLoading, error } = useMutation(() => GetUStaffUsers(), {
    onSuccess: (resp) => {
      setData(resp);
    },
    onError: (error) => { 
      console.log(error);
    },
  });
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    Data.data?.filter((data) =>
      data.userName.toLowerCase().includes(query)
    ).map((data) => setFilteredData(data));
  }, [searchQuery])

  useEffect(() => {
    mutate();
  }, []);

  const handleNext = () => {
    onNext({ step1Data });
  };

  const handleValueChange = (event) => {
    const selectedGuId = event.target.value;
    console.log(selectedGuId)
    setStep1Data(selectedGuId);
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
            <h1>Let's Sellect the Atendances you want </h1>
            <p>
              you can able to sellect any teaher or stuff to work for you or just invite some of the users u want.
              you can simply skip this one if you want.
            </p>
          </div>
          <div className={Styles.ImageAndRadios}>
            <Stack>
              <h1> Select the Event Atendances and Staff</h1>
              <Input
                variant='flushed'
                placeholder='Search'
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
                  {filteredData.userName}
                </option> : Data?.data?.map((data, index) => (
                  <option key={index} value={data.guId}>
                    {data.userName}
                  </option>
                ))}
              </Select>
            </Stack>
            <img className={Styles.Image} src={image} alt='' />
          </div>
        </div>
      </div>
      {true && (
        <button className={Styles.Button} onClick={handleNext}>
          NEXT
        </button>
      )}
    </div>
  );
}

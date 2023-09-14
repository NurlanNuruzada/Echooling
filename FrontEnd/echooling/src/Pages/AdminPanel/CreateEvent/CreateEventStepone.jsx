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

export default function CreateEventStepone({ onNext }) {
  const [step1Data, setStep1Data] = useState(''); // No initial value for step1Data
  const [selected, setSelected] = useState(false); // Set initial selected state to false
  const [Data, setData] = useState({ data: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { mutate, isLoading, error } = useMutation(() => getAllEventCategories(), {
    onSuccess: (resp) => {
      console.log(resp);
      setData(resp);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filteredData = Data.data?.filter((data) =>
      data.category.toLowerCase().includes(query)
    );
    setFilteredData(filteredData);
  }, [searchQuery, Data]);

  const handleNext = () => {
    onNext({ step1Data });
  };

  const handleValueChange = (event) => {
    const selectedGuId = event.target.value;
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
            <h1>Let's Select the Attendees you want</h1>
            <p>
              You can select any teacher or staff to work for you or just invite some of the users you want.
              You can simply skip this step if you want.
            </p>
          </div>
          <div className={Styles.ImageAndRadios}>
            <Stack>
              <h1> Select the Event Attendees and Staff</h1>
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
                value={step1Data} // Set the initial value here
              >
                {filteredData?.map((data, index) => (
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
      {selected && (
        <button className={Styles.Button} onClick={handleNext}>
          NEXT
        </button>
      )}
    </div>
  );
}

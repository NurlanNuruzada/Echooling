import React, { useEffect, useState } from 'react';
import Styles from './EventUpdate.module.css';
import { useNavigate, useParams } from 'react-router';
import {
  Heading,
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Done from '../../../Components/DoneModal/Done';
import { UpdateEventById, GetEventId } from '../../../Services/EventService';
import { getAllEventCategories } from '../../../Services/CategoryService';
import updateEventScema from '../../../Valudations/EventUpdateScema';

export default function UpdateEvent() {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [step2Data, setStep2Data] = useState(null);
  const [PreviusData, SetPreviusData] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      formik.setFieldValue('image', selectedFile);
    } else {
      console.error('No file selected.');
    }
  };

  const formik = useFormik({
    initialValues: {
      image: null,
      EventTitle: '',
      AboutEvent: '',
      cost: '',
      EventFinishDate: '',
      EventStartDate: '',
      Location: '',
      orginazer: '',
      TotalSlot: '',
      EventCategoryiesId: '',
      Categoryname: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('image', values.image || ' ');
      formData.append('EventTitle', values.EventTitle ? values.EventTitle : PreviusData.eventTitle);
      formData.append('aboutEvent', values.AboutEvent ? values.AboutEvent : PreviusData.aboutEvent);
      formData.append('cost', values.cost ? values.cost : PreviusData.cost);
      formData.append('EventFinishDate', values.EventFinishDate ? values.EventFinishDate : PreviusData.eventFinishDate);
      formData.append('EventStartDate', values.EventStartDate ? values.EventStartDate : PreviusData.eventStartDate);
      formData.append('Location', values.Location ? values.Location : PreviusData.location);
      formData.append('orginazer', values.orginazer ? values.orginazer : PreviusData.orginazer);
      formData.append('TotalSlot', values.TotalSlot ? values.TotalSlot : PreviusData.totalSlot);
      formData.append(
        'EventCategoryiesId',
        values.EventCategoryiesId || PreviusData.eventCategoryiesId
      );
      formData.append(
        'Categoryname',
        values.Categoryname || PreviusData.categoryname
      );
      if (formData.get('image')) {
        try {
          await mutateAsync(formData);
          setSuccess(true);
          queryClient.invalidateQueries('events');
        } catch (error) {
          console.error(error);
        }
      } else {
      }
    },
    validationSchema: updateEventScema,
    validateOnBlur: true,
    validateOnChange: false,
  });
  const { mutateAsync } = useMutation((formData) =>
    UpdateEventById(id, formData)
  );
  const { mutate: Previus } = useMutation((id) => GetEventId(id), {
    onSuccess: (resp) => {
      SetPreviusData(resp);
    },
    onError: (error) => {
    },
  });
  useEffect(() => {
    Previus(id)
  }, [])



  const loadCategories = async () => {
    try {
      const response = await getAllEventCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        handleNavigate("/ControlPanel/Events")
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [success]);
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className={Styles.MainContainer}>
      <Flex>
        {success && (
          <Done
            firstTitle={'Success'}
            seccondTitle={'the Event Updated Successfully'}
          />
        )}
        <Box minW="0rem">
          <Flex gap={5} flexFlow={'column'}>
            <Heading color={'#3270fc'}>Update Event</Heading>
            <img
              className={Styles.Image}
              src={`/Uploads/Event/${PreviusData?.imageRoute}`}
              alt=""
            />
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Title: </h1>
              <span>{PreviusData?.eventTitle}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Cost: </h1>{' '}
              <span>{PreviusData?.cost}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>About Event: </h1>
              <span>{PreviusData?.aboutEvent}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Event Finish Date: </h1>
              <span>{PreviusData?.eventFinishDate}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Event Start Date: </h1>
              <span>{PreviusData?.eventStartDate}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Location: </h1>
              <span>{PreviusData?.location}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Organizer: </h1>
              <span>{PreviusData?.orginazer}</span>
            </Flex>
            <Flex>
              <h1 style={{ color: '#3270fc' }}>Total Slot: </h1>
              <span>{PreviusData?.totalSlot}</span>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <form className={Styles.Input} onSubmit={formik.handleSubmit}>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            pr="4.5rem"
            size="lg"
            placeholder="Event Title"
            onChange={formik.handleChange}
            name="EventTitle"
            value={formik.values.EventTitle}
            className={Styles.Input}
          />
          {formik.errors.EventTitle && (
            <Text color="red" fontSize="sm">
              {formik.errors.EventTitle}
            </Text>
          )}
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            pr="4.5rem"
            size="lg"
            placeholder="AboutEvent"
            onChange={formik.handleChange}
            name="AboutEvent"
            value={formik.values.AboutEvent}
            className={Styles.Input}
          />
          {formik.errors.AboutEvent && (
            <Text color="red" fontSize="sm">
              {formik.errors.AboutEvent}
            </Text>
          )}
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            pr="4.5rem"
            size="lg"
            placeholder="Cost"
            type='number'
            onChange={formik.handleChange}
            name="cost"
            value={formik.values.cost}
            className={Styles.Input}
          />
          {formik.errors.cost && (
            <Text color="red" fontSize="sm">
              {formik.errors.cost}
            </Text>
          )}
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            size="lg"
            placeholder="Event Finish Date"
            onChange={formik.handleChange}
            name="EventStartDate"
            value={formik.values.EventStartDate}
            className={Styles.Input}
            type="datetime-local"
            min={currentDateTime}
          />
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            size="lg"
            placeholder="Event Start Date"
            onChange={formik.handleChange}
            name="EventFinishDate"
            value={formik.values.EventFinishDate}
            className={Styles.Input}
            type="datetime-local"
            min={formik.values.EventStartDate || currentDateTime}
          />
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            pr="4.5rem"
            size="lg"
            placeholder="Location"
            onChange={formik.handleChange}
            name="Location"
            value={formik.values.Location}
            className={Styles.Input}
          />
          {formik.errors.Location && (
            <Text color="red" fontSize="sm">
              {formik.errors.Location}
            </Text>
          )}
        </Box>
        <Box>
          <Input
            borderColor={'black'}
            variant="flushed"
            pr="4.5rem"
            size="lg"
            placeholder="Total Slot"
            onChange={formik.handleChange}
            name="TotalSlot"
            type='number'
            value={formik.values.TotalSlot}
            className={Styles.Input}
          />
          {formik.errors.TotalSlot && (
            <Text color="red" fontSize="sm">
              {formik.errors.TotalSlot}
            </Text>
          )}
        </Box>
        <Select
          variant="flushed"
          placeholder="Select Category"
          size="lg"
          onChange={(e) => {
            const selectedCategoryId = e.target.value;
            setSelectedCategory(selectedCategoryId);

            const selectedCategoryObject = categories.find(category => category.guId === selectedCategoryId);

            if (selectedCategoryObject) {
              const selectedCategoryName = selectedCategoryObject.category;
              formik.setFieldValue('EventCategoryiesId', selectedCategoryId); // Set the selected category ID to form data
              formik.setFieldValue('Categoryname', selectedCategoryName); // Set the selected category name to form data
            }
          }}
          name='EventCategoryiesId'
          value={selectedCategory} // Make sure to set the value prop to the selectedCategory state
        >
          {categories.map((category) => (
            <option key={category.guId} value={category.guId}>
              {category.category}
            </option>
          ))}
        </Select>

        <Flex
          alignItems="center"
          className={Styles.ButtonContainer}
          justifyContent="center"
          gap={10}
          flexFlow="row"
        >
          <Button
            className={Styles.Button}
            size="md"
            backgroundColor="white !important"
            mt="24px"
            onClick={() => handleNavigate('/ControlPanel/Events')}
          >
            Return to menu
          </Button>
          {true && (
            <Button mt="24px" className={Styles.Button} type="submit">
              Submit
            </Button>
          )}
        </Flex>
      </form>
    </div>
  );
}

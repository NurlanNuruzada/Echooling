import React, { useState, useEffect } from 'react';
import Styles from './EventsAdmin.module.css'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button, Flex, Input, Progress, styled } from '@chakra-ui/react';
import Done from '../../../Components/DoneModal/Done';
import Steps from '../../../Components/Steps/Steps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { CreateSliderFunction, DeleteSliders, getSliders } from '../../../Services/SliderService';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { DeleteEvents, getallEvents } from '../../../Services/EventService';

export default function EventsAdmin() {

  const [SentSuccess, setSentSuccess] = useState(false);
  const [Id, setId] = useState('');
  const [File, SetFile] = useState(null);
  const [FileName, SetFileName] = useState('');
  const { token, userName } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sliders"],
    queryFn: getallEvents,
    staleTime: 0,
  });
  console.log(data)
  //Create Slider Funtion Start
  const { mutate } = useMutation(
    (formData) => CreateSliderFunction(formData),
    {
      onSuccess: (resp) => {
        setSentSuccess(true);
        queryClient.invalidateQueries("sliders");
        console.log(resp);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const fileUploadHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      SetFile(selectedFile);
      SetFileName(selectedFile.name);
      formik.setFieldValue('image', selectedFile)
    } else {
      console.error("No file selected.");
    }
  };


  const formik = useFormik({
    initialValues: {
      image: File,
      SecondTitle: "",
      Description: "",
      Title: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", File ? File : null);
      formData.append("Title", values.Title);
      formData.append("SeccondTile", values.SeccondTile);
      formData.append("Description", values.Description);

      if (formData.get("image")) {
        console.log("FormData before muration", formData)
        mutate(formData);
      } else {
        console.log("FormData is null");
      }
    },
  });
  //Create Slider Funtion end

  useEffect(() => {
    if (SentSuccess) {
      const timer = setTimeout(() => {
        setSentSuccess(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [SentSuccess]);

  var number = 0
  const queryClient = useQueryClient()
  const { mutate: Delete } = useMutation(
    (Id) => DeleteEvents(Id),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['sliders']);
      }
    }
  );
  return (
    <div>
      <div>
        <Button className={Styles.TableButon} m={10} onClick={() => handleNavigate("/ControlPanel/Event/Category")} color={'white '} borderColor={'white'} backgroundColor={"green"}>Create Category</Button>
        <Button className={Styles.TableButon} m={10} onClick={() => handleNavigate("/ControlPanel/CreateEvent")} color={'white '} borderColor={'white'} backgroundColor={"blue"}>Create Event</Button>
      </div>
      <Flex className={Styles.Table}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        <Table size='sm' >
          <TableCaption>Get all Events </TableCaption>
          <Thead>
            <Tr >
              <Th></Th>
              <Th >image</Th>
              <Th>Title</Th>
              <Th className={Styles.displayNone}>orginazer</Th>
              <Th className={Styles.displayNone}>cost</Th>
              <Th className={Styles.displayNone}>Total Slot</Th>
              <Th className={Styles.displayNone}>Event Start Date</Th>
              <Th className={Styles.displayNone}>Event End Date</Th>
              <Th className={Styles.displayNone}>Event category</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody >
            {data?.data.map((Event) => (
              <Tr key={Event.guId}>
                <Td  >{number += 1}.</Td>
                <Td className={Styles.image} ><img width={200} src={`/Uploads/Event/${Event.imageRoutue}`} alt="" /></Td>
                <Td  >{Event.eventTitle}</Td>
                <Td className={Styles.displayNone}>{Event.orginazer}</Td>
                <Td className={Styles.displayNone} >{Event.cost}</Td>
                <Td className={Styles.displayNone} >{Event.totalSlot}</Td>
                <Td className={Styles.displayNone} >{Event.eventStartDate}</Td>
                <Td className={Styles.displayNone} >{Event.eventFinishDate}</Td>
                <Td className={Styles.displayNone} >{Event.categoryname}</Td>
                <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => handleNavigate(`/ControlPanel/UpdateEvent/${Event.guId}`)} color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => Delete(Event.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </div>
  )
}

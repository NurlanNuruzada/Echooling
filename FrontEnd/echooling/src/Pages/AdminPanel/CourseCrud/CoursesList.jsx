import React from 'react'
import Styles from './CoursesList.module.css'
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
import { useState } from 'react';
import { useEffect } from 'react';
import { DeleteCourse, getallCourses } from '../../../Services/CourseService';
export default function CoursesList() {
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
    queryKey: ["Courses"],
    queryFn: getallCourses,
    staleTime: 0,

  });
  //Create Slider Funtion Start
  const { mutate } = useMutation(
    (formData) => CreateSliderFunction(formData),
    {
      onSuccess: (resp) => {
        setSentSuccess(true);
        queryClient.invalidateQueries("Courses");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

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
        mutate(formData);
      } else {
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
    (Id) => DeleteCourse(Id),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['Courses']);
      }
    }
  );
  return (
    <div>
      <div>
        <Button className={Styles.TableButon} m={10} onClick={() => handleNavigate("/ControlPanel/Course/Category")} color={'white '} borderColor={'white'} backgroundColor={"green"}>Create Category</Button>
        <Button className={Styles.TableButon} m={10} onClick={() => handleNavigate("/ControlPanel/CreateCourseContainer")} color={'white '} borderColor={'white'} backgroundColor={"blue"}>Create Course</Button>
      </div>
      <Flex className={Styles.Table}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        <Table size='sm' >
          <TableCaption>Get all Coures </TableCaption>
          <Thead>
            <Tr >
              <Th></Th>
              <Th >image</Th>
              <Th>Title</Th>
              <Th className={Styles.displayNone}>price</Th>
              <Th className={Styles.displayNone}>rate</Th>
              <Th className={Styles.displayNone}>category</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody >
            {data?.data.map((Course) => (
              <Tr key={Course.guId}>
                <Td  >{number += 1}.</Td>
                <Td className={Styles.image} ><img width={200} src={`/Uploads/Course/${Course.imageRoutue}`} alt="" /></Td>
                <Td  >{Course.title.slice(0, 30)}...</Td>
                <Td className={Styles.displayNone}>{Course.price}</Td>
                <Td className={Styles.displayNone} >{Course.rate}</Td>
                <Td className={Styles.displayNone} >{Course.subject.toString()}</Td>
                <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => Delete(Course.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => handleNavigate(`/ControlPanel/Course/Update/${Course.guId}`)} color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                <Td><Button className={Styles.TableButon} m={10} onClick={() => handleNavigate(`/ControlPanel/Course/GetReviews/${Course.guId}`)} color={'white '} borderColor={'white'} backgroundColor={"purple"}>Reveiws</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </div>
  )
}

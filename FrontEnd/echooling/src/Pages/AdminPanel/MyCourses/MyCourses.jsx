import React, { useEffect, useState } from 'react';
import { DeleteCourse, getCoursesByTeacherId } from '../../../Services/CourseService';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTeacherById } from '../../../Services/TeacherService';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Flex,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router';
export default function MyCourses() {
  const [TeacherId, setTeacherId] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const handleNavigate = (route) => {
    navigate(route);
  };
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const id =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];

      // Fetch teacher ID using a query and set it in state
      getTeacherById(id)
        .then((resp) => {
          setTeacherId(resp?.data?.guId);
        })
        .catch((error) => {
          // Handle error if necessary
          console.error('Error fetching teacher ID:', error);
        });
    }
  }, [token]);

  const { data, isLoading, isError, error } = useQuery(
    ['Courses', TeacherId], // Use TeacherId as part of the query key
    () => getCoursesByTeacherId(TeacherId),
    {
      enabled: !!TeacherId, // Only fetch when TeacherId is available
      staleTime: 0,
    }
  );

  useEffect(() => {
    console.log(data);
  }, [TeacherId]);
var number = 0;
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
        <Button  m={10} onClick={() => handleNavigate("/ControlPanel/CreateCourseContainer")} color={'white '} borderColor={'white'} backgroundColor={"blue"}>Create Course</Button>
      </div>
      <Flex >
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        <Table size='sm' >
          <TableCaption>Get all Coures </TableCaption>
          <Thead>
            <Tr >
              <Th></Th>
              <Th >image</Th>
              <Th>Title</Th>
              <Th >price</Th>
              <Th >rate</Th>
              <Th >Is Approved</Th>
              <Th >category</Th>
              <Th >enrolled</Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody >
            {data?.data.map((Course) => (
              <Tr key={Course.guId}>
                <Td  >{number += 1}.</Td>
                <Td  ><img width={200} src={`/Uploads/Course/${Course.imageRoutue}`} alt="" /></Td>
                <Td  >{Course.title.slice(0, 30)}...</Td>
                <Td >{Course.price}</Td>
                <Td  >{Course.rate}</Td>
                <Td  >{Course.approved.toString()}</Td>
                <Td  >{Course.subject.toString()}</Td>
                <Td  >{Course.enrolled}</Td>
                <Td  ><Button  onClick={() => Delete(Course.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                <Td  ><Button  onClick={() => handleNavigate(`/ControlPanel/Course/Update/${Course.guId}`)} color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                <Td><Button    m={10} onClick={() => handleNavigate(`/ControlPanel/Course/GetReviews/${Course.guId}`)} color={'white '} borderColor={'white'} backgroundColor={"purple"}>Reveiws</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </div>
  );
}

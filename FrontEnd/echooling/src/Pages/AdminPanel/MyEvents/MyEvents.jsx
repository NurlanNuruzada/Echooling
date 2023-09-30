import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
import { getById } from '../../../Services/StaffService';
import { DeleteEvents, getStaffsCreatedEvents } from '../../../Services/EventService';

export default function MyEvents() {
  const [StaffId, setStaffId] = useState(null);
  const [Events, setEvents] = useState([]);
  const [userId, setUserId] = useState();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNavigate = (route) => {
    navigate(route);
  };

  const decodedToken = jwt_decode(token);
  const id =
    decodedToken[
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  const { mutate: getStaff } = useMutation(
    (id) => getById(id),
    {
      onSuccess: (res) => {
        setStaffId(res.data.guId);
      },
    }
  );

  useEffect(() => {
    getStaff(id);
  }, [id]);

  const { mutate: getEvents, data } = useMutation(
    (id) => getStaffsCreatedEvents(id),
    {
      onSuccess: (res) => {
        setEvents(res.data);
      },
    }
  );

  useEffect(() => {
    if (StaffId !== null) {
      getEvents(StaffId);
    }
  }, [StaffId]);

  const { mutate: Delete } = useMutation(
    (ID) => DeleteEvents(ID),
    {
      onSettled: () => {
        if (StaffId !== null) {
          getEvents(StaffId);
        }
      },
    }
  );
  var number = 0;
  return (
    <div>
      <div>
        <Button m={10} onClick={() => handleNavigate("/ControlPanel/CreateEvent")} color={'white'} borderColor={'white'} backgroundColor={"blue"}>Create Event</Button>
      </div>
      <Flex>
        <Table size='sm' >
          <TableCaption>Get all Events </TableCaption>
          <Thead>
            <Tr >
              <Th></Th>
              <Th >image</Th>
              <Th>Title</Th>
              <Th >orginazer</Th>
              <Th >cost</Th>
              <Th >Total Slot</Th>
              <Th >Event Start Date</Th>
              <Th >Event End Date</Th>
              <Th >Event category</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody >
            {data?.map((Event) => (
              <Tr key={Event.guId}>
                <Td  >{number += 1}.</Td>
                <Td  ><img width={200} src={`/Uploads/Event/${Event.imageRoutue}`} alt="" /></Td>
                <Td  >{Event.eventTitle}</Td>
                <Td >{Event.orginazer}</Td>
                <Td  >{Event.cost}</Td>
                <Td  >{Event.totalSlot}</Td>
                <Td  >{Event.eventStartDate}</Td>
                <Td  >{Event.eventFinishDate}</Td>
                <Td  >{Event.categoryname}</Td>
                <Td  ><Button onClick={() => handleNavigate(`/ControlPanel/UpdateEvent/${Event.guId}`)} color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                <Td  ><Button onClick={() => Delete(Event.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </div>
  );
}

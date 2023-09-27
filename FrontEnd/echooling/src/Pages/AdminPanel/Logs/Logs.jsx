import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GetAllLogs } from '../../../Services/LogService';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
  Button,
} from '@chakra-ui/react';

export default function Logs() {
  const [filterRole, setFilterRole] = useState('');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['logs'],
    queryFn: GetAllLogs,
    staleTime: 0,
  });

  const handleRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  return (
    <TableContainer borderRadius={10} m={10} border={"1px solid #CACFD2"}>
      <Select
        value={filterRole}
        onChange={handleRoleChange}
        size="md"
        w={40} // Adjust select size as needed
      >
        <option value="">All</option>
        <option value="Remove">Remove</option>
        <option value="Approve">Approve</option>
      </Select>
      <Table variant='striped' colorScheme='orange' >
        <TableCaption>Staff list</TableCaption>
        <Thead>
          <Tr>
            <Th p={4} fontSize={14}>№</Th>
            <Th p={4} fontSize={14}>DoneBy</Th>
            <Th p={4} fontSize={14}>Action</Th>
            <Th p={4} fontSize={14}>Done to</Th>
            <Th p={4} fontSize={14}>Action time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data
            .filter((log) => {
              if (filterRole === '') {
                return true; // Show all data when no role filter is selected
              }
              return log.actiondEntityName === filterRole;
            })
            .map((log, index) => (
              <Tr key={log.guId}>
                <Td>{index + 1}</Td>
                <Td>{log.userId} <Button>Get info</Button></Td>
                <Td>{log.actiondEntityName}</Td>
                <Td>{log.actiondEntityId}</Td>
                <Td>{log.actionTime}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

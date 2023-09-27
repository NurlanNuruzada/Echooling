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
  Input,
  Flex,
} from '@chakra-ui/react';

export default function Logs() {
  const [filterRole, setFilterRole] = useState('');
  const [filterDoneBy, setFilterDoneBy] = useState('');
  const [filterDoneTo, setFilterDoneTo] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['logs'],
    queryFn: GetAllLogs,
    staleTime: 0,
  });

  const handleRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDoneByChange = (event) => {
    setFilterDoneBy(event.target.value);
  };

  const handleDoneToChange = (event) => {
    setFilterDoneTo(event.target.value);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <TableContainer borderRadius={10} m={10} border={"1px solid #CACFD2"}>
      <Flex>

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
      <Input
        type="text"
        placeholder="Filter DoneBy"
        value={filterDoneBy}
        onChange={handleDoneByChange}
        size="md"
        w={40} // Adjust input size as needed
      />
      <Input
        type="text"
        placeholder="Filter DoneTo"
        value={filterDoneTo}
        onChange={handleDoneToChange}
        size="md"
        w={40} // Adjust input size as needed
      />
      </Flex>

      <Table variant='striped' colorScheme='orange' >
        <TableCaption>log list</TableCaption>
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
              const filterRoleCondition = filterRole === '' || log.actiondEntityName === filterRole;
              const filterDoneByCondition = filterDoneBy === '' || log.userId.includes(filterDoneBy);
              const filterDoneToCondition = filterDoneTo === '' || log.actiondEntityId.includes(filterDoneTo);

              return filterRoleCondition && filterDoneByCondition && filterDoneToCondition;
            })
            .map((log, index) => (
              <Tr key={log.guId}>
                <Td>{index + 1}</Td>
                <Td>{log.userId} </Td>
                <Td>{log.actiondEntityName}</Td>
                <Td>{log.actiondEntityId}</Td>
                <Td>{formatDate(log.actionTime)}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

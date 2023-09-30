import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Img,
    Button,
    Flex,
    TableCaption,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { getBouthEvents } from '../../../Services/EventService';

export default function BoughtEvent() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth); // Update the selector

    if (token != null) {
        var decodedToken = jwt_decode(token);
        var id =
            decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
    }
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['BouthCouses'],
        queryFn: () => getBouthEvents(id), // Pass a function reference here
        staleTime: 0,
        enabled: !!id, // Only run the query if id is truthy (component is mounted)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Check if data is an array before mapping
    if (!Array.isArray(data)) {
        return <div>Data is not an array.</div>;
    }

    var number = 0;

    // Format date function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <Flex>
            <Table size='sm' >
                <TableCaption>Get all Events</TableCaption>
                <Thead>
                    <Tr >
                        <Th></Th>
                        <Th>Title</Th>
                        <Th >Event Start Date</Th>
                        <Th >Event End Date</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {data?.map((Event) => (
                        <Tr key={Event.guId}>
                            <Td  >{number += 1}.</Td>
                            <Td  >{Event.eventTitle}</Td>
                            <Td  >{formatDate(Event.eventStartDate)}</Td>
                            <Td  >{formatDate(Event.eventFinishDate)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
}

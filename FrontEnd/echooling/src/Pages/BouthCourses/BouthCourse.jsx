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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { getAllBouthCourses } from '../../Services/CourseService';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

export default function BouthCourse() {
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
        queryFn: () => getAllBouthCourses(id), // Pass a function reference here
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

    return (
        <TableContainer>
            <Table size='lg' maxW={1000} m={'auto'}>
                <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Course Title</Th>
                        <Th>See Videos</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((course, index) => (
                        <Tr key={index}>
                            <Td>
                                <Img
                                    w={120}
                                    src={`/Uploads/Course/${course.imageRoutue}`}
                                    alt=''
                                />
                            </Td>
                            <Td>{course?.title}</Td>
                            <Td>
                                <Button
                                bg={'green'}
                                color={"white"}
                                    onClick={() =>
                                        navigate(
                                            `/ControlPanel/BouthCourses/Videos/${course?.guId}`
                                        )
                                    }
                                >
                                    See Videos
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Img,
    Select,
    Button,
} from '@chakra-ui/react';
import jwt_decode from "jwt-decode";
import { useParams } from 'react-router';
import { GetBouthVideos, getAllBouthCourses } from '../../Services/CourseService';
import { useMutation, useQueries, useQuery } from 'react-query';
import { GetVideosByCourseId } from '../../Services/VideoServce';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function BouthCoueseVideos() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["BouthCouses"],
        queryFn: () => GetVideosByCourseId(id), // Pass a function reference here
        staleTime: 0,
        refetchOnMount: true
    });
    const [selectedVideo, setSelectedVideo] = useState(null);
    const handleOpenVideo = (videoName) => {
        setSelectedVideo(videoName);
    };
    let number = 0;
    return (
        <div>

            <TableContainer borderRadius={10} m={10} border={"1px solid #CACFD2"}>
                <Table variant='striped' colorScheme='orange' >
                    <TableCaption>Staff list </TableCaption>
                    <Thead>
                        <Tr>
                            <Th p={4} fontSize={14}>№</Th>
                            <Th p={4} fontSize={14}>Video Title </Th>
                            <Th p={4} fontSize={14}>Video Duration</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data?.map((data, index) => (
                            <Tr key={data.guId}>
                                <Td>{number += 1}</Td>
                                <Td>{data.videoTitle}</Td>
                                <Td>{data.GuId}</Td>
                                <Td  >
                                    <Button
                                        bg={'green'}
                                        color={'white'}
                                        onClick={() => handleOpenVideo(data.videoUniqueName)}
                                    >
                                        Open Video
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Link to={`http://localhost:3000/ControlPanel/BouthCourses/List`}><Button style={{ padding: "10px" }} >get back</Button></Link>
            </TableContainer>
            {selectedVideo && (
                <video
                    color={"white"}
                    src={`/Uploads/Course/Videos/${selectedVideo}`}
                    controls
                    max-width="60%"
                    style={{ margin: "auto" }}

                ></video>
            )}
        </div>
    );
}
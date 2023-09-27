import React, { useEffect } from 'react'
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
    Button,
    useDisclosure,
    Select,
} from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Done from '../../../Components/DoneModal/Done';
import { useState } from 'react';
import { GetUStaffUsers } from '../../../Services/StaffService';

export default function CouseVideos() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
    const cancelRef = React.useRef();
    const [filterRole, setFilterRole] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Staff'],
        queryFn: GetUStaffUsers,
        staleTime: 0,
    });
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };
    const handeDeleteVideo = (Id) => {
        formik.setValues({
            UserId: Id,
            AdminId: id,
        });
        onOpen();
    };
    const formik = useFormik({
        initialValues: {
            UserId: '',
            AdminId: '',
        },
        onSubmit: (values) => {
            mutate(values)
            onClose();
        },
    });
    const handleRoleChange = (event) => {
        setFilterRole(event.target.value);
    };
    const { mutate } = useMutation(
        (values) => console.log(values.UserId, values.AdminId),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries(['Staff']);
                setRegistrationSuccess(true)
                onClose()
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
    useEffect(() => {
        if (registrationSuccess) {
            const timer = setTimeout(() => {
                setRegistrationSuccess(false);
                queryClient.invalidateQueries(['Staff']);
            }, 4500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [registrationSuccess]);
    return (
        <div>
            <>
                {registrationSuccess && <Done firstTitle={"Appy request is accepted"} seccondTitle={"send email about application"} />}
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Video</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to Delete this Video?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button onClick={formik.handleSubmit} colorScheme='red' ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
            <TableContainer borderRadius={10} m={10} border={"1px solid #CACFD2"}>
                <Select
                    value={filterRole}
                    onChange={handleRoleChange}
                    size="md"
                    w={40} // Adjust select size as needed
                >
                    <option value="">All</option> {/* To show all staff */}
                    <option value="Teacher">Teacher</option>
                    <option value="Staff">Staff</option>
                </Select>
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
                        {data?.data
                            .filter((staff) => !filterRole || staff.role === filterRole)
                            .map((data, index) => (
                                <Tr key={data.guId}>
                                    <Td>{data.fullname}</Td>
                                    <Td>{data.phoneNumber}</Td>
                                    <Td>{data.phoneNumber}</Td>
                                    <Td  >
                                        <Button bg={'green'} color={'white'}>
                                        open video
                                        </Button>
                                    </Td>
                                    <Td>
                                        {!data.isApproved && (
                                            <Td >
                                                <Button
                                                    color={'white'}
                                                    onClick={() => handeDeleteVideo(data.guId)}
                                                    backgroundColor={"red"}
                                                >
                                                    Delete
                                                </Button>
                                            </Td>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
          <Button onClick={() => handleNavigate(`/ControlPanel/Course/MyCourses/${id}`)} color={'white'} bg={'#4586ff'}>get back</Button>
        </div>
    );
}

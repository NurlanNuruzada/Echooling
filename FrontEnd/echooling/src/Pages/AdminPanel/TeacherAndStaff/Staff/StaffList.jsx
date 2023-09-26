import React, { useEffect, useState } from 'react';
import Styles from './StaffList.module.css';
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
import { GetUStaffUsers } from '../../../../Services/StaffService';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Navigate, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Done from '../../../../Components/DoneModal/Done';
import { ApprovedStaffId } from '../../../../Services/TeacherService';

export default function StaffList() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [IsEdit, setIsEdit] = useState(false);
    const { token, userName, fullname } = useSelector((state) => state.auth);
    const [filterRole, setFilterRole] = useState('');
    const queryClient = useQueryClient();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const handleFilterByRole = (role) => {
        setFilterRole(role);
    };
    if (token != null) {
        var decodedToken = jwt_decode(token);
        var id =
            decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
    }
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Staff'],
        queryFn: GetUStaffUsers,
        staleTime: 0,
    });

    //handleDetele
    const HandleDeleteStaff = (Id) => {
        FormikDelete.setValues({
            UserId: Id,
            AdminId: id,
        });
        setCurrentAction({
            actionType: 'DeleteStaff',
            userId: Id,
        });
        onOpen();
    };
    const HandleDeleteTeacher = (Id) => {
        FormikDelete.setValues({
            UserId: Id,
            AdminId: id,
        });
        setCurrentAction({
            actionType: 'DeleteTeacher',
            userId: Id,
        });
        onOpen();
    };
    const FormikDelete = useFormik({
        initialValues: {
            UserId: '',
            AdminId: '',
        },
        onSubmit: (values) => {
            if (currentAction.actionType === 'DeleteStaff') {
                mutate(values)
            } else if (currentAction.actionType === 'DeleteTeacher') {
                mutate(values)
            }
            onClose();
            setRegistrationSuccess(true)
        },
    });
//handleDeteleend

    const handleApprove = (Id) => {
        formik.setValues({
            UserId: Id,
            AdminId: id,
        });
        setCurrentAction({
            actionType: 'approve',
            userId: Id,
        });
        onOpen();
    };
    const formik = useFormik({
        initialValues: {
            UserId: '',
            AdminId: '',
        },
        onSubmit: (values) => {
            if (currentAction.actionType === 'delete') {
                mutate(values)
            } else if (currentAction.actionType === 'approve') {
                mutate(values)
            }
            onClose();
            setRegistrationSuccess(true)
        },
    });
    const handleRoleChange = (event) => {
        setFilterRole(event.target.value);
    };

    const actionLabel =
        currentAction && currentAction.actionType === 'delete'
            ? 'Delete'
            : 'Approve';
    const { mutate } = useMutation(
        (values) => ApprovedStaffId(values.UserId, values.AdminId),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries(['Staff',resp]);
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
                        <AlertDialogHeader>Staff</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to {actionLabel} this Staff?
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
                            <Th p={4} fontSize={14}>fullname</Th>
                            <Th p={4} fontSize={14}>Is Approved</Th>
                            <Th p={4} fontSize={14} >PhoneNumber</Th>
                            <Th p={4} fontSize={14} >Role</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data
                            .filter((staff) => !filterRole || staff.role === filterRole)
                            .map((data, index) => (
                                <Tr key={data.guId}>
                                    <Td>{index + 1}</Td>
                                    <Td>{data.fullname}</Td>
                                    <Td>{data.isApproved ? "Yes" : "No"}</Td>
                                    <Td>{data.phoneNumber}</Td>
                                    <Td>{data.role}</Td>
                                    <Td className={Styles.TableButon2} >
                                        <Button
                                            className={Styles.TableButon}
                                            onClick={() => {
                                                data.role == "Staff" ? handleNavigate(`/ControlPanel/Staff/details/${data.guId}`) :
                                                    handleNavigate(`/ControlPanel/Teacher/details/${data.guId}`)
                                            }}
                                            color={'white '}
                                            borderColor={'white'}
                                            backgroundColor={'orange'}
                                        >
                                            Go To details
                                        </Button>
                                    </Td>
                                    <Td className={Styles.TableButon2} >
                                        <Button
                                            className={Styles.TableButon}
                                            color={'white '}
                                            onClick={() => data.role == "Staff" ? HandleDeleteStaff(data.guId) : HandleDeleteTeacher(data.guId)}
                                            borderColor={'white'}
                                            backgroundColor={"red"}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                    <Td>
                                        {!data.isApproved && (
                                            <Td className={Styles.TableButon2}>
                                                <Button
                                                    className={Styles.TableButon}
                                                    color={'white'}
                                                    onClick={() => handleApprove(data.guId)}
                                                    backgroundColor={"purple"}
                                                >
                                                    Approve
                                                </Button>
                                            </Td>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

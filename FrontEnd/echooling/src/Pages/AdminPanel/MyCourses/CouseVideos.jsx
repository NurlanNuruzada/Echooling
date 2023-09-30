import React, { useEffect, useState } from 'react';
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
    Box,
    FormLabel,
    Input,
    FormControl,
    Text,
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
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import jwt_decode from 'jwt-decode';
import Done from '../../../Components/DoneModal/Done';
import { GetUStaffUsers } from '../../../Services/StaffService';
import { GetVideosByCourseId, UploadVideo, deleteVideo } from '../../../Services/VideoServce';

export default function CourseVideos() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { id } = useParams();
    const [SentSuccess, setSentSuccess] = useState(false);
    const cancelRef = React.useRef();
    const [filterRole, setFilterRole] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [File, SetFile] = useState(null);
    const [FileName, SetFileName] = useState('');
    const [Data, setData] = useState();
    const { mutate: GetAllVideo } = useMutation(
        (values) => GetVideosByCourseId(id),
        {
            onSuccess: (resp) => {
                setData(resp.data)
            },
            onError: (error) => {
            },
        }
    );
    const [selectedVideo, setSelectedVideo] = useState(null);
    const handleOpenVideo = (videoName) => {
        setSelectedVideo(videoName);
    };
    useEffect(() => {
        GetAllVideo(id)
    }, [, id]);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };
    const handleDeleteVideo = (Id) => {
        formik.setFieldValue("VideoId", Id)
        onOpen();
    };
    const formik = useFormik({
        initialValues: {
            VideoId: "",
        },
        onSubmit: async (values) => {
            deleteVideos(values)
        },
        validateOnBlur: true,
        validateOnChange: false,
    });
    const { mutate: deleteVideos } = useMutation(
        (values) => deleteVideo(values.VideoId),
        {
            onSuccess: (resp) => {
                GetAllVideo(id)
                onClose();
            },
            onError: (error) => {
            },
        }
    );

    const handleRoleChange = (event) => {
        setFilterRole(event.target.value);
    };
    const { mutate } = useMutation(
        (values) => UploadVideo(id, values),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries(['Staff']);
                setRegistrationSuccess(true);
                GetAllVideo(id)
                onClose();
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

    const fileUploadHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            SetFile(selectedFile);
            SetFileName(selectedFile.name);
            FormikUpload.setFieldValue('Video', selectedFile);
        } else {
            console.error("No file selected.");
        }
    };

    const FormikUpload = useFormik({
        initialValues: {
            Video: File,
            VideoTitle: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("Video", File ? File : null);
            formData.append("VideoTitle", values.VideoTitle);

            if (formData.get("Video")) {
                mutate(formData);
            } else {
            }
        },
        validateOnBlur: true,
        validateOnChange: false,
    });
    var number = 0;
    return (
        <div>
            <>
                {SentSuccess && (
                    <Done
                        firstTitle={'Success'}
                        seccondTitle={'the Slider Created Successfully'}
                    />
                )}
                <FormControl>
                    <form onSubmit={FormikUpload.handleSubmit}>
                        <FormLabel>Choose Video file</FormLabel>
                        <input
                            name="Video"
                            type="file"
                            accept="Video/*"
                            onChange={(e) => fileUploadHandler(e)}
                        />
                        {FormikUpload.errors.image && (
                            <Text color="red" fontSize="sm">
                                {FormikUpload.errors.image}
                            </Text>
                        )}
                        <Box>
                            <FormLabel>Video Title</FormLabel>
                            <Input
                                borderColor={"black"}
                                pr="4.5rem"
                                size="lg"
                                placeholder="Video Title"
                                onChange={FormikUpload.handleChange}
                                name="VideoTitle"
                                value={FormikUpload.values.VideoTitle}
                            />
                            {FormikUpload.errors.VideoTitle && (
                                <Text color="red" fontSize="sm">
                                    {FormikUpload.errors.VideoTitle}
                                </Text>
                            )}
                        </Box>
                        {true && (
                            <Button color={"blue"} type="submit">
                                NEXT
                            </Button>
                        )}
                    </form>
                </FormControl>
                {registrationSuccess && <Done firstTitle={"Application request is accepted"} seccondTitle={"send email about application"} />}
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
                    w={40}
                >
                    <option value="">All</option>
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
                        {Data?.filter((Video) => !filterRole || Video.videoTitle === filterRole)
                            .map((data, index) => (
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
                                    <Td>
                                        <Td >
                                            <Button
                                                color={'white'}
                                                onClick={() => handleDeleteVideo(data   .guid)}
                                                backgroundColor={"red"}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
            {selectedVideo && (
                <video
                    src={`/Uploads/Course/Videos/${selectedVideo}`}
                    controls
                    max-width="60%"
                    style={{ margin: "auto" }}

                ></video>
            )}
            <Button style={{ margin: "20px" }} onClick={() => handleNavigate(`/ControlPanel/Course/MyCourses/${id}`)} color={'white'} bg={'#4586ff'}>get back</Button>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button, Flex, Input, Progress } from '@chakra-ui/react';
import Styles from './CreateSlider.module.css';
import Done from '../../../Components/DoneModal/Done';
import Steps from '../../../Components/Steps/Steps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { CreateSliderFunction, DeleteSliders, getSliders } from '../../../Services/SliderService';
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
} from '@chakra-ui/react';
export default function CreateSlider({ onNext, formData, onPrevious }) {
    const [step4Data, setStep4Data] = useState(null);
    const [SentSuccess, setSentSuccess] = useState(false);
    const [Id, setId] = useState('');
    const [File, SetFile] = useState(null);
    const [FileName, SetFileName] = useState('');
    const { token, userName } = useSelector((state) => state.auth);
    const navigate = useNavigate();



    const handleNavigate = (route) => {
        navigate(route);
    };


    //get Slider start
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["sliders"],
        queryFn: getSliders,
        staleTime: 0,

    });
    //get SLiders end



    //Create Slider Funtion Start
    const { mutate } = useMutation(
        (formData) => CreateSliderFunction(formData),
        {
            onSuccess: (resp) => {
                setSentSuccess(true);
                queryClient.invalidateQueries("sliders");
                console.log(resp);
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const fileUploadHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            SetFile(selectedFile);
            SetFileName(selectedFile.name);
            formik.setFieldValue('image', selectedFile)
        } else {
            console.error("No file selected.");
        }
    };


    const formik = useFormik({
        initialValues: {
            image: File,
            SecondTitle: "",
            Description: "",
            Title: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("image", File ? File : null);
            formData.append("Title", values.Title);
            formData.append("SeccondTile", values.SeccondTile);
            formData.append("Description", values.Description);

            if (formData.get("image")) {
                console.log("FormData before muration", formData)
                //1
                mutate(formData);

                //2
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                //3
                console.log(...formData.values());
            } else {
                console.log("FormData is null");
            }
        },
    });
    //Create Slider Funtion end

    useEffect(() => {
        if (SentSuccess) {
            const timer = setTimeout(() => {
                setSentSuccess(false);
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [SentSuccess]);


    const queryClient = useQueryClient()
    const { mutate: Delete } = useMutation(
        (Id) => DeleteSliders(Id),
        {
            onMutate: async ({ Id }) => {
                await queryClient.cancelQueries(['sliders'])
                const previousData = queryClient.getQueryData(['sliders'])
                const itemIndex = previousData.data.findIndex(item => item.guId === Id)
                const newData = {
                    data: [
                        ...previousData.data.slice(0, itemIndex),
                        ...previousData.data.slice(itemIndex + 1)
                    ]
                }
                queryClient.setQueryData(['sliders'], newData)
                return { previousData }
            },
            onError: (error, { Id }, context) => {
                queryClient.setQueryData(['sliders'], context.previousData)
            },
            onSettled: () => {
                queryClient.invalidateQueries(['sliders'])
            }
        }
    );
    return (
        <div>
            <Progress value={100} />
            <Steps CurrentStep={4} TotalSteps={4} />
            <div className={Styles.MainContainer}>
                {SentSuccess && (
                    <Done
                        firstTitle={'Success'}
                        seccondTitle={'the Slider Created Succesfully'}
                    />
                )}
                CreateEventLast
                <form onSubmit={formik.handleSubmit}>
                    <input
                        name="image"
                        type="file"
                        onChange={(e) => fileUploadHandler(e)}
                    />
                    <Box>
                        <Input
                            borderColor={"black"}
                            variant="flushed"
                            pr="4.5rem"
                            size="lg"
                            placeholder="Title"
                            onChange={formik.handleChange}
                            name="Title"
                            value={formik.values.Title}
                            className={Styles.Input}
                        />
                    </Box>
                    <Box>
                        <Input
                            borderColor={"black"}
                            variant="flushed"
                            pr="4.5rem"
                            size="lg"
                            placeholder="seccond Title"
                            onChange={formik.handleChange}
                            name="SeccondTile"
                            value={formik.values.SeccondTile}
                            className={Styles.Input}
                        />
                    </Box>
                    <Box>
                        <Input
                            borderColor={"black"}
                            variant="flushed"
                            pr="4.5rem"
                            size="lg"
                            placeholder="Description"
                            onChange={formik.handleChange}
                            name="Description"
                            value={formik.values.Description}
                            className={Styles.Input}
                        />
                    </Box>
                    {true && (
                        <button className={Styles.Button} type="submit">
                            NEXT
                        </button>
                    )}
                </form>
                <Flex>
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error: {error.message}</div>}
                    <TableContainer className={Styles.TableContainer} p={10} w={"100%"}>
                        <Table size='lg' >
                            <TableCaption>Get all Sliders </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>image</Th>
                                    <Th>Title</Th>
                                    <Th>Second Title</Th>
                                    <Th>Description</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.data.map((slider) => (
                                    <Tr key={slider.id}>
                                        <Td><img src={`/Uploads/${slider.imageRoutue}`} alt="" /></Td>
                                        <Td>{slider.title}</Td>
                                        <Td>{slider.seccondTile}</Td>
                                        <Td>{slider.description}</Td>
                                        <Td><Button color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                                        <Td><Button onClick={() => Delete(slider.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </div>
        </div>
    );
}

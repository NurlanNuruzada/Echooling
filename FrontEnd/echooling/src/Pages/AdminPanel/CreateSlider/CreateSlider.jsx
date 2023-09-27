import React, { useState, useEffect } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Progress, Text, styled } from '@chakra-ui/react';
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
import CreateSliderScema from '../../../Valudations/CreateSliderScema';
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

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["sliders"],
        queryFn: getSliders,
        staleTime: 0,

    });
    
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
                mutate(formData);
            } else {
                console.log("FormData is null");
            }
        },
        validationSchema: CreateSliderScema,
        validateOnBlur:true,
        validateOnChange:false

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

    var number = 0
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
        <div lassName={Styles.MainContainer2}>
            <Progress value={100} />
            <Steps CurrentStep={4} TotalSteps={4} />
            <div className={Styles.MainContainer}>
                {SentSuccess && (
                    <Done
                        firstTitle={'Success'}
                        seccondTitle={'the Slider Created Succesfully'}
                    />
                )}
                <FormControl>
                    <form  className={Styles.formControl} onSubmit={formik.handleSubmit}>
                        <FormLabel>Choose Image file</FormLabel>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => fileUploadHandler(e)}
                        />
                        {formik.errors.image && (
                            <Text color="red" fontSize="sm">
                                {formik.errors.image}
                            </Text>
                        )}
                        <Box>
                            <FormLabel>Title</FormLabel>
                            <Input
                                borderColor={"black"}
                                pr="4.5rem"
                                size="lg"
                                placeholder="Title"
                                onChange={formik.handleChange}
                                name="Title"
                                value={formik.values.Title}
                                className={Styles.Input}
                            />
                            {formik.errors.Title && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.Title}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <FormLabel>Second Title</FormLabel>
                            <Input
                                borderColor={"black"}
                                pr="4.5rem"
                                size="lg"
                                placeholder="Second Title"
                                onChange={formik.handleChange}
                                name="SeccondTile"
                                value={formik.values.SeccondTile}
                                className={Styles.Input}
                            />
                            {formik.errors.SeccondTile && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.SeccondTile}
                                </Text>
                            )}
                        </Box>
                        <Box>
                            <FormLabel>Description</FormLabel>
                            <Input
                                borderColor={"black"}
                                pr="4.5rem"
                                size="lg"
                                placeholder="Description"
                                onChange={formik.handleChange}
                                name="Description"
                                value={formik.values.Description}
                                className={Styles.Input}
                            />
                            {formik.errors.Description && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.Description}
                                </Text>
                            )}
                        </Box>
                        {true && (
                            <button className={Styles.Button} type="submit">
                                NEXT
                            </button>
                        )}
                    </form>
                </FormControl>
                <Flex className={Styles.Table}>
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error: {error.message}</div>}
                    <Table size='sm' >
                        <TableCaption>Get all Sliders </TableCaption>
                        <Thead>
                            <Tr >
                                <Th></Th>
                                <Th className={Styles.displayNone}>image</Th>
                                <Th>Title</Th>
                                <Th className={Styles.displayNone}>Second Title</Th>
                                <Th className={Styles.displayNone}>Description</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {data?.data.map((slider) => (
                                <Tr key={slider.id}>
                                    <Td  >{number += 1}.</Td>
                                    <Td className={Styles.displayNone} ><img width={200} src={`/Uploads/${slider.imageRoutue}`} alt="" /></Td>
                                    <Td  >{slider.title}</Td>
                                    <Td className={Styles.displayNone}>{slider.seccondTile}</Td>
                                    <Td className={Styles.displayNone} >{slider.description + "..."}</Td>
                                    <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => handleNavigate(`/ControlPanel/UpdateSlider/${slider.guId}`)} color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                                    <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => Delete(slider.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </div>
        </div >
    );
}

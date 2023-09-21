
import React, { useState, useEffect } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Progress, Text, styled } from '@chakra-ui/react';
import Styles from './EventCategory.module.css';
import Done from '../../../Components/DoneModal/Done';
import Steps from '../../../Components/Steps/Steps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Form, useFormik } from 'formik';
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
import { DeleteCourseCategory, DeleteEventCategory, getAllCourseategories, getAllEventCategories, postCourseCategory, postEventCategory } from '../../../Services/CategoryService';
import { getallCourses } from '../../../Services/CourseService';
import CreateCourseScema from '../../../Valudations/CourseScema';
import CreateCategoryScema from '../../../Valudations/CreateCategoryScema';
export default function CreateCourseCagteogy() {
    const [SentSuccess, setSentSuccess] = useState(false);
    const [File, SetFile] = useState(null);
    const navigate = useNavigate();



    const handleNavigate = (route) => {
        navigate(route);
    };


    //get Slider start
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["sliders"],
        queryFn: getAllEventCategories,
        staleTime: 0,

    });
    //get SLiders end



    const { mutate } = useMutation(
        (formData) => postEventCategory(formData),
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

    const formik = useFormik({
        initialValues: {
            category: '',
        },
        onSubmit: async (values) => {
            mutate(values);
        },
        validationSchema: CreateCategoryScema,
        validateOnBlur: true,
        validateOnChange: false

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
        (GuId) => DeleteEventCategory(GuId),
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
    return (
        <div lassName={Styles.MainContainer2}>
            <Progress value={100} />
            <div className={Styles.MainContainer}>
                {SentSuccess && (
                    <Done
                        firstTitle={'Success'}
                        seccondTitle={'the Slider Created Succesfully'}
                    />
                )}
                <Box>
                    <FormLabel>Category</FormLabel>
                    <Input
                        borderColor={"black"}
                        pl="4.5rem"
                        size="lg"
                        placeholder="category"
                        onChange={formik.handleChange}
                        name="category"
                        value={formik.values.category}
                        className={Styles.Input}
                    />
                    {formik.errors.Title && (
                        <Text color="red" fontSize="sm">
                            {formik.errors.Title}
                        </Text>
                    )}
                    {true && (
                        <button className={Styles.Button} onClick={formik.handleSubmit} type="submit">
                            NEXT
                        </button>
                    )}
                </Box>
                <Flex className={Styles.Table}>
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error: {error.message}</div>}
                    <Table size='sm' >
                        <TableCaption>Get all Sliders </TableCaption>
                        <Thead>
                            <Tr >
                                <Th></Th>
                                <Th className={Styles.displayNone}>category</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {data?.data.map((slider) => (
                                <Tr key={slider.guId}>
                                    <Td  > {number += 1}. {slider.category}</Td>
                                    <Td className={Styles.TableButon2} ><Button className={Styles.TableButon} onClick={() => Delete(slider.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Flex>
            </div>
            <Button className={Styles.Button} onClick={() => navigate("/ControlPanel/CourseList")} type="submit">
                Back
            </Button>
        </div >

    );
}

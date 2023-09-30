import React from 'react'
import { useNavigate, useParams } from 'react-router';
import Styles from './SlliderUpdate.module.css'
import {
    Heading,
    Box,
    Button,
    Flex,
    Input,
    Slide,
    Slider,
    Center,
    Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useState } from 'react';
import Done from '../../../Components/DoneModal/Done';
import { useEffect } from 'react';
import { GetSliderById, GetSliderId, UpdateSlider } from '../../../Services/SliderService';
import UpdateSliderScema from '../../../Valudations/UpdateSliderScema';
export default function SliderUpdate() {
    const [succsess, Setsuccsess] = useState(false)
    const [SliderId, SetSliderId] = useState("")
    const { id } = useParams();
    const [File, SetFile] = useState(null);
    const [FileName, SetFileName] = useState('');
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    //Create Slider Funtion Start
    const { mutate } = useMutation(
        (formData) => UpdateSlider(id, formData),
        {
            onSuccess: (resp) => {
                Setsuccsess(true);
                queryClient.invalidateQueries("sliders");
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
            formData.append("image", File ? File : " ");
            formData.append("Title", values.Title ? values.Title : SliderId.title);
            formData.append("SeccondTile", values.SeccondTile ? values.SeccondTile : SliderId.seccondTile);
            formData.append("Description", values.Description ? values.Description : SliderId.description);

            if (formData.get("image")) {
                mutate(formData);
            } else {
            }
        },
        validationSchema: UpdateSliderScema,
        validateOnBlur:true,
        validateOnChange:false
    });
    useEffect(() => {
        if (succsess) {
            const timer = setTimeout(() => {
                Setsuccsess(false);
                handleNavigate("/ControlPanel/CreateSlider")
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [succsess]);
    const { mutate: getSliderById } = useMutation((id) => GetSliderId(id), {
        onSuccess: (resp) => {
            SetSliderId(resp);
        },
        onError: (error) => {
            Setsuccsess(false);
        },
    });
    useEffect(() => {
        getSliderById(id)
    }, []);
    return (
        <div className={Styles.MainContainer}>
            <Flex justifyContent={"center"}>
                {succsess && (
                    <Done
                        firstTitle={'Success'}
                        seccondTitle={'the Slider Updated Succesfully'}
                    />
                )}
                <Box  >
                    <Heading color={"#3270fc"} mb={4}>
                        Update Slider
                    </Heading>
                    <img  src={`/Uploads/Sliders/${SliderId?.imageRoutue}`} alt="" />
                    <h1 style={{ color: "#3270fc" }} >Title: </h1><span>{SliderId?.title}</span>
                    <h1 style={{ color: "#3270fc" }} >Second Title: </h1> <span>{SliderId?.seccondTile}</span>
                    <h1 style={{ color: "#3270fc" }} >Description:  </h1><span>{SliderId?.description}</span>
                    <form onSubmit={formik.handleSubmit}>
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
                            {formik.errors.Title && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.Title}
                                </Text>
                            )}
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
                            {formik.errors.SeccondTile && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.SeccondTile}
                                </Text>
                            )}
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
                            {formik.errors.Description && (
                                <Text color="red" fontSize="sm">
                                    {formik.errors.Description}
                                </Text>
                            )}
                        </Box>
                        <Flex alignItems={'center'} className={Styles.ButtonContainer} justifyContent={"center"} gap={10} flexFlow={"row"}>

                            <Button
                                className={Styles.Button}
                                size="md"
                                backgroundColor={"white !important"}
                                mt="24px"
                                onClick={() => handleNavigate("/ControlPanel/CreateSlider")}
                            >
                                Return to menu
                            </Button>
                            {true && (
                                <Button mt="24px" className={Styles.Button} type="submit">
                                    Submit
                                </Button>
                            )}
                        </Flex>
                    </form>
                </Box >
            </Flex >
        </div>
    )
}
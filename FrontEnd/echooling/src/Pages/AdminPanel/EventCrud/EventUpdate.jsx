import React from 'react'
import { useNavigate, useParams } from 'react-router';
import Styles from './EventUpdate.module.css'
import {
    Heading,
    Box,
    Button,
    Flex,
    Input,
    Slide,
    Slider,
    Center,
    Select,
    Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { useState } from 'react';
import Done from '../../../Components/DoneModal/Done';
import { useEffect } from 'react';
import { GetSliderById, GetSliderId, UpdateSlider } from '../../../Services/SliderService';
import { GetEventId, UpdateEventById } from '../../../Services/EventService';
import { getAllEventCategories } from '../../../Services/CategoryService';
export default function UpdateEvent() {
    const [succsess, Setsuccsess] = useState(false)
    const [EventId, SetEventId] = useState("")
    const { id } = useParams();
    const [File, SetFile] = useState(null);
    const [FileName, SetFileName] = useState('');
    const [step2Data, setStep2Data] = useState('');
    const [selected, setSelected] = useState(false);
    const [Data, setData] = useState({ data: [] });
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const { mutate: Category } = useMutation(() => getAllEventCategories(), {
        onSuccess: (resp) => {
            setData(resp);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    useEffect(() => {
        const query = searchQuery.toLowerCase();
        setFilteredData(Data.data?.filter((data) =>
            data.category.toLowerCase().includes(query)
        ));
    }, [searchQuery, Data.data]);

    useEffect(() => {
        Category();
    }, []);

    const handleValueChange = (event) => {
        const selectedValue = event.target.value;
        const [GuId, category] = selectedValue.split(',');
        const selectedData = { GuId, category };
        const selectedDataArray = [selectedData];
        setStep2Data(selectedDataArray);
        setSelected(true); 
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    //Create Slider Funtion Start
    const { mutate } = useMutation(
        (formData) => UpdateEventById(id, formData),
        {
            onSuccess: (resp) => {
                Setsuccsess(true);
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
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("image", File ? File : " ");
            formData.append("EventTitle", values.eventTitle ? values.eventTitle : EventId.eventTitle);
            formData.append("cost", values.cost ? values.cost : EventId.cost);
            formData.append("EventFinishDate", values.eventFinishDate ? values.eventFinishDate : EventId.eventFinishDate);
            formData.append("EventStartDate", values.eventStartDate ? values.eventStartDate : EventId.eventStartDate);
            formData.append("Location", values.location ? values.location : EventId.location);
            formData.append("orginazer", values.orginazer ? values.orginazer : EventId.orginazer);
            formData.append("TotalSlot", values.totalSlot ? values.totalSlot : EventId.totalSlot);
            formData.append("EventCategoryiesId", step2Data[0]?.GuId ? step2Data[0].GuId : EventId.eventCategoryiesId);
            formData.append("Categoryname", step2Data[0]?.category ? step2Data[0].category : EventId.categoryname);

            if (formData.get("image")) {
                mutate(formData);
            } else {
                console.log("FormData is null");
            }
        },
    });
    useEffect(() => {
        if (succsess) {
            const timer = setTimeout(() => {
                Setsuccsess(false);
                handleNavigate("/ControlPanel/Events")
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [succsess]);
    const { mutate: getEventById } = useMutation((id) => GetEventId(id), {
        onSuccess: (resp) => {
            SetEventId(resp);
            console.log(resp);
        }, 
        onError: (error) => {
            console.log(error);
            Setsuccsess(false);
        },
    });
    useEffect(() => {
        getEventById(id)
    }, []);
    return (
        <Flex p={"40px 0"} width={'100%'}>
            {succsess && (
                <Done
                    firstTitle={'Success'}
                    seccondTitle={'the Slider Updated Succesfully'}
                />
            )}
            <Box minW="0rem">
                <Flex p={"30px 10px"} gap={5} flexFlow={"column"}>
                    <Heading color={"#3270fc"} mb={4}>
                        Update Events
                    </Heading>
                    <img width={200} src={`/Uploads/Event/${EventId?.imageRoutue}`} alt="" />
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >Title: </h1><span>{EventId?.eventTitle}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >cost: </h1> <span>{EventId?.cost}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >About Event:  </h1><span>{EventId?.aboutEvent}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >Event Finish Date:  </h1><span>{EventId?.eventFinishDate}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >Event Start Date:  </h1><span>{EventId?.eventStartDate}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >location:  </h1><span>{EventId?.location}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >orginazer:  </h1><span>{EventId?.orginazer}</span>
                    </Flex>
                    <Flex>
                        <h1 style={{ color: "#3270fc" }} >Total Slot:  </h1><span>{EventId?.totalSlot}</span>
                    </Flex>
                    <form style={{ padding: "10px" }} onSubmit={formik.handleSubmit}>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => fileUploadHandler(e)}
                        />
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="EventTitle"
                                onChange={formik.handleChange}
                                name="EventTitle"
                                value={formik.values.EventTitle}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="cost"
                                onChange={formik.handleChange}
                                name="cost"
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
                                placeholder="EventFinishDate"
                                onChange={formik.handleChange}
                                name="EventFinishDate"
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
                                placeholder="EventStartDate"
                                onChange={formik.handleChange}
                                name="EventFinishDate"
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
                                placeholder="Location"
                                onChange={formik.handleChange}
                                name="Location"
                                value={formik.values.Location}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="orginazer"
                                onChange={formik.handleChange}
                                name="orginazer"
                                value={formik.values.orginazer}
                                className={Styles.Input}
                            />
                        </Box>
                        <Box>
                            <Input
                                borderColor={"black"}
                                variant="flushed"
                                pr="4.5rem"
                                size="lg"
                                placeholder="TotalSlot"
                                onChange={formik.handleChange}
                                name="TotalSlot"
                                value={formik.values.TotalSlot}
                                className={Styles.Input}
                            />
                        </Box>
                        <div className={Styles.container}>
                            <div className={Styles.ImageAndRadios}>
                                <Stack>
                                    <Input
                                        variant='flushed'
                                        placeholder='Search Category'
                                        size='lg'
                                        onChange={handleSearchChange}
                                    />
                                    <Select
                                        variant='flushed'
                                        placeholder='Select Category'
                                        size='lg'
                                        onChange={handleValueChange}
                                    >
                                        {searchQuery ? (
                                            filteredData.map((data) => (
                                                <option key={data.guId} value={`${data.guId},${data.category}`}>
                                                    {data.category}
                                                </option>
                                            ))
                                        ) : (
                                            Data.data?.map((data) => (
                                                <option key={data.guId} value={`${data.guId},${data.category}`}>
                                                    {data.category}
                                                </option>
                                            ))
                                        )}
                                    </Select>
                                </Stack>
                            </div>
                        </div>
                        <Flex alignItems={'center'} className={Styles.ButtonContainer} justifyContent={"center"} gap={10} flexFlow={"row"}>

                            <Button
                                className={Styles.Button}
                                size="md"
                                backgroundColor={"white !important"}
                                mt="24px"
                                onClick={() => handleNavigate("/ControlPanel/Events")}
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
                </Flex>
            </Box >
        </Flex >
    )
}
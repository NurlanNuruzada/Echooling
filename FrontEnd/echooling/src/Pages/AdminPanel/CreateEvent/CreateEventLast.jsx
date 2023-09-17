import React, { useState, useEffect } from 'react';
import { QueryClient, useMutation } from 'react-query';
import { Flex, Progress } from '@chakra-ui/react';
import Styles from './CreateEventLast.module.css';
import Done from '../../../Components/DoneModal/Done';
import Steps from '../../../Components/Steps/Steps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import { AddEvent } from '../../../Services/EventService';
import { getById } from '../../../Services/StaffService';
import axios from 'axios';

export default function CreateEventLast({ onNext, formData, onPrevious }) {
    const [step4Data, setStep4Data] = useState(null); // Initialize with null
    const [SentSuccess, setSentSuccess] = useState(false);
    const [Id, setId] = useState('');
    const [File, SetFile] = useState(null); // Declare File in the outer scope
    const [FileName, SetFileName] = useState('');
 
     const { token, userName ,fullname} = useSelector((state) => state.auth); // Update the selector
    if (token != null) {
        var decodedToken = jwt_decode(token);
        var id =
            decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
    }
    const handlePreviousClick = () => {
        onPrevious();
    };
    const { mutate: getId } = useMutation(
        (id) => getById(id),
        {
            onSuccess: (resp) => {
                setId(resp.data.guId);
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );
    useEffect(() => {
        console.log(fullname)
        getId(id);
    }, []);

    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };

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
            eventFinishDate: formData.step3Data.EventFinishDate,
            eventStartDate: formData.step3Data.EventStartDate,
            cost: formData.step3Data.Cost,
            orginazer: formData.step1Data,
            totalSlot: formData.step3Data.TotalSlot,
            location: formData.step3Data.Location,
            eventTitle: formData.step3Data.EventTitle,
            aboutEvent: formData.step3Data.AboutEvent,
            EventCategoryiesId: formData.step2Data,
            image: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("image", File ? File : "");
            formData.append("EventStartDate", values.eventFinishDate);
            formData.append("EventFinishDate", values.eventStartDate);
            formData.append("Cost", values.cost);
            formData.append("orginazer", values.orginazer);
            formData.append("TotalSlot", values.totalSlot);
            formData.append("Location", values.location);
            formData.append("orginazer", values.orginazer);
            formData.append("EventTitle", values.eventTitle);
            formData.append("AboutEvent", values.aboutEvent);
            formData.append("EventCategoryiesId", values.EventCategoryiesId);
            if (formData.get("image")) {
                console.log("FormData before muration",formData)
                mutate(formData);
            } else {
                console.log("FormData is null");
            }
        },
    });

    const { mutate, isLoading, error } = useMutation(
        (data) => AddEvent(Id, data),
        {
            onSuccess: (resp) => {
                console.log('success');
                console.log(resp);
                setSentSuccess(true);
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    useEffect(() => {
        if (SentSuccess) {
            const timer = setTimeout(() => {
                setSentSuccess(false);
                navigate("/ControlPanel/CreateEvent")
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [SentSuccess]);

    return (
        <div>
            <Progress value={100} />
            <Steps CurrentStep={3} TotalSteps={3} />
            {SentSuccess && (
                <Done
                    firstTitle={'the Event Created Succesfully'}
                    seccondTitle={'we will send email address about your Event check your email address'}
                />
            )}
            CreateEventLast
            <Flex gap={5}>
                <form onSubmit={formik.handleSubmit}>
                <input
                        name="image"
                        type="file"
                        onChange={(e) => fileUploadHandler(e)}
                    />
                    <button className={Styles.Button} onClick={handlePreviousClick}>
                        PREVIOUS
                    </button>
                    {true && (
                        <button className={Styles.Button} type="submit">
                            NEXT
                        </button>
                    )}
                </form>
            </Flex>
        </div>
    );
}

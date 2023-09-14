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

export default function CreateCourseLast({ onNext, formData, onPrevious }) {
    const [step4Data, setStep4Data] = useState(null); // Initialize with null
    const [SentSuccess, setSentSuccess] = useState(false);
    const [Id, setId] = useState('');
    const [File, SetFile] = useState(null); // Declare File in the outer scope
    const [FileName, SetFileName] = useState('');
    const { token, userName } = useSelector((state) => state.auth); // Update the selector

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
        getId(id);
    }, []);

    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };
    const saveFile = (e) => {
        console.log(e.target.files[0]);
        SetFile(e.target.files[0]);
        SetFileName(e.target.files[0].name);
    }
    const formik = useFormik({
        initialValues: {
            eventFinishDate: formData.step3Data.EventFinishDate,
            eventStartDate: formData.step3Data.EventStartDate,
            cost: formData.step3Data.Cost,
            orginazer: formData.step3Data.orginazer,
            totalSlot: formData.step3Data.TotalSlot,
            location: formData.step3Data.Location,
            eventTitle: formData.step3Data.EventTitle,
            aboutEvent: formData.step3Data.AboutEvent,
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
            formData.append("EventTitle", values.eventTitle);
            formData.append("AboutEvent", values.aboutEvent);
            console.log(formData.getAll("Cost"));
            console.log(formData.getAll("location"));
            console.log(formData.getAll("EventTitle"));
            console.log(formData.getAll("image"));
            console.log(formData.getAll("AboutEvent"));
            console.log(formData.getAll("orginazer"));
            console.log(formData.getAll("TotalSlot"));
            try {
                const response = await axios.post(`https://localhost:7222/api/Event/Create/id?staffId=${Id}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                // QueryClient.invalidateQueries("getAllSlider");
            } catch (error) {
                console.error(error);
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
                handleNavigate('/ControlPanel');
            }, 4500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [SentSuccess]);

    return (
        <div>
            <Progress value={100} />
            <Steps CurrentStep={4} TotalSteps={4} />
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
                        onChange={(e) => saveFile(e)}
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

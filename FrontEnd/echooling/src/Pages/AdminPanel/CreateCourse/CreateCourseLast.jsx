import React, { useState, useEffect } from 'react';
import { QueryClient, useMutation } from 'react-query';
import { Flex, Progress } from '@chakra-ui/react';
import Styles from './CreateCourseLast.module.css';
import Done from '../../../Components/DoneModal/Done';
import Steps from '../../../Components/Steps/Steps';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useFormik } from 'formik';
import { AddEvent } from '../../../Services/EventService';
import { getById } from '../../../Services/StaffService';
import axios from 'axios';
import { AddCourse } from '../../../Services/CourseService';
import { getTeacherById } from '../../../Services/TeacherService';

export default function CreateCourseLast({ onNext, formData, onPrevious }) {
    const [step4Data, setStep4Data] = useState(null); // Initialize with null
    const [SentSuccess, setSentSuccess] = useState(false);
    const [Id, setId] = useState('');
    const [File, SetFile] = useState(null); // Declare File in the outer scope
    const [FileName, SetFileName] = useState('');
    const { token, userName, fullname } = useSelector((state) => state.auth); // Update the selector
    const [MainData, SetMainData] = useState('');
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
        (id) => getTeacherById(id),
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
    useEffect(() => {
        SetMainData(formData)
    }, [formData]);
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
            formik.setFieldValue('Title', formData.step3Data.Title)
            formik.setFieldValue('Price', formData.step3Data.Price)
            formik.setFieldValue('Instructor', fullname)
            formik.setFieldValue('Languge', formData.step3Data.Languge)
            formik.setFieldValue('Subject', formData.step3Data.Subject)
            formik.setFieldValue('AboutCourse', formData.step3Data.AboutCourse)
            formik.setFieldValue('WhatWillLearn', formData.step3Data.WhatWillLearn)
            formik.setFieldValue('CourseCategoryId', formData.step3Data.CourseCategoryId)
            formik.setFieldValue('ThisCourseIncludes', formData.step3Data.ThisCourseIncludes)
        } else {
            console.error("No file selected.");
        }
    };
    const formik = useFormik({
        initialValues: {
            Title: '',
            Price: '',
            Instructor: '',
            Languge: '',
            Subject: '',
            ThisCourseIncludes: '',
            AboutCourse: '',
            WhatWillLearn: '',
            CourseCategoryId: '',
            image: null,
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            // Append values to formData
            formData.append("image", File ? File : "");
            formData.append("Title", values.Title);
            formData.append("Price", values.Price);
            formData.append("Instructor", fullname);
            formData.append("Languge", values.Languge);
            formData.append("Subject", values.Subject);
            formData.append("ThisCourseIncludes", values.ThisCourseIncludes);
            formData.append("WhatWillLearn", values.WhatWillLearn);
            formData.append("AboutCourse", values.AboutCourse);
            formData.append("CourseCategoryId", values.CourseCategoryId);
            formData.append("Approved", false);
            // Log formData

            if (formData.get("image")) {
                mutate(formData)
            } else {
            }
        },
    });
    const { mutate, isLoading, error } = useMutation(
        (data) => AddCourse(Id, data),
        {
            onSuccess: (resp) => {
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
                // navigate("/ControlPanel")
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
                        accept="image/*"
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

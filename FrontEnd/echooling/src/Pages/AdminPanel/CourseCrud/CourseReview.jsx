import React, { useEffect, useState } from 'react';
import Styles from '../../../Components/ReviewMessages/Reviewmessage.module.css';
import { Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { faPenToSquare, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteComment, UpdateReview } from '../../../Services/CommentService';
import { useFormik } from 'formik';
import ReactStars from "react-rating-stars-component";
import { useMutation, useQueryClient } from 'react-query';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import UpdateRate from '../../../Valudations/UpdateRateScema';

export default function CourseReviewAdminPanel({ point, Fullname, Comment, CreateDate, userId, CourseId, CommentId }) {
    const { token, userName, fullname } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [IsEdit, setIsEdit] = useState(false)
    const [Rate, setRate] = useState(null)
    const [InitialRate, setInitialRate] = useState(point)
    const cancelRef = React.useRef()
    useEffect(() => {
        updateFomik.setFieldValue("rate", Rate)
    }, [Rate])
    if (token != null) {
        var decodedToken = jwt_decode(token);
        var id =
            decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
    }
    const queryClient = useQueryClient();
    const initialvalues = {
        UserId: id,
        reviewId: CommentId,
        CourseId: CourseId
    };
    const [values, setValues] = useState(initialvalues);
    useEffect(() => {
        formik.setFieldValue("UserId", values.UserId)
        formik.setFieldValue("reviewId", values.reviewId)
        updateFomik.setFieldValue("CourseId", values.CourseId)
        setInitialRate(point)
    }, [values])
    const mutation = useMutation(
        (data) => DeleteComment(data.reviewId, data.UserId),
        {
            onSuccess: (resp) => {
                console.log("Success", resp);
                queryClient.invalidateQueries(['comments', CourseId]);
                queryClient.invalidateQueries(['course', CourseId]);
                onClose()
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
    function round(value, step) {
        step || (step = 1.0);
        var inv = 1.0 / step;
        return Math.round(value * inv) / inv;
    }
    const Update = useMutation(
        (data) => UpdateReview(values.reviewId, values.UserId, data),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries(['comments', CourseId]);
                queryClient.invalidateQueries(['course', CourseId]);
                setIsEdit(false)
                reset()
            },
            onError: (error) => {
                console.log(error);
            },
            validationSchema: UpdateRate,
        }
    );
    const [seed, setSeed] = useState(1);
    const reset = () => {
        setSeed(Math.random());
    }

    const formik = useFormik({
        initialValues: {
            UserId: '',
            reviewId: ''
        },
        onSubmit: (values) => {
            mutation.mutate(values); // Use the mutation's mutate function
        },

    });
    const updateFomik = useFormik({
        initialValues: {
            comment: '',
            rate: '',
            CourseId: ''
        },
        onSubmit: (values) => {
            Update.mutate(values);
            setInitialRate(values.rate)
        },
        validationSchema: UpdateRate,

    });
    return (
        <div>
            <>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Delete Comment</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to delete this comment?
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
            <Flex pt={5} flexDirection={'column'} >
                <Flex justifyContent={'space-between'}>
                    <div>
                        <ReactStars
                            value={round(InitialRate)}
                            size={14}
                            count={5}
                            color="lightgray"
                            activeColor="orange"
                            isHalf
                            emptyIcon={<FontAwesomeIcon icon={faStar} />}
                            halfIcon={<FontAwesomeIcon icon={["fas", "star-half-alt"]} color="lightgray" />}
                            filledIcon={<FontAwesomeIcon icon={["fas", "star"]} />}
                            edit={false}
                            key={seed}
                        />
                        <Flex className={Styles.nameAndDate} gap={1}>
                            <h1 className={Styles.bold}>{Fullname}</h1>
                            <h1 className={Styles.gray}>{CreateDate}</h1>
                        </Flex>
                        {IsEdit ?
                            <Flex alignItems={'center'}>
                                <Input name='comment' onChange={updateFomik.handleChange} />
                                <ReactStars size={20}
                                    count={5}
                                    name='rate'
                                    color="lightgray"
                                    activeColor="orange"
                                    isHalf
                                    emptyIcon={<FontAwesomeIcon icon={faStar} />}
                                    halfIcon={<FontAwesomeIcon icon={["fas", "star-half-alt"]} color="lightgray" />}
                                    filledIcon={<FontAwesomeIcon icon={["fas", "star"]} />}
                                    edit={true} onChange={(e) => setRate(e)} />

                                {updateFomik.errors.comment ? ' ' : <Button onClick={updateFomik.handleSubmit}>Submit</Button>}
                            </Flex> :
                            <h1>{Comment}</h1>}
                    </div>
                        <div>
                            <Flex gap={3}><FontAwesomeIcon cursor={"pointer"} onClick={() => setIsEdit(true)} color='#FF8A33' icon={faPenToSquare} /><FontAwesomeIcon cursor={"pointer"} onClick={onOpen} icon={faTrashCan} style={{ color: "#d23232", }} /></Flex>
                        </div>
                </Flex>
            </Flex>
        </div>
    );
}

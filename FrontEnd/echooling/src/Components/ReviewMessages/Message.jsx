import React, { useEffect, useState } from 'react';
import Styles from './Reviewmessage.module.css';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import Stars from '../Starts/Stars';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteComment } from '../../Services/CommentService';
import { useFormik } from 'formik';
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

export default function Message({ point, Fullname, Comment, CreateDate, userId, CourseId, CommentId }) {
    const { token, userName, fullname } = useSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
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
        reviewId: CommentId
    };
    const [values, setValues] = useState(initialvalues);
    useEffect(() => {
        formik.setFieldValue("UserId", values.UserId)
        formik.setFieldValue("reviewId", values.reviewId)
    }, [values])
    const mutation = useMutation(
        (data) => DeleteComment(data.reviewId, data.UserId),
        {
            onSuccess: (resp) => {
                console.log("Success", resp);
                queryClient.invalidateQueries(['comments', CourseId]);
                onClose()
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );

    console.log("userId prop:", userId); // Log the userId prop to see its value

    const formik = useFormik({
        initialValues: {
            UserId: '',
            reviewId: ''
        },
        onSubmit: (values) => {
            mutation.mutate(values); // Use the mutation's mutate function
        },

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
                            <Button  onClick={formik.handleSubmit} colorScheme='red' ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
            <Flex pt={5} flexDirection={'column'} >
                <Flex justifyContent={'space-between'}>
                    <div>
                        <Stars initialRating={point} />
                        <Flex className={Styles.nameAndDate} gap={1}>
                            <h1 className={Styles.bold}>{Fullname}</h1>
                            <h1 className={Styles.gray}>{CreateDate}</h1>
                        </Flex>
                        <h1>{Comment}</h1>
                    </div>
                    <div>
                        {userId == id && <Flex gap={3}><FontAwesomeIcon color='#FF8A33' icon={faPenToSquare} /><FontAwesomeIcon onClick={onOpen} icon={faTrashCan} style={{ color: "#d23232", }} /></Flex>}
                    </div>
                </Flex>
            </Flex>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import Styles from "./RateCourse.module.css";
import {
    Flex,
    Input,
    Button,
    Text,
} from "@chakra-ui/react";
import Starts from "../../Components/Starts/Stars";
import { AddCommnent } from "../../Services/CommentService";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query"; // Import useQueryClient
import CreateCommnetScema from "../../Valudations/WriteCommentScema";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const RateCourse = ({
    title,
    secondTitle,
    comment,
    CourseId,
    rate // Pass the rate as a prop
}) => {
    const { token, userName, fullname } = useSelector((state) => state.auth);
    if (token != null) {
        var decodedToken = jwt_decode(token);
        var id =
            decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
    }

    const [GivenRate, setGivenRate] = useState(rate);
    const queryClient = useQueryClient(); // Get the query client

    const handleRate = (rate) => {
        setGivenRate(rate);
        formik.setFieldValue("rate", rate);
    };

    const mutation = useMutation(
        (data) => AddCommnent(data),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries(['comments', CourseId]);
            },
        }
    );

    const formik = useFormik({
        initialValues: {
            comment: null,
            rate: null,
            userId: id,
            fullname: fullname,
            courseId: CourseId
        },
        onSubmit: (values) => {
            mutation.mutate(values); // Use the mutation's mutate function
        },
        validationSchema: CreateCommnetScema,
    });

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.right}>
                <div className={Styles.formTitleContainer}>
                    <h1>{title}</h1>
                    <h2>{secondTitle}</h2>
                </div>
                <div className={Styles.formContainer}>
                    <form className={Styles.formControl} onSubmit={formik.handleSubmit}>
                        <Input
                            placeholder="Add a comment..."
                            variant="flushed"
                            className={Styles.Input}
                            onChange={formik.handleChange}
                            name="comment"
                        />
                        {formik.errors.comment && (
                            <Text color="red" fontSize="sm">
                                {formik.errors.comment}
                            </Text>
                        )}
                        <Flex pt={2} pb={2} gap={10} alignItems={"center"}>
                            <h1>rate this Course:</h1>
                            <Starts onChange={formik.handleChange} handleRate={handleRate} size={25} isEditable={true} />
                        </Flex>
                        {formik.errors.rate && (
                            <Text color="red" fontSize="sm">
                                {formik.errors.rate}
                            </Text>
                        )}
                        <Button type="submit" disabled={formik.isValidating || mutation.isLoading} className={Styles.Button}>
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RateCourse;

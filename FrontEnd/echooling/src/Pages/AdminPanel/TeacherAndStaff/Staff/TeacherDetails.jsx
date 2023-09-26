import React, { useEffect, useState } from "react";
import Styles from "../../../TeacherDetails/TeacherDetails.module.css"
import image from "../../../../Images/teacher/teacher5.jpg";
import { Grid, Flex, Button } from "@chakra-ui/react";
import {
    faFacebook,
    faTwitter,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Counter from "../../../../Components/Counter/Couter";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { getTeacherById } from "../../../../Services/TeacherService";
const TeacherDetailsAdminPanel = () => {
    const { id } = useParams();
    const [props, setProps] = useState()
    const { mutate, isLoading, error } = useMutation(
        (id) => getTeacherById(id),
        {
            onSuccess: (resp) => {
                console.log(resp);
                setProps(resp)
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
    useEffect(() => {
        mutate(id);
    }, []);
    const navigate = useNavigate();
    const handleNavigate = (route) => {
        navigate(route);
    };
    return (
        <div style={{ maxWidth: "1200px", margin: "auto" }}  className={Styles.Container}>
            <div className={Styles.upContainer}>
                <Grid
                    className={Styles.teacherContainer}
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(2, 1fr)",
                        xl: "repeat(2, 1fr)",
                    }}
                    rowGap={5}
                >
                    <div className={Styles.ImageContainer}>
                        <img className={Styles.Image} src={image} alt="" />
                    </div>
                    <div className={Styles.details}>
                        <div>
                            <h1>Staff : {props?.data.fullname}</h1>
                            <h2>{props?.data.profecion}</h2>
                        </div>
                        <div>
                            <h3>ABOUT ME</h3>
                            <p>
                                {props?.data.aboutMe}
                            </p>
                            <h2>DEGREE:</h2>
                            <span> {props?.data.profession}</span>
                            <h2>EXPERIENCE:</h2>
                            <span>Total experience {props?.data.totalExperianceHours}</span>
                            <h2>HOBBIES:</h2>
                            <span>{props?.data.hobbies}</span>
                            <h2>FACULTY:</h2>
                            <span>{props?.data.faculty}</span>
                            <h2>Start Experiance:</h2>
                            <span>{props?.data.userKnowledge}</span>
                        </div>
                    </div>
                </Grid>
            </div>
            <Grid
                className={Styles.ContactContainer}
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(2, 1fr)",
                }}
                rowGap={5}
            >
                <div className={Styles.ContactInformation}>
                    <h1>Contact Information</h1>
                    <div>
                        <Flex gap={1} alignItems={"center"}>
                            <h2>Mail me:</h2>
                            <span> {props?.data.emailAddress}</span>
                        </Flex>
                        <Flex gap={1} alignItems={"center"}>
                            <h2>Make a call:</h2>
                            <span> {props?.data.phoneNumber}</span>
                        </Flex>
                    </div>
                    <div>
                        <div className={Styles.down3}>
                            <Link to={`http://${props?.data.facebook}`}>
                                <FontAwesomeIcon className={Styles.icon} icon={faFacebook} />
                            </Link>
                            <Link to={`http://${props?.data.twitter}`}>
                                <FontAwesomeIcon className={Styles.icon} icon={faTwitter} />
                            </Link>
                            <Link to={`http://${props?.data.linkedin}`}>
                                <FontAwesomeIcon className={Styles.icon} icon={faLinkedin} />
                            </Link>
                            <Link to={`http://${props?.data.instagram}`}>
                                <FontAwesomeIcon className={Styles.icon} icon={faInstagram} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <Flex className={Styles.flex} gap={4} flexWrap={"wrap"}>
                        <Counter MaxNumber={props?.data.totalExperianceHours} InlineText={"total Experiance hours"} />
                        <Counter MaxNumber={props?.data.totalStudentCount} InlineText={"total Students"} />
                        <Counter MaxNumber={props?.data.totalOnlineCourseCount} InlineText={"total online Courses"} />
                    </Flex>
                </div>
            </Grid>

            <Button onClick={() => handleNavigate("/ControlPanel/Staff/")} color={'white'} bg={'#4586ff'}>get back</Button>
        </div>
    );
};

export default TeacherDetailsAdminPanel;

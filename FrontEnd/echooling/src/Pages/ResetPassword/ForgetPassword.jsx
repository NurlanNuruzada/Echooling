import React, { useState } from "react";
import Styles from "./resetPassword.module.css";
import Resetpassword from "../../Valudations/Resetpassword";
import {
  Heading,
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Input,
  tokenToCSSVar
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { logoutAction } from "../../Redux/Slices/AuthSlice";
import { ResetPassword } from "../../Services/AuthService";
import Done from "../../Components/DoneModal/Done";
const ForgetPassword = () => {
    const buttonsAndRoute = {
        button1:{
            navigate:"/",
            name:"Home",
            color:"gray"
        },
        button2:{
            navigate:"/auth/register",
            name:"Done",
            color:"green"
        },
        title:"Your password is succesfully changed!"
    }
    const [PasswordChanged,setPasswordChanged] = useState()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const UserId = queryParams.get("userId");
    const token = queryParams.get("token");
    const decodedToken = decodeURIComponent(token);
    
    const dispatch = useDispatch();
    const { mutate, isLoading, error } = useMutation(
        (values) => ResetPassword(values),
        {
          onSuccess: (resp) => {
            dispatch(logoutAction(resp.data));
            setPasswordChanged(true);
            console.log(resp);
          },
          onError: (error) => {
            console.log(error);
            setPasswordChanged(false);
          },
        }
      );
    
      const formik = useFormik({
        initialValues: {
          password: "",
          userId: UserId,
          token: decodedToken,
          confirmPassword: "",
        },
        onSubmit: (value) => {
          const { confirmPassword, ...values } = value;
          mutate(values);
        },
        validationSchema: Resetpassword,
      });
    
      const getErrorMessage = (fieldName) => {
        return formik.errors[fieldName] ? formik.errors[fieldName] : "";
      };
    
      return (
        <>
             {PasswordChanged  && (
          <Done buttonsAndNagivage={buttonsAndRoute} />)}
          <Flex p={"40px 0"} justifyContent={"center"}>
            <Box minW="0rem">
              <Heading color={"#3270fc"} mb={4}>
                Create New Password
              </Heading>
              <Flex p={"20px 0"} gap={5} flexFlow={"column"}>
                <Box>
                  <Input
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="Enter password"
                    onChange={formik.handleChange}
                    name="password"
                    value={formik.values.password}
                  />
                </Box>
                <Box>
                  <Input
                    borderColor={"black"}
                    variant="flushed"
                    pr="4.5rem"
                    size="lg"
                    placeholder="Confirm your password"
                    onChange={formik.handleChange}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                  />
                </Box>
              </Flex>
              <List>
                {Object.keys(formik.errors).map((fieldName) => (
                  <ListItem key={fieldName}>
                    <div style={{ color: "red", textAlign: "start" }}>
                      {getErrorMessage(fieldName)}
                    </div>
                  </ListItem>
                ))}
              </List>
              <Flex className={Styles.ButtonContainer} gap={10} flexFlow={"row"}>
                <Button
                  className={Styles.Button}
                  size="md"
                  backgroundColor={"white !important"}
                  mt="24px"
                >
                  Return to menu
                </Button>
                <Button
                  onClick={formik.handleSubmit}
                  className={Styles.Button}
                  size="md"
                  mt="24px"
                >
                  Submit new Password
                </Button>
              </Flex>
            </Box>
          </Flex>
        </>
      );
}

export default ForgetPassword;

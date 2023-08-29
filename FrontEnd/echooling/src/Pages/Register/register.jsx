import React from "react";
import Styles from "./Register.module.css";
import BakgroundImage from "../../Images/BakgroundSignIn.jpg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
  Divider,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, UnlockIcon } from "@chakra-ui/icons";
import News from "../../Components/News/News";
import ContactUsForm from "../../Components/ContactUs/ContactUsForm";
import RegisterScema from "../../Valudations/RegisterScema";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerAction } from "../../Redux/Slices/AuthSlice";
import { register } from "../../Services/AuthService";
const Register = () => {
  const dispatch = useDispatch();
  const getErrorMessage = (fieldName) => {
    return  formik.errors[fieldName]
      ? formik.errors[fieldName]
      : "";
  };
  const { mutate, isLoading, error } = useMutation(
    (values) => register(values),
    {
      onSuccess: (resp) => {
        dispatch(registerAction(resp.data));
        console.log(resp);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      email: "",
      name: "",
      surname: "",
      password: "",
      userName: "",
    },
    onSubmit: (values) => mutate(values),
    validationSchema: RegisterScema,
  });
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box>
      <div className={Styles.MainContainer}>
        <div className={Styles.BackgrounImage}></div>
        <Flex className={Styles.MainFlex} flexDirection={"column"}>
          <div className={Styles.Main}>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Register</Tab>
                <Tab>Login</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <h1>Sign up now</h1>
                  <Flex className={Styles.Input}>
                    <Input
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                      borderColor={"#5555"}
                      placeholder="Name"
                    />
              
                    <Input
                      name="surname"
                      onChange={formik.handleChange}
                      value={formik.values.surname}
                      isInvalid={
                        formik.touched.surname && formik.errors.surname
                      }
                      borderColor={"#5555"}
                      placeholder="surname"
                    />
                    <Input
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      isInvalid={
                        formik.touched.userName && formik.errors.userName
                      }
                      borderColor={"#5555"}
                      placeholder="username"
                    />
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AtSignIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isInvalid={formik.touched.email && formik.errors.email}
                        borderColor={"#5555"}
                        type="mail"
                        placeholder="mail"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        name="email"
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <PhoneIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isInvalid={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        }
                        borderColor={"#5555"}
                        type="tel"
                        placeholder="Phone number(optional)"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                    </InputGroup>

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <UnlockIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        isInvalid={
                          formik.touched.password && formik.errors.password
                        }
                        borderColor={"#5555"}
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                        name="password"
                        value={formik.values.password}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <UnlockIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        borderColor={"#5555"}
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <UnorderedList>
                      {Object.keys(formik.errors).map((fieldName) => (
                        <ListItem key={fieldName}>
                          <div style={{ color: "red" ,textAlign: "start"}}>
                            {getErrorMessage(fieldName)}
                          </div>
                        </ListItem>
                      ))}
                    </UnorderedList>
                    <Button
                      onClick={formik.handleSubmit}
                      className={Styles.Button}
                      backgroundColor={"#3270fc"}
                      color={"white"}
                    >
                      SIGN UP
                    </Button>
                    <Box position="relative" padding="10">
                      <Divider />
                      <AbsoluteCenter
                        fontWeight={500}
                        color="#3270fc"
                        bg="white"
                        px="4"
                      >
                        OR
                      </AbsoluteCenter>
                    </Box>
                    <FontAwesomeIcon className={Styles.Icon} icon={faGoogle} />
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <h1>Login</h1>
                  <Flex className={Styles.Input}>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AtSignIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        borderColor={"#5555"}
                        type="mail"
                        placeholder="mail or phonenumber"
                      />
                    </InputGroup>

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <UnlockIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        borderColor={"#5555"}
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <Button
                      className={Styles.Button}
                      backgroundColor={"#3270fc"}
                      color={"white"}
                    >
                      SIGN IN
                    </Button>
                    <Box position="relative" padding="10">
                      <Divider />
                      <AbsoluteCenter
                        fontWeight={500}
                        color="#3270fc"
                        bg="white"
                        px="4"
                      >
                        OR
                      </AbsoluteCenter>
                    </Box>
                    <FontAwesomeIcon className={Styles.Icon} icon={faGoogle} />
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </Flex>
      </div>
      <ContactUsForm />
      <News />
    </Box>
  );
};

export default Register;

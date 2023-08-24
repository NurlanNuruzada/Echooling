import React from "react";
import Styles from "./Register.module.css";
import BakgroundImage from "../../Images/BakgroundSignIn.jpg";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
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
                  <Input borderColor={"#5555"} placeholder="Name" />
                  <Input borderColor={"#5555"} placeholder="Surname" />
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <AtSignIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      borderColor={"#5555"}
                      type="mail"
                      placeholder="mail"
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <PhoneIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      borderColor={"#5555"}
                      type="tel"
                      placeholder="Phone number"
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
                  <Button
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
  );
};

export default Register;

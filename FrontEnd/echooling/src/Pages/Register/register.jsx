import React from "react";
import Styles from "./Register.module.css";
import BakgroundImage from "../../Images/BakgroundSignIn.jpg";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PhoneIcon, AtSignIcon, UnlockIcon } from "@chakra-ui/icons";
const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div className={Styles.MainContainer}>
        <div className={Styles.BackgrounImage}></div>
      <Flex className={Styles.MainFlex} flexDirection={"column"}>
        <div className={Styles.Main}>
            <h1>Sign up now</h1>
          <Flex className={Styles.Input}>
            <Input placeholder="Name" />
            <Input placeholder="Surname" />
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="mail" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="Phone number" />
            </InputGroup>

            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <UnlockIcon color="gray.300" />
              </InputLeftElement>
              <Input
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
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import Styles from "./Header.module.css";
import MainLogo from "../../Images/logo2.png";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Button,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import SearchInputCom from "../SeacthInput/SearchInput2.jsx";
import { logoutAction } from "../../Redux/Slices/AuthSlice";
import { useMutation } from "react-query";
import { ResetPasswordSend } from "../../Services/AuthService";
import Done from "../DoneModal/Done";
import { getTeacherById } from "../../Services/TeacherService";
import { getById } from "../../Services/StaffService";
const buttonsAndRoute = {
  button1: {
    navigate: "/home",
    name: "Home",
    color: "green",
  },
  title:
    "Please check your email Adress We sent Reset Password link to your accont!",
};
const Header = () => {
  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Isteacher, setIsTeacher] = useState(true);
  const [IsStaff, setIsStaff] = useState(true);
  const { token, userName } = useSelector((state) => state.auth); // Update the selector
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var id =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const { mutate : getStaff} = useMutation(
    (id) => getTeacherById(id),
    {
      onSuccess: (resp) => {
        setIsTeacher(false)
      },
      onError: (error) => {
        setIsTeacher(true)
    }
  }
  );
  const { mutate :Getteacher} = useMutation(
    (id) => getById(id),
    {
      onSuccess: (resp) => {
        setIsStaff(false)
      },
      onError: (error) => {
        setIsStaff(true)
      },
    }
  );
  useEffect(() => {
    getStaff(id);
    Getteacher(id);
  }, [token]);
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var userId =
      decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
  }
  const handleSendReset = () => {
    mutate(userId);
  };
  const { mutate } = useMutation((userId) => ResetPasswordSend(userId), {
    onSuccess: (resp) => {
      setSuccess(true);
    },
    onError: (error) => {
      setSuccess(false);
    },
  });
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  const dispatch = useDispatch();
  const Routes = ["Home", "About", "Courses", "Contact", "Events", "Staff"];
  const userGreeting = userName ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {userName}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => dispatch(logoutAction())}>Log out</MenuItem>
        <MenuItem  onClick={() => handleNavigate(`/ControlPanel`)}>Panel</MenuItem>
        <MenuItem onClick={handleSendReset}>ResetPassword</MenuItem>
        {Isteacher && <MenuItem onClick={() => handleNavigate(`/Applyteacher/teaching-experiance`)}>Apply For Teaching</MenuItem>}
        {/* {Isteacher && <MenuItem onClick={() =>onOpen}>Change Image</MenuItem>} */}
        {IsStaff  &&<MenuItem onClick={() => handleNavigate(`/ApplyForStaffContainer`)}>Apply For Event job</MenuItem>}
      </MenuList>
    </Menu>
  ) : (
    <p
      onClick={() => !userName && handleNavigate("/auth/register")}
      className={Styles.page}
    >
      Sign In
    </p>
  );
  return (
    <div className={Styles.MainContainer}>
       <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
      {success && <Done buttonsAndNagivage={buttonsAndRoute} />}
      <div className={Styles.LeftSideLogo}>
        <img src={MainLogo} alt="" />
      </div>
      <div className={Styles.rightSide}>
        <div className={Styles.pages}>
          {Routes.map((route, index) => (
            <div key={index}>
              <p onClick={() => handleNavigate(route)} className={Styles.page}>
                {route}
              </p>
            </div>
          ))}
        </div>
        <Flex flexDirection={"row"} alignItems={"center"}>
          <div className={Styles.signIn}>
            <p className={Styles.page}>{userGreeting}</p>
          </div>
          <div className={Styles.BurgerMenu}>
            <Menu isLazy>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList direction="rtl">
                {Routes.map((route, index) => (
                  <MenuItem onClick={() => handleNavigate(route)} key={index}>
                    <div className={Styles.mirrorEffect}>
                      <p className={Styles.page}>{route}</p>
                    </div>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Header;

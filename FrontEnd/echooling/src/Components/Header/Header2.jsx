import React, { useEffect, useState } from "react";
import MainLogo from "../../Images/logo2.png";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Button,
} from "@chakra-ui/react";
import  Styles  from './Header2.module.css';
import SearchInputCom from "../SeacthInput/SearchInput2.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../Redux/Slices/AuthSlice";
import { useMutation } from "react-query";
import { ResetPasswordSend } from "../../Services/AuthService";
import Done from "../DoneModal/Done";
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

  const { token, userName} = useSelector((state) => state.auth); 
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
  const Routes = ["Home"];
  return (
    <div className={Styles.MainContainer}>
      {success && <Done buttonsAndNagivage={buttonsAndRoute} />}
      <div className={Styles.LeftSideLogo}>
        <img src={MainLogo} alt="" />
      </div>
      <div className={Styles.rightSide}>
        <div className={Styles.pages}>
          {Routes.map((route, index) => (
            <div key={index}>
              <p onClick={() => handleNavigate(route)} className={Styles.page}>
                get back to home
              </p>
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import Styles from "./Header.module.css";
import MainLogo from "../../Images/logo2.png";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import SearchInputCom from "../SeacthInput/SearchInput2.jsx";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(`./${route}`);
    console.log("Navigation triggered");
  };

  const Routes = ["Home", "About", "Courses", "contact", "Events", "staff"];
  const { token, userName } = useSelector(state => state.auth); // Update the selector

  const userGreeting = userName ? `${userName}` : "Sign In"; 

  return (
    <div className={Styles.MainContainer}>
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
            <p
              onClick={() => handleNavigate("auth/register")}
              className={Styles.page}
            >
              {userGreeting}
            </p>
          </div>
          <div className={Styles.icons}>
            <SearchInputCom height={"20px"} placeholder={"Search"} />
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

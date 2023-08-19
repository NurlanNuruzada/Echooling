import React from "react";
import Styles from "./Header.module.css";
import MainLogo from "../../Images/logo2.png";
import { Select } from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  IconButton,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import SearchInputCom from "../SeacthInput/SearchInput2.jsx";

const Header = () => {
  const navigate = useNavigate();
  
  const handleNavigate = (route) => {
    navigate(`./${route}`);
    console.log("Navigation triggered");
  };

  const Routes = ["Home", "About", "Courses", "contact", "blogs"];

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
        <div className={Styles.icons}>
          <SearchInputCom
            height={"20px"}
            width={"104px"}
            placeholder={"Search"}
          />
        </div>
        {/* This part handles the burger menu */}
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

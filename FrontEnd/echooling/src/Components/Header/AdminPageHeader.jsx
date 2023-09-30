import React from 'react';
import Styles from './AdminPageHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { Menu, Button, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import jwt_decode from "jwt-decode";
import { getTeacherById } from '../../Services/TeacherService';
import { getById } from '../../Services/StaffService';
import { useEffect } from 'react';
import { ResetPasswordSend } from '../../Services/AuthService';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logoutAction, setUsetJobAction } from '../../Redux/Slices/AuthSlice';
import Done from '../DoneModal/Done';

function AdminPageHeader({ toggleIsSmall, isSmall, IsButtonClicked }) {
  const [reset, setReset] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Isteacher, setIsTeacher] = useState(true);
  const [IsStaff, setIsStaff] = useState(true);
  const { token, userName, isTeacherUser, isStaffUser } = useSelector((state) => state.auth); // Update the selector
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var id =
      decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
  }
  const [SentSuccess, setSentSuccess] = useState(false)
  useEffect(() => {
    if (SentSuccess) {
      const timer = setTimeout(() => {
        setSentSuccess(false); // Set it to false to hide the modal
      }, 2500);
      return () => {
        clearTimeout(timer);
        handleNavigate("/");
      };
    }
  }, [SentSuccess]);
  const { mutate: getStaff } = useMutation(
    (id) => getTeacherById(id),
    {
      onSuccess: (resp) => {
        dispatch(setUsetJobAction(resp.data));
        setIsTeacher(false)
      },
      onError: (error) => {
        setIsTeacher(true)
      }
    }
  );
  const { mutate: Getteacher } = useMutation(
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
  }, []);
  const handleSendReset = () => {
    mutate(id);
  };
  const { mutate } = useMutation((id) => ResetPasswordSend(id), {
    onSuccess: (resp) => {
      setSentSuccess(true);
      console.log(resp);
    },
    onError: (error) => {
      setSentSuccess(false);
    },
  });
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  const dispatch = useDispatch();

  return (
    <div className={Styles.main}>
      {SentSuccess && <Done firstTitle={"the ResetPassword request sent Succesfully"} seccondTitle={"we will send email address about your Request check your email address"} />}
      <FontAwesomeIcon
        size="xl"
        icon={faBarsStaggered}
        style={{ color: "#2e71e5" }}
        onClick={() => {
          IsButtonClicked();
          toggleIsSmall();
        }}
      />
      <div className={Styles.UserSeciton}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {userName}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleNavigate(`/`)}>Go to HomePage</MenuItem>
            {Isteacher && <MenuItem onClick={() => handleNavigate(`/Applyteacher/teaching-experiance`)}>Apply For Teaching</MenuItem>}
            {IsStaff && <MenuItem onClick={() => handleNavigate(`/ApplyForStaffContainer`)}>Apply For Job</MenuItem>}
            <MenuItem onClick={handleSendReset}>ResetPassword</MenuItem>
            <MenuItem onClick={() => dispatch(logoutAction())}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default AdminPageHeader;

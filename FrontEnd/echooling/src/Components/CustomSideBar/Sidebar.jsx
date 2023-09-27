import React, { useEffect } from 'react';
import image from '../../Images/logo2.png';
import SmallLog from '../../Images/mainLogo.png'
import Styles from './SideBarStyles.module.css';
import { Avatar, AvatarBadge, AvatarGroup, useQuery } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPlus, faCalendarDays, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useMutation } from 'react-query';
import { getUserRoles } from '../../Services/AuthService';

export default function Sidebar({ CreateTeacher, CreateStaff, isSmall, toggleIsSmall, IsButtonClicked }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [data, setdata] = useState([]);
  const { token, userName, fullname } = useSelector((state) => state.auth); // Update the selector
  if (token != null) {
    var decodedToken = jwt_decode(token);
    var id =
      decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
  }
  const { mutate } = useMutation(
    (values) => getUserRoles(id),
    {
      onSuccess: (resp) => {
        setdata(resp.data)
        console.log(resp.data)
      }
    }
  );
  useEffect(() => {
    mutate(id)
  }, [id])

  const handleMouseOver = () => {
    if (isSmall) {
      toggleIsSmall();
    }
  };

  const handleMouseLeave = () => {
    if (!IsButtonClicked) {
      toggleIsSmall();
    }
    setIsMouseOver(true);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >{handleMouseLeave}
      <div className={isSmall ? Styles.adminPanelContainerMini : Styles.adminPanelContainer}>
        <div className={isSmall ? Styles.ImageContainerMini : Styles.ImageContainer}>
          <img src={isSmall ? SmallLog : image} alt="" />
        </div>
        <div className={isSmall ? Styles.UserSecitonMini : Styles.UserSeciton}>
          <Avatar size='xl' name='Dan Abrahmov' color={"red"} src='https://bit.ly/dan-abramov' />
          <h1>{fullname}</h1>
          <h2>
            {data?.map((item, index) => (
              <span key={index}>{item},</span>
            ))}
          </h2>
        </div>
        <ul className={Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Main</h1>
          <li  >
            <Link to={"/ControlPanel"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Dashboard</h1>
            </Link>
            <Link to={"/ControlPanel"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Events</h1>
            </Link>
            <Link to={"/ControlPanel"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Courses</h1>
            </Link>
            <Link to={"/ControlPanel"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Wish List</h1>
            </Link>
          </li>
        </ul>
        {data?.includes("SuperAdmin") && <ul className={Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Super Admin</h1>
          <li  >
            <Link to={"/ControlPanel/logs"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Data Logs</h1>
            </Link>
          </li>
        </ul>}
        {(data?.includes("SuperAdmin") || data?.includes("Admin")) && <ul className={Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Admin</h1>
          <li  >
            <Link to={"/ControlPanel/CreateSlider"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Slider</h1>
            </Link>
          </li>
          <li  >
            <Link to={"/ControlPanel/Events"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Events</h1>
            </Link>
          </li>
          <li  >
            <Link to={"/ControlPanel/CourseList"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Course</h1>
            </Link>
          </li>
          <li>
            <Link to={"/ControlPanel/Staff"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>teacher And Staff</h1>
            </Link>
          </li>
        </ul>}
        {(data?.includes("SuperAdmin") || data?.includes("Admin")) && data?.includes("Teacher") && (
          <ul className={isSmall ? Styles.linkListMini : Styles.linkList}>
            <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Teacher</h1>
            <li>
              <Link to={"/ControlPanel/CreateCourseContainer"} className={isSmall ? Styles.ButtonMini : Styles.Button}>
                <FontAwesomeIcon icon={faChartLine} />
                <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Create Course</h1>
              </Link>
            </li>
            <li>
              <Link to={`/ControlPanel/Course/MyCourses/${id}`} className={isSmall ? Styles.ButtonMini : Styles.Button}>
                <FontAwesomeIcon icon={faChartLine} />
                <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>My Courses</h1>
              </Link>
            </li>
          </ul>
        )}
        {(data?.includes("SuperAdmin") || data?.includes("Admin") || data?.includes("Staff")) && (
          <ul className={isSmall ? Styles.linkListMini : Styles.linkList}>
            <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Events</h1>
            {CreateStaff?.map((CreateStaff, index) => (
              <li key={index}>
                <Link to={CreateStaff.link} className={isSmall ? Styles.ButtonMini : Styles.Button}>
                  {CreateStaff.LinkName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

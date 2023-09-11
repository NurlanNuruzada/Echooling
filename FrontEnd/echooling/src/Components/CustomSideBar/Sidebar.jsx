import React, { useEffect } from 'react';
import image from '../../Images/logo2.png';
import SmallLog from '../../Images/mainLogo.png'
import Styles from './SideBarStyles.module.css';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPlus, faCalendarDays, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Sidebar({ CreateTeacher, CreateStaff, isSmall }) {
  useEffect(() => {
  }, []);
  return (
    <div>
      <div className={isSmall ? Styles.adminPanelContainerMini : Styles.adminPanelContainer}>
        <div className={ isSmall ? Styles.ImageContainerMini : Styles.ImageContainer}>
          <img src={isSmall ? SmallLog : image} alt="" />
        </div>
        <div className={ isSmall ? Styles.UserSecitonMini : Styles.UserSeciton }>
          <Avatar size='xl' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          <h1>Nurlan Nurzade</h1>
          <h2>Programmer</h2>
        </div>
        <ul className={ Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Main</h1>
          <li  >
            <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faChartLine} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Dashboard</h1>
            </Link>
            <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Events</h1>
            </Link>
            <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Courses</h1>
            </Link>
            <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
              <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} />
              <h1 className={isSmall ? Styles.SelectionMini : Styles.Selection}>Wish List</h1>
            </Link>
          </li>
        </ul>
        <ul className={isSmall ? Styles.linkListMini : Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Teacher</h1>
          {CreateTeacher?.map((CreateTeacher, index) => (
            <li key={index} >
              <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
                {CreateTeacher}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={isSmall ? Styles.linkListMini : Styles.linkList}>
          <h1 className={isSmall ? Styles.MainListMini : Styles.MainList}>Events</h1>
          {CreateStaff?.map((CreateStaff, index) => (
            <li key={index} >
              <Link className={isSmall ? Styles.ButtonMini : Styles.Button}>
                {CreateStaff}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Course from "../Pages/Course/Course";
import Events from "../Pages/Events/Events";
import Contact from "../Pages/Contact/Contact";
import Staf from "../Pages/Teachers/Staf";
import TeacherDetail from "../Pages/TeacherDetail/teacherDetail";
import EventDetails from "../Pages/Eventdetail/EventDetails";
import Register from "../Pages/Register/register";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import { useSelector } from "react-redux";
import ConfirmEmail from "../Pages/ConfirmEmail/ConfirmEmail";
export default function Routes() {
  const { token } = useSelector((x) => x.auth);
  let routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Auth/Register",
          element: token ? <Navigate to={"/"}/> : <Register />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/Courses",
          element: <Course />,
        },
        {
          path: "/Events",
          element: <Events />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/Staff",
          element: <Staf />,
        },
        {
          path: "/CourseDetails",
          element: <CourseDetails />,
        },
        {
          path: "/TeacherDeatils",
          element: <TeacherDetail />,
        },
        {
          path: "/EventDetail",
          element: <EventDetails />,
        },
        {
          path: "/Auth/ConfirmEmail",
          search: '?userId=value&token=value',
          element: <ConfirmEmail/>
      },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}

import React from "react";
import { useRoutes } from "react-router-dom";
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
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/register";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
export default function Routes(){
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
          path: "/Auth/Login",
          element: <Login />,
        },
        {
          path: "/Auth/Register",
          element: <Register />,
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
          path: "/*",
          element: <NotFound />,
        },
      ],
    }
  ];
   return  useRoutes(routes);
};


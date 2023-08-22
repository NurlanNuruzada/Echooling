import React from "react";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import NotFound from "../Pages/NotFound";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Course from "../Pages/Course/Course";
import Events from "../Pages/Events/Events";
import Contact from "../Pages/Contact";

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
          path: "/*",
          element: <NotFound />,
        },
      ],
    }
  ];
   return  useRoutes(routes);
};


import React from "react";
import Home from "../Pages/Home";
import Course from "../Pages/Course";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import { useRoutes } from "react-router-dom";
import { MainLayout } from "../Layouts/MainLayout";
import About from "../Pages/About";
import NotFound from "../Pages/NotFound";

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
          path: "/blogs",
          element: <Blog />,
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


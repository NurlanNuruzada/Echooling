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
import TeacherDetail from "../Pages/StaffDetail/StaffDetail";
import EventDetails from "../Pages/Eventdetail/EventDetails";
import Register from "../Pages/Register/register";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import { useSelector } from "react-redux";
import ConfirmEmail from "../Pages/ConfirmEmail/ConfirmEmail";
import ForgetPassword from "../Pages/ResetPassword/ForgetPassword";
import forgetPasswordEmail from "../Pages/ForgetPassword/forgetPasswordEmail";
import ForgetPasswordEmail from "../Pages/ForgetPassword/forgetPasswordEmail";
import StaffDetail from "../Pages/StaffDetail/StaffDetail";
import TeacherDetails from "../Pages/TeacherDetails/TeacherDetails";
import ApplyForTeacher from "../Pages/ApplyForTeacher/ApplyForTeacher";
import { SecondLayout } from "../Layouts/SecondLayout";
import KnowlageApply from "../Components/ApplyTeacherSteps/ApplyTeacherShareKhowlage";
import ApplyForStaffContainer from "../Pages/ApplyForStaff/ApplyStaffContainer";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import { AdminLayout } from "../Layouts/AdminLayout";
import CreateEvent from "../Pages/AdminPanel/CreateEvent/CreateEvent";
import CreateEventContainer from "../Pages/AdminPanel/CreateEvent/CreateEventContainer";
import CreateSlider from "../Pages/AdminPanel/CreateSlider/CreateSlider";
import CreateCourseContainer from "../Pages/AdminPanel/CreateCourse/CreateCourseContainer";
import ListOfEvents from "../Pages/AdminPanel/CreateEvent/ListOfEvents";
import SliderUpdate from "../Pages/AdminPanel/CreateSlider/SliderUpdate";
import EventsAdmin from "../Pages/AdminPanel/EventCrud/EventsAdmin";
import UpdateEvent from "../Pages/AdminPanel/EventCrud/EventUpdate";
import CoursesList from "../Pages/AdminPanel/CourseCrud/CoursesList";
import UpdateCourse from "../Pages/AdminPanel/CourseCrud/UpdateCourse";
import CreateCourseCagteogy from "../Pages/AdminPanel/CourseCategory/CreateCourseCagteogy";
import CreateEventCagteogy from "../Pages/AdminPanel/EventCategory/EventCategory";
import GetCourseReviews from "../Pages/AdminPanel/CourseCrud/getCourseReviews";
import StaffList from "../Pages/AdminPanel/TeacherAndStaff/Staff/StaffList";
import StaffDetails from "../Pages/AdminPanel/TeacherAndStaff/Staff/StaffDetails";
import TeacherDetailsAdminPanel from "../Pages/AdminPanel/TeacherAndStaff/Staff/TeacherDetails";
import Logs from "../Pages/AdminPanel/Logs/Logs";
import MyCourses from "../Pages/AdminPanel/MyCourses/MyCourses";
import CouseVideos from "../Pages/AdminPanel/MyCourses/CouseVideos";
import BouthCourse from "../Pages/BouthCourses/BouthCourse";
import BouthCoueseVideos from "../Pages/BouthCourses/BouthCoueseVideos";

export default function Routes() {
  const { token } = useSelector((x) => x.auth);
  let routes = [
    {
      path: "/Auth/ConfirmEmail",
      search: "?userId=value&token=value",
      element: <ConfirmEmail />,
    },
    {
      element: token ? <AdminLayout /> : <Navigate to={"/"} />,
      children: [
        {
          path: "/ControlPanel",
          element: token ? <AdminPanel /> : <Navigate to={"/"} />
        },
        {
          path: "/ControlPanel/CreateSlider",
          element:  <CreateSlider />  
        },
        {
          path: "/ControlPanel/BouthCourses/List",
          element:  <BouthCourse />  
        },
        {
          path: "/ControlPanel/BouthCourses/Videos/:id",
          element:  <BouthCoueseVideos />  
        },
        {
          path: "/ControlPanel/UpdateSlider/:id",
          element:  <SliderUpdate />  
        },
        {
          path: "/ControlPanel/CreateEvent",
          element:  <CreateEventContainer />  
        },
        {
          path: "/ControlPanel/UpdateEvent/:id",
           element:  <UpdateEvent />  
        },
        {
          path: "/ControlPanel/CourseList",
           element:  <CoursesList />  
        },
        {
          path: "/ControlPanel/Course/Update/:id",
           element:  <UpdateCourse />  
        },
        {
          path: "/ControlPanel/Course/Details/:id",
           element:  <CoursesList />  
        },
        {
          path: "/ControlPanel/Events",
          element:  <EventsAdmin />  
        },
        {
          path: "/ControlPanel/CreateCourseContainer",
          element:  <CreateCourseContainer />  
        },
        {
          path: "/ControlPanel/getAllEvents",
          element:  <ListOfEvents />  
        },
        {
          path: "/ControlPanel/Course/Category",
          element:  <CreateCourseCagteogy />  
        },
        {
          path: "/ControlPanel/Event/Category",
          element:  <CreateEventCagteogy />  
        },
        {
          path: "/ControlPanel/Course/GetReviews/:id",
          element:  <GetCourseReviews />  
        },
        {
          path: "/ControlPanel/Course/MyCourses/:id",
          element:  <MyCourses />  
        },
        {
          path: "/ControlPanel/teacher",
          element:  <teacherList />  
        },
        {
          path: "/ControlPanel/Staff",
          element:  <StaffList />  
        },
        {
          path: "/ControlPanel/Staff/details/:id",
          element:  <StaffDetails />  
        },
        {
          path: "/ControlPanel/teacher/details/:id",
          element:  <TeacherDetailsAdminPanel />  
        },
        {
          path: "/ControlPanel/logs",
          element:  <Logs />  
        },
        {
          path: "/ControlPanel/Courses/CourseVideos/:id",
          element:  <CouseVideos />  
        },
      ]
    },
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
          element: token ? <Navigate to={"/"} /> : <Register />,
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
          path: `/CourseDetails/:id`,
          element: <CourseDetails />,
        },
        {
          path: "/StaffDetails/:id",
          element: <StaffDetail />,
        },
        {
          path: "/TeacherDetails/:id",
          element: <TeacherDetails />,
        },
        {
          path: "/EventDetail/:id",
          element: <EventDetails />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },

        {
          path: "/Auth/ResetPassword",
          search: "?userId=value&token=value",
          element: <ForgetPassword />
        },
        {
          path: "/Auth/forgetPassword",
          element: <ForgetPasswordEmail />,
        },
      ],
    },
    {
      path: "/",
      element: <SecondLayout />,
      children: [
        {
          path: "/Applyteacher/teaching-experiance",
          element: token ? <KnowlageApply /> :   <Navigate to={"/auth/register"}/>,
        },
        {
          path: "/Applyteacher/:select",
          search: "select=value",
          element: token ? <ApplyForTeacher /> :   <Navigate to={"/auth/register"}/>,
        },
        {
          path: "/ApplyForStaffContainer",
          element: token ? <ApplyForStaffContainer /> : <Navigate to={"/auth/register"} />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}

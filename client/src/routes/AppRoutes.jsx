import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBarApp from "../components/NavBar/NavBarApp";
import HomeApp from "../Pages/Home/HomeApp";
import { AllCourses } from "../Pages/AllCourses/AllCourses";
import { AboutApp } from "../Pages/About/AboutApp";
import { FooterApp } from "../components/Footer/FooterApp";
import AdminLanding from "../Pages/Users/Admin/AdminLanding/AdminLanding";
import StudentLanding from "../Pages/Users/Student/StudentLanding/StudentLanding";
import { TeacherLanding } from "../Pages/Users/Teacher/TeacherLanding/TeacherLanding";
import { CourseInfo } from "../Pages/CourseInfo/CourseInfo";
import { TeacherMyCourse } from "../Pages/Users/Teacher/TeacherMyCourse/TeacherMyCourse";
import { CourseOneLesson } from "../Pages/CourseInfo/components/CourseOneLesson/CourseOneLesson";
import { DroneMasterContext } from "../context/DroneMasterProvider";
import { ErrorPage } from "../Pages/ErrorPage/ErrorPage";

const AppRoutes = () => {
  const { user } = useContext(DroneMasterContext)

  return (
  
      <BrowserRouter>
        <NavBarApp />
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path='*' element={<ErrorPage />}/>
          <Route path="/allCourses" element={<AllCourses />} />
          <Route path="/about" element={<AboutApp />} />

          {(user && user.type == 2) && <Route path="/admin" element={<AdminLanding />} />}

          <Route path="/student" element={<StudentLanding />} />
          <Route
            path="/courses/courseInfo/:course_id"
            element={<CourseInfo />}
          />

          <Route
            path="/courses/courseInfo/lessonInfo/:course_id/:unit_id/:lesson_id"
            element={<CourseOneLesson />}
          />

          {(user && user.type !== 0) && <>
            <Route path="/teacher" element={<TeacherLanding />} />
            <Route
              path="/teacher/MyCourse/:course_id"
              element={<TeacherMyCourse />}
            />
          </>}
        </Routes>
        <FooterApp />
      </BrowserRouter>
    
  );
};

export default AppRoutes;

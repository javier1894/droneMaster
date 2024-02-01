import React, { useContext, useEffect, useState } from "react";
import { TeacherCard } from "../TeacherLanding/components/TeacherCard/TeacherCard";
import { CounterCard } from "../TeacherLanding/components/CounterCard/CounterCard";
import { TeacherOneCourseStudentsTable } from "./components/TeacherOneCourseStudentsTable/TeacherOneCourseStudentsTable";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { TeacherOnecourseContent } from "./components/TeacherOnecourseContent/TeacherOnecourseContent";
import { CourseStatsChart } from "./components/CourseStatsChart/CourseStatsChart";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./teacherMyCourse.scss";
import { TeacherCourseList } from "./components/TeacherCourseList/TeacherCourseList";

export const TeacherMyCourse = () => {
  const { user } = useContext(DroneMasterContext);
  const { course_id } = useParams();
  const [myCourseInfo, setMyCourseInfo] = useState();
  const [myOneCourseStudentsData, setMyOneCourseStudentsData] = useState();
  const [showEditionModal, setShowEditionModal] = useState(false);
  const [myCoursesData, setMyCoursesData] = useState();
  const [inscriptionDates, setInscriptionDates] = useState();
  const [resetUseEffect, setResetUseEffect] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/teachers/myCourses/inscriptionDates/${course_id}`
      )
      .then((res) => {
        setInscriptionDates(res.data);
      })
      .catch((error) => { });
  }, [course_id, resetUseEffect]);

  //Get all courses of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showMyCourses/${user?.user_id}`)
      .then((res) => {
        setMyCoursesData(res.data);
      })
      .catch((error) => { });
  }, [user, resetUseEffect]);

  useEffect(() => {
    //Get all students info from a course
    axios
      .get(`http://localhost:4000/teachers/myCourses/students/${course_id}`)
      .then((res) => {
        setMyOneCourseStudentsData(res.data);
      })
      .catch((err) => { });
  }, [course_id, resetUseEffect]);
  //Get all info of a course
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setMyCourseInfo(res.data);
      })
      .catch((err) => { });
  }, [course_id, resetUseEffect]);

  return (
    <section className="mainSectionOneCourse">
      <aside className="sideContent">
        <TeacherCard user={user} setShowEditionModal={setShowEditionModal} />

        <div className="counterContainer">
          <CounterCard
            title={"Puntación media"}
            counter={`${myCourseInfo && myCourseInfo[0]?.course_score}/5`}
          >
            <AiFillStar />
          </CounterCard>
          <CounterCard
            title={"Alumnos totales"}
            counter={myOneCourseStudentsData?.length}
          >
            <AiOutlineUser />
          </CounterCard>
        </div>

        <TeacherCourseList myCoursesData={myCoursesData} />

        {inscriptionDates?.length !== 0 && (
          <CourseStatsChart inscriptionDates={inscriptionDates} />
        )}
      </aside>
      <div className="mainContainer">
        <TeacherOnecourseContent
          myCourseInfo={myCourseInfo}
          setResetUseEffect={setResetUseEffect}
          resetUseEffect={resetUseEffect}
        />

        <TeacherOneCourseStudentsTable
          myOneCourseStudentsData={myOneCourseStudentsData}
        />
      </div>
      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
      />
    </section>
  );
};

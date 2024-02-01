import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StudentCard } from "./components/StudentCard/StudentCard";
import { UserCardInfo } from "../../Teacher/TeacherLanding/components/UserCardInfo.jsx/UserCardInfo";
import { CourseCard } from "../../../../components/CardCourse/CourseCard";
import { StudentCoursesCard } from "../StudentLanding/components/StudentCoursesCard/StudentCoursesCard";
import "./studentLandingStyle.scss";
import "../../Teacher/TeacherLanding/teacherLandingStyle.scss";
import "../../../AllCourses/allCoursesStyle.scss";
import '../../../../components/CardCourse/CourseCard.scss'
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { StudentCourseTableInfo } from "./components/CourseInfo/StudentCourseTableInfo";
import { CircularBarProgress } from "./components/CircularBarProgress/CircularBarProgress";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";
import { ExamCard } from "./components/ExamCard/ExamCard";

const StudentLanding = () => {
  const { user, courseMaterial } = useContext(DroneMasterContext);
  const [myCoursesData, setMyCoursesData] = useState();
  const [bestRatedCourses, setBestRatedCourses] = useState([]);
  const [lessonsViewedByStudent, setLessonsViewedByStudent] = useState()
  const [lessonsOneCourse, setLessonsOneCourse] = useState(0)
  const [courseId, setCourseId] = useState(0)
  const [showEditionModal, setShowEditionModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [score, setScore] = useState()
  const [counterRating, setCounterRating] = useState()

  // Get all courses of the user
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4000/showMyCourses/${user?.user_id}`)
        .then((res) => {
          setMyCoursesData(res.data);
        })
        .catch((error) => { });
    }
  }, [user, showEditionModal, showRatingModal, score, counterRating]);

  // Get 4 best rated courses
  useEffect(() => {
    axios
      .get("http://localhost:4000/bestRatedCourses")
      .then((res) => {
        setBestRatedCourses(res.data);
      })
      .catch((err) => { });
  }, []);

  const examAvailable = lessonsViewedByStudent / lessonsOneCourse;

  return (
    <div className="mainSectionStudent">

      <aside className="sideContent">
        <StudentCard user={user} setShowEditionModal={setShowEditionModal} />
        <UserCardInfo user={user} />
        <StudentCoursesCard myCoursesData={myCoursesData} setCourseId={setCourseId} />
        {courseId !== 0 && <CircularBarProgress lessonsOneCourse={lessonsOneCourse} lessonsViewedByStudent={lessonsViewedByStudent} courseId={courseId} myCoursesData={myCoursesData} />}
      </aside>

      <div className="mainContainer">
        {myCoursesData?.length === 0 && (
          <div className="topCourses justify-content-center flex-wrap gap-2 pt-5 ">
            <h3 className="adviceTitle">Descubre Nuestros Cursos Destacados</h3>
            <hr />
            <p className="adviceText"> Descubre nuestros cursos estrella y despega en el mundo de los drones. Aprende desde cero o mejora tus habilidades con la mejor experiencia de aprendizaje. ¡Eleva tus conocimientos con nuestros cursos recomendados!</p>
            {bestRatedCourses.map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              );
            })}
          </div>
        )}

        {myCoursesData?.length > 0 && (
          <div>
            <StudentCourseTableInfo myCoursesData={myCoursesData} setLessonsViewedByStudent={setLessonsViewedByStudent} setLessonsOneCourse={setLessonsOneCourse}
              courseId={courseId} />
          </div>
        )}

        {courseMaterial && <div>
          {examAvailable === 1 && <ExamCard setShowRatingModal={setShowRatingModal} showRatingModal={showRatingModal}
            score={score} counterRating={counterRating} setScore={setScore} setCounterRating={setCounterRating} />}


        </div>}

      </div>

      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
      />

    </div>
  );
};

export default StudentLanding;

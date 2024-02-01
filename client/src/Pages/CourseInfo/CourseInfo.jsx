import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DroneMasterContext } from "../../context/DroneMasterProvider";
import { StarRating } from "../../components/StarRating/StarRating";
import { CourseContentDropDownList } from "./components/CourseContentDropDownList/CourseContentDropDownList";
import { CourseDescription } from "./components/CourseDescription/CourseDescription";
import { CircularStudentProgressBar } from "./components/CircularStudentProgressBar/CircularStudentProgressBar";

import { MdOutlinePlayLesson } from "react-icons/md";
import { IoInfinite } from "react-icons/io5";
import { GiClassicalKnowledge, GiSmartphone } from "react-icons/gi";
import {
  AiOutlineFolderOpen,
  AiOutlineClockCircle,
  AiOutlineTrophy,
} from "react-icons/ai";
import "./courseInfo.scss";
import { BsCalendar2Date } from "react-icons/bs"

export const CourseInfo = () => {
  const { course_id } = useParams();
  const [courseGeneralInfo, setcouGeneralrseInfo] = useState();
  const [tagList, setTagList] = useState();
  const [courseUnitsLessons, setCourseUnitsLessons] = useState();
  const [unitsCount, setUnitsCount] = useState();
  const [lessonsCount, setLessonsCount] = useState();
  const [userCourseRelationship, setUserCourseRelationship] = useState();
  const [lessonsOneCourse, setLessonsOneCourse] = useState(0);
  const [lessonsViewedByStudent, setLessonsViewedByStudent] = useState();
  const [teacherEmail, setTeacherEmail] = useState()
  const { user, resetData, setResetData } = useContext(DroneMasterContext);
  const currentDate = new Date();
  const courseStartDate = new Date(courseGeneralInfo?.start_date);
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const day = courseStartDate.getDate();
  const month = monthNames[courseStartDate.getMonth()];
  const year = courseStartDate.getFullYear();
  const formattedStartDate = `${day} de ${month} de ${year}`;

  //Gets all units and lesson of a course
  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
        .then((res) => {
          setCourseUnitsLessons(res.data);
        })
        .catch((err) => { });
    }
  }, [course_id]);

  //Gets general info of a course
  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://localhost:4000/courses/courseInfo/${course_id}`)
        .then((res) => {
          setcouGeneralrseInfo(res.data[0]);
        })
        .catch((error) => {
          { };
        });
    }
  }, [course_id]);

  //Gets tags of a course
  useEffect(() => {
    if (course_id) {
      axios
        .get(` http://localhost:4000/courses/courseTags/${course_id}`)
        .then((res) => {
          setTagList(res.data);
        })
        .catch((error) => {
          { };
        });
    }
  }, [course_id]);

  //Check if user has already buy a course
  useEffect(() => {
    user &&
      axios
        .get(
          `http://localhost:4000/myProfile/myCourse/${user.user_id}/${course_id}`
        )
        .then((res) => setUserCourseRelationship(res.data))
        .catch((err) => { });
  }, [course_id, user]);

  // Count lessons of a course
  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://localhost:4000/students/countLessonscourse/${course_id}`)
        .then((res) => {
          setLessonsOneCourse(res.data[0].count_lessons_Course);
        })
        .catch((err) => { });
    }
  }, [course_id]);


  //Count lessons already viewed
  useEffect(() => {
    if (course_id && user) {
      axios
        .get(
          `http://localhost:4000/students/countLessonsViewed/${user?.user_id}/${course_id}`
        )
        .then((res) => {
          setLessonsViewedByStudent(res.data[0].count_lessons_viewed);
        })
        .catch((err) => { });
    }
  }, [course_id, user]);

  //Counts units
  useEffect(() => {
    const unitSet = new Set();
    courseUnitsLessons?.forEach((item) => {
      if (item.unit_id !== null && item.unit_is_hidden === 0) {
        unitSet.add(item.unit_id);
      }
    });
    setUnitsCount(unitSet.size);

    //Counts lessons
    const lessonsSet = new Set();

    courseUnitsLessons?.forEach((item) => {
      if (item.lesson_id !== null && item.lesson_is_hidden === 0) {
        lessonsSet.add(item.lesson_id);
      }
    });

    setLessonsCount(lessonsSet.size);
  }, [courseUnitsLessons]);

  //Gets course teacher's email to send a email when a new Students inscribe to the course
  useEffect(() => {
    if (course_id) {
      axios
        .get(`http://localhost:4000/teachers/teacherEmail/${course_id}`)
        .then((res) => setTeacherEmail(res.data[0].email))
        .catch((err) => { })
    }
  }, [course_id])

  //Submit insciption & send an email
  const onSubmit = async () => {
    axios
      .post(
        `http://localhost:4000/courses/payACourse/${user.user_id}/${course_id}/${courseGeneralInfo.price}`
      )
      .then((res) => setResetData(!resetData))
      .catch((err) => { });

    try {
      const response = await fetch("http://localhost:4000/infoEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: user.user_name, user_lastname: user.user_lastname, phone: user.phone, email: user.email, course_name: courseGeneralInfo.course_name, course_price: courseGeneralInfo.price, start_date: formattedStartDate, status: 1, teacher_email: teacherEmail, course_date: courseStartDate }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="courseInfoMainSection">
      {/* Course name title */}
      <div className="courseNameCard">
        <div className="cardTitle">
          <div className="title">
            <div className="iconContainer">
              <GiClassicalKnowledge />
            </div>
            <h2 className="titleText text-capitalize">{courseGeneralInfo?.course_name}</h2>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className="mainSide">
        {/* Introduction Video or Image*/}
        <div className="introMultimedia">
          <img
            src={userCourseRelationship?.length === 0 || userCourseRelationship === undefined ?
              "http://localhost:4000/images/courses/courseDefaultImg.jpg" :
              courseGeneralInfo?.course_img ? `http://localhost:4000/images/courses/${courseGeneralInfo.course_img}` : `http://localhost:4000/images/courses/courseDefaultImg.jpg}`
            }
            alt="Course image"
          />
          <img
            className="watermarkImg"
            src="/dashboard_images/logo_DroneMaster.png"
            alt="Course image"
          />
        </div>
        <div className="courseTextInfoCard">
          {/* Course Description */}
          <CourseDescription
            description={courseGeneralInfo?.course_description}
          />
          {/* Course Units & Lessons List */}
          <CourseContentDropDownList
            user={user}
            myCourseInfo={courseUnitsLessons}
            unitsCount={unitsCount}
            lessonsCount={lessonsCount}
            course_id={course_id}
          />
        </div>
      </div>
      {/* Side section */}
      <aside className="rightAsideSection">
        {(userCourseRelationship == undefined ||
          userCourseRelationship?.length == 0) && (
            <div className="courseMultimediaInfoCard">
              {/* Course Image */}
              <div className="courseImgContainer">
                {courseGeneralInfo?.course_img &&
                  <img
                    src={
                      courseGeneralInfo?.course_img &&
                      `http://localhost:4000/images/courses/${courseGeneralInfo?.course_img}`
                    }
                    alt="Course image"
                  />
                }
              </div>
              <div className="courseDataContent">
                <h6 className="courseTitle text-capitalize">{courseGeneralInfo?.course_name}</h6>
                <div className="tagList">
                  {tagList?.map((e) => {
                    return (
                      <span key={e.tag_id} className="tag">
                        #{e.tag_name}
                      </span>
                    );
                  })}
                </div>
                {/* Icon groups container */}
                <div className="iconInfoContainer">
                  <h6 className="fw-medium">Este curso incluye:</h6>
                  <div className="iconGroup1">
                    <AiOutlineClockCircle className="icon3" />
                    {courseGeneralInfo?.course_length} horas lectivas
                  </div>
                  <div className="iconGroup1">
                    <AiOutlineFolderOpen className="icon3" /> {unitsCount} Temas
                  </div>
                  <div className="iconGroup1">
                    <MdOutlinePlayLesson className="icon3" /> {lessonsCount}{" "}
                    Lecciones
                  </div>
                  <div className="iconGroup1">
                    <GiSmartphone className="icon3" /> Acceso movil
                  </div>
                  <div className="iconGroup1">
                    <IoInfinite className="icon3" /> Acceso de por vida
                  </div>
                  <div className="iconGroup1">
                    <AiOutlineTrophy className="icon3" /> Certificado de
                    finalización
                  </div>
                  {courseStartDate > currentDate &&
                    <div className="iconGroup1 d-flex justify-content-end align-items-center pt-2">
                      <span style={{ color: "#9d9d9d", fontSize: "15px" }}>{formattedStartDate}</span> <BsCalendar2Date className="icon3 mb-1" />
                    </div>
                  }
                </div>
                {/* Stars container */}
                {courseGeneralInfo?.score != null && (
                  <div className="courseScore">
                    <div className="starsRatingContainer">
                      <StarRating rating={courseGeneralInfo?.score} />
                      <h4>{courseGeneralInfo?.score}</h4>
                    </div>
                    <h6 className="ratingCounter">
                      (
                      {courseGeneralInfo?.counter_rating
                        .toLocaleString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      )
                    </h6>
                  </div>
                )}
                {user && user?.type === 0 && (
                  <button className="btnNormal align-self-center" style={{ width: "240px" }} onClick={onSubmit}>
                    INSCRIBETE
                  </button>
                )}
                {!user && (
                  <p className="fst-italic text-center" style={{ color: "#f7ab16" }}>
                    Inicia sesión o regístrate para inscribirte en el curso
                  </p>
                )}
              </div>
            </div>
          )}
        {
          user?.type === 0 && userCourseRelationship?.length > 0 &&
          <CircularStudentProgressBar
            lessonsOneCourse={lessonsOneCourse}
            lessonsViewedByStudent={lessonsViewedByStudent}
            course_name={courseGeneralInfo?.course_name}
          />
        }
      </aside>
    </section>
  );
};

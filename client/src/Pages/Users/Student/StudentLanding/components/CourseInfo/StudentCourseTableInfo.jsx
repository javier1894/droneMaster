import React, { useContext, useState, useEffect } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { BsEye, BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import "../../studentLandingStyle.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

export const StudentCourseTableInfo = ({
  setLessonsViewedByStudent,
  setLessonsOneCourse,
  courseId,
}) => {
  const navigate = useNavigate();
  const { courseMaterial, user } = useContext(DroneMasterContext);
  const [unitsName, setUnitsName] = useState([]);
  const [lessonViewed, setLessonViewed] = useState([]);
  const [resetUseEffect, setResetUseEffect] = useState(false);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const uniqueUnitNames = Array.from(
    new Set(courseMaterial?.map((item) => item.unit_tittle))
  );

  // Update unitsName state with course units name
  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [courseMaterial]);

  // Getting the count lessons viewed by student in one course
  useEffect(() => {
    if (courseId) {
      axios
        .get(
          `http://localhost:4000/students/countLessonsViewed/${user.user_id}/${courseId}`
        )
        .then((res) => {
          setLessonsViewedByStudent(res.data[0].count_lessons_viewed);
        })
        .catch((err) => { });
    }
  }, [resetUseEffect, courseId]);

  // Getting all lessons of one course
  useEffect(() => {
    if (courseId) {
      axios
        .get(`http://localhost:4000/students/countLessonscourse/${courseId}`)
        .then((res) => {
          setLessonsOneCourse(res.data[0].count_lessons_Course);
        })
        .catch((err) => { });
    }
  }, [resetUseEffect, courseId]);

  // Getting lessons viewed by student in one course
  useEffect(() => {
    if (courseId) {
      axios
        .get(
          `http://localhost:4000/students/lessonViewed/${user.user_id}/${courseId}`
        )
        .then((res) => {
          setLessonViewed(res.data.map((elem) => elem.lesson_id));
        })
        .catch((err) => { });
    }
  }, [resetUseEffect, user, courseId]);

  // Update selectedLessons state with the lessons viewed by student in one course
  useEffect(() => {
    setSelectedLessons(lessonViewed);
  }, [resetUseEffect, user, lessonViewed, selectedLessons]);

  // Function to change the color state if one lesson has been viewed by student
  const toggleLesson = (lessonId) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter((id) => id !== lessonId));
    } else {
      setSelectedLessons([...selectedLessons, lessonId]);
    }
  };

  // Function to download a lesson resource
  const downloadResource = (lesson_id, resource_id) => {
    axios
      .post(
        `http://localhost:4000/students/registerLessonViewed/${user.user_id}/${lesson_id}/${courseId}`
      )
      .then((res) => {
        toggleLesson(lesson_id);
        setResetUseEffect(!resetUseEffect);
      })
      .catch((err) => { });

    axios
      .get(`http://localhost:4000/resourceName/${resource_id}`)
      .then((res) => {


        console.log(res.data);
        saveAs(
          `http://localhost:4000/images/resources/${res.data[0].resource_name}`,
          `${res.data[0].resource_name}`
        )
      }
      )
      .catch((err) => { });
  };

  return (
    <>
      {!courseMaterial && (
        <div className="coursesTableCard">
          <div className="cardTitle justify-content-center">
            <div className="titleStudent">
              <h3 className="titleText text-center" style={{ color: "#f7ab16" }}>
                Bienvenido de vuelta {user.user_name}
              </h3>
            </div>
          </div>
          <div className="cardBody">
            <h6 className="text-center fst-italic">
              Vaya a mis cursos si quieres seguir con el progreso de estos
            </h6>
          </div>
        </div>
      )}
      {courseMaterial && (
        <div className="coursesTableCard">
          <div className="cardTitle">
            <div className="titleStudent w-100 d-flex">
              <div className="iconContainer">
                <GiClassicalKnowledge />
              </div>
              <div className="d-flex justify-content-between align-items-center w-100">
                <h5 className="titleText">
                  {courseMaterial && courseMaterial[0]?.course_name}
                </h5>
                <button
                  className="btnOutline1"
                  onClick={() => {
                    navigate(
                      `/courses/courseInfo/${courseMaterial[0]?.course_id}`
                    );
                  }}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
          <div className="cardBody">
            {unitsName[0] !== null &&
              unitsName.map((unitName, unitIdx) => (
                <table className="coursesTableStudent mb-4" key={unitIdx}>
                  <thead>
                    <tr style={{ paddingTop: "10px" }}>
                      <th className="textReduce w-75" style={{ color: "#f7ab16" }}>
                        <div className="oculto">{unitName}</div>
                      </th>
                      <th className="text-center" style={{ color: "#f7ab16" }}>Estado</th>
                      <th className="text-center" style={{ color: "#f7ab16" }}>Recursos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseMaterial
                      .filter((elem) => elem.unit_tittle === unitName)
                      .map((lesson, lessonIdx) => (
                        <>
                          {lesson.lesson_is_hidden === 0 && (
                            <>
                              <tr tr key={lessonIdx}>
                                <td className="textReduce text-start w-75 ps-3">
                                  <div className="oculto" >
                                    <span className="navigateHover" role="button" onClick={() => navigate(`/courses/courseInfo/lessonInfo/${courseMaterial[0]?.course_id}/${lesson.unit_id}/${lesson.lesson_id}`)}>{lesson.lesson_title}</span>
                                  </div>
                                </td>
                                {lesson.resource_is_hidden === 0 && (
                                  <>
                                    <td>
                                      <BsEye
                                        style={{
                                          color: selectedLessons.includes(
                                            lesson.lesson_id
                                          )
                                            ? "#72BF44"
                                            : "white",
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <BsFillFileEarmarkArrowDownFill
                                        role="button"
                                        className="icon"
                                        onClick={() =>
                                          downloadResource(lesson.lesson_id, lesson.resource_id)
                                        }
                                      />
                                    </td>
                                  </>
                                )}
                              </tr>
                            </>
                          )}
                        </>
                      ))}
                  </tbody>
                </table>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

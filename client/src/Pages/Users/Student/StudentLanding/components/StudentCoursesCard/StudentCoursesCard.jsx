import React, { useContext } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const StudentCoursesCard = ({ myCoursesData, setCourseId }) => {
  const { setCourseMaterial } = useContext(DroneMasterContext);

  // Getting all student courses
  const showCourse = (course_id) => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setCourseMaterial(res.data);
        setCourseId(course_id);
      })
      .catch((err) => { });
  };

  return (
    <div className="courseListCard">
      {/* Card Title */}
      <div className="cardTitle">
        <div className="iconContainer">
          <GiClassicalKnowledge />
        </div>
        <div className="textContainer">
          <h6>Mis Cursos</h6>
        </div>
      </div>
      {/* Card Body */}
      <div className="cardBody">
        {myCoursesData?.length === 0 && (
          <div className="d-flex flex-column align-items-center">
            <p className="noCoursesText">
              ¿Listo para comenzar tu viaje de aprendizaje en drones?
            </p>
            <button className="btnNormal">Nuentros Cursos</button>
            <p className="noCoursesText mb-0 fst-italic"> ¡Explora nuestra gama de cursos!</p>
          </div>
        )}
        <ul className="courseList">
          {myCoursesData?.map((course, index) => {
            return (
              <div key={index} className="oculto">
                <li
                  key={course.course_id}
                  className="courseListRow"
                  onClick={() => {
                    showCourse(course?.course_id);
                  }}
                >
                  {course.course_name} <BiRightArrowAlt className="icon" />
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

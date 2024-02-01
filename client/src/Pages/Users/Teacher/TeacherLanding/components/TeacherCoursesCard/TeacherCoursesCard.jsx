import React, { useContext } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const TeacherCoursesCard = ({ myCoursesData }) => {
  const { setCourseMaterial } = useContext(DroneMasterContext);

  const showCourse = (course_id) => {
    axios
      .get(`http://localhost:4000/students/courseMaterial/${course_id}`)
      .then((res) => {
        setCourseMaterial({
          course_name: myCoursesData?.find(
            (item) => item.course_id === parseInt(course_id)
          ).course_name,
          course_info: res.data,
        });
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
        <ul className="courseList">
          {myCoursesData?.map((course) => {
            return (
              <li
                key={course.course_id}
                className="courseListRow"
                onClick={() => {
                  showCourse(course?.course_id);
                }}
              >
                {course.course_name} <BiRightArrowAlt className="icon" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

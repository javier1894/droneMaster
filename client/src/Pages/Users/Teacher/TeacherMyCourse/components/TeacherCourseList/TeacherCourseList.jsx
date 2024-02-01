import React, { useContext } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const TeacherCourseList = ({ myCoursesData }) => {
  const navigate = useNavigate();
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
                  navigate(`/teacher/MyCourse/${course.course_id}`);
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

export const TeacherCoursesCard = ({}) => {};

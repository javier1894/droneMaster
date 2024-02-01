import React, { useEffect, useState } from "react";
import axios from "axios";
import './CourseCard.scss'
import { useNavigate } from "react-router-dom";
import { StarRating } from "../StarRating/StarRating";
import { BsCalendarDate } from "react-icons/bs"

export const CourseCard = ({ oneCourse }) => {
  const navigate = useNavigate();
  const [tagList, setTagList] = useState();

  const currentDate = new Date();
  const courseStartDate = new Date(oneCourse?.start_date);
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const day = courseStartDate.getDate();
  const month = monthNames[courseStartDate.getMonth()];
  const year = courseStartDate.getFullYear();
  const formattedStartDate = `${day} de ${month} de ${year}`;

  // Getting tags from one course
  useEffect(() => {
    if (oneCourse) {
      axios
        .get(`http://localhost:4000/courses/courseTags/${oneCourse.course_id}`)
        .then((res) => setTagList(res.data))
        .catch((error) => { });
      return () => { };
    }
  }, [oneCourse]);

  return (
    <div
      className="courseCard"
      onClick={() => navigate(`/courses/courseInfo/${oneCourse.course_id}`)}
    >
      <button className="btnNormal">Mas info</button>
      <div className="courseCardContent">
        <div className="coursePreviewContainer">
          <img
            className="preview"
            src={oneCourse?.course_img ? `http://localhost:4000/images/courses/${oneCourse.course_img}` : `http://localhost:4000/images/courses/courseDefaultImg.jpg`}
            alt=""
          />
        </div>
        <div className="courseCardBody">
          <div className="courseTitle">
            <h5 className="mb-0">{oneCourse.course_name}</h5>
          </div>
          {tagList &&
            <div className="tagList">
              {tagList?.map((e) => {
                return <span key={e.tag_id} className="tag">#{e.tag_name}</span>;
              })}
            </div>
          }
          {(oneCourse?.start_date && courseStartDate > currentDate) &&
            <div className="dateContainer">
              <BsCalendarDate className="icon" />
              <div>
                {formattedStartDate}</div>
            </div>
          }
          {(oneCourse?.score != null && oneCourse?.score !== 0) && (
            <div className="courseScore">
              <h5>{oneCourse.score}</h5>
              <StarRating rating={oneCourse.score} />
              <h6 className="ratingCounter">
                (
                {oneCourse.counter_rating
                  .toLocaleString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                )
              </h6>
            </div>
          )}
          <div className="coursePriceButton">
            <h4>
              {oneCourse.price} <span className="currency">€</span>
            </h4>
            <button
              className="btnOutline1"
              onClick={() =>
                navigate(`/courses/courseInfo/${oneCourse.course_id}`)
              }
            >
              INSCRIBETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

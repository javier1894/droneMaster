import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import axios from "axios";
import { saveAs } from "file-saver";
import { CourseDescription } from "../CourseDescription/CourseDescription";
import { MdOutlinePlayLesson } from "react-icons/md";
import { UnitsLessonList } from "./components/UnitsLessonList";
import { LessonComments } from "./components/LessonComments";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import "./courseOneLesson.scss";
import { LessonVideo } from "./components/LessonVideo";

export const CourseOneLesson = () => {
  const { course_id, unit_id, lesson_id } = useParams();
  const [lessonData, setLessonData] = useState();
  const [courseUnitsLessons, setCourseUnitsLessons] = useState();

  const { user } = useContext(DroneMasterContext);

  // Getting lesson info
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/courses/courseInfo/lessonInfo/${course_id}/${unit_id}/${lesson_id}`
      )
      .then((res) => {
        setLessonData(res.data[0]);
      })
      .catch((err) => { });
  }, [course_id, unit_id, lesson_id]);

  // Getting course info
  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setCourseUnitsLessons(res.data);
      })
      .catch((err) => { });
  }, [course_id]);

  // Getting resource name to download
  const handleDownload = () => {
    axios
      .get(`http://localhost:4000/resourceName/${lessonData?.resource_id}`)
      .then((res) =>
        saveAs(
          `http://localhost:4000/images/resources/${res.data[0].resource_name}`,
          `${res.data[0].resource_name}`
        )
      )
      .catch((err) => { });
  };

  return (
    <section className="lessonInfoMainSection">
      {/* Course name title */}
      <div className="courseNameCard">
        <div className="cardTitle">
          <div className="title">
            <div className="iconContainer">
              <MdOutlinePlayLesson />
            </div>
            <h2 className="titleText">{lessonData?.lesson_title}</h2>
          </div>
        </div>
      </div>
      {/* Main Section */}
      {/* Lesson Video or Image*/}
      <LessonVideo videoUrl={lessonData?.lesson_url_video} />
      <div className="courseTextInfoCard">
        {/* Course Description */}
        <CourseDescription description={lessonData?.lesson_content} />
      </div>
      {/* Side section */}
      <LessonComments
        user={user}
        course_id={course_id}
        unit_id={unit_id}
        lesson_id={lesson_id}
      />
      {/* Course Units & Lessons List */}
      <UnitsLessonList
        myCourseInfo={courseUnitsLessons}
        course_id={course_id}
      />
      {lessonData?.resource_id !== null &&
        <div className="resourceDownloadCard">
          <div className="titleCont">
            <h6 className="mb-0">Recurso</h6>
            <div className="downloadIconCont " onClick={handleDownload}>
              <span className="dowloadText mb-0">Descargar</span>
              <p className="icon2 mb-0">
                <BsFileEarmarkArrowDownFill />
              </p>
            </div>
          </div>
        </div>
      }
      {lessonData?.resource_id === null &&
        <div className="resourceDownloadCard">
          <div className="titleCont">
            <h6 className="mb-0">Recurso</h6>
            <div className="d-flex align-items-end ">
              <p className="mb-0" style={{ fontSize: "14px", marginTop: "6px" }}>No hay recurso para descargar</p>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

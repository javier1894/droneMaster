import React, { useContext, useEffect, useState } from "react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
  BsEye,
  BsEyeSlash
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const TeacherOnecourseContent = ({
  myCourseInfo,
  setResetUseEffect,
  resetUseEffect,
}) => {
  const { course_id } = useParams();
  const { user } = useContext(DroneMasterContext);
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const navigate = useNavigate();
  const [teacherResource, setTeacherResource] = useState([]);
  const [file, setFile] = useState(false);

  // Takes uniques unit_title
  const uniqueUnitNames = Array.from(
    new Set(myCourseInfo?.map((item) => item.unit_tittle))
  );

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
    axios
      .get(`http://localhost:4000/teachers/teacherResources/${user?.user_id}`)
      .then((res) => {
        setTeacherResource(res.data);
      })
      .catch((err) => { });
  }, [myCourseInfo, resetUseEffect]);

  const closedHeight = "0px";
  const openedHeight = "35px";

  const uploadResource = (e, lesson_id, unit_id) => {
    const newFormData = new FormData();
    newFormData.append("file", e.target.files[0]);

    axios
      .post(
        `http://localhost:4000/uploadResource/${user.user_id}/${course_id}/${unit_id}/${lesson_id}`,
        newFormData
      )
      .then((res) => setResetUseEffect(!resetUseEffect))
      .catch((err) => { });
  };

  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // Si el índice ya está en el array, lo eliminamos
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // Si el índice no está en el array, lo agregamos
      setOpenUnits([...openUnits, unitIndex]);
    }
  };

  const enableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/enableResource/${resource_id}`)
      .then((res) => setResetUseEffect(!resetUseEffect))
      .catch((err) => { });
  };

  const disableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/disableResource/${resource_id}`)
      .then((res) => setResetUseEffect(!resetUseEffect))
      .catch((err) => { });
  };

  const downloadResource = (resource_id) => {
    axios
      .get(`http://localhost:4000/resourceName/${resource_id}`)
      .then((res) => {
        saveAs(
          `http://localhost:4000/images/resources/${res.data[0].resource_name}`,
          `${res.data[0].resource_name}`
        );
        setResetUseEffect(!resetUseEffect);
      })
      .catch((err) => { });
  };

  const deleteResource = (lesson_id, resource_id) => {
    axios
      .delete(
        `http://localhost:4000/teachers/deleteResource/${user.user_id}/${resource_id}/${lesson_id}`
      )
      .then((res) => setResetUseEffect(!resetUseEffect))
      .catch((err) => { });
  };

  const uploadCourseExam = (e) => {
    const newFormData = new FormData();
    newFormData.append("file", e.target.files[0])

    axios
      .put(`http://localhost:4000/teachers/uploadCourseExam/${course_id}`, newFormData)
      .then((res) => {
        setFile(!file)
        setResetUseEffect(!resetUseEffect)
      })
      .catch((err) => { })
  }
  return (
    <div className="allUnitsLessonCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>
          <h5 className="titleText">
            {[myCourseInfo && myCourseInfo[0].course_name]}
          </h5>
        </div>
        <div className="d-flex justify-content-between d-sm-flex justify-content-sm-between" style={{ minWidth: "260px" }}>
          {(myCourseInfo && myCourseInfo[0]?.exam_file === null) && <>
            <label role="button" htmlFor="inputFile" className="btnOutline1">
              Subir Examen
            </label>
            <input
              type="file"
              onChange={(e) => uploadCourseExam(e)}
              className="d-none"
              id="inputFile"
            />
          </>
          }
          {(myCourseInfo && myCourseInfo[0]?.exam_file !== null) && <>
            <label role="button" htmlFor="inputFile" className="btnOutline1">
              Cambiar Examen
            </label>
            <input
              type="file"
              onChange={(e) => uploadCourseExam(e)}
              className="d-none"
              id="inputFile"
            />
          </>}

          <button
            className="btnOutline1"
            onClick={() =>
              navigate(`/courses/courseInfo/${myCourseInfo[0].course_id}`)
            }
          >
            Ver más
          </button>
        </div>
      </div>

      <div className="listContainer">
        <div className="listHeadline">
          <h6>Unidades</h6>
          <h6>Recursos</h6>
        </div>
        {unitsName.map((unitName, unitIndex) => (
          <div key={unitIndex} className="unitList">
            <div className="unitTitle">
              <h6>{unitName}</h6>
              <div
                className="dropdownContainer"
                onClick={() => toggleUnit(unitIndex)}
              >
                {openUnits.includes(unitIndex) ? (
                  <IoMdArrowDropup />
                ) : (
                  <IoMdArrowDropdown />
                )}
              </div>
            </div>
            <ul>
              {myCourseInfo
                .filter((item) => item.unit_tittle === unitName)
                .map((lesson) => {
                  if (lesson.lesson_id !== null) {
                    return (
                      <li
                        key={lesson.lesson_id}
                        className="listedLesson"
                        style={{
                          height: openUnits.includes(unitIndex)
                            ? openedHeight
                            : closedHeight,
                          transition: "height 0.75s ease-in-out",
                        }}
                      >
                        <div className="lessonTitle">
                          <div className="lessonText"> <span className="navigateHover" role="button" onClick={() => navigate(`/courses/courseInfo/lessonInfo/${course_id}/${lesson.unit_id}/${lesson.lesson_id}`)}>{lesson.lesson_title}</span></div>
                          <div className="resourceContainer">
                            {(lesson.resource_id && lesson?.resource_is_hidden === 1) && (
                              <BsEye
                                className="icon mb-1"
                                onClick={() => enableResource(lesson.resource_id)}
                              />
                            )}
                            {(lesson.resource_id && lesson?.resource_is_hidden === 0) && (
                              <BsEyeSlash
                                className="icon mb-1"
                                onClick={() => disableResource(lesson.resource_id)}
                              />
                            )}
                            {(lesson.resource_id && lesson?.resource_is_hidden === 0) && <BsFillFileEarmarkArrowDownFill
                              className="icon mb-1"
                              onClick={() => downloadResource(lesson.resource_id)}
                            />}
                            {!lesson.resource_id && <>
                              <label htmlFor={lesson.lesson_id} className="d-inline">
                                <BsFillFileArrowUpFill className="icon" style={{ marginBottom: "5PX" }} />
                              </label>
                              <input
                                type="file"
                                onChange={(e) => uploadResource(e, lesson.lesson_id, lesson.unit_id)
                                }
                                className="d-none"
                                id={lesson.lesson_id}
                              />
                            </>
                            }

                            {teacherResource && teacherResource.filter(
                              (elem) => elem.resource_id === lesson.resource_id
                            ).length > 0 && lesson.resource_id && lesson?.resource_is_hidden === 0 && (
                                <MdDeleteOutline
                                  className="deleteIcon fs-5 mb-1"
                                  onClick={() => deleteResource(lesson.lesson_id, lesson.resource_id)}
                                />
                              )}
                          </div>
                        </div>
                      </li>
                    )
                  }
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import {
  BsPlusCircle,
  BsPencil,
  BsEye,
  BsEyeSlash,
  BsFillFileEarmarkArrowDownFill,
  BsFillFileArrowUpFill,
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import AdminUnitEdirForm from "../AdminUnitEditForm/AdminUnitEdirForm";
import { LessonCreationModal } from "../../../../../Courses/components/CourseCreationModal/LessonCreationModal/LessonCreationModal";
import AdminLessonEditForm from "../AdminLessonEditForm/AdminLessonEditForm";

const AdminViewOneCourse = ({
  course_id,
  resEffect,
  setResEffect,
  openCourse,
  courseIdx,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(DroneMasterContext);
  const [allInformation, setAllInformation] = useState();
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const [unitEditForm, setUnitEditForm] = useState(false);
  const [showLessonCreationModal, setShowLessonCreationModal] = useState(false);
  const [unitId, setUnitId] = useState();
  const [lessonId, setLessonId] = useState();
  const [showLessonEditForm, setShowLessonEditForm] = useState(false);
  const [unitInformation, setUnitInformation] = useState();
  const [lessonInformation, setLessonInformation] = useState();

  //Enable resource
  const enableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/enableResource/${resource_id}`)
      .then((res) => setResEffect(!resEffect))
      .catch((err) => {});
  };

  //Disable resource

  const disableResource = (resource_id) => {
    axios
      .put(`http://localhost:4000/disableResource/${resource_id}`)
      .then((res) => setResEffect(!resEffect))
      .catch((err) => {});
  };

  //Open the modal which creates a new Lesson

  const OpenLessonCreateModal = (u_id) => {
    setUnitId(u_id);
    setShowLessonCreationModal(true);
  };

  //Open the modal which opens the edit Lesson form

  const openLessonEditForm = (l_id) => {
    setUnitId(l_id);
    setShowLessonEditForm(true);
  };

  // Brings the information of one course

  useEffect(() => {
    axios
      .get(`http://localhost:4000/teachers/myCourses/courseInfo/${course_id}`)
      .then((res) => {
        setAllInformation(res.data);
      })
      .catch((err) => {});
  }, [course_id, resEffect]);

  // Brings the name of single units

  const uniqueUnitNames = Array.from(
    new Set(allInformation?.map((item) => item.unit_tittle))
  );

  // Brings the id of single units
  const unit_id = Array.from(
    new Set(allInformation?.map((item) => item.unit_id))
  );

  //Sets the information of the Units

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [allInformation]);

  const openUnitEditForm = (u_id) => {
    setUnitId(u_id);
    setUnitEditForm(true);
  };

  //DROPDOWN
  const closedHeight = "0";
  const openedHeight = "fit-content";

  const closedHeight2 = "0px";
  const openedHeight2 = "fit-content";

  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // Si el índice ya está en el array, lo eliminamos
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // Si el índice no está en el array, lo agregamos
      setOpenUnits([...openUnits, unitIndex]);
    }
  };

  // Let the admin to download the resource

  const downloadResource = (resource_id) => {
    axios
      .get(`http://localhost:4000/resourceName/${resource_id}`)
      .then((res) => {
        saveAs(
          `http://localhost:4000/images/resources/${res.data[0].resource_name}`,
          `${res.data[0].resource_name}`
        );
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  // Let the admin to upload the resource

  const uploadResource = (e, lesson_id, unit_id) => {
    const newFormData = new FormData();
    newFormData.append("file", e.target.files[0]);

    axios
      .post(
        `http://localhost:4000/uploadResource/${user.user_id}/${course_id}/${unit_id}/${lesson_id}`,
        newFormData
      )
      .then((res) => setResEffect(!resEffect))
      .catch((err) => {});
  };

  // Enable units
  const enableUnit = (unitId) => {
    axios
      .put(`http://localhost:4000/enableUnits/${course_id}/${unitId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  // Disable units
  const disableUnit = (unitId) => {
    axios
      .put(`http://localhost:4000/disableUnits/${course_id}/${unitId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  // Enable lessons
  const enableLesson = (lessonId) => {
    axios
      .put(`http://localhost:4000/enableLessons/${lessonId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  // Disable lessons
  const disableLesson = (lessonId) => {
    axios
      .put(`http://localhost:4000/disableLessons/${lessonId}`)
      .then((res) => {
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  // Delete resource

  const deleteResource = (lesson_id, resource_id) => {
    axios
      .delete(
        `http://localhost:4000/admin/deleteResource/${resource_id}/${lesson_id}`
      )
      .then((res) => setResEffect(!resEffect))
      .catch((err) => {});
  };

  return (
    <div className="unitsList">
      {unitsName.map((unitName, unitIndex) => {
        if (unitName !== null) {
          return (
            <div
              style={{
                height: openCourse.includes(courseIdx)
                  ? openedHeight
                  : closedHeight,
                transition: "height 0.75s ease-in-out",
              }}
              key={unitIndex}
              className="unitListed"
            >
              {/*  Unit Information */}
              <div className="unitRow">
                <div className="unitTitleContainer">
                  <h6>
                    <span>Tema {unitIndex + 1}:</span>
                    <span className="unitName"> {unitName}</span>
                  </h6>
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
                <div className="unitsButtonsContainer">
                  <span
                    onClick={() => {
                      openUnitEditForm(unit_id[unitIndex]);
                      setUnitInformation(unitName);
                    }}
                  >
                    <BsPencil className="icon" />
                  </span>
                  {allInformation
                    .filter((item) => item.unit_tittle === unitName)
                    .every((item) => !item.unit_is_hidden) ? (
                    <span>
                      <BsEyeSlash
                        className="icon"
                        onClick={() => disableUnit(unit_id[unitIndex])}
                      />
                    </span>
                  ) : (
                    <span>
                      <BsEye
                        className="icon"
                        onClick={() => enableUnit(unit_id[unitIndex])}
                      />
                    </span>
                  )}
                  <span>
                    <button
                      className="buttonText"
                      onClick={() => OpenLessonCreateModal(unit_id[unitIndex])}
                    >
                      Lección <BsPlusCircle className="icon" />
                    </button>
                  </span>
                </div>
              </div>

              {/* Lessons */}

              <div
                style={{
                  height: openUnits.includes(unitIndex)
                    ? openedHeight
                    : closedHeight,
                  transition: "height 0.75s ease-in-out",
                }}
                className="lessonsList"
              >
                {allInformation
                  .filter((item) => item.unit_tittle === unitName)
                  .map((lesson, lessonIdx) => {
                    if (lesson.lesson_id !== null) {
                      return (
                        <div key={lessonIdx} className="lessonRow">
                          <div className="lessonRowLine">
                            <div className="lessonTitle">
                              <p className="lessonText">
                                <span>{lessonIdx + 1}.</span>{" "}
                                {lesson.lesson_title}
                              </p>
                            </div>
                            <div className="lessonFunctionsButtons">
                              <span
                                onClick={() => {
                                  openLessonEditForm(true);
                                  setLessonId(lesson.lesson_id);
                                  setLessonInformation(lesson);
                                }}
                              >
                                <BsPencil className="icon" />
                              </span>
                              {lesson?.lesson_is_hidden === 1 ? (
                                <span
                                  onClick={(e) => {
                                    e.preventDefault();
                                    enableLesson(lesson?.lesson_id);
                                  }}
                                >
                                  <BsEye className="icon" />
                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    e.preventDefault();
                                    disableLesson(lesson?.lesson_id);
                                  }}
                                >
                                  <BsEyeSlash className="icon" />
                                </span>
                              )}
                              <button
                                className="btnOutline1"
                                onClick={() => {
                                  navigate(
                                    `/courses/courseInfo/lessonInfo/${course_id}/${lesson.unit_id}/${lesson.lesson_id}`
                                  );
                                }}
                              >
                                Ir a
                              </button>
                            </div>
                          </div>
                          <div>
                            {allInformation
                              .filter((item) => item.unit_tittle === unitName)
                              .map((resource, resourceIdx) => {
                                if (
                                  resource.lesson_id !== null &&
                                  resource.lesson_id === lesson.lesson_id
                                ) {
                                  return (
                                    <div
                                      key={resourceIdx}
                                      className="resourceRow"
                                    >
                                      <div> Recurso</div>

                                      <div className="resourceFunctionsButtonsCont">
                                        {resource.resource_id &&
                                          resource?.resource_is_hidden ===
                                            1 && (
                                            <BsEye
                                              className="deleteIcon "
                                              onClick={() =>
                                                enableResource(
                                                  resource.resource_id
                                                )
                                              }
                                            />
                                          )}
                                        {resource.resource_id &&
                                          resource?.resource_is_hidden ===
                                            0 && (
                                            <BsEyeSlash
                                              className=" deleteIcon"
                                              onClick={() =>
                                                disableResource(
                                                  resource.resource_id
                                                )
                                              }
                                            />
                                          )}
                                        {resource.resource_id &&
                                          resource?.resource_is_hidden ===
                                            0 && (
                                            <BsFillFileEarmarkArrowDownFill
                                              className="downloadIcon icon"
                                              onClick={() =>
                                                downloadResource(
                                                  resource.resource_id
                                                )
                                              }
                                            />
                                          )}
                                        {!resource.resource_id && (
                                          <>
                                            <label
                                              htmlFor={resource.lesson_id}
                                              className="d-inline"
                                            >
                                              <BsFillFileArrowUpFill className="uploadIcon" />
                                            </label>
                                            <input
                                              type="file"
                                              onChange={(e) =>
                                                uploadResource(
                                                  e,
                                                  resource.lesson_id,
                                                  resource.unit_id
                                                )
                                              }
                                              className="d-none"
                                              id={resource.lesson_id}
                                            />
                                          </>
                                        )}
                                        {resource.resource_id &&
                                          resource?.resource_is_hidden ===
                                            0 && (
                                            <MdDeleteOutline
                                              className="deleteIcon fs-5 "
                                              onClick={() =>
                                                deleteResource(
                                                  resource.lesson_id,
                                                  resource.resource_id
                                                )
                                              }
                                            />
                                          )}
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          );
        }
      })}

      {/* Modals */}

      <LessonCreationModal
        setShowLessonCreationModal={setShowLessonCreationModal}
        showLessonCreationModal={showLessonCreationModal}
        course_id={course_id}
        resEffect={resEffect}
        setResEffect={setResEffect}
        unitId={unitId}
      />
      <AdminUnitEdirForm
        unitEditForm={unitEditForm}
        setUnitEditForm={setUnitEditForm}
        unit_id={unitId}
        course_id={course_id}
        resEffect={resEffect}
        setResEffect={setResEffect}
        unitInformation={unitInformation}
        setUnitInformation={setUnitInformation}
      />

      <AdminLessonEditForm
        showLessonEditForm={showLessonEditForm}
        setShowLessonEditForm={setShowLessonEditForm}
        lessonId={lessonId}
        unit_id={unitId}
        course_id={course_id}
        resEffect={resEffect}
        setResEffect={setResEffect}
        setLessonId={setLessonId}
        lessonInformation={lessonInformation}
        setLessonInformation={setLessonInformation}
        unitInformation={unitInformation}
        setUnitInformation={setUnitInformation}
      />
    </div>
  );
};
export default AdminViewOneCourse;

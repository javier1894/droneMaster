import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { GiClassicalKnowledge } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

export const TeacherCoursesTableCard = ({ myCoursesData, user_id }) => {
  const { register, handleSubmit, reset } = useForm();
  const [searchResultData, setSearchResultData] = useState();
  const [studentsNumber, setStudentsNumber] = useState();
  const [coursesDataCompleted, setCoursesDataCompleted] = useState();

  const navigate = useNavigate();

  // Counts all students of a Teacher
  useEffect(() => {
    if (user_id) {
      axios
        .get(
          `http://localhost:4000/teachers/myCourses/studentCounter/${user_id}`
        )
        .then((res) => setStudentsNumber(res.data))
        .catch((error) => {});
    }
  }, [user_id]);

  // Filter all students and divide it by course
  useEffect(() => {
    const updatedCoursesData = myCoursesData?.map((course) => {
      const matchingStudent = studentsNumber?.find(
        (student) => student.course_id === course.course_id
      );

      const num_students = matchingStudent ? matchingStudent.num_students : 0;

      const matchingUnit = studentsNumber?.find(
        (unit) => unit.course_id === course.course_id
      );

      const num_units = matchingUnit ? matchingUnit.num_units : 0;

      return { ...course, num_students, num_units };
    });

    setCoursesDataCompleted(updatedCoursesData);
  }, [studentsNumber, myCoursesData]);

  //Submit search (filter and set state with the matched elements)
  const onSubmit = (data) => {
    setSearchResultData(
      coursesDataCompleted.filter((course) =>
        course.course_name
          .toLowerCase()
          .includes(data.courseSearch.toLowerCase())
      )
    );
    reset();
  };
  return (
    <div className="coursesTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>
          <h5 className="titleText">Mis Cursos</h5>
        </div>

        <form
          className="d-flex justify-content-center d-sm-flex justify-content-sm-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="searchBar">
            <FiSearch />
            <input
              autoComplete="off"
              type="text"
              placeholder="Buscar curso..."
              {...register("courseSearch")}
            />
          </div>
        </form>
      </div>
      <div className="cardBody">
        <table className="coursesTable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th className="iconHeadName d-none d-md-flex">Duración</th>
              <th className="iconHeadName">
                {" "}
                <AiOutlineFolderOpen className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Temario</span>
              </th>
              <th className="iconHeadName">
                <AiOutlineUser className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Nº Alumnos</span>
              </th>

              <th className="d-none d-md-flex ">Puntuación</th>
              <th className="text-center text-md-start">Más info</th>
            </tr>
          </thead>
          <tbody>
            {searchResultData ? (
              <>
                {searchResultData.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {searchResultData?.map((course) => {
                      return (
                        <tr key={course.course_id}>
                          <td className="tableCellName">
                            {course.course_name}
                          </td>
                          <td className="d-none d-md-block py-2">
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlineClockCircle className="icon" />
                                {course.course_length}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlineFolderOpen className="icon" />
                                {course.num_units}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              {" "}
                              <div className="tableCellContent">
                                <AiOutlineUser className="icon" />
                                {course.num_students}
                              </div>
                            </div>
                          </td>
                          <td className="d-none d-md-block py-2">
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlineStar className="icon" />
                                {course.score}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-center justify-content-md-start">
                              <button
                                className="btnOutline1 "
                                onClick={() => {
                                  navigate(
                                    `/teacher/MyCourse/${course.course_id}`
                                  );
                                }}
                              >
                                <span className="d-none d-md-flex">Info</span>
                                <span className="d-md-none d-flex">
                                  <AiOutlineArrowRight />
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <>
                {coursesDataCompleted?.map((course) => {
                  return (
                    <tr key={course.course_id}>
                      <td className="tableCellName">{course.course_name}</td>
                      <td className="d-none d-md-block py-2">
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlineClockCircle className="icon" />
                            {course.course_length}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlineFolderOpen className="icon" />{" "}
                            {course.num_units}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlineUser className="icon" />
                            {course.num_students}
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-block py-2">
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlineStar className="icon" /> {course.score}
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btnOutline1"
                          onClick={() => {
                            navigate(`/teacher/MyCourse/${course.course_id}`);
                          }}
                        >
                          <span className="d-none d-md-flex">Info</span>
                          <span className="d-md-none d-flex">
                            <AiOutlineArrowRight />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

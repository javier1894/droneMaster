import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";

export const TeacherStudentsTableCard = ({ myStudentsData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [searchResultData, setSearchResultData] = useState();

  //Submit search (filter and set state with the matched elements)
  const onSubmit = (data) => {
    setSearchResultData(
      myStudentsData.filter((student) =>
        student.student_name
          .toLowerCase()
          .includes(data.studentSearch.toLowerCase())
      )
    );
    reset();
  };

  return (
    <div className="studentsTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Mis Alumnos</h5>
        </div>

        <form className="d-flex justify-content-center d-sm-flex justify-content-sm-end" onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
              autoComplete="off"
              type="text"
              placeholder="Buscar alumno..."
              {...register("studentSearch")}
            />
          </div>
        </form>
      </div>
      <div className="cardBody">
        <table className="coursesTable">
          <thead>
            <tr>
              <th colSpan={2}>Nombre</th>
              <th>Primer Apellido</th>
              <th className="iconHeadName">
                {" "}
                <HiOutlineMail className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Email</span>
              </th>
              <th className="iconHeadName">
                <AiOutlinePhone className="headIcon d-md-none d-flex fs-2" />{" "}
                <span className=" d-none d-md-flex">Telefono</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResultData ? (
              <>
                {searchResultData.length == 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                  {searchResultData?.map((student) => {
                    return (
                      <tr key={student.student_id}>
                        <td className="tdImg">
                          <div className="tableImg">
                            {student?.student_img ? (
                              <img
                                src={`http://localhost:4000/images/user/${student.student_img}`}
                              />
                            ) : (
                              <h6 className="avatarText">
                                {student?.student_name.at(0).toUpperCase()}
                              </h6>
                            )}
                          </div>
                        </td>
                        <td className="tableCellName">{student.student_name}</td>
                        <td>
                          <div className="tableCell">
                            {student.student_lastname}
                          </div>
                        </td>
                        <td>
                          <div className="tableCell iconCell">
                            <div className="tableCellContent">
                              <HiOutlineMail className="icon" />
                              <span className="d-none d-md-inline ">
                                {student.student_email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="tableCell iconCell">
                            <div className="tableCellContent">
                              <AiOutlinePhone className="icon" />
                              <span className="d-none d-md-inline ">
                                {student.student_phone}
                              </span>
                            </div>
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
                {myStudentsData?.map((student) => {
                  return (
                    <tr key={student.student_id}>
                      <td className="tdImg">
                        <div className="tableImg">
                          {student?.student_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${student.student_img}`}
                            />
                          ) : (
                            <h6 className="avatarText">
                              {student?.student_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{student.student_name}</td>
                      <td>
                        <div className="tableCell">
                          {student.student_lastname}
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.student_email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon" />
                            <span className="d-none d-md-inline ">
                              {student.student_phone}
                            </span>
                          </div>
                        </div>
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

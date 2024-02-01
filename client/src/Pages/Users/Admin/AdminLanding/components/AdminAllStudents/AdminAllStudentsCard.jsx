import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import UserMoreInfoCard from "../UserMoreInfoCard/userMoreInfoCard";

const AdminAllStudentsCard = ({
  setMoreInformationStudentModal,
  moreInformationStudentModal,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [students, setStudents] = useState([]);
  const [oneStudent, setOneStudent] = useState();
  const [searchResultStudent, setsearchResultStudent] = useState();

//Brings the list of all students

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/allStudents")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => { });
  }, [moreInformationStudentModal]);
  
  //Opens a card with the information of one student
  const openInfoForm = (userId) => {
    axios
      .get(`http://localhost:4000/userInformation/${userId}`)
      .then((res) => {
        setOneStudent(res.data[0]);
      })
      .catch((err) => { });
    setMoreInformationStudentModal(true);
  };

  // Bar Searcher of one student

  const onSubmit = (data) => {
    setsearchResultStudent(
      students?.filter((student) =>
        student.user_name
          .toLowerCase()
          .includes(data.studentSearch.toLowerCase())
      )
    );
    reset();
  };

  return (
    <div className="adminTableCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineUser />
          </div>
          <h5 className="titleText">Todos los Alumnos</h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
              autoComplete="off"
              type="text"
              placeholder="Buscar Alumno..."
              {...register("studentSearch")}
            />
          </div>
        </form>
      </div>
      <div>
        {searchResultStudent && (
          <button
            onClick={() => setsearchResultStudent()}
            className="btnOutline1 m-3"
          >
            Ver todos
          </button>
        )}
      </div>

      <div className="cardBody">
        <table className="adTable">
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
              <th className="iconHeadName">
                <span className=" d-none d-md-flex">Información</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResultStudent ? (
              <>
                {searchResultStudent?.length === 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {searchResultStudent?.map((student) => {
                      return (
                        <tr key={student?.user_id}>
                          <td>
                            <div>
                              {student?.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/user/${student?.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarTextUser">
                                  {student?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                          </td>
                          <td className="tableCellName">
                            {student?.user_name}
                          </td>
                          <td>
                            <div className="tableCell">
                              {student?.user_lastname}
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <HiOutlineMail className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {student?.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {student?.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="tableCell iconCell">
                            <div className="tableCellContent">
                              <button
                                onClick={() => openInfoForm(student.user_id)}
                                className="btnOutline1 "
                               
                              >
                                Info
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                )}

                <UserMoreInfoCard
                  moreInformationStudentModal={moreInformationStudentModal}
                  setMoreInformationStudentModal={setMoreInformationStudentModal}
                  student={oneStudent}
                />
              </>
            ) : (
              <>
                {students?.map((student) => {
                  return (
                    <tr key={student?.user_id}>
                      <td>
                        <div>
                          {student?.student_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${student.user_img}`}
                            />
                          ) : (
                            <h6 className="avatarTextUser">
                              {student?.user_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{student?.user_name}</td>
                      <td>
                        <div className="tableCell">
                          {student?.user_lastname}
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon text-warning" /> 
                            <span className="d-none d-md-inline ">
                               {student?.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {student?.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="tableCell iconCell">
                        <div className="tableCellContent">
                          <button
                            onClick={() => openInfoForm(student.user_id)}
                            className="btnOutline1 "
                          >
                            Info
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
            <UserMoreInfoCard
              moreInformationStudentModal={moreInformationStudentModal}
              setMoreInformationStudentModal={setMoreInformationStudentModal}
              student={oneStudent}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllStudentsCard;

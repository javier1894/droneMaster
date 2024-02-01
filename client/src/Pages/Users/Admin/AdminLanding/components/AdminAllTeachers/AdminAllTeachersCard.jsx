import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import TeacherMoreInforCard from "./AdminMoreInforCard/TeacherMoreInforCard";

const AdminAllTeachersCard = ({
  setMoreInformationTeacherModal,
  moreInformationTeacherModal,
}) => {
  const [teachers, setTeachers] = useState();
  const [oneTeacher, setOneTeacher] = useState();
  const [searchResultData, setSearchResultData] = useState();
  const [resetInfoTeacher, setResetInfoTeacher] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  //Bring the list of all teachers.

  useEffect(() => {
    axios

      .get("http://localhost:4000/admin/allTeachers")
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => {});
  }, [moreInformationTeacherModal, resetInfoTeacher]);

  // Open a card with the information of one teacher.

  const openTeacherForm = (userId) => {
    axios
      .get(`http://localhost:4000/userInformation/${userId}`)
      .then((res) => {
        setOneTeacher(res.data[0]);
      })
      .catch((err) => {});
    setMoreInformationTeacherModal(true);
  };

  // Bar seacher of one teacher
  const onSubmit = (data) => {
    setSearchResultData(
      teachers?.filter((teacher) =>
        teacher.user_name
          .toLowerCase()
          .includes(data.teacherSearch.toLowerCase())
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
          <h5 className="titleText">Todos los Profesores</h5>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="searchBar">
            <FiSearch />
            <input
                autoComplete="off"
              type="text"
              placeholder="Buscar Profesor..."
              {...register("teacherSearch")}
            />
          </div>
        </form>
      </div>
      <div>
        {" "}
        {searchResultData && (
          <button
            onClick={() => setSearchResultData()}
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
            {searchResultData ? (
              <>
                {searchResultData?.length === 0 ? (
                  <p>Sin resultados de busqueda</p>
                ) : (
                  <>
                    {searchResultData?.map((teacher) => {
                      return (
                        <tr key={teacher?.user_id}>
                          <td>
                            <div>
                              {teacher?.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/user/${teacher?.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarTextUser">
                                  {teacher?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                          </td>
                          <td className="tableCellName">
                            {teacher?.user_name}
                          </td>
                          <td>
                            <div className="tableCell">
                              {teacher?.user_lastname}
                            </div>
                          </td>
                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <HiOutlineMail className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher?.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="tableCell iconCell">
                              <div className="tableCellContent">
                                <AiOutlinePhone className="icon  text-warning" />
                                <span className="d-none d-md-inline ">
                                  {teacher?.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="tableCell iconCell">
                            <div className="tableCellContent">
                              <button
                                onClick={() => openTeacherForm(teacher.user_id)}
                                className="btnOutline1"
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

                <TeacherMoreInforCard
                  moreInformationTeacherModal={moreInformationTeacherModal}
                  setMoreInformationTeacherModal={setMoreInformationTeacherModal}
                  teacher={oneTeacher}
                  resetInfoTeacher={resetInfoTeacher}
                  setResetInfoTeacher={setResetInfoTeacher}
                />
              </>
            ) : (
              <>
                {teachers?.map((teacher) => {
                  return (
                    <tr key={teacher?.user_id}>
                      <td>
                        <div>
                          {teacher?.teacher_img ? (
                            <img
                              src={`http://localhost:4000/images/user/${teacher.user_img}`}
                            />
                          ) : (
                            <h6 className="avatarTextUser">
                              {teacher?.user_name.at(0).toUpperCase()}
                            </h6>
                          )}
                        </div>
                      </td>
                      <td className="tableCellName">{teacher?.user_name}</td>
                      <td>
                        <div className="tableCell">
                          {teacher?.user_lastname}
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <HiOutlineMail className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher?.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tableCell iconCell">
                          <div className="tableCellContent">
                            <AiOutlinePhone className="icon text-warning" />
                            <span className="d-none d-md-inline ">
                              {teacher?.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="tableCell iconCell">
                        <div className="tableCellContent">
                          <button
                            onClick={() => openTeacherForm(teacher.user_id)}
                            className="btnOutline1"
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
            <TeacherMoreInforCard
              moreInformationTeacherModal={moreInformationTeacherModal}
              setMoreInformationTeacherModal={setMoreInformationTeacherModal}
              teacher={oneTeacher}
              resetInfoTeacher={resetInfoTeacher}
              setResetInfoTeacher={setResetInfoTeacher}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllTeachersCard;

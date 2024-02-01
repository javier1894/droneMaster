import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AdminTeacherEditInfoModal from "../AdminTeacherEditInfoModal/AdminTeacherEditInfoModal";
import "./TeacherMoreInfoCard.scss";

const TeacherMoreInforCard = ({
  setMoreInformationTeacherModal,
  moreInformationTeacherModal,
  teacher,
  setResetInfoTeacher,
  resetInfoTeacher,
}) => {
  const [profileImg, setProfileImg] = useState();
  const [teacherEditForm, setTeacherEditForm] = useState(false);

  // Brings the picture from the data base

  useEffect(() => {
    teacher &&
      setProfileImg(`http://localhost:4000/images/users/${teacher?.user_img}`);
  }, [teacher]);

  // Enable the teacher

  const setTeacherEnable = () => {
    axios
      .put(`http://localhost:4000/admin/enableUser/${teacher?.user_id}`)
      .then((res) => {
        setMoreInformationTeacherModal(false);
      })
      .catch((err) => {});
  };

  // Disable the teacher
  const setTeacherDisable = () => {
    axios
      .put(`http://localhost:4000/admin/disableUser/${teacher?.user_id}`)
      .then((res) => {
        setMoreInformationTeacherModal(false);
      })
      .catch((err) => {});
  };

  //Close the card with the information of the Teacher
  const closeInfoTeacherForm = () => {
    setMoreInformationTeacherModal(false);
  };
  return (
    <Modal
      show={moreInformationTeacherModal}
      onHide={closeInfoTeacherForm}
      className="courseCreationModalContainer"
      animation={false}
      centered
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          {/*           <div className="iconContainer">
              <GiClassicalKnowledge />
            </div> */}

          <h4 className="titleText">Informacion de Usuario</h4>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBodyTeacher1">
        <div>
          <div className="imgContainerTeacher">
            {teacher?.user_img ? (
              <>
                <img src={profileImg} alt="" />
              </>
            ) : (
              <div className="defaultImg">
                <div className="defaultText">
                  <h1 className="mb-0">
                    {teacher?.user_name.at(0).toUpperCase()}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex flex-column align-items-start gap-1 inputName">
          <label className="ps-3 font">
            {" "}
            Nombre:{" "}
            <span style={{ fontWeight: "bold" }}>{teacher?.user_name}</span>
          </label>
          <label className="ps-3 font">
            Apellido:{" "}
            <span style={{ fontWeight: "bold" }}>{teacher?.user_lastname}</span>
          </label>
          <label className="ps-3 font">
            Telefono{" "}
            <span style={{ fontWeight: "bold" }}>{teacher?.labelhone}</span>
          </label>
          <label className="ps-3 font">
            {" "}
            Dirección{" "}
            <span style={{ fontWeight: "bold" }}>{teacher?.address} </span>{" "}
          </label>
          <label className="ps-3 font">
            Estado:{" "}
            <span style={{ fontWeight: "bold" }}>
              {teacher?.is_deleted === 0 ? "Activo" : "Inactivo"}
            </span>{" "}
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        {teacher?.is_deleted === 0 ? (
          <button className="btnOutline1" onClick={setTeacherDisable}>
            Inhabilitar
          </button>
        ) : (
          <button className="btnOutline1" onClick={setTeacherEnable}>
            Habilitar
          </button>
        )}
        <button className="btnNormal" onClick={setTeacherEditForm}>
          Editar
        </button>
      </Modal.Footer>

      <AdminTeacherEditInfoModal
        teacherEditForm={teacherEditForm}
        setMoreInformationTeacherModal={setMoreInformationTeacherModal}
        setTeacherEditForm={setTeacherEditForm}
        teacher={teacher}
        closeInfoTeacherForm={closeInfoTeacherForm}
        resetInfoTeacher={resetInfoTeacher}
        setResetInfoTeacher={setResetInfoTeacher}
      />
    </Modal>
  );
};

export default TeacherMoreInforCard;

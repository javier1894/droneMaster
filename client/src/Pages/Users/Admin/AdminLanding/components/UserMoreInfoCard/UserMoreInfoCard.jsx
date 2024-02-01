import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import AdminUserEditInfoModal from "./components/AminUserEditInfoModal/AdminUserEditInfoModal";
import { GiClassicalKnowledge } from "react-icons/gi";
import "./UserMoreInforCard.scss";

const UserMoreInfoCard = ({
  setMoreInformationStudentModal,
  moreInformationStudentModal,
  student,
}) => {
  const [profileImg, setProfileImg] = useState();
  const [editUserForm, setEditUserForm] = useState(false);

  // Brings the picture from the data base

  useEffect(() => {
    student &&
      setProfileImg(`http://localhost:4000/images/users/${student?.user_img}`);
  }, [student]);

  // Enable the student

  const setStudentEnable = () => {
    axios
      .put(`http://localhost:4000/admin/enableUser/${student?.user_id}`)
      .then((res) => {
        setMoreInformationStudentModal(false);
      })
      .catch((err) => {});
  };

  // Disable the student

  const setStudentDisable = () => {
    axios
      .put(`http://localhost:4000/admin/disableUser/${student?.user_id}`)
      .then((res) => {
        setMoreInformationStudentModal(false);
      })
      .catch((err) => {});
  };

  //Open the Edit form modal of the Student

  const openUserEditForm = () => {
    setEditUserForm(true);
  };

  //Close the card with the information of the Student

  const closeInfoForm = () => {
    setMoreInformationStudentModal(false);
  };

  return (
    <Modal
      show={moreInformationStudentModal}
      onHide={closeInfoForm}
      className="courseCreationModalContainer"
      animation={false}
      centered
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Informacion de Usuario</h4>
        </div>
      </Modal.Header>
      <Modal.Body className="modalBodyUser1">
        <div>
          <div className="imgContainerStudent">
            {student?.user_img ? (
              <>
                <img src={profileImg} alt="" />
              </>
            ) : (
              <div className="defaultImg">
                <div className="defaultText">
                  <h1 className="mb-0">
                    {student?.user_name.at(0).toUpperCase()}
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
            <span style={{ fontWeight: "bold" }}>{student?.user_name}</span>
          </label>
          <label className="ps-3 font">
            {" "}
            Apellido:{" "}
            <span style={{ fontWeight: "bold" }}>{student?.user_lastname}</span>
          </label>
          <label className="ps-3 font">
            Telefono:{" "}
            <span style={{ fontWeight: "bold" }}>{student?.phone}</span>
          </label>
          <label className="ps-3 font">
            {" "}
            Dirección:{" "}
            <span style={{ fontWeight: "bold" }}>{student?.address}</span>
          </label>
          <label className="ps-3 font">
            Estado:{" "}
            <span style={{ fontWeight: "bold" }}>
              {student?.is_deleted === 0 ? "Activo" : "Inactivo"}
            </span>{" "}
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        {student?.is_deleted === 0 ? (
          <button className="btnOutline1" onClick={setStudentDisable}>
            Inhabilitar
          </button>
        ) : (
          <button className="btnOutline1" onClick={setStudentEnable}>
            Habilitar
          </button>
        )}

        <button className="btnNormal" onClick={openUserEditForm}>
          Editar
        </button>
      </Modal.Footer>
      <AdminUserEditInfoModal
        editUserForm={editUserForm}
        setMoreInformationStudentModal={setMoreInformationStudentModal}
        moreInformationStudentModal={moreInformationStudentModal}
        student={student}
        setEditUserForm={setEditUserForm}
        closeInfoForm={closeInfoForm}
      />
    </Modal>
  );
};

export default UserMoreInfoCard;

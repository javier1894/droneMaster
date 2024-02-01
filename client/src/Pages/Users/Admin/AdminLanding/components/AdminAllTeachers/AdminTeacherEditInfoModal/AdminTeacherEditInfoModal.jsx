import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiSolidUserDetail } from "react-icons/bi";
import { PiTrashBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../../context/DroneMasterProvider";
import "./AdminTeacherEditInfoModal.scss";

const AdminTeacherEditInfoModal = ({
  teacher,
  teacherEditForm,
  setTeacherEditForm,
  closeInfoTeacherForm,
  setResetInfoTeacher,
  resetInfoTeacher,
}) => {
  const [file, setFile] = useState();
  const [profileImg, setProfileImg] = useState();
  const { register, setValue, handleSubmit } = useForm();
  const { resetData, setResetData } = useContext(DroneMasterContext);

  // Set the picture of the profile

  useEffect(() => {
    teacher &&
      setProfileImg(`http://localhost:4000/images/users/${teacher?.user_img}`);
  }, [teacher, resetInfoTeacher]);

  // Brings the info of the teacher from the data base before the update

  useEffect(() => {
    teacher?.user_name && setValue("user_name", teacher.user_name || "");
    teacher?.user_lastname &&
      setValue("user_lastname", teacher.user_lastname || "");
    teacher?.email && setValue("email", teacher.email || "");
    teacher?.phone && setValue("phone", teacher.phone || "");
    teacher?.address && setValue("address", teacher.address || "");
  }, [teacher, setValue]);

  // Sets the new profile picture.

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteButton = () => {
    axios
      .put(`http://localhost:4000/myProfile/deleteImage/${teacher.user_id}`)
      .then((res) => {
        setResetData(!resetData);
        setFile();
      })
      .catch((err) => {});

    setProfileImg();
  };

  // Saves the updated information

  const onSubmit = (data) => {
    const newFormData = new FormData();

    newFormData.append("editedUser", JSON.stringify(data));

    if (file !== undefined) {
      newFormData.append("file", file);
    }

    axios
      .put(
        `http://localhost:4000/editMyProfile/${teacher.user_id}`,
        newFormData
      )
      .then((res) => {
        setResetInfoTeacher(!resetInfoTeacher);
        /* setResetData(!resetData); */
        setTeacherEditForm(false);
        /* setMoreInformationTeacherModal(false) */
        closeInfoTeacherForm();
      })
      .catch((err) => {});
  };
  // Closes the edit form modal
  const closeTeacherUserForm = () => {
    setTeacherEditForm(false);
  };

  return (
    <Modal
      show={teacherEditForm}
      onHide={closeTeacherUserForm}
      centered
      size="lg"
      className="editionTeacherModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <BiSolidUserDetail />
          </div>

          <h4 className="titleText">Editas mis datos</h4>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalEditTeacherBody">
          <div className="imgGridContainer">
            <div className="imgContainer">
              {teacher?.user_img ? (
                <>
                  <img src={profileImg} alt="" />
                  <Button
                    variant="outline-danger"
                    className="deleteImgButton"
                    onClick={handleDeleteButton}
                  >
                    <PiTrashBold />
                  </Button>
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

            {/* Image Input Group */}
            <input
              type="file"
              onChange={handleImgChange}
              className="inputFile"
              id="inputFile"
            />

            <label htmlFor="inputFile" className="inputImageLabel btnNormal">
              Selecciona Imagen
            </label>
          </div>

          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="user_name" className="ps-3">
              Nombre
            </label>
            <input
              placeholder="Nombre"
              {...register("user_name")}
              className="input1"
              id="user_name"
              autoComplete="off"
            />
          </div>

          {/* Lastame Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputLastname">
            <label htmlFor="user_lastname" className="ps-3">
              Primer Apellido
            </label>
            <input
              placeholder="Apellido"
              {...register("user_lastname")}
              id="user_lastname"
              className="input1"
              autoComplete="off"
            />
          </div>

          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputPassport">
            <label htmlFor="passport" className="ps-3">
              DNI
            </label>
            <input
              placeholder="DNI"
              {...register("passport")}
              id="passport"
              className="input1"
              autoComplete="off"
            />
          </div>

          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputPhone">
            <label htmlFor="phone" className="ps-3">
              Teléfono
            </label>
            <input
              placeholder="Teléfono"
              {...register("phone")}
              id="phone"
              className="input1"
              autoComplete="off"
            />
          </div>

          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputAddress">
            <label htmlFor="address" className="ps-3">
              Dirección
            </label>
            <input
              placeholder="Dirección"
              {...register("address")}
              id="address"
              className="input1"
              autoComplete="off"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeTeacherUserForm}>
            Cancelar
          </button>
          <button className="btnNormal" type="submit">
            Enviar
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AdminTeacherEditInfoModal;

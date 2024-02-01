import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiSolidUserDetail } from "react-icons/bi";
import { PiTrashBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../../../context/DroneMasterProvider";

const AdminUserEditInfoModal = ({
  editUserForm,
  setEditUserForm,
  student,
  setMoreInformationStudentModal,
  closeInfoForm,
}) => {
  const [file, setFile] = useState();
  const { resetData, setResetData } = useContext(DroneMasterContext);
  const { register, setValue, handleSubmit } = useForm();
  const [profileImg, setProfileImg] = useState();

  // Set the picture of the profile

  useEffect(() => {
    student &&
      setProfileImg(`http://localhost:4000/images/users/${student?.user_img}`);
  }, [student]);

  // Brings the info of the student from the data base before the update
  useEffect(() => {
    student?.user_name && setValue("user_name", student.user_name || "");
    student?.user_lastname &&
      setValue("user_lastname", student.user_lastname || "");
    student?.email && setValue("email", student.email || "");
    student?.phone && setValue("phone", student.phone || "");
    student?.address && setValue("address", student.address || "");
  }, [student, setValue]);

  //

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteButton = () => {
    axios
      .put(`http://localhost:4000/myProfile/deleteImage/${student.user_id}`)
      .then((res) => {
        setResetData(!resetData);
        setFile();
        setMoreInformationStudentModal(false);
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
        `http://localhost:4000/editMyProfile/${student.user_id}`,
        newFormData
      )
      .then((res) => {
        setResetData(!resetData);
        setEditUserForm(false);
        closeInfoForm();
      })
      .catch((err) => {});
  };
  // Closes the edit form modal
  const closeEditUserForm = () => {
    setEditUserForm(false);
  };

  return (
    <Modal
      show={editUserForm}
      onHide={closeEditUserForm}
      centered
      size="lg"
      className="editionModalContainer"
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
        <Modal.Body className="modalBody">
          <div className="imgGridContainer">
            <div className="imgContainer">
              {student?.user_img ? (
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
                      {student?.user_name.at(0).toUpperCase()}
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
              autoComplete="off"
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
          <button className=" btnOutline1" onClick={closeEditUserForm}>
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

export default AdminUserEditInfoModal;

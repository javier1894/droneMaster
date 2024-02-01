import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiSolidUserDetail } from "react-icons/bi";
import { PiTrashBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./editMyProfileModal.scss";
import { DroneMasterContext } from "../../context/DroneMasterProvider";

export const EditMyProfileModal = ({
  setShowEditionModal,
  showEditionModal,
  user,
  resEffect,
  setResEffect
}) => {
  const [file, setFile] = useState();
  const { resetData, setResetData } = useContext(DroneMasterContext);
  const { register, setValue, handleSubmit } = useForm();
  const [profileImg, setProfileImg] = useState();

  // Function to close the modal
  const handleClose = () => {
    setShowEditionModal(false);
  };

  // Getting the user profile image
  useEffect(() => {
    user?.user_img &&
      setProfileImg(`http://localhost:4000/images/users/${user?.user_img}`);
  }, [user]);

  // Set values of a user Data
  useEffect(() => {
    for (const fieldName in user) {
      setValue(fieldName, user[fieldName]);
    }
  }, [showEditionModal]);

  // Function to change the user profile image
  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
    setProfileImg(e.target.files[0]);

    const newFormData = new FormData();
    newFormData.append("editedUser", JSON.stringify({ user_name: `${user.user_name}` }));
    newFormData.append("file", e.target.files[0])

    axios
      .put(`http://localhost:4000/editMyProfile/${user.user_id}`, newFormData)
      .then((res) => {
        setResetData(!resetData);
      })
      .catch((err) => { });
  };

  // Function to delete the user profile image
  const handleDeleteButton = () => {
    axios
      .put(`http://localhost:4000/myProfile/deleteImage/${user.user_id}`)
      .then((res) => {
        setResetData(!resetData);
        setFile();
      })
      .catch((err) => { });

    setProfileImg();
  };

  // Function to edit the user profile
  const onSubmit = (data) => {
    
    const newFormData = new FormData();
    newFormData.append("editedUser", JSON.stringify(data));

    if (file !== undefined) {
      newFormData.append("file", file);
    }

    axios
      .put(`http://localhost:4000/editMyProfile/${user.user_id}`, newFormData)
      .then((res) => {
        setResetData(!resetData);
        setResEffect(!resEffect)
      })
      .catch((err) => { });
    setShowEditionModal(false);
  };

  return (
    <Modal
      show={showEditionModal}
      onHide={handleClose}
      centered
      size="lg"
      className="editionModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <BiSolidUserDetail />
          </div>

          <h4 className="titleText">Edita mis datos</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody">
          <div className="imgGridContainer">
            <div className="imgContainer">
              {profileImg ? (
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
                      {user?.user_name.at(0).toUpperCase()}
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
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={handleClose}>
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

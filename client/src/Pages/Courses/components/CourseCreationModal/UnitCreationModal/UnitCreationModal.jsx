import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

import { GiClassicalKnowledge } from "react-icons/gi";
import "./unitCreationModal.scss";

export const UnitCreationModal = ({
  setShowUnitCreationModal,
  showUnitCreationModal,
  courseId,
  setResEffect,
  resEffect,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to close the modal
  const handleClose = () => {
    reset();
    setShowUnitCreationModal(false);
  };

  // Function to create a new unit
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:4000/admin/createUnit/${courseId}`, data)
      .then((res) => {
        reset();
        setShowUnitCreationModal(false);
        setResEffect(!resEffect);
      })
      .catch((err) => {
        { }
      });
  };

  return (
    <Modal
      show={showUnitCreationModal ? showUnitCreationModal : false}
      onHide={handleClose}
      centered
      size="md"
      fullscreen="false"
      className="unitCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Creacion de una nueva unidad</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBodyUnit">
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="unit_tittle" className="ps-3">
              Nombre de la unidad
            </label>
            <input
              placeholder="Nombre de la unidad"
              {...register("unit_tittle", {
                required: "Debes rellenar el nombre de la unidad",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="inputUnit"
              id="unit_tittle"
            />
            <span className="errorMessage">{errors.unit_tittle?.message}</span>
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

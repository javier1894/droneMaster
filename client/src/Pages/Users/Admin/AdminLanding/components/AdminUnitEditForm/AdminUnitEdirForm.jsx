import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { GiClassicalKnowledge } from "react-icons/gi";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../AdminLessonEditForm/AdminLessonEditForm.scss";
const AdminUnitEdirForm = ({
  unitEditForm,
  setUnitEditForm,
  unit_id,
  course_id,
  resEffect,
  setResEffect,
  unitInformation,
}) => {

  //Closes the modal which edits the Units
  const closeUnitEditForm = () => {
    setUnitEditForm(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  //Saves the information of the Unit information updated

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:4000/admin/editUnit/${course_id}/${unit_id}`, data)
      .then((res) => {
        closeUnitEditForm(true);
        setResEffect(!resEffect);
      })
      .catch((err) => {});
  };

  //Brings the information of the info saved in data base before the update.
  useEffect(() => {
    unitInformation && setValue("unit_tittle", unitInformation || "");
  }, [unitInformation, setValue]);

  //Edit Form

  return (
    <Modal show={unitEditForm} onHide={closeUnitEditForm}>
      <Modal.Header
        closeButton
        onClick={closeUnitEditForm}
        className="modalHeader"
      >
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición del tema</h4>
        </div>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody1">
          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="unit_tittle" className="ps-3">
              Nombre del Tema
            </label>
            <input
              placeholder="Nombre del Tema"
              {...register("unit_tittle", {
                required: "Camp obligatorio",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="unit_tittle"
            />
            <span className="errorMessage">{errors.unit_tittle?.message}</span>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeUnitEditForm}>
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

export default AdminUnitEdirForm;

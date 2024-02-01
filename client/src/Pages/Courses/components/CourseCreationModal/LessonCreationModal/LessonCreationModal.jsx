import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

import { GiClassicalKnowledge } from "react-icons/gi";
import "./lessonCreationModal.scss";

export const LessonCreationModal = ({
  setShowLessonCreationModal,
  showLessonCreationModal,
  course_id,
  resEffect,
  setResEffect,
  unitId,
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
    setShowLessonCreationModal(false);
  };

  // Function to create a new lesson
  const onSubmit = (data) => {
    axios
      .post(
        `http://localhost:4000/admin/createLesson/${course_id}/${unitId}`,
        data
      )
      .then((res) => {
        reset();
        setShowLessonCreationModal(false);
        setResEffect(!resEffect);
      })
      .catch((err) => {
        { }
      });
  };

  return (
    <Modal
      show={showLessonCreationModal ? showLessonCreationModal : false}
      onHide={handleClose}
      centered
      size="md"
      fullscreen="false"
      className="LessonCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Creacion de una lección</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBodyLesson">
          <div className="d-flex flex-column align-items-start gap-1 inputTitle">
            <label htmlFor="lesson_tittle" className="ps-3">
              Nombre de la lección
            </label>
            <input
              placeholder="Nombre de la lección"
              {...register("lesson_title", {
                required: "Debes rellenar el nombre de la lección",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="inputLessonTitle"
              id="lesson_title"
            />
          </div>
          <div className="d-flex flex-column align-items-start gap-1 inputDescription">
            <label htmlFor="text_content" className="ps-3">
              Descripción
            </label>
            <textarea
              placeholder="#Descripción"
              {...register("text_content")}
              id="text_content"
              className="inputLessonDescription"
            />
          </div>
          <div className="d-flex flex-column align-items-start gap-1 inputUrl">
            <label htmlFor="lesson_url_video" className="ps-3">
              Url de video
            </label>
            <input
              placeholder="url del video"
              {...register("lesson_url_video", {
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="inputLessonUrl"
              id="lesson_url_video"
            />
            <span className="errorMessage">
              {errors.lesson_url_video?.message}
            </span>
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

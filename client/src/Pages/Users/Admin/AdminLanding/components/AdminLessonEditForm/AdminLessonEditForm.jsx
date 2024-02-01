import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { GiClassicalKnowledge } from "react-icons/gi";

const AdminLessonEditForm = ({
  showLessonEditForm,
  setShowLessonEditForm,
  lessonId,
  resEffect,
  setResEffect,
  unit_id,
  course_id,
  lessonInformation,
}) => {
  const closeLessonEditForm = () => {
    setShowLessonEditForm(false);
  };

  // Reach Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //Saves the information updated of the Lesson
  const onSubmit4 = (data) => {
    axios
      .put(
        `http://localhost:4000/admin/editLesson/${course_id}/${unit_id}/${lessonId}`,
        data
      )

      .then((res) => {
        closeLessonEditForm(true);
        setResEffect(!resEffect);
      })

      .catch((err) => {});
  };
  // Brings the info of the lesson saved in the database before the update.

  useEffect(() => {
    lessonInformation?.lesson_title &&
      setValue("lesson_title", lessonInformation.lesson_title || "");
    lessonInformation?.lesson_content &&
      setValue("lesson_content", lessonInformation.lesson_content || "");
  }, [lessonInformation, setValue]);

  //Edit Form

  return (
    <Modal show={showLessonEditForm} onHide={closeLessonEditForm}>
      <Modal.Header
        closeButton
        onClick={closeLessonEditForm}
        className="modalHeader"
      >
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición de la lección</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit4)}>
        <Modal.Body className="modalBody1">
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            {/*  Edits lesson name */}
            <label htmlFor="lesson_title" className="ps-3">
              Nombre del la lección
            </label>
            <input
              placeholder="Nombre de la lección"
              {...register("lesson_title", {
                required: "Campo obligatorio",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="lesson_title"
            />
            <span className="errorMessage">{errors.lesson_title?.message}</span>
          </div>
          {/*  Edits lesson description */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="lesson_content" className="ps-3">
              Descripción de la Lección
            </label>
            <textarea
              placeholder="Descripción"
              {...register("lesson_content", {
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 250, message: "Maximo 250 caracteres" },
              })}
              className="input1"
              id="lesson_content"
            />
            <span className="errorMessage">
              {errors.lesson_content?.message}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeLessonEditForm}>
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

export default AdminLessonEditForm;

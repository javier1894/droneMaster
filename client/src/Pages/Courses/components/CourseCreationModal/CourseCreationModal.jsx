import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./courseCreationModal.scss";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";

export const CourseCreationModal = ({
  setShowCourseCreationModal,
  showCourseCreationModal,
  resEffect, setResEffect,
  resetCategory
}) => {
  const [teachersList, setTeachersList] = useState();
  const [categoriesList, setCategoriesList] = useState();
  const [tag, setTag] = useState();
  const [tagsList, setTagsList] = useState([]);
  const { user } = useContext(DroneMasterContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Getting all teachers
  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/allTeachers`)
      .then((res) => {
        setTeachersList(res.data);
      })
      .catch((err) => { });
  }, []);

  // Getting all categories
  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/everyCategories`)
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((err) => { });
  }, [resetCategory]);

  // function to close the modal
  const handleClose = () => {
    setShowCourseCreationModal(false);
    reset()
  };

  const handleTagsChange = (e) => {
    setTag(e.target.value);
  };

  const handleTagButton = () => {
    setTagsList([...tagsList, tag]);
    setTag("");
  };

  // Function to create a new course
  const onSubmit = (data) => {
    axios
      .post(`http://localhost:4000/courses/createCourse/${user.user_id}`, {
        data,
        tagsList,
      })
      .then((res) => {
        reset()
        setShowCourseCreationModal(false)
        setResEffect(!resEffect)

      })
      .catch((err) => {
        { }
      });

  };

  // Function to delete a tag
  const handleDeleteTag = (tagName) => {
    const updatedTagsList = tagsList.filter((tag) => tag !== tagName);
    setTagsList(updatedTagsList);
  };

  return (
    <Modal
      show={showCourseCreationModal ? showCourseCreationModal : false}
      onHide={handleClose}
      centered
      size="xl"
      fullscreen="false"
      className="courseCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Creacion de un nuevo curso</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody">
          {/* Name Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputName">
            <label htmlFor="course_name" className="ps-3">
              Nombre del curso
            </label>
            <input
              placeholder="Nombre del Curso"
              {...register("course_name", {
                required: "Debes rellenar el nombre del curso",
                minLength: { value: 3, message: "Minimo de 3 letras" },
                maxLength: { value: 100, message: "Maximo 100 caracteres" },
              })}
              className="input1"
              id="course_name"
            />
            <span className="errorMessage">{errors.course_name?.message}</span>
          </div>

          {/* Category Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputCategory">
            <label htmlFor="category_id" className="ps-3">
              Categoría
            </label>
            <select
              {...register("category_id")}
              id="category_id"
              className="input2"
              autoComplete="fañse"
            >
              <option value={1} className="optionDefault">
                Seleccione una categoria{" "}
              </option>
              {categoriesList?.map((category) => {
                return (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Length Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputLength">
            <label htmlFor="course_length" className="ps-3">
              Duracion estimada (h)
            </label>
            <input
              placeholder="Duración estimada"
              {...register("course_length", {
                required: "Debes rellenar este campo",
              })}
              id="course_length"
              className="input1"
              type="number"
            />
            <span className="errorMessage">
              {errors.course_length?.message}
            </span>
          </div>
          {/* Teacher Input Group */}
          <div className="d-flex flex-column align-items-start gap-1 inputTeacher">
            <label htmlFor="teacher_id" className="ps-3">
              Profesor
            </label>
            <select
              placeholder="Profesor del curso"
              {...register("teacher_id")}
              id="teacher_id"
              className="input2"
            >
              <option value={user?.user_id}> Seleccione un profesor </option>
              {teachersList?.map((teacher) => {
                return (
                  <option key={teacher.user_id} value={teacher.user_id}>
                    {teacher.user_name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Price Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputPrice">
            <label htmlFor="price" className="ps-3">
              Precio (€)
            </label>
            <input
              step="0.01" pattern="\d+(\.\d{1,2})?"
              type="number"
              placeholder="Precio"
              {...register("price", {
                required: "Valor erróneo",
                maxLength: { value: 8, message: "Maximo 99999'99 €" },
              })}
              id="price"
              className="input1"
            />
            <span className="errorMessage">{errors.price?.message}</span>
          </div>
          {/* Date Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputDate">
            <label htmlFor="start_date" className="ps-3">
              Fecha de inicio
            </label>
            <input
              type="date"
              placeholder="Fecha de inicio"
              {...register("start_date")}
              id="start_date"
              className="input1"
            />
          </div>
          {/* Tags Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputTags">
            <label htmlFor="tag" className="ps-3">
              Tags
            </label>
            <div className="d-flex w-100">
              <input
                value={tag}
                placeholder="Tags"
                name="tag"
                id="tag"
                className="input1"
                onChange={handleTagsChange}
              />
              <span
                className="btnOutline1 addTagButton"
                onClick={handleTagButton}
              >
                Añadir
              </span>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start gap-1 tagsList">
            <div className="tagListContainer ">
              <p>
                {tagsList?.map((tag, index) => {
                  return (
                    <span key={index} className="me-1 mb-0 ">
                      <MdOutlineDeleteOutline
                        className="deleteIcon"
                        onClick={() => handleDeleteTag(tag)}
                      />
                      #{tag}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          {/* Description Input Group */}
          <div className="d-flex flex-column align-items-start gap-1  inputDescription">
            <label htmlFor="course_description" className="ps-3">
              Descripción
            </label>
            <textarea
              placeholder="#Descripcíon"
              {...register("course_description")}
              id="course_description"
              className="input3"
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
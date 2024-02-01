import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiClassicalKnowledge } from "react-icons/gi";

import "./courseEditionModalStyle.scss";

export const CourseEditionModal = ({
  setShowCourseEditionModal,
  showCourseEditionModal,
  courseId,
  resEffect,
  setResEffect,
  resetCategory
}) => {
  const [teachersList, setTeachersList] = useState();
  const [categoriesList, setCategoriesList] = useState();
  const [tag, setTag] = useState();
  const [tagsList, setTagsList] = useState([]);
  const [courseData, setCourseData] = useState();
  const [courseImg, setCourseImg] = useState();
  const [file, setFile] = useState();
  const [teacherPrev_id, setTeacherPrev_id] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Function to close the modal
  const closeEditModal = () => {
    reset()
    setShowCourseEditionModal(false);
  };

  // Getting course info
  useEffect(() => {
    if(courseId){
      axios
      .get(`http://localhost:4000/courses/courseInfoEdition/${courseId}`)
      .then((res) => {
        setCourseData(res.data[0]);
        setTeacherPrev_id(res.data[0].teacher_id);
        setCourseImg(
          `http://localhost:4000/images/courses/${res.data[0].course_img}`
          );
        })
        .catch((error) => { });
      }
  }, [courseImg, courseId]);

  // Getting course tags
  useEffect(() => {
    if(courseId){
    axios
      .get(`http://localhost:4000/courses/courseTags/${courseId}`)
      .then((res) => {
        setTagsList(res.data);
      })
      .catch((error) => { });
    }
  }, [courseId]);

  // Getting allTeachers inside data base
  useEffect(() => {
    axios
      .get(`http://localhost:4000/admin/allTeachers`)
      .then((res) => {
        setTeachersList(res.data);
      })
      .catch((err) => {});
  }, []);

  // Getting all categories inside data base
  useEffect(() => {
    axios
      .get(`http://localhost:4000/courses/everyCategories`)
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((err) => {});
  }, [resetCategory]);

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagsChange = (e) => {
    setTag(e.target.value);
  };

  const handleTagButton = () => {
    setTagsList([...tagsList, { tag_name: tag }]);
    setTag("");
  };

  // Function to modify course info
  const onSubmit = (data) => {
    axios
      .put(
        `http://localhost:4000/courses/editCourse/${courseId}/${teacherPrev_id}`,
        {
          data,
          tagsList,
        }
      )
      .then((res) => {
        reset();
        setShowCourseEditionModal(false);
        setResEffect(!resEffect)
      })
      .catch((err) => {});

    if (file) {
      const newFormData = new FormData();

      newFormData.append("file", file);

      axios
        .put(
          `http://localhost:4000/courses/uploadCourseImage/${courseId}`,
          newFormData
        )
        .then((res) => {})
        .catch((error) => {});
    }
  };

  // Pre info fixed inside the inputs
  useEffect(() => {
    courseData?.course_name &&
      setValue("course_name", courseData.course_name || "");
    courseData?.course_length &&
      setValue("course_length", courseData.course_length || "");
    courseData?.price && setValue("price", courseData.price || "");
    courseData?.category_id &&
      setValue("category_id", courseData.category_id || "");
    courseData?.teacher_id &&
      setValue("teacher_id", courseData.teacher_id || "");
    courseData?.start_date &&
      courseData.start_date != null &&
      setValue("start_date", courseData.start_date.slice(0, 10) || "");
  }, [courseData, setValue, showCourseEditionModal]);

  // Function to delete tags
  const handleDeleteTag = (tagId, tagName) => {
    let url = "";
    if (tagId != undefined) {
      axios
        .put(`http://localhost:4000/admin/deleteCourseTag/${tagId}/${courseId}`)
        .then((res) => {})
        .catch((error) => {
          {
          }
        });
    }
    const updatedTagsList = tagsList.filter((tag) => tag.tag_name !== tagName);
    setTagsList(updatedTagsList);
  };

  return (
    <Modal
      show={showCourseEditionModal}
      onHide={closeEditModal}
      centered
      size="xl"
      fullscreen={false}
      className="courseEditionModalContainer"
      animation={false}
    >
      <Modal.Header
        closeButton
        onClick={closeEditModal}
        className="modalHeader"
      >
        <div className="cardTitle">
          <div className="iconContainer">
            <GiClassicalKnowledge />
          </div>

          <h4 className="titleText">Edición de curso</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBody">
          {/* Image Container */}

          <div className="imgContainer">
            {courseData && courseData.course_img && <img src={courseImg} alt="" />}
          </div>
          {/* Image Input Group */}
          <div className="inputFileContainer">
            <input
              name="file"
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
              autoComplete="false"
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
              type="number"
              placeholder="Precio"
              {...register("price", {
                required: "Valor erroneo",
                maxLength: { value: 8, message: "Maximo 99999'99 €" },
              })}
              id="price"
              className="input1"
              step="0.01"
              pattern="\d+(\.\d{1,2})?"
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
            <div className="tagListContainer d-flex flex-wrap ">
              <p>
                {tagsList?.map((tag, index) => {
                  return (
                    <span key={index} className="m-0 me-3 ">
                      <MdOutlineDeleteOutline
                        className="deleteIcon"
                        onClick={() =>
                          handleDeleteTag(tag.tag_id, tag.tag_name)
                        }
                      />
                      #{tag.tag_name}
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
              placeholder="Descripcíon"
              {...register("course_description")}
              id="course_description"
              className="input3"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className=" btnOutline1" onClick={closeEditModal}>
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

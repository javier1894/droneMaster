import React, { useState } from "react";
import FormularioCreacionTeacher from "../FormulariosCreacion/FormularioCreacionUser/FormularioCreacionTeacher";
import { CourseCreationModal } from "../../../../../Courses/components/CourseCreationModal/CourseCreationModal";
import { CategoryCreationModal } from "../FormulariosCreacion/CategoryCreationModal";

const AdminNewUserCard = ({
  resEffect,
  setResEffect,
  resetCategory,
  setResetCategory,
}) => {
  const [showModalForm, setShowModalForm] = useState(false);
  const [showCourseCreationModal, setShowCourseCreationModal] = useState(false);
  const [showCategoryCreationModal, setShowCategoryCreationModal] =
    useState(false);

  // Opens the modal form which adds a new user

  const openCreateForm = () => {
    setShowModalForm(true);
  };
  // Opens the modal form which adds a new course

  const openCreateCourse = () => {
    setShowCourseCreationModal(true);
  };
  // Opens the modal form which adds a new category
  const openCreateCategory = () => {
    setShowCategoryCreationModal(true);
  };

  return (
    <div className="creationButtonsCard">
      <button onClick={openCreateCourse} className="btnOutline1">
        Añadir Curso
      </button>
      <CourseCreationModal
      resetCategory={resetCategory}
        showCourseCreationModal={showCourseCreationModal}
        setShowCourseCreationModal={setShowCourseCreationModal}
        resEffect={resEffect}
        setResEffect={setResEffect}
      />
      <button onClick={openCreateForm} className="btnOutline1">
        Añadir Usuario
      </button>
      <FormularioCreacionTeacher
        showModalForm={showModalForm}
        setShowModalForm={setShowModalForm}
      />
      <button onClick={openCreateCategory} className="btnOutline1">
        Añadir Categoría
      </button>
      <CategoryCreationModal
        resetCategory={resetCategory}
        setResetCategory={setResetCategory}
        showCategoryCreationModal={showCategoryCreationModal}
        setShowCategoryCreationModal={setShowCategoryCreationModal}
      />
    </div>
  );
};

export default AdminNewUserCard;

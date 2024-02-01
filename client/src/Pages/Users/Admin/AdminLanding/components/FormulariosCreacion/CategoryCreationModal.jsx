import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { BiCategory } from "react-icons/bi";
import axios from "axios";
import "./categoryCreationModal.scss";

export const CategoryCreationModal = ({
  showCategoryCreationModal,
  setShowCategoryCreationModal,
  resetCategory,
  setResetCategory,
}) => {
  //Hook Form
  const { register, handleSubmit, reset } = useForm();

  //Closes the Category Creation Form Modal

  const handleClose = () => {
    reset();
    setShowCategoryCreationModal(false);
    
  };

  //Saves the information of the new category created

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/courses/createCategory", data)
      .then((res) => {
        reset();
        setShowCategoryCreationModal(false)
        setResetCategory(!resetCategory)
      })
      .catch((error) => {});
  };

  return (
    <Modal
      show={showCategoryCreationModal}
      onHide={handleClose}
      centered
      fullscreen="false"
      className="courseCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <BiCategory />
          </div>

          <h4 className="titleText">Nueva categoría</h4>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBodyCategory">
          {/* Update category Name */}
          <label htmlFor="category_name">Nombre de la categoría</label>
          <input
            {...register("category_name", {
              required: "Campo obligatorio",
              maxLength: 50,
            })}
            placeholder="Nombre de la categoría"
            type="text"
            autoComplete="off"
            className="input2"
          />
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <button className="btnOutline1" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btnNormal" type="submit">
            Crear
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

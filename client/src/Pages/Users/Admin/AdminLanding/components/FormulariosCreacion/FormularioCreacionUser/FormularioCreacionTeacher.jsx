import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import "./FormularionCreacionUser.scss";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";

const FormularioCreacionTeacher = ({ showModalForm, setShowModalForm }) => {
  //Hookform
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //Closes the modal form to create a new teacher

  const handleClose = () => {
    reset();
    setShowModalForm(false);
  };

  //Saves the information of the new teacher created
  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/admin/createUser", data)
      .then((res) => {
        reset();
        setShowModalForm(false);
      })
      .catch((error) => {});
  };

  return (
    <Modal
      show={showModalForm}
      onHide={handleClose}
      centered
      fullscreen="false"
      className="courseCreationModalContainer"
    >
      <Modal.Header closeButton className="modalHeader">
        <div className="cardTitle">
          <div className="iconContainer">
            <FaUserPlus />
          </div>

          <h4 className="titleText">Creacion de un nuevo Usuario</h4>
        </div>
      </Modal.Header>

      {/* Updates Name */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="modalBodyUser">
          <div className="inputName">
            <label htmlFor="user_name" className="ps-3">
              Nombre
            </label>
            <input
              {...register("user_name", {
                required: "Campo obligatorio",
                maxLength: 50,
              })}
              placeholder="Nombre"
              type="text"
              autoComplete="off"
              className="input2"
            />
            <p>{errors.firstName?.message}</p>
          </div>
          {/* Updates Lastname */}
          <div className="inputLastName">
            <label htmlFor="user_lastname" className="ps-3">
              Apellidos
            </label>
            <input
              {...register("user_lastname", {
                required: "Campo obligatorio",
                maxLength: 1000,
              })}
              placeholder="Apellidos"
              type="text"
              autoComplete="off"
              className="input2"
            />
            <p>{errors.lastName?.message}</p>
          </div>
          {/* Updates email */}
          <div className="inputEmail">
            <label htmlFor="email" className="ps-3">
              Email
            </label>
            <input
              {...register("email", {
                required: "Campo obligatorio",
                maxLength: 200,
              })}
              placeholder="Email"
              type="email"
              autoComplete="off"
              className="input2"
            />
            <p>{errors.email?.message}</p>
          </div>
          {/* Updates Password */}
          <div className="inputPassword">
            <label htmlFor="password" className="ps-3">
              Contraseña
            </label>
            <input
              {...register("password", {
                required: "Campo obligatorio",
                pattern: {
                  maxLength: 150,
                  message: "Must contain minus, MAYS,, number and Symbol",
                },
              })}
              placeholder="Contraseña"
              type="password"
              autoComplete="off"
              className="input2"
            />
            <p>{errors.password?.message}</p>
          </div>
          {/* Updates type of user */}
          <div className="inputType">
            <label htmlFor="type" className="ps-3">
              Tipo de Usuario
            </label>
            <select
              placeholder="Tipo de Usuario"
              {...register("type")}
              id="type"
              className="input2"
            >
              <option value={0}> Alumno </option>
              <option value={1}> Profesor </option>
              <option value={2}> Administrador </option>
            </select>
          </div>
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

export default FormularioCreacionTeacher;

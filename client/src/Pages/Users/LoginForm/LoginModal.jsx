import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveLocalStorageDroneMaster } from "../../../helper/localStorageDroneMaster";
import { DroneMasterContext } from "../../../context/DroneMasterProvider";
import Modal from "react-bootstrap/Modal";
import "../../../../public/styles/registerLoginFormStyle.scss";

const LoginModal = ({
  setShowLoginModal,
  showLoginModal,
  openRegisterModal,
}) => {
  const [errorMessage, setErrorMessage] = useState();
  const { setUser, setIsLogged } = useContext(DroneMasterContext);
  const navigate = useNavigate();
  // React hook form imports
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Close modal form and reset inputs values
  const closeLoginModal = () => {
    setErrorMessage()
    setShowLoginModal(false);
    reset();
  };

  //Send form data to the server route and navigate to the user landing
  const onSubmit2 = (data) => {
    axios
      .post("http://localhost:4000/login", data)
      .then((res) => {
        saveLocalStorageDroneMaster("token", res.data.token);
        setUser(res.data.user);
        setIsLogged(true);
        reset();
        setShowLoginModal(false);

        const type = res.data.user.type;
        if (type === 0) {
          navigate("/student");
        } else if (type === 1) {
          navigate("/teacher");
        } else if (type === 2) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) => setErrorMessage(error.response.data));
  };
  return (
    <Modal
      className="main"
      show={showLoginModal}
      onHide={closeLoginModal}
      animation={false}
      size="lg"
      centered
    >
      <Modal.Body className="bckModal">
        <div className="formContainer">
          <div className="form3">
            <form onSubmit={handleSubmit(onSubmit2)}>
              <div className="inputContainer">
                {/* Email input */}
                <input
                  {...register("email", {
                    required: "Campo obligatorio",
                    maxLength: 200,
                  })}
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  type="email"
                  className="forminput"
                />
                <label htmlFor="email" className="textError">
                  {errors.email?.message}
                </label>
              </div>
              {/* Password input */}
              <div className="inputContainer">
                <input
                  {...register("password", {
                    required: "Campo obligatorio",
                  })}
                  id="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  type="password"
                  className="forminput"
                />
                <label htmlFor="password" className="textError">
                  {errors.password?.message}
                </label>
                <p className="m-0 text-danger">{errorMessage}</p>
              </div>
              {/* Submit & cancel button */}
              <div className=" buttonsCont my-2">
                <button className="btnNormal "> Aceptar</button>
                <button
                  className="btnNormal"
                  onClick={() => {
                    closeLoginModal();
                  }}
                >
                  Cancelar
                </button>
              </div>
              <div className="text">
                <span>¿Aún no formas parte de nuestra comunidad? </span>
                <span
                  role="button"
                  className="span"
                  onClick={() => {
                    closeLoginModal();
                    openRegisterModal();
                  }}
                >
                  Registrate
                </span>
              </div>
            </form>
          </div>
          <div className="form4">
            <div className="text-group">
              <h1 className="welcome-title">¡Bienvenido de vuelta!</h1>
              <p className="text-paragraph">
                Estamos emocionados por tenerte aqui nuevamente
              </p>
              <p className="mb-0 text-center">
                Ingresa y disfruta de tu experiencia
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default LoginModal;

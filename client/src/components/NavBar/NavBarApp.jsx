import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, Offcanvas, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./NavBarApp.scss";
import logo_DroneMaster from "../../../public/dashboard_images/logo_DroneMaster.png";
import { FiSearch } from "react-icons/fi";
import { DroneMasterContext } from "../../context/DroneMasterProvider";
import { useForm } from "react-hook-form";
import LoginModal from "../../Pages/Users/LoginForm/LoginModal";
import RegisterModal from "../../Pages/Users/RegisterForm/RegisterModal";
import { delLocalStorage } from "../../helper/localStorageDroneMaster";

const NavBarApp = () => {
  const [listCourses, setListCourses] = useState();
  const navigate = useNavigate();
  const {
    setCourse,
    setToken,
    token,
    setUser,
    user,
    setIsLogged,
    setCourseMaterial,
  } = useContext(DroneMasterContext);
  const { register, handleSubmit, reset } = useForm();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Getting all courses
  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/allCourses")
      .then((res) => {
        setListCourses(res.data);
      })
      .catch((err) => { });
  }, []);

  // Function to find the name wrote into the input inside listCourses state
  const onSubmit = (data) => {
    let name = data.course_name;
    reset();

    let courseFound = listCourses?.filter((elem) =>
      elem.course_name.toLowerCase().includes(name.toLowerCase())
    );
    setCourse(courseFound);
    navigate("/allCourses");
  };


  // Function to open the login modal
  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  // Function to open the register modal
  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  // Function to logout 
  const logoutUser = () => {
    navigate("/");
    delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false);
    setCourseMaterial();
  };

  // Function to navigate inside the diferents route depends the users type
  const routeType = (user) => {
    let route = "";

    if (user?.type === 0) {
      route = "student";
    } else if (user?.type === 1) {
      route = "teacher";
    } else if (user?.type === 2) {
      route = "admin";
    }
    return route;
  };

  return (
    <Navbar
      key={"lg"}
      expand={"lg"}
      className="navBar d-flex justify-content-end"
    >
      <Container fluid className="navContainer">
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={logo_DroneMaster} alt="" />
        </Navbar.Brand>
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          openRegisterModal={openRegisterModal}
        />
        <RegisterModal
          showRegisterModal={showRegisterModal}
          setShowRegisterModal={setShowRegisterModal}
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          openLoginModal={openLoginModal}
        />
        <Navbar.Toggle
          className="toogle"
          aria-controls={`offcanvasNavbar-expand-${"lg"}`}
        />
        <Navbar.Offcanvas
          className="navOffCanvas"
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="text-warning"
              id={`offcanvasNavbarLabel-expand-${"lg"}`}
            >
              DroneMaster
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bodyOffCanvas offcanvas-body ps-4 gap-3 d-flex-column d-lg-flex justify-content-lg-between align-items-center">
            <div className="search d-flex align-items-center gap-1 px-2">
              <FiSearch />
              <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                <input
                  {...register("course_name", {
                    maxLength: 200,
                  })}
                  type="text"
                  className="border-bg-transparent border-0 bg-transparent text-light w-100"
                  placeholder="Buscar curso..."
                  autoComplete="off"
                />
              </form>
            </div>
            <div className="d-flex-column d-lg-flex gap-5">
              <Nav className="justify-content-end gap-lg-2">
                <Nav.Link
                  onClick={() => {
                    setCourse();
                  }}
                  className="text-light buttonHover"
                  as={Link}
                  to="/allCourses"
                >
                  Cursos
                </Nav.Link>
                <Nav.Link className="text-light" as={Link} to="/about">
                  About
                </Nav.Link>
              </Nav>
              {!token && (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    onClick={openLoginModal}
                    className="btnOutline2 border-light"
                  >
                    Iniciar sesión
                  </button>
                  <button onClick={openRegisterModal} className="btnOutline2">
                    Registrarse
                  </button>
                </div>
              )}
              {token && (
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <div
                    className="avatar"
                    onClick={() => {
                      navigate(`/${routeType(user)}`);
                    }}
                  >
                    {user?.user_img ? (
                      <>
                        <img
                          src={`http://localhost:4000/images/users/${user?.user_img}`}
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <p className="initalName">
                          {user?.user_name.at(0).toUpperCase()}
                        </p>
                      </>
                    )}
                  </div>
                  <button onClick={logoutUser} className="btnOutline2">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBarApp;

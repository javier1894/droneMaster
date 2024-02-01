import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";

//Shows the initial value of the counter when there is no info in the data base.

const initialUserCounter = {
  TotalAdmin: 0,
  TotalTeachers: 0,
  TotalStudents: 0,
  TotalCourse: 0,
};

const AdminContadorCard = () => {
  const [counter, setCounter] = useState(initialUserCounter);

  //Sets the counter information

  useEffect(() => {
    axios
      .get("http://localhost:4000/counter")
      .then((res) => {
        setCounter(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="counterCardContainer">
      {/* Admins Counter */}
      <div className="counterCard">
        <span className="iconContainer">
          <AiOutlineUser />
        </span>
       
        <div className="textContianer">
          <h6 className="title">Admin</h6>
          <p>{counter.TotalAdmin}</p>
        </div>
      </div>
      {/* Teachers Counter */}
      <div className="counterCard">
        <span className="iconContainer">
          <AiOutlineUser />
        </span>
        <div className="textContianer">
          <h6 className="title">Profesores</h6>
          <p>{counter.TotalTeachers}</p>
        </div>
      </div>
      {/* Students Counter */}
      <div className="counterCard">
        <span className="iconContainer">
          <AiOutlineUser />
        </span>
        <div className="textContianer">
          <h6 className="title">Alumnos</h6>
          <p>{counter.TotalStudents}</p>
        </div>
      </div>
      {/* Courses Counter */}
      <div className="counterCard">
        <span className="iconContainer">
          <BsBook />
        </span>
        <div className="textContianer">
          <h6 className="title">Cursos</h6>
          <p>{counter.TotalCourse}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminContadorCard;

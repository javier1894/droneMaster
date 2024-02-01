import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TeacherCard } from "./components/TeacherCard/TeacherCard";
import { CounterCard } from "./components/CounterCard/CounterCard";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { GiClassicalKnowledge } from "react-icons/gi";
import { TeacherCoursesTableCard } from "./components/TeacherCoursesTableCard/TeacherCoursesTableCard";
import { TeacherStudentsTableCard } from "./components/TeacherStudentsTableCard/TeacherStudentsTableCard";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import "./teacherLandingStyle.scss";
import { UserCardInfo } from "./components/UserCardInfo.jsx/UserCardInfo";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";

export const TeacherLanding = () => {
  const { user } = useContext(DroneMasterContext);
  const [myCoursesData, setMyCoursesData] = useState();
  const [myStudentsData, setMyStudentsData] = useState();
  const [averageRating, setAverageRating] = useState();
  const [showEditionModal, setShowEditionModal] = useState(false);

  //Get all courses of the user
  useEffect(() => {
    axios
      .get(`http://localhost:4000/showMyCourses/${user?.user_id}`)
      .then((res) => {
        setMyCoursesData(res.data);
      })
      .catch((error) => {});
  }, [user]);

  //Get all students of the user (teacher)
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4000/teachers/myStudents/${user?.user_id}`)
        .then((res) => {
          setMyStudentsData(res.data);
        })
        .catch((error) => {});
    }
  }, [user]);

  //Calculate average rating of every course from a teacher
  useEffect(() => {
    let sum = 0;
    let counter = 0;
    myCoursesData?.forEach((element) => {
      if (element.score > 0) {
        sum += element.score;
        counter += 1;
      }
    });
    if (sum != 0 && counter != 0 && counter !== undefined) {
      setAverageRating(sum / counter);
    } else {
      setAverageRating(0);
    }
  }, [myCoursesData]);

  return (
    <section className="mainSection">
      <aside className="sideContent">
        <TeacherCard user={user} setShowEditionModal={setShowEditionModal} />

        {/* Counters (courses, students, rating) */}
        <div className="counterContainer">
          {/* Rating counter */}
          <CounterCard
            title={"Puntación media"}
            counter={`${averageRating?.toFixed(1)}/5`}
          >
            <AiFillStar />
          </CounterCard>

          {/* Students counter */}
          <CounterCard
            title={"Alumnos totales"}
            counter={myStudentsData?.length}
          >
            <AiOutlineUser />
          </CounterCard>
          {/* Courses counter */}
          <CounterCard title={"Cursos totales"} counter={myCoursesData?.length}>
            <GiClassicalKnowledge />
          </CounterCard>
        </div>
        {/* User information card */}
        <UserCardInfo user={user} />
      </aside>
      <div className="mainContainer">

        {/* All courses of a teacher */}
        <TeacherCoursesTableCard
          myCoursesData={myCoursesData}
          myStudentsData={myStudentsData}
          user_id={user?.user_id}
        />
        {/* All students of a teacher */}
        <TeacherStudentsTableCard myStudentsData={myStudentsData} />
      </div>

      {/* User edition Form */}
      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
      />
    </section>
  );
};

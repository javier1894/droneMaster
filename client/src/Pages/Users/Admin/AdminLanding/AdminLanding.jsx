import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DroneMasterContext } from "../../../../context/DroneMasterProvider";
import AdminCard from "./components/AdminCard/AdminCard";
import AdminInfoCard from "./components/AdminInfoCard/AdminInfoCard";
import AdminContadorCard from "./components/AdminContador/AdminContadorCard";
import AdminAllCoursesCard from "./components/AdminAllCourses/AdminAllCoursesCard";
import AdminAllTeachersCard from "./components/AdminAllTeachers/AdminAllTeachersCard";
import AdminAllStudentsCard from "./components/AdminAllStudents/AdminAllStudentsCard";
import AdminChartCard from "./components/AdminChart/AdminChartCard";
import AdminNewUserCard from "./components/AdminNewUser/AdminNewUserCard";
import { EditMyProfileModal } from "../../../../components/EditMyProfileModal/EditMyProfileModal";
import "./AdminLanding.scss";

const AdminLanding = () => {
  const [inscriptionDates, setInscriptionDates] = useState();
  const [moreInformationStudentModal, setMoreInformationStudentModal] = useState(false);
  const [moreInformationTeacherModal, setMoreInformationTeacherModal] = useState(false);
  const [showEditionModal, setShowEditionModal] = useState(false);
  const [moreInformationCourses, setMoreInformationCourses] = useState(false);
  const [resEffect, setResEffect] = useState(false);
  const [resetCategory, setResetCategory] = useState(false)

  const { user } = useContext(DroneMasterContext);

  //Brings the information of the courses´start date

  useEffect(
    (data) => {
      axios
        .get("http://localhost:4000/admin/inscriptionDates", data)
        .then((res) => {
          setInscriptionDates(res.data);
        })
        .catch((error) => {});
    },
    [resEffect]
  );

  return (
    <section className="mainSectionAdmin">
      {/*  Side part of the landing */}
      <aside className="sideContent">
        <AdminCard setShowEditionModal={setShowEditionModal} />
        {/* Shows the counters */}
        <AdminContadorCard />
        {/* Shows the information of the admin */}
        <AdminInfoCard />
        {/* Shows the chart with the inscriptions */}
        <AdminChartCard
          inscriptionDates={inscriptionDates}
          setInscriptionDates={setInscriptionDates}
        />
        {/* Shows the buttons */}
        <AdminNewUserCard resEffect={resEffect} setResEffect={setResEffect}
        resetCategory={resetCategory} setResetCategory={setResetCategory} />
      </aside>
      {/*  Body part of the landing */}
      <div className="mainContainer">
        {/* Shows the list of all courses */}
        <AdminAllCoursesCard
        resetCategory={resetCategory}
          moreInformationCourses={moreInformationCourses}
          setMoreInformationCourses={setMoreInformationCourses}
          resEffect={resEffect}
          setResEffect={setResEffect}
        />
        {/* Shows the list of all teacher */}
        <AdminAllTeachersCard
          moreInformationTeacherModal={moreInformationTeacherModal}
          setMoreInformationTeacherModal={setMoreInformationTeacherModal}
        />
        {/* Shows the list of all students */}
        <AdminAllStudentsCard
          moreInformationStudentModal={moreInformationStudentModal}
          setMoreInformationStudentModal={setMoreInformationStudentModal}
        />
      </div>

      {/* Shows the form to edit the personal information*/}
      <EditMyProfileModal
        showEditionModal={showEditionModal}
        setShowEditionModal={setShowEditionModal}
        user={user}
        
      />
    </section>
  );
};

export default AdminLanding;

import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { BiSolidDoughnutChart } from "react-icons/bi";
import "./circularBarProgress.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CircularBarProgress = ({
  lessonsOneCourse,
  lessonsViewedByStudent,
  courseId,
  myCoursesData,
}) => {
  const [progreso, setProgreso] = useState(
    (lessonsViewedByStudent / lessonsOneCourse) * 100
  );

  const course_name = myCoursesData.find(
    (elem) => elem.course_id === courseId
  ).course_name;

  useEffect(() => {
    const newProgreso = (lessonsViewedByStudent / lessonsOneCourse) * 100;
    setProgreso(newProgreso);
  }, [lessonsOneCourse, lessonsViewedByStudent, <Doughnut />]);

  const data = {
    datasets: [
      {
        data: [progreso, 100 - progreso],
        backgroundColor: ["#f7ab16", "#9d9d9d"],
        borderWidth: 0,
      },
      {
        data: [0.001, 100 - 0.001],
        backgroundColor: ["transparent", "transparent"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    legend: {
      display: false,
    },
    animation: {
      animateRotate: true,
    },
  };

  const percentage = data.datasets[0].data[0].toFixed(0);

  return (
    <>
      {percentage !== "NaN" && (
        <div className="userInfoCard">
          <div className="cardTitle">
            <div className="iconContainer">
              <BiSolidDoughnutChart />
            </div>
            <div className="title">
              <h6 className="titleText text-center m-0">{course_name}</h6>
            </div>
          </div>
          <div className="d-flex justify-content-center p-3 position-relative">
            <Doughnut
              className="progressDoughnut position-relative"
              data={data}
              options={options}
            ></Doughnut>
            <div className="percentageText d-flex justify-content-center pb-2">
              <h4>
                {percentage}
                <span style={{ color: "#f7ab16" }}>%</span>
              </h4>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

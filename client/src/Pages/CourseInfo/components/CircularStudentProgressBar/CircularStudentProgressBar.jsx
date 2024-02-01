import React, { useState, useEffect, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CircularStudentProgressBar = ({
  lessonsOneCourse,
  lessonsViewedByStudent,
  course_name,
}) => {
  const [progreso, setProgreso] = useState(
    (lessonsViewedByStudent / lessonsOneCourse) * 100
  );

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
        <div className="circularProgressBar">
          <div className="cardTitle">
            <div className="iconContainer">
              <BiSolidDoughnutChart />
            </div>
            <div className="title">
              <h6 className="titleText text-center m-0">{course_name}</h6>
            </div>
          </div>
          <div className="d-flex justify-content-center p-3 position-relative ">
            <Doughnut
              className="progressDoughnut position-relative"
              data={data}
              options={options}
            ></Doughnut>
            <div className="percentageText d-flex justify-content-center pb-2">
              <h4>
                {percentage}
                <span >%</span>
              </h4>
            </div>
          </div>
          <div className="legendContainer text-center pb-3">
            <div className="legendItem">
              <div
                className="legendColor"
                style={{ backgroundColor: "#f7ab16" }}
              ></div>
              <div className="legendLabel">Lecciones completadas</div>
            </div>
            <div className="legendItem">
              <div
                className="legendColor"
                style={{ backgroundColor: "#9d9d9d" }}
              ></div>
              <div className="legendLabel"> Restantes</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

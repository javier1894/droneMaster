import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AiOutlineLineChart } from "react-icons/ai";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

export const CourseStatsChart = ({ inscriptionDates }) => {
  const [chartData, setChartData] = useState(null);

  const countDatesPerMonth = (dateArray) => {
    const counts = Array(12).fill(0);

    dateArray.forEach((dateObj) => {
      const dateStr = dateObj.start_date;
      const dateObjParsed = new Date(dateStr);
      const month = dateObjParsed.getMonth();

      counts[month]++;
    });

    return counts;
  };

  useEffect(() => {
    if (inscriptionDates && inscriptionDates.length > 0) {
      const dateCounts = countDatesPerMonth(inscriptionDates);

      const data = {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Inscripcciones en el mes",
            data: dateCounts,
            backgroundColor: "#f7ac1652",
            borderColor: "#f7ab16",
            tension: 0.4,
            fill: true,
          },
        ],
      };

      setChartData(data);
    }
  }, [inscriptionDates]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, 
        },
      },
    },
    
    maintainAspectRatio: false
  };

  return (
    <div className="chartCard">
      <div className="cardTitle">
        <div className="title">
          <div className="iconContainer">
            <AiOutlineLineChart />
          </div>
          <h6 className="titleText">Inscripciones</h6>
        </div>
      </div>

      <div className="chartContainer">
        {chartData ? (
          <Line data={chartData} options={options} className="grafica"/>
        ) : (
          <h5 className="text-center">Sin resultados</h5>
        )}
      </div>
    </div>
  );
};

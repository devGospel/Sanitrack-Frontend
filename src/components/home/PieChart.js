"use client";
// PieChart3D.js

import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import useStats from "@/hooks/useStats";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

const vlas = ["Cleasned", "Not Cleaned"];
const vals = [98, 2];

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  if (red === 255 && green === 255 && blue === 255) {
    return getRandomColor(); // Retry if the color is white
  }

  return `rgb(${red},${green},${blue})`;
}

const randomColors = vlas.map(() => getRandomColor());
const PieChart3D = () => {
  const { getDailyComp, dailyComp, loading } = useStats();
  useEffect(() => {
    getDailyComp();
  }, []);
  console.log("days",dailyComp);
  const data = {
    labels: dailyComp?.map((item) =>
      item?.workOrderDetails?.isDone ? "Cleaned" : "Not Cleaned"
    ),
    datasets: [
      {
        label: "cleaning rate",
        data: dailyComp?.map((item) => item?.count),
        backgroundColor: vlas.map((item, index) => randomColors[index]),
        borderColor: "white",
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',

        // ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      //   labels: {
      //     render: 'percentage',
      //     fontColor: '#fff',
      //     precision: 2,
      //     fontSize: 16,
      //     fontFamily: 'Arial',
      //     fontStyle: 'bold',
      //   },
    },
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    responsive: true,
    // plugins: {
    //   tooltip: {
    //     callbacks: {
    //       label: function(context) {
    //         return context.label + ": " + context.parsed + " %";
    //       }
    //     }
    //   }
    // }
  };

  return (
    <div className="h-[300px] mx-auto flex flex-col justify-center items-center w-full bg-white dark:bg-black shadow-lg p-4">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart3D;

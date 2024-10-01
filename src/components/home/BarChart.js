"use client";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

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
  BarElement,
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
  BarElement
);
const BarChart = ({ missed }) => {
  // Sample data (replace with your actual data)
  const { missedCleaning, getMissedCleaning, loading } = useStats();
  useEffect(() => {
    getMissedCleaning();
  }, []);

  const monthlyMissedCleanings = [5, 3, 7, 2, 4, 6, 8, 3, 2, 5, 4, 6]; // Example data for 12 months

  // Labels for the months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    if (red === 255 && green === 255 && blue === 255) {
      return getRandomColor(); // Retry if the color is white
    }

    return `rgb(${red},${green},${blue})`;
  }

  const randomColors = months.map(() => getRandomColor());
  // const options = {

  //   plugins: {
  //     legend: {
  //       position: "top",
  //       labels: {
  //         usePointStyle: true,
  //         pointStyle: "circle",
  //         padding: 20,
  //       },
  //     },
  //     title: {
  //       display: true,
  //       text: "Transaction Summary",
  //       position: "left",
  //     },
  //   },
  // };
  // Chart data
  console.log(missedCleaning);
  console.log(
    "yay",
    missedCleaning?.map((item) => months[parseInt(item?._id?.month) - 1])
  );
  const data = {
    labels: missedCleaning?.map(
      (item) => months[parseInt(item?._id?.month) - 1]
    ),

    datasets: [
      {
        label: "Monthly Missed Cleanings",
        backgroundColor: months.map((item, index) => randomColors[index]),
        borderColor: "white",
        borderWidth: 1,
        // width:19,
        hoverBackgroundColor: "#3366ff",
        hoverBorderColor: "#3366ff",
        data: missedCleaning?.map((item) => item?.count),
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    barPercentage: 0.1,
    scales: {
      x: {
        grid: {
          display: false, // Hide the vertical gridlines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Hide the horizontal gridlines on the y-axis
        },
      },
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div className="h-[300px] mx-auto flex flex-col justify-center items-center w-full p-4 dark:bg-black bg-white shadow-lg">
      {/* <span className="p-2 border border-black  bg-gray-200 mb-5">
        <h2>Number of Monthly Missed Cleanings</h2>
      </span> */}

      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

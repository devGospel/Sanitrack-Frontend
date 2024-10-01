"use client";
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";

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
const OverviewFacCharts = ({ cleaningData }) => {
  const [selectedChart, setSelectedChart] = useState("bar");

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    if (red === 255 && green === 255 && blue === 255) {
      return getRandomColor(); // Retry if the color is white
    }

    return `rgb(${red},${green},${blue})`;
  }

  const randomColors = cleaningData.map(() => getRandomColor());
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

  // console.log("yay", cleaningData?.map((item) => months[parseInt(item?._id) -1 ]))
  const data = {
    labels: cleaningData?.map((item) => item?.cleanerUsername),

    datasets: [
      {
        label: "Monthly Missed Cleanings",
        backgroundColor: cleaningData.map((item, index) => randomColors[index]),
        borderColor: "white",
        borderWidth: 1,
        // width:19,
        hoverBackgroundColor: "#3366ff",
        hoverBorderColor: "#3366ff",
        data: cleaningData?.map((item) => item?.totalRoomsCleaned),
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
    // barPercentage: 0.9,
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
  const pieOptions = {
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
    <>
      <span className="p-2 text-black text-xl  mb-5">
        <h2 className="text-center font-bold">Cleaning Data Overviews</h2>
      </span>
      <span className="flex justify-start">
        <select
          id="currency"
          name={"Currency"}
          defaultValue="bar"
          onChange={handleChartChange}
          className="w-auto py-1 sm:px-3 font-bold bg-white rounded-lg  text-xs md:text-base text-black border-blue-300 cursor-pointer"
        >
          <option disabled> Chart Type</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
         
        </select>
      </span>
      {selectedChart === "bar" ? (
        <div className="h-72 lg:h-[500px] mx-auto flex flex-col  w-full p-4 bg-white shadow-lg ">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <div className="flex justify-between items-center h-[350px] ">
          <Pie data={data} options={pieOptions} />
        </div>
      )}
    </>
  );
};

export default OverviewFacCharts;

"use client";
import React, { useEffect, useState } from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FaDownload, FaShareAlt } from "react-icons/fa";
import useStats from "@/hooks/useStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Chart() {

  const { missedCleaning, getMissedCleaning, loading } = useStats();
  useEffect(() => {
    getMissedCleaning();
  }, []);
  const presentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(presentYear);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // const selectedYearData = stats ? stats[selectedYear] : {};
  const monthlyMissedCleanings = [
    50, 13, 7, 12, 34, 56, 18, 13, 32, 25, 14, 16,
  ]; // Example data for 12 months

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
  const options = {
    responsive: true,
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
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Transaction Summary",
        position: "left",
      },
    },
  };

  
  // const months = Object.keys(selectedYearData ?? {});
  // const value = Object.values(selectedYearData ?? {});

  const labels = missedCleaning?.map((item) => months[Number(item?._id)-1 ])

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Monthy Missed Cleaning Graph",
        data:  missedCleaning?.map((item) => item?.count),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: " rgb(227,235,255) ",
        lineTension: 0.2,
      },
    ],
  };
  return (
    <>
      <div className=" h-[290px] mx-auto flex flex-col justify-center items-center w-full bg-white shadow-lg p-4 ">
        <div className="flex justify-between items-center w-full p-4 "></div>
        <Line options={options} data={data} height={100} />
      </div>
    </>
  );
}

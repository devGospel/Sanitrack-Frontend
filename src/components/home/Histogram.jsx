"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { Bar } from "react-chartjs-2";
import { FaDownload, FaShareAlt } from "react-icons/fa";
import useStats from "@/hooks/useStats";
import { ItemsContext } from "../context/items.context";

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

export default function Histogram() {
    const { setYear,year } = useContext(ItemsContext);
  const { tally, getTally, loading } = useStats();
  useEffect(() => {
    getTally(year);
  }, [year]);
  console.log("tall", tally);
  const presentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(presentYear);

  const handleYearChange = (event) => {
   setYear(event.target.value);
  };

  // const selectedYearData = stats ? stats[selectedYear] : {};
  const monthlytallys = [50, 13, 7, 12, 34, 56, 18, 13, 32, 25, 14, 16]; // Example data for 12 months

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
        text: "Monhtly Pass/Fail Percentage",
        position: "left",
      },
    },
  };

  // const months = Object.keys(selectedYearData ?? {});
  // const value = Object.values(selectedYearData ?? {});

  const labels = tally?.map((item) => months[Number(item?.month) - 1]);

  const data = {
    labels,
    // datasets: [
    //   {
    //     fill: true,
    //     label: "Monthy Missed Cleaning Graph",
    //     data:  tally?.map((item) => item?.count),
    //     borderColor: "rgb(53, 162, 235)",
    //     backgroundColor: " rgb(227,235,255) ",
    //     lineTension: 0.2,
    //   },

    // ],
    datasets: [
      {
        label: "Pass Percentage",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.7)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: tally?.map((item) => item?.passPercentage),
      },
      {
        label: "Fail Percentage",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: tally?.map((item) => item?.failPercentage),
      },
      {
        label: "Null Percentage",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: tally?.map((item) => item?.nullPercentage),
      },
    ],
  };
  return (
    <>
      <div className=" h-[350px] mx-auto flex flex-col justify-center items-center w-full bg-white dark:bg-black shadow-lg p-4 ">
        <span className="flex justify-end">
          <select
            id="currency"
            name={"Currency"}
            defaultValue={year}
            onChange={handleYearChange}
            className="w-full py-1 sm:px-3 font-bold bg-sanBlue rounded-lg  text-xs md:text-base text-white border-blue-300 cursor-pointer"
          >
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </span>
        <div className="flex justify-between items-center w-full p-4 "></div>
        <Bar options={options} data={data} height={100} />
      </div>
    </>
  );
}

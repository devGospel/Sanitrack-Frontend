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

const RoundedBarsPlugin = {
  id: "roundedBars",

  // This method is called when the chart is initialized
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const bars = chart.getDatasetMeta(0).data;

    bars.forEach((bar) => {
      const { x, y, width, height } = bar._model;

      // Calculate border radius
      const borderRadius = height * 0.1;

      // Draw the rounded rectangle
      ctx.beginPath();
      ctx.moveTo(x, y + borderRadius);
      ctx.lineTo(x, y + height - borderRadius);
      ctx.quadraticCurveTo(x, y + height, x + borderRadius, y + height);
      ctx.lineTo(x + width - borderRadius, y + height);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - borderRadius
      );
      ctx.lineTo(x + width, y + borderRadius);
      ctx.quadraticCurveTo(x + width, y, x + width - borderRadius, y);
      ctx.lineTo(x + borderRadius, y);
      ctx.quadraticCurveTo(x, y, x, y + borderRadius);
      ctx.closePath();

      // Set the fill color to the same as the bar
      ctx.fillStyle = bar._model.backgroundColor;

      // Fill the bar
      ctx.fill();
    });
  },
};
const HorizonChart = () => {
  // Sample data (replace with your actual data)
  const { topMissed, getTopMissed, loading } = useStats();
  useEffect(() => {
    getTopMissed();
  }, []);
console.log("five",topMissed)
  const monthlyMissedCleanings = [5, 3, 7, 2, 4]; // Example data for 12 months

  // Labels for the months
  const months = [
    "Belt",
    "Refridgerator",
    "Air Conditioner",
    "Tbales",
    "Tiles",
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
  const data = {
    labels:  topMissed?.map((item) => item?.assetName),

    datasets: [
      {
        fill: true,
        label: "Monthly Most Frequent Missed",
        backgroundColor: months.map((item, index) => randomColors[index]),
        borderColor: months.map((item, index) => randomColors[index]),
        borderWidth: 1,
        borderRadius: 30,
        hoverBackgroundColor: "#3366ff",
        hoverBorderColor: "#3366ff",
        data:  topMissed?.map((item) => item?.count),
      },
    ],
  };

  // Chart options
  const options = {
    indexAxis: "y",
    responsive: true,
    
    scales: {
      // xAxes: {
      //   display: 'hidden'
      // },

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
          pointStyle: "circle",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Transaction Summary",
        position: "left",
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
    <div className="h-[360px] mx-auto flex flex-col justify-center items-center w-full bg-white dark:bg-black shadow-lg p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizonChart;

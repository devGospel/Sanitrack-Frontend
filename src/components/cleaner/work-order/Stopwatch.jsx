"use client";

import { Orbitron } from "next/font/google";
import React, { useState, useEffect } from "react";
const orb = Orbitron({ weight: "400", subsets: ["latin"] });
const Stopwatch = () => {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const milliseconds = time % 100;

  const handleStart = () => {
    setIsRunning(true);
  };

  const reset = () => {
    setTime(0);
  };
  return (
    <div className=" flex items-center flex-col lg:gap-y-3 justify-center">
      <span className="dark:text-white text-black text-xl font-bold">
        <p className={orb.className}>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        {/* {milliseconds.toString().padStart(2, "0")} */}
      </p>
      </span>
      
      {!isRunning && (
        <button className="btn btn-sm bg-green-500 text-white" onClick={handleStart}>
          Start Timer
        </button>
      )}

      {/* <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={reset}>
          Reset
        </button>
      </div> */}
    </div>
  );
};

export default Stopwatch;
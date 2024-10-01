"use client";

import Link from "next/link";

import React, { Suspense } from "react";

const MssHeader = ({manageMssScreen, viewMssScreen}) => {
  return (
    <div className=" flex justify-between items-center flex-col lg:flex-row lg:p-10 p-5">
       {manageMssScreen ? (
        <div className=" flex flex-col gap-2">
            <h1 className=" text-black dark:text-white lg:text-2xl font-semibold">
              Manage  Master Sanitation Schedule
            </h1>
            <span className=" text-dashText dark:text-white text-sm">
              Manage all MSS in this management list
            </span>
        </div>
      ): (
        <div className=" flex flex-col gap-2">      
            <h1 className=" text-black dark:text-white lg:text-2xl font-semibold">
              View Master Sanitation Schedule
            </h1>
            <span className=" text-dashText dark:text-white text-sm">
              View all MSS in this management list
            </span>
          </div>
      )}
      

      <Link
        href={"/dashboard/mss/set-order"}
        className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >
        Set Custom Work Order
      </Link>
    </div>
  );
};

export default MssHeader;

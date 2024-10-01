"use client";

import Link from "next/link";

import React, { Suspense } from "react";

const SetOrderHeader = () => {
 

  return (
    <div className=" flex justify-between items-center flex-col lg:flex-row lg:p-10 p-5">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-black  dark:text-white lg:text-2xl font-semibold">
        Customise your work order
        </h1>
        <span className=" text-dashText dark:text-white text-sm">
         Create your work orders in this management list
        </span>
      </div>

      {/* <Suspense fallback={"Loading"}>
        <Link
          href={"/dashboard/work-order/set-order"}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Set Work Order
        </Link>
      </Suspense> */}
    </div>
  );
};

export default SetOrderHeader;

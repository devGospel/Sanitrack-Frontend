"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const LmsHeader = () => {
  const params = useSearchParams();

  const tab = params.get("tab");

  return (
    <div className=" flex justify-between items-center flex-col lg:flex-row bg-white lg:p-10 p-5">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-black lg:text-2xl font-semibold">
          Learning Management System
        </h1>
        <span className=" text-dashText text-sm">
          Administer and oversee trainings and courses within the platform.
        </span>
      </div>

      {tab === "training" ? (
        <Link
          href={"/dashboard/lms/create-training"}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add New Trainings
        </Link>
      ) : (
        <Link
          href={"/dashboard/lms/create-library-resource"}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add New Resource
        </Link>
      )}
    </div>
  );
};

export default LmsHeader;

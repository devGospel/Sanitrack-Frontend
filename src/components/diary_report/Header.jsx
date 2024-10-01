"use client";

import Link from "next/link";

import React, { Suspense, useState } from "react";

import ModalComponent from "../modals/Modal";
import AddReportModal from "./modal/AddReportModal";

const Header = () => {
 
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };
  return (
    <div className=" flex justify-between items-center flex-col lg:flex-row  lg:p-10 p-5 ">
      <div className=" flex flex-col gap-2">
        <h1 className=" text-black dark:text-white lg:text-2xl font-semibold">Diary Report</h1>
        <span className=" text-dashText dark:text-white text-sm">
          Manage, create and oversee reports within the system.
        </span>
      </div>

      <button
        onClick={(e) => {
          openModalAdd(e);
        }}
        className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >
        Create Report
      </button>

      <ModalComponent
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        setIsModalOpen={setIsModalOpenAdd}
      >
        <AddReportModal closeModal={closeModalAdd} />
      </ModalComponent>
    </div>
  );
};

export default Header;

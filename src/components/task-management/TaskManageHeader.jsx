"use client";

import Link from "next/link";
import React, { useState } from "react";
import ModalComponent from "../modals/Modal";
import AddTask from "./modals/AddTask";

export default function TaskManagementHeader({
  path,
  hideBtn,
  heading,
  paragraph,
  title,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 w-full px-4">
      <div className="flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center">
        <div>
          <h1 className="text-black dark:text-white lg:text-2xl font-semibold">
            {heading}
          </h1>
          <p className="text-dashText dark:text-white text-sm">{paragraph}</p>
        </div>
        <div>
          <button
            onClick={openModal}
            className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
          >
            {title}
          </button>
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <AddTask />
      </ModalComponent>
    </div>
  );
}

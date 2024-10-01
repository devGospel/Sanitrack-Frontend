"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import ModalComponent from "../modals/Modal";
import AddInventoryModal from "./modals/AddInventoryModal";
import AddProtectiveModal from "./modals/AddProtectiveElelements";

const InventoryHeader = () => {
  const params = useSearchParams();

  const tab = params.get("tab");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenProtect, setIsModalOpenProtect] = useState(false);
  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };
  const openModalProtect = (e) => {
    e.preventDefault();

    setIsModalOpenProtect(true);
  };

  const closeModalProtect = () => {
    setIsModalOpenProtect(false);
  };
  console.log(tab);
  return (
    <div className=" flex justify-between items-center flex-col lg:flex-row bg-white lg:p-10 p-5">
      <div className=" flex flex-col gap-2 lg:mb-0 mb-4">
        <h1 className=" text-black lg:text-2xl font-semibold">Inventory</h1>
        <span className=" text-dashText text-sm">
          Manage, create and oversee inventory within the system.
        </span>
      </div>
      {(tab === "cleaning" || tab === null) && (
        <button
          onClick={(e) => {
            openModalAdd(e);
          }}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >
          Add Cleaning Inventory
        </button>
      )}
      {tab === "protective" && (
        <button
          onClick={(e) => {
            openModalProtect(e);
          }}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >
          Add Protective Elements
        </button>
      )}
      {tab === "chemical" && (
        <Link
          href="/dashboard/inventory/add-chemicals"
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >
          Add Chemical Inventory
        </Link>
      )}
      <ModalComponent
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        setIsModalOpen={setIsModalOpenAdd}
      >
        <AddInventoryModal closeModal={closeModalAdd} />
      </ModalComponent>
      <ModalComponent
        isOpen={isModalOpenProtect}
        onClose={closeModalProtect}
        setIsModalOpen={setIsModalOpenProtect}
      >
        <AddProtectiveModal closeModal={closeModalProtect} />
      </ModalComponent>
    </div>
  );
};

export default InventoryHeader;

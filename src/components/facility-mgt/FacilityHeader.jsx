"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import AddFacilityModal from "./modals/AddFacilityModal";
import ModalComponent from "../modals/Modal";

const FacilityHeader = () => {
  const params = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  });
 
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? null;
    const newRole = isClient ? role : "";
  const tab = params.get("tab");
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
        <h1 className=" text-black dark:text-white lg:text-2xl font-semibold">
          Facilities
        </h1>
        <span className=" text-dashText dark:text-white text-sm">
          Manage, create and oversee facility management within the system.
        </span>
      </div>

      {newRole?.toLowerCase() === "admin" && (
        <button
          onClick={(e) => {
            openModalAdd(e);
          }}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add Facility
        </button>
      )}

      <ModalComponent
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        setIsModalOpen={setIsModalOpenAdd}
      >
        <AddFacilityModal closeModal={closeModalAdd} />
      </ModalComponent>
    </div>
  );
};

export default FacilityHeader;

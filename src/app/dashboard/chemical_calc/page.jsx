"use client";

import AddChemicalModal from "@/components/chemical_calc/Modals/AddChemicalModal";
import ChemicalTable from "@/components/chemical_calc/Table";
import ModalComponent from "@/components/modals/Modal";
import useChemicalTracker from "@/hooks/useChemicalTracker";
import React, { useEffect, useState } from "react";

const ChemicalCalculator = () => {
  const {getAllChemicalMix,allChemicalMix ,loading}= useChemicalTracker()
  useEffect(()=>{
getAllChemicalMix()
  },[])

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  


  return (
    <div className="text-black  bg-white  h-screen lg:p-10 p-5 w-full">
      <div className="flex-col-reverse lg:flex lg:flex-row justify-between items-start mb-5 lg:mb-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-black lg:text-2xl font-semibold">Chemical Calculator</h1>
          <p className="text-dashText text-sm">
            Set and calculate chemical mix within the platform.
          </p>
        </div>
        <button
          onClick={(e) => {
            openModalAdd(e);
          }}
          className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
          >
          Set Chemical Mix
        </button>
      </div>
      <ChemicalTable data={allChemicalMix} loading={loading} />
      <ModalComponent
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        setIsModalOpen={setIsModalOpenAdd}
      >
        <AddChemicalModal closeModal={closeModalAdd} />
      </ModalComponent>
    </div>
  );
};

export default ChemicalCalculator;

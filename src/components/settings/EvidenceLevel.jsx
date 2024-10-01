import React, { useEffect, useState } from "react";
import AddAssetTaskModal from "./modals/AddAssetTask";
import ModalComponent from "../modals/Modal";
import useSettings from "@/hooks/useSettings";
import AddEvidenceLevel from "./modals/AddEvidenceLevel";

const EvidenceLevel = () => {
  const { getAllEvidenceLevel, allEvidenceLevel,loading } = useSettings();

  useEffect(() => {
    getAllEvidenceLevel();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    e.preventDefault();

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = [
    {
      name: "Default Cleaning",
      description: "Just your regular default cleaning",
    },
  ];
  return (
    <div className="w-full bg-white dark:bg-black rounded-lg mx-auto mt-8  flex flex-col overflow-hidden rounded-[10px] shadow-xl p-5">
      <header className=" pb-3 flex lg:flex-row flex-col justify-between lg:items-center items-start">
        <p className="text-xl font-bold text-center pb-2 lg:pb-0">Evidence Level</p>{" "}
        <button
          onClick={(e) => {
            openModal(e);
          }}
          className=" p-2 bg-[#fff] underline text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add Evidence Level
        </button>
      </header>
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse w-full mt-10">
          <div className="rounded-sm bg-slate-300 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-700 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-500 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-300 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-700 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-500 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-700 h-20 w-auto rounded-[10px]"></div>
          <div className="rounded-sm bg-slate-500 h-20 w-auto rounded-[10px]"></div>
        </div>
      ) : (
        <main className="lg:grid-cols-2 grid grid-cols-1 gap-6">
          {allEvidenceLevel?.map((item) => (
            <div className="w-full rounded-[10px] shadow-xl border-2 border-gray-200 p-3 lg:p-5">
              <div className="flex lg:flex-row flex-col  justify-between items-center pb-2 ">
                <div className="flex gap-2 lg:gap-4 sm:justify-between lg:items-center mb-2 lg:mb-0">
                  <h2 className="text-sm lg:text-base font-semibold ">
                    {item?.name}
                  </h2>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col  justify-between items-center gap-3 ">
                <p className="text-sm text-dashText dark:text-white">{`Min Value: ${item?.minValue}`}</p>
                <p className="text-sm text-dashText dark:text-white">{`Max Value: ${item?.maxValue}`}</p>
              </div>
            </div>
          ))}
        </main>
      )}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <AddEvidenceLevel closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default EvidenceLevel;

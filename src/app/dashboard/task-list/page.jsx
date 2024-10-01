"use client";
import React, { useEffect, useState } from "react";
import AddAssetTaskModal from "@/components/settings/modals/AddAssetTask";
import ModalComponent from "@/components/modals/Modal";
import useSettings from "@/hooks/useSettings";

const AssetTasks = () => {
  const { getAllAssetTask, loading, allAssetTask } = useSettings();

  useEffect(() => {
    getAllAssetTask();
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
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg mx-auto   flex flex-col overflow-hidden rounded-[10px] shadow-xl lg:p-10 p-5 min-h-screen">
      <header className=" pb-3 flex lg:flex-row flex-col justify-between lg:items-center items-start">
        <p className="text-xl font-bold text-center pb-2 lg:pb-0 text-black dark:text-white"> Task </p>{" "}
        <button
          onClick={(e) => {
            openModal(e);
          }}
          className=" p-2 bg-[#fff] underline text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add Task
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
          {allAssetTask?.map((item) => (
            <div className="w-full rounded-[10px] shadow-xl border-2 border-gray-200 p-3 lg:p-5 bg-sanLightBlue dark:bg-black">
              <div className="flex lg:flex-row flex-col  justify-between items-center pb-2 ">
                <div className="flex gap-2 lg:gap-4 sm:justify-between lg:items-center mb-2 lg:mb-0">
                  <h2 className="text-sm lg:text-base font-semibold ">
                    {item?.name}
                  </h2>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col  justify-between items-center ">
                <p className="text-sm text-dashText dark:text-white">{` ${item?.description}`}</p>
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
        <AddAssetTaskModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default AssetTasks;

import useSettings from "@/hooks/useSettings";
import React, { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import ModalComponent from "../modals/Modal";
import FrequencyModal from "../room-management/modals/FrequencyModal";
import AddFrequencyModal from "./modals/AddFrequency";

const Frequency = () => {
  const { getAllFrequency, allFrequency, loading, buttonLoader } =
    useSettings();
  useEffect(() => {
    getAllFrequency();
  }, []);
  const data = [
    {
      _id: "667ae12831396188377b1502",
      name: "Every Day Cleaning",
      interval: 1,
      unit: "daily",
      occurrences: 1,
      cronExpression: "0 0 */1 * *",
      __v: 0,
    },
    {
      _id: "667ae14d31396188377b1504",
      name: "Every 2 weeks Cleaning",
      interval: 2,
      unit: "weekly",
      occurrences: 1,
      cronExpression: "0 0 */14 * *",
      __v: 0,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    e.preventDefault();

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-full bg-white dark:bg-black rounded-lg mx-auto mt-8  flex flex-col overflow-hidden rounded-[10px] shadow-xl p-5">
      <header className=" pb-3 flex lg:flex-row flex-col justify-between lg:items-center items-start">
        <p className="text-xl font-bold text-center pb-2 lg:pb-0">Frequency</p>{" "}
        <button
          onClick={(e) => {
            openModal(e);
          }}
          className=" p-2 bg-[#fff] underline text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
        >
          Add Frequency
        </button>
      </header>
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse w-full mt-10">
          <div className="rounded-sm bg-slate-300 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-300 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
          <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
        </div>
      ) : (
        <main className="lg:grid-cols-2 grid grid-cols-1 gap-6">
          {allFrequency?.map((item) => (
            <div className="w-full rounded-[10px] shadow-xl border-2 border-gray-200 p-3 lg:p-5">
              <div className="flex lg:flex-row flex-col  justify-between items-center pb-5 ">
                <div className="flex gap-2 lg:gap-4 sm:justify-between lg:items-center mb-2 lg:mb-0">
                  <h2 className="text-sm lg:text-base font-semibold ">
                    {item?.name}
                  </h2>
                  <span className="flex gap-2 items-center text-xs">
                    <FaRecycle />
                    <p className="capitalize text-xs">{item?.unit}</p>
                  </span>
                </div>
                <div className="flex sm:justify-between ">
                  <button className=" p-2 bg-[#fff] flex gap-2 items-center text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm">
                    <FaCircleInfo /> Info
                  </button>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col  justify-between items-center ">
                <span>{`Occurrences: ${item?.occurrences}`}</span>
                <span>{`Interval: ${item?.interval}`}</span>
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
        <AddFrequencyModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default Frequency;

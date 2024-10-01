"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/modals/Modal";
import { Controller, useForm } from "react-hook-form";
import useAssets from "@/hooks/useAssets";
import useRooms from "@/hooks/useRoom";
import toast from "react-toastify"; // Make sure to import toast
import useSettings from "@/hooks/useSettings";
import { FaPlusCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import { useSearchParams } from "next/navigation";
export default function AddAssetTask({
  isModalOpenAdd,
  setIsModalOpenAdd,
  closeModalAdd,
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  console.log("first", search);
  const { addAssetsToTask, buttonLoader } = useAssets();
  const [actions, setActions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const params = useParams();
  console.log("first", search, params, actions);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const { getAllFrequency, allFrequency, getAllAssetTask, allAssetTask } =
    useSettings();
  //   const { allRooms, getAllRooms } = useRooms();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
  } = useForm();

  const { getAllRooms, allRooms } = useRooms();
  useEffect(() => {
    getAllFrequency();
    getAllAssetTask();
  }, []);
  console.log(allFrequency, allAssetTask);
  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleFrequencyChange = (e) => {
    setSelectedFrequency(e.target.value);
  };
  const handleAddAction = (e) => {
    e.preventDefault();
    console.log(selectedFrequency, selectedItem);
    const newAction = {
      cleaningType: selectedItem,
      cleaningTypeFrequency: selectedFrequency,
    };

    setActions([...actions, newAction]);
    setSelectedFrequency("");
    // setSelectedRoles([]);
    setSelectedItem("");
  };
  const onSubmit = async (data) => {
    const newAction = {
      cleaningType: selectedItem,
      cleaningTypeFrequency: selectedFrequency,
    };

    setActions([...actions, newAction]);
    setSelectedFrequency("");
    // setSelectedRoles([]);
    setSelectedItem("");
    const newData = { roomId: search, assetTask: actions, assetId: params.id };
    console.log(newData);
    addAssetsToTask(newData);
  };

  return (
    <div className="bg-white w-full h-screen dark:bg-slate-900">
      <div className="pt-5 text-center sm:mt-0 sm:ml-4 flex gap-2 items-center justify-center">
        <BackButton />
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          Add Asset Tasks
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-4  w-full max-w-3xl mx-auto"
      >
        <div className="flex flex-col gap-x-2 w-full h-auto overflow-y-auto lg:pt-5 pt-5 space-y-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
            {/* <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="text-black w-full flex flex-col items-start">
                    <div className="relative w-full">
                      <input
                        id="name"
                        type="name"
                        // defaultValue={item?.category}
                        placeholder=" Name"
                        className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                        name="name"
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                      {errors && errors?.name?.type === "required" && (
                        <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                          {errors?.name.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
          </div>
          <h3
            className={`ml-1  text-xs text-black dark:text-white font-thin border-b border-gray-300 my-3 pb-2 `}
          >
            Assests
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="text-black w-full flex flex-col items-start">
              <select
                name="frequency"
                onClick={() => getAllFrequency()}
                onChange={handleFrequencyChange}
                className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
              >
                <option hidden>Select a Frequency</option>

                {allFrequency?.map((item) => (
                  <option
                    key={item?._id}
                    className="capitalize"
                    value={item?._id}
                    defaultValue={selectedItem}
                  >
                    {`${item?.unit}-${item?.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-black w-full flex flex-col items-start">
              <select
                onChange={handleItemChange}
                onClick={() => getAllAssetTask()}
                className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
              >
                <option hidden>Select a Cleaning Type</option>

                {allAssetTask?.map((item) => (
                  <option
                    key={item?._id}
                    className="capitalize"
                    value={item?._id}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>

              {errors && errors?.cleaningType?.type === "required" && (
                <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                  {errors?.cleaningType.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              //   disabled={loading}
              onClick={handleAddAction}
              className={`w-auto h-10 px-3 rounded my-2 flex justify-center items-center gap-2   hover:border-lmsBlue   bg-sanLightBlue text-black`}
            >
              Add More Tasks <FaPlusCircle />
            </button>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-y-2 w-full ">
          {actions.map((action, index) => (
            <li
              className="bg-blue-500 bg-opacity-50 rounded-lg p-3 flex flex-col flex-wrap w-auto "
              key={index}
            >
              <span>Frequency: {action.cleaningType}</span>
              <span className="border-b border-gray-500 pb-2">
                Cleaning Type : {action.cleaningTypeFrequency}
              </span>
            </li>
          ))}
        </ul>
        <button
          disabled={buttonLoader}
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
        >
          {buttonLoader ? "Loading..." : " Add Asset Tasks"}
        </button>
      </form>
    </div>
  );
}

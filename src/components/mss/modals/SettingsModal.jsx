"use client";

import React, { useEffect } from "react";
import ModalComponent from "@/components/modals/Modal";
import { Controller, useForm } from "react-hook-form";
import useAssets from "@/hooks/useAssets";
import useRooms from "@/hooks/useRoom";
import toast from "react-toastify"; // Make sure to import toast
import useSettings from "@/hooks/useSettings";
import { useSelector } from "react-redux";
import useWorkOrder from "@/hooks/useWorkOrder";

export default function SettingsModal({
  isModalOpenAdd,
  setIsModalOpenAdd,
  closeModalAdd,
}) {
  const id = useSelector((state) => state.id.storedId);
  const storedOrder = useSelector((state) => state.id.storedWorkId);
  const { updateWO, buttonLoading } = useWorkOrder();
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
  const convertToBoolean = (value) => {
    return value === "true";
  };

  const processFormData = (data) => {
    const processedData = {};

    if (data.overridePermission !== undefined) {
      processedData.overridePermission = convertToBoolean(
        data.overridePermission
      );
    }

    if (data.active !== undefined) {
      processedData.active = convertToBoolean(data.active);
    }

    return processedData;
  };
  const onSubmit = async (data) => {
    const processedData = processFormData(data);
    console.log("Processed Data:", processedData);

   
    if (storedOrder?.length > 1) {
      for (const id of storedOrder) {
        console.log("sub", id, processedData);
        try {
          updateWO(id, processedData);
          console.log(`Response for ID ${id}:`, processedData);
        } catch (error) {
          console.error(`Error submitting ID ${id}:`, error);
        }
      }
    } else {
      updateWO(id, processedData);
    }
    // addAssets(data);
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="pt-5 text-center sm:mt-0 sm:ml-4">
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          MSS Settings
        </h3>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-4  w-full"
      >
        <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
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
            <div className="text-black w-full flex flex-col items-start">
              <Controller
                name="overridePermission" // Name of the field in the form data
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onClick={() => getAllRooms()}
                    className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                  >
                    <option hidden>Select a Permission</option>

                    <option className="capitalize" value={true}>
                      Override
                    </option>
                    <option className="capitalize" value={false}>
                      Maintain
                    </option>
                  </select>
                )}
              />
            </div>
            <div className="text-black w-full flex flex-col items-start">
              <Controller
                name="active" // Name of the field in the form data
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onClick={() => getAllRooms()}
                    className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                  >
                    <option hidden>Select a Status</option>

                    <option className="capitalize" value={true}>
                      Activate
                    </option>
                    <option className="capitalize" value={false}>
                      Deactivate
                    </option>
                  </select>
                )}
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="text-black w-full flex flex-col items-start">
                  <Controller
                    name="frequency" // Name of the field in the form data
                    control={control}
                    rules={{
                      required: "Frequency is required",
                    }} // Validation rules if needed
                    render={({ field }) => (
                      <select
                        {...field}
                        onClick={() => getAllFrequency()}
                        className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                      >
                        <option hidden>Select a Frequency</option>

                        {allFrequency?.map((item) => (
                          <option
                            key={item?._id}
                            className="capitalize"
                            value={item?._id}
                          >
                            {`${item?.unit}-${item?.name}`}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors && errors?.frequency?.type === "required" && (
                    <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                      {errors?.frequency.message}
                    </span>
                  )}
                </div>
                <div className="text-black w-full flex flex-col items-start">
                  <Controller
                    name="cleaningType" // Name of the field in the form data
                    control={control}
                    rules={{
                      required: "Cleaning Type is required",
                    }} // Validation rules if needed
                    render={({ field }) => (
                      <select
                        {...field}
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
                    )}
                  />
                  {errors && errors?.cleaningType?.type === "required" && (
                    <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                      {errors?.cleaningType.message}
                    </span>
                  )}
                </div>
              </div> */}
          <button
            disabled={buttonLoading}
            className="bg-transparent dark:bg-red-500 dark:text-white text-center text-red-500 border border-red-500 p-3 rounded-md w-full my-2"
          >
            <p> {buttonLoading ? "Loading..." : " Delete MSS"}</p>
            <p className="text-xs">This action cannot be undone</p>
          </button>
        </div>
        <button
          disabled={buttonLoading}
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
        >
          {buttonLoading ? "Loading..." : " Update Mss"}
        </button>
      </form>
    </div>
  );
}

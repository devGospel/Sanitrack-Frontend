"use client";

import React, { useEffect } from "react";
import ModalComponent from "@/components/modals/Modal";
import { Controller, useForm } from "react-hook-form";
import useAssets from "@/hooks/useAssets";
import useRooms from "@/hooks/useRoom";
import toast from "react-toastify"; // Make sure to import toast
import useSettings from "@/hooks/useSettings";
import { useParams } from "next/navigation";

export default function AddAssetsModal({
  isModalOpenAdd,
  setIsModalOpenAdd,
  closeModalAdd,
}) {
  const params = useParams();
  const { addAssets, buttonLoader } = useAssets();
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
  const onSubmit = (data) => {
    const newData = { name: data?.name, roomId: params?.id };
    if (params?.id) {
      addAssets(newData);
    } else addAssets(data);
  };

  return (
    <div className="bg-white dark:bg-black">
      {isModalOpenAdd && (
        <ModalComponent
          isOpen={isModalOpenAdd}
          onClose={closeModalAdd}
          setIsModalOpen={setIsModalOpenAdd}
        >
          <div className="pt-5 text-center sm:mt-0 sm:ml-4">
            <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
              Add Assets
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-4  w-full"
          >
            <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
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
                </div>
                {!params?.id && (
                  <div className="text-black w-full flex flex-col items-start">
                    <Controller
                      name="roomId" // Name of the field in the form data
                      control={control}
                      rules={{
                        required: "Room is required",
                      }} // Validation rules if needed
                      render={({ field }) => (
                        <select
                          {...field}
                          onClick={() => getAllRooms()}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                        >
                          <option hidden>Select a Room</option>

                          {allRooms?.map((room) => (
                            <option
                              key={room?._id}
                              className="capitalize"
                              value={room?._id}
                            >
                              {room?.roomName}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors && errors?.roomId?.type === "required" && (
                      <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                        {errors?.roomId.message}
                      </span>
                    )}
                  </div>
                )}
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
            </div>
            <button
              disabled={buttonLoader}
              className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
            >
              {buttonLoader ? "Loading..." : " Add Assets"}
            </button>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}

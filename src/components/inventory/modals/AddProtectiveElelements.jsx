"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInventory from "@/hooks/useInventory";

const AddProtectiveModal = ({ closeModal }) => {
  const params = useSearchParams();
  const { addCleaningItems, buttonLoading,addProtectiveElements } = useInventory();
  const tab = params.get("tab");

  console.log("first tab", tab);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const [pairs, setPairs] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const item = useSelector((state) => state.id.storedItem);

  const token = user?.token;
  const id = user?.user?._id;

  const router = useRouter();
  const dispatch = useDispatch();

  let userData = {};
  let fields = Object.keys(item ?? {});

  const handleAddChemical = (data) => {
    // e.preventDefault();

    // addChemicals(data);
    console.log(data);
    const newData = { ...data,  };

    console.log(newData);
    addProtectiveElements(newData);
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full h-auto overflow-y-auto">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black font-semibold">
                    Add Inventory
                  </h3>
                </div>
              </div>
              <div>
                <form
                  className="w-full"
                  onSubmit={handleSubmit(handleAddChemical)}
                >
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="name"
                            type="name"
                            // defaultValue={item?.category}
                            placeholder=" Name"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
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
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="description"
                            type="description"
                            // defaultValue={item?.category}
                            placeholder="Description"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="description"
                            {...register("description", {
                              required: "Description is required",
                            })}
                          />
                          {errors &&
                            errors?.description?.type === "required" && (
                              <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                                {errors?.description.message}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="quantity"
                            type="number"
                            placeholder="Quantity "
                            // defaultValue={item?.charges ? item?.charges : 0}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="quantity"
                            {...register("quantity", {
                              required: "Quantity is required",
                            })}
                          />
                          {errors && errors?.quantity?.type === "required" && (
                            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                              {errors?.quantity.message}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <div className="text-black w-full flex flex-col items-start">
                        <Controller
                          name="type" // Name of the field in the form data
                          control={control}
                          rules={{
                            required: "Type is required",
                          }} // Validation rules if needed
                          render={({ field }) => (
                            <select
                              {...field}
                              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            >
                              <option hidden>Select a Type</option>

                              <option className="capitalize" value="consumable">
                                consumable
                              </option>
                              <option className="capitalize" value="tool">
                                tool
                              </option>
                              <option className="mL">mL</option>
                            </select>
                          )}
                        />
                        {errors && errors?.type?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.type.message}
                          </span>
                        )}
                      </div> */}
                    </div>

                    {/* <div className="text-black w-full flex flex-col lg:flex-row gap-4 items-start">
                      <div className="relative lg:w-1/2 w-full">
                        <input
                          id="unit"
                          type="text"
                          placeholder="Unit "
                          // defaultValue={item?.charges ? item?.charges : 0}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="unit"
                          {...register("unit", {
                            required: "Unit is required",
                          })}
                        />
                        {errors && errors?.unit?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.unit.message}
                          </span>
                        )}
                      </div>
                      <div className="flex lg:w-1/2 space-x-3 ">
                        <input
                          type="checkbox"
                          className="border-gray-300 rounded h-5 w-5"
                          onChange={(e) => setPairs(e.target.checked)}
                          name="pairs"
                        />

                        <div className="flex flex-col">
                          <h1 className="text-gray-700 font-medium leading-none">
                            Pairs
                          </h1>
                        </div>
                      </div>
                    </div> */}
                    {tab === "protective" && (
                      <div className="text-black w-full flex flex-col items-start">
                        <Controller
                          name="pairs" // Name of the field in the form data
                          control={control}
                          rules={{
                            required: "Pairs is required",
                          }} // Validation rules if needed
                          render={({ field }) => (
                            <select
                              {...field}
                              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            >
                              <option hidden>Select a Pairs</option>

                              <option value={true}>Pairs</option>
                              <option value={false}>Single</option>
                              {/* <option className="mL">mL</option> */}
                            </select>
                          )}
                        />
                        {errors && errors?.pairs?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.pairs.message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // type="button"
                        // onClick={closeModal}
                        disabled={buttonLoading }
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoading
                          ? "Loading..."
                          : "  Add Protective Elements"}
                      </button>
                    </span>
                    {/* <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                      <button
                        disabled={buttonLoader}
                        // onClick={handleaddChemical}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? <Spinner /> : "Save"}
                      </button>
                    </span> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProtectiveModal;

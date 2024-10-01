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
import useTask from "@/hooks/useTask";

const AddTask = ({ closeModal }) => {
  const params = useSearchParams();
  const { addCleaningItems, buttonLoading } = useInventory();
  const tab = params.get("tab");

  console.log("first tab", tab);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { addTasks, buttonLoader,} =
    useTask();




  const user = useSelector((state) => state.auth.user);
  const item = useSelector((state) => state.id.storedItem);

  const token = user?.token;
  const id = user?.user?._id;

  const router = useRouter();
  const dispatch = useDispatch();

  const handleAdd = (data) => {
    // e.preventDefault();

    // addChemicals(data);
    console.log(data);
    
   
    addTasks(data);
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white dark:bg-black z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full h-auto overflow-y-auto">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
                    Add Task
                  </h3>
                </div>
              </div>
              <div>
                <form
                  className="w-full"
                  onSubmit={handleSubmit(handleAdd)}
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
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <textarea
                          rows={3}
                            id="description"
                            type="description"
                            // defaultValue={item?.category}
                            placeholder="Description"
                            className="border w-full  p-2  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
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
                  

                    
                  </div>
                  
               
                  <div className=" py-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // type="button"
                        // onClick={closeModal}
                        disabled={buttonLoading }
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoading ? "Loading..." : "  Add Task"}
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

export default AddTask;

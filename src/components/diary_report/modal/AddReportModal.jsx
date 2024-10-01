"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCompassOutline } from "react-icons/io5";
import useFacilities from "@/hooks/useFacilities";
import useReport from "@/hooks/useReport";

const AddReportModal = ({ closeModal }) => {
  const params = useSearchParams();
const {addReport,buttonLoader}= useReport()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm();
  

  const user = useSelector((state) => state.auth.user);

  

  const handleAdd = (data) => {
    // e.preventDefault();

   
    addReport(data);
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white dark:bg-black z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
                    Add Diary Report
                  </h3>
                </div>
              </div>
              <div>
                <form className="w-full" onSubmit={handleSubmit(handleAdd)}>
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="title"
                            type="title"
                            // defaultValue={item?.category}
                            placeholder=" Title"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                            name="title"
                            {...register("title", {
                              required: "Title is required",
                            })}
                          />
                          {errors && errors?.title?.type === "required" && (
                            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                              {errors?.title.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <textarea
                          id="note"
                          type="text"
                          name="note"
                          rows="4"
                          {...register("note", {
                            required: "Note is required",
                          })}
                          placeholder="Notes"
                          className="border w-full py-2 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:text-white"
                        />
                        {errors && errors?.note?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.note.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" py-3 sm:flex sm:flex-row-reverse gap-4">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // onClick={closeModal}
                        // disabled={buttonLoader}
                        className="inline-flex justify-center w-full rounded-md border-2 border-sanBlue px-4 py-2 bg-white dark:bg-sanBlue dark:text-white text-base leading-6 font-medium text-sanBlue shadow-sm hover:bg-blue-800 hover:text-white focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? "Loading..." : " Add Report"}
                      </button>
                    </span>
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

export default AddReportModal;

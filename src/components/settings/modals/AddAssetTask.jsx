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
import useSettings from "@/hooks/useSettings";

const AddAssetTaskModal = ({ closeModal }) => {
  const params = useSearchParams();
  const { addAssetTask, buttonLoader } = useSettings();
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

    addAssetTask(data);
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
                    Add Asset Task
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

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                      <div className="relative w-full">
                        <textarea
                          id="description"
                          type="text"
                          name="description"
                          rows="4"
                          {...register("description", {
                            required: "Description is required",
                          })}
                          placeholder="Description"
                          className="border w-full py-2 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                        />
                        {errors && errors?.description?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.description.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                      <div className="relative w-full">
                      <input
                        type="file"
                        accept=".pdf, .doc, .docx, .xls, .xlsx, .txt"
                        // ref={fileInputRef}
                        style={{ display: "none" }}
                          // onChange={handleFileChange}
                      />
                      <label
                        htmlFor="document"
                        className="inline-block cursor-pointer px-4 py-2 border border-blue-500 dark:border-white dark:text-white text-blue-500 bg-transparent rounded hover:bg-blue-100 dark:hover:bg-none"
                      >
                        Upload SSOP Document
                      </label>
                      <p className="text-red-500 text-xs">Document upload Not working yet</p>
                        {/* {errors && errors?.description?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.description.message}
                          </span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // type="button"
                        // onClick={closeModal}
                        disabled={buttonLoader}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? "Loading..." : "  Add Asset Task"}
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

export default AddAssetTaskModal;

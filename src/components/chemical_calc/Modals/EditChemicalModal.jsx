"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditChemicalModal = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const {editChemical,buttonLoader,getAllChemicals,allChemicals}= useChemicalTracker()


  useEffect(()=>{
getAllChemicals()
  },[])
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const user = useSelector((state) => state.auth.user);
  const item = useSelector((state) => state.id.storedItem);

  const token = user?.token;
  const id = user?.user?._id;

  const router = useRouter();
  const dispatch = useDispatch();


  let userData = {};
  let fields = Object.keys(item ?? {});
  const updateFormData = (event, id) => {
    let val = event.target.value;

    fields.forEach((fd) => {
      if (id) {
        userData[id] = val;
      }
    });
  };
  const handleeditCategory = (e) => {
    e.preventDefault();

    if (Object.keys(userData).length > 0) {
      editChemical(userData);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black font-semibold">
                    Edit Chemical Mix
                  </h3>
                </div>
              </div>
              <div>
                <form className="w-full">
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="text-black w-full flex flex-col items-start">
                          <div className="relative w-full">
                            <input
                              id="name"
                              type="name"
                              defaultValue={item?.name}
                              placeholder="Chemical Name"
                              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                              name="name"
                              onChange={(e) => {
                                updateFormData(e, "name");
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-black w-full flex flex-col items-start">
                          <select
                            onChange={(e) => {
                              updateFormData(e, "chemicalId");
                            }}
                           name="chemicalId"
                            className="text-gray-700 rounded-md w-full border-[1px] p-2 bg-transparent border-gray-400"
                          >
                            <option hidden>Select a Chemical</option>
                            {allChemicals?.map((chemical) => {
                              return (
                                <option
                                  key={chemical?.chemicalId}
                                  defaultValue={item?.chemicalId}
                                  className="capitalize"
                                >
                                  {chemical.length === 0
                                    ? "No chemicals available"
                                    : `${chemical?.name}`}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                    
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <input
                          id="amount"
                          type="number"
                          placeholder="Titration Count (Amount to Use)"
                          defaultValue={item?.titrationCount}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="amount"
                          onChange={(e) => {
                            updateFormData(e, "charges");
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <input
                          id="amount"
                          type="text"
                          placeholder="Unit"
                          defaultValue={item?.unit}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="amount"
                          onChange={(e) => {
                            updateFormData(e, "charges");
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="minimum_concentration"
                            type="number"
                            placeholder="Min Concentration"
                            defaultValue={item?.minimum_concentration}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="minimum_concentration"
                           
                            onChange={(e) => {
                              updateFormData(e, "minimum_concentration");
                            }}
                          />
                          
                        </div>
                      </div>
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="maximum_concentration"
                            type="number"
                            placeholder="Max Concentration"
                            defaultValue={item?.maximum_concentration}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="maximum_concentration"
                            onChange={(e) => {
                              updateFormData(e, "maximum_concentration");
                            }}
                           
                          />
                         
                        </div>
                      </div>
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <input
                          id="amount"
                          type="text"
                          placeholder="Concentration"
                          defaultValue={item?.concentration}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="amount"
                          onChange={(e) => {
                            updateFormData(e, "charges");
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <textarea
                          id="notes"
                          type="text"
                          name="notes"
                          rows="4"
                          defaultValue={item?.notes}
                          // {...register("notes", {
                          //   required: "Reason for disapproval is required",
                          // })}

                          onChange={(e) => {
                            updateFormData(e, "charges");
                          }}
                          placeholder="Notes"
                          className="border w-full py-2 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Cancel
                      </button>
                    </span>
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                      <button
                        disabled={buttonLoader}
                        onClick={handleeditCategory}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? <Spinner /> : "Save"}
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

export default EditChemicalModal;

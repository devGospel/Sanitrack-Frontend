"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";
import usePermission from "@/hooks/usePermission";
import useRole from "@/hooks/useRole";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const  EditUserPermissionModal = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const {getAllPermission, allPermission, buttonLoader, editPermission} = usePermission()

  useEffect(() => {
    getAllPermission()
  }, []);
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
  const handleEditPermission = (e) => {
    e.preventDefault();

    if (Object.keys(userData).length > 0) {
      editPermission(userData);
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
                  Edit User Permission
                  </h3>
                </div>
              </div>
              <div>
                <form className="w-full">
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="text-black w-full flex flex-col items-start">
                      <div className="flex flex-col w-full lg:flex-col gap-8 items-center">
                        <div className="text-black w-full flex flex-col items-start">
                          <div className="relativ w-full">
                            <input
                              id="name"
                              type="name"
                              defaultValue={item?.permission_name}
                              placeholder="Permission Name"
                              className="border w-full h-10 md:h-12 px-5 text-black  md:text-sm rounded-md outline-none focus:border-slate-400 "
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
                            className="text-gray-700 rounded-md w-full border-[1px]  h-10 md:h-12 px-5 p-2 bg-transparent border-gray-400"
                          >
                            <option hidden>Select Permission</option>
                            {allPermission?.map((permission) => {
                              return (
                                <option
                                  key={permission?.permission_id}
                                  defaultValue={item?.permission_id}
                                  className="capitalize"
                                >
                                  {permission.length === 0
                                    ? "No permissions available"
                                    : `${permission?.permission_name}`}
                                </option>
                              );
                            })}
                          </select>
                        </div>
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
                        onClick={handleEditPermission}
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

export default  EditUserPermissionModal;

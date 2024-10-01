"use client";

import React, { useState } from "react";
import { toast, Flip, ToastContainer } from "react-toastify";
import BackButton from "@/components/BackButton";
import RoleHeader from "../RoleHeader";
import usePermission from "@/hooks/usePermission";
import Spinner from "@/components/loaders/Loader";

const AddUserPermissionForm = () => {
  const { addPermission, buttonLoader } = usePermission();
  const [formData, setFormData] = useState({ permission_name: "" });
  const [errors, setErrors] = useState({ permission_name: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.permission_name.trim()) {
      errors.permission_name = 'Permission name is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await addPermission(formData);
      setFormData({ permission_name: "" }); 
    } catch (error) {
    }
  };

  return (
    <>
      <ToastContainer />
      <RoleHeader />
      <div className="flex w-full lg:w-3/5 justify-between mt-6 lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">Add User Permissions</h2>
      </div>

      <div className="text-black flex flex-col items-center gap-4 bg-white lg:p-10 p-5 w-full">
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4">
            <div className="text-black w-full flex flex-col items-start">
              <div className="flex flex-col w-full lg:flex-col gap-8 items-center">
                <div className="text-black w-full flex flex-col items-start">
                  <div className="relative w-full">
                    <input
                      id="permission_name"
                      type="text"
                      placeholder="User Permission"
                      className={`border w-full h-10 md:h-12 px-5 md:text-sm rounded-md outline-none focus:border-slate-400 ${errors.permission_name ? 'border-red-500' : 'border-gray-300'}`}
                      name="permission_name"
                      value={formData.permission_name}
                      onChange={handleChange}
                    />
                    {errors.permission_name && <span className="text-red-500 text-sm">{errors.permission_name}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-4 py-3 self-center items-center mt-8 sm:px-6">
            <button
              type="submit"
              disabled={buttonLoader}
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-4 bg-blue-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              {buttonLoader ? <Spinner /> : "Add User Permissions"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUserPermissionForm;

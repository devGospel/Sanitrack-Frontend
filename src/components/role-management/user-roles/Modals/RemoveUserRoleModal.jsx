"use client";

import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "@/components/loaders/Loader";
import "react-toastify/dist/ReactToastify.css";

const RemoveUserRoleModal = ({ closeModal}) => {
  const id = useSelector((state) => state.id.storedId);
  const item = useSelector((state) => state.id.storedItem);

  console.log("first,", id)
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const handleDeleteRole = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}roles/delete?id=${item?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accessKey: "U2FsdGVkX1+Reb80FLsBqS0l90d4nYdWNohfrbSME+tMkSbv2Xb5nqLSacVmuG2+eMrAhXc3PT12NmsmQddGJdfdCHuDMOrPPq4p/lBRj3WWWtvLs56RF7EHhqY/qaiD19a95VDaGGrTyj+ZsGCKEg==",
        },
      });
      if (response.status === 200) {
        toast.success("Deleted Successfully !!!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeModal();
        window?.location.reload();
      }
    } catch (error) {
      if (error?.message === "Request failed with status code 408") {
        dispatch(setIsExpiredToken(true));
      }
      toast.error("Error occurred while deleting User Role !!!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-20">
      <ToastContainer />
      <div>
        <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg text-center leading-6 font-bold text-gray-900">
                  Remove User Roles
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    Are you sure you want to delete this User Role? <strong>{item?.role_name}</strong>  This action cannot be undone.
                  </p>
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
                disabled={loading}
                onClick={handleDeleteRole}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {loading ? <Spinner /> : "Delete"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveUserRoleModal;

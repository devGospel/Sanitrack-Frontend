// import axios from "axios";
import Spinner from "@/components/loaders/Loader";

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemoveTeamMember = ({ closeModal }) => {
  const id = useSelector((state) => state.id.storedId);
  const item = useSelector((state) => state.id.storedItem);
  console.log("first", item);
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  const data = {
    members: [{ userId: item?.userId?._id, roleId: item?.roleId?._id }],
  };
  const dispatch = useDispatch();
  const handleDeleteMember = async () => {
    setLoading(true);

    axios
      .post(
        `${baseUrl}team/delete-member?teamId=${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);

        if (response) {
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

          window?.location.reload();
        }
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          if (status === 400 && data && data.message) {
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setLoading(false);
        }
      });
  };
  return (
    <div className=" top-20">
      <ToastContainer />
      <div>
        <div className="bg-white dark:bg-black z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
          <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg text-center leading-6 font-bold text-gray-900 dark:text-white">
                  Remove Team Member
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500 dark:text-white text-center font-thin">
                    Are you sure you want to delete this team member? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
                onClick={handleDeleteMember}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {loading ? <Spinner /> : "Remove"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveTeamMember;

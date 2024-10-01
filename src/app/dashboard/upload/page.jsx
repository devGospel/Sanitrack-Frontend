"use client";

import useUpload from "@/hooks/useUpload";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Upload = () => {
    const [user,setUser]=useState("Cleaner")
    const {cleanerUpload,cleanerRes,buttonLoader}= useUpload()
    console.log(cleanerRes)
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const files = event.target.files[0]
    const formData = new FormData();
    formData.append("staffType", user);
    formData.append("document", files);

    cleanerUpload(formData)
    
    console.log(files)
    // const newImages = files.map((file) => URL.createObjectURL(file));
    // setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };
  return (
    <>
      <div className="text-black bg-white dark:bg-slate-900 h-screen flex flex-col space-y-3 w-full">
        <div className=" flex justify-between items-center flex-col lg:flex-row lg:p-10 p-5">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-black dark:text-white lg:text-2xl font-semibold">
              User Upload
            </h1>
            <span className=" text-dashText dark:text-white text-sm">
              Upload historical data for users
            </span>
          </div>
          <span className="flex justify-end pt-3 pb-5">
            <select
              id="status"
              name={"status"}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full lg:w-72 capitalize lg:py-1 bg-gray-100 dark:bg-black dark:text-white border border-gray-500 h-12 rounded-lg sm:px-3    text-xs md:text-base text-black  border-none cursor-pointer focus-within:border-none"
            >
              <option hidden>Select a User</option>
              {/* <option value="all">All</option> */}
              <option value="Cleaner">Cleaner</option>
              <option value="Inspector">Inspector</option>
             
            </select>
          </span>
        </div>
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 lg:px-10 px-5 w-full">
          <div className="flex items-center justify-center mb-2 px-4">
            <button
              className="bg-sanBlue flex justify-center items-center gap-2 flex-col w-40 h-40 shadow-sm text-white rounded"
              onClick={handleUploadClick}
            >
              <FaCloudUploadAlt className="text-6xl" />
              <p>{buttonLoader?"Uploading...":"Upload"}</p>
            </button>
            <input
              type="file"
              accept=".pdf, .doc, .docx, .xls, .xlsx, .txt"
              ref={fileInputRef}
              style={{ display: "none" }}
                onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;

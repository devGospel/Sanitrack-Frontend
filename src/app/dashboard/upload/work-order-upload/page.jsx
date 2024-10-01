"use client";

import useUpload from "@/hooks/useUpload";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaDownload } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const WorkOrderUpload = () => {
  const [user, setUser] = useState("Cleaner");
  const {
    cleanerUpload,
    cleanerRes,
    buttonLoader,
    downloadWork,
    downloadLoader,
  } = useUpload();
  console.log(cleanerRes);
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("staffType", user);
    formData.append("document", files);

    cleanerUpload(formData);

    console.log(files);
    // const newImages = files.map((file) => URL.createObjectURL(file));
    // setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };
  return (
    <>
      <div className="text-black bg-white dark:bg-slate-900 h-screen flex flex-col space-y-3 w-full">
        <div className=" flex justify-between items-center flex-col lg:flex-row lg:p-10 p-5">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-black dark:text-white lg:text-2xl font-semibold lg:text-left text-center">
              Work Order Upload
            </h1>
            <span className=" text-dashText dark:text-white text-sm lg:text-left text-center">
              Upload historical data for work Order
            </span>
          </div>
          <span className="flex justify-end pt-3 pb-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                downloadWork();
              }}
              className=" p-2 flex gap-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
            >
              <FaDownload />{" "}
              <p>
                {downloadLoader ? "Downloading..." : "Download Sample Work Order Doc"}
              </p>
            </button>
          </span>
        </div>
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 lg:px-10 px-5 w-full">
          <div className="flex items-center justify-center mb-2 px-4">
            <button
              className="bg-sanBlue flex justify-center items-center gap-2 flex-col w-40 h-40 shadow-sm text-white rounded"
              onClick={handleUploadClick}
            >
              <FaCloudUploadAlt className="text-6xl" />
              <p>{buttonLoader ? "Uploading..." : "Upload"}</p>
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

export default WorkOrderUpload;

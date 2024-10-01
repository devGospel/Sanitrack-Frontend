"use client";

import React, { useContext, useRef, useState } from "react";

import Image from "next/image";
import { useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
const ImagesModal = ({
  images,
  handleUpload,
  closeModal,
  uploadImage,
  fileInputRef,
  handleRemoveImage,
  workOrderEvidenceId,
  buttonLoading,
}) => {
  const items = useSelector((state) => state.id.storedItems);
  console.log("items", images);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="p-5 bg-white dark:bg-black flex items-center justify-center flex-col relative">
       <span onClick={()=>closeModal()} className="absolute top-5 right-5 ">
      <IoIosCloseCircleOutline className="text-black dark:text-white text-lg"/>
      </span>
      <header className="flex justify-center items-center">
        <h1 className="text-lg lg:text-xl text-black dark:text-white font-black text-center">
          View Uploads
        </h1>
      </header>
      <div className="flex items-center justify-between mb-2 ">
        <button
          className="btn w-72 bg-sanBlue hover:bg-sanBlue disabled:bg-sanLightBlue text-white lg:w-80"
          onClick={handleUpload}
        >
          {buttonLoading ? "Uploading...." : "Upload Image"}
        </button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={uploadImage}
        />
      </div>
      {images?.length > 0 ? (
        <div className="w-full gap-3 mt-3">
          <span>
            {" "}
            {isLoading && (
              <div className="flex items-center justify-center pt-5">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
              </div>
            )}
            <div className="relative">
              <Image
                src={images[currentIndex]?.url}
                onLoad={handleImageLoaded}
                alt="Evidence Image"
                width={500}
                height={500}
                className="w-full h-72 object-contain  cursor-pointer"
              />
              <span className="absolute top-0 right-0 bg-white p-2 rounded-full">
                <IoTrashBin
                  className="text-red-500 text-sm cursor-pointer"
                  onClick={(e) =>
                    handleRemoveImage(
                      workOrderEvidenceId,
                      images[currentIndex]?.public_url
                    )
                  }
                />
              </span>
            </div>
          </span>
          <div className="flex justify-between items-center mt-5">
            <button
              className={`px-3 py-2 text-white shadow-md ${
                currentIndex === 0
                  ? "bg-red-100 cursor-not-allowed"
                  : "bg-red-500 "
              }`}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className={` px-3 py-2 text-white shadow-md ${
                currentIndex === images?.length - 1
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={handleNext}
              disabled={currentIndex === images?.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold  text-sm text-center pt-5">
          No Image Uploaded
        </p>
      )}
      {}
    </div>
  );
};

export default ImagesModal;

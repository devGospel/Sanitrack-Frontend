"use client";

import React, { useContext, useRef, useState } from "react";

import Image from "next/image";
import { useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
const CleanerImagesModal = ({
  data,
  closeModal,
  handleUpload,
  uploadImage,
  fileInputRef,
  handleRemoveImage,
  workOrderEvidenceId,
}) => {
  // const data= null
  const items = useSelector((state) => state.id.storedItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  // Flatten the data to get all images and corresponding cleaners
  const flattenedData = data?.flatMap((item) => {
    return item?.evidence?.images?.map((image) => ({
      url: image?.url,
      cleanerUsername: item?.cleaner?.username,
    }));
  });
  console.log("flat", flattenedData);
  // Function to go to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flattenedData?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flattenedData?.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="p-5 bg-white dark:bg-black lg:min-w-96 min-w-72 flex items-center justify-center flex-col relative">
      <span onClick={() => closeModal()} className="absolute top-5 right-5 ">
        <IoIosCloseCircleOutline className="text-black dark:text-white text-lg" />
      </span>
      <header className="flex flex-col justify-center items-center">
        <h1 className="text-lg lg:text-xl text-black dark:text-white font-black text-center">
          Cleaner Uploads
        </h1>
        <p className="text-xs text-black dark:text-white  text-center">
          uploaded by
        </p>
        <h3 className="text-lg lg:text-xl text-black dark:text-white font-black text-center capitalize">
          {" "}
          {data ? flattenedData[currentIndex]?.cleanerUsername:""}
        </h3>
      </header>

      {flattenedData?.length > 0 ? (
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
                src={flattenedData[currentIndex]?.url}
                onLoad={handleImageLoaded}
                alt="Evidence Image"
                width={500}
                height={500}
                className="w-full h-72 object-contain  cursor-pointer"
              />
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
                currentIndex === flattenedData?.length - 1
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={handleNext}
              disabled={currentIndex === flattenedData?.length - 1}
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

export default CleanerImagesModal;

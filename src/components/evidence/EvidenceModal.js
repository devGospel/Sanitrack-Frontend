"use client";

import React, { useContext, useState } from "react";
import { ItemsContext } from "../context/items.context";
import Image from "next/image";
import { useSelector } from "react-redux";

const EvidenceModal = () => {
  const items = useSelector((state)=>state.id.storedItem)
  console.log(items);
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
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="p-5">
      <header className="flex justify-center items-center">
        <h1 className="text-lg lg:text-xl text-black font-black text-center">
          View Evidence Images
        </h1>
      </header>
      {items?.length > 0 ? (
        <div className="w-full gap-3 mt-3">
          <span>
            {" "}
            {isLoading &&
              <div className="flex items-center justify-center pt-5">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
              </div>}
            <Image
              src={items[currentIndex]?.url}
              onLoad={handleImageLoaded}
              alt="Evidence Image"
              width={500}
              height={500}
              className="w-full h-72 object-contain hover:transform hover:scale-150 cursor-pointer"
            />
          </span>
          <div className="flex justify-between items-center mt-5">
            <button
              className={`px-3 py-2 text-white shadow-md ${
                currentIndex === 0 ? "bg-red-100 cursor-not-allowed" : "bg-red-500 "
              }`}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button
              className={` px-3 py-2 text-white shadow-md ${
                currentIndex === items.length - 1
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ):<p className="text-red-500 font-bold  text-sm text-center pt-5">No Evidence Image Attached</p>}

    </div>
  );
};

export default EvidenceModal;

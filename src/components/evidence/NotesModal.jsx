"use client"
import React, { useContext, useState } from 'react'
import { DM_Mono } from "next/font/google";

import { useSelector } from 'react-redux';

const dm_mono = DM_Mono({ weight: "300", subsets: ["latin"] });
const NotesModal = ({closeModal}) => {
  const items = useSelector((state)=>state.id.storedItem)
  console.log(items);
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
    function formatDate(dateString) {
      const date = new Date(dateString);
      // Set hours to 0 to remove time portion
  
      return date.toISOString().slice(0, 10);
    }
  
  return (
    <div className="w-72 lg:w-full p-1">
    <div className="bg-white dark:bg-black shadow-md">
    {items?.length > 0 ? (
        <div className="w-full gap-3 mt-3">
           <div className="bg-grey-lightest border-b p-4 flex justify-between items-center">
        <div className="flex-1 text-grey text-xs">{formatDate(items[currentIndex]?.uploadedAt)}</div>
        {/* <div className="mr-2 text-sm text-grey-darkest capitalize">{items?.uploaded_by?.username}</div> */}
       </div>
       <div className="p-4 leading-normal font-thin text-center text-sm text-black dark:text-white">
        <p className={dm_mono.className}>{items[currentIndex]?.note}</p>
      </div>
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
      ):<p className="text-red-500 font-bold  text-sm text-center pt-5">No Notes Attached</p>}
     

    

      {/* <div className="bg-grey-lightest border-t p-4 text-sm text-right">
        <button onClick={closeModal} className="bg-red-500 text-white mr-1 text-grey no-underline py-2 px-4 hover:underline hover:text-red-dark">Close</button>
      
      </div> */}
    </div>
  </div>
  )
}

export default NotesModal
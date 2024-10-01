"use client"
import React, { useEffect, useState } from "react";

const ChmicalCalcDetails = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("singleChemical"))
      : null;
  const newData = isClient ? data : {};
  return (
    <div className="text-black  bg-white  h-screen lg:p-10 p-5 w-full mb-20">
      <section className="flex flex-col gap-y-20  ">
        <div className="">
          <h2 className="text-xl text-center lg:text-2xl text-black font-bold mb-5">
            Original Chemical Mix
          </h2>
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-28 lg:gap-y-8 border-sanBlue border-2 lg:p-10 p-3 rounded-lg">
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Chemical Name</h1>
              <p className="text-lg text-black font-medium">{newData?.name}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Titration Count (Amount Used)</h1>
              <p className="text-lg text-black font-medium">{newData?.titrationCount}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Unit</h1>
              <p className="text-lg text-black font-medium">{newData?.unit}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Concentration</h1>
              <p className="text-lg text-black font-medium">{newData?.concentration}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Notes</h1>
              <p className="text-lg text-black font-medium">{newData?.note}</p>
            </div>
          </main>
        </div>

        <div className="">
          <h2 className="text-xl text-center lg:text-2xl text-black font-bold mb-5">
            New Chemical Mix
          </h2>
          <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-28 lg:gap-y-8 border-sanBlue border-2 lg:p-10 p-3 rounded-lg">
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Chemical Name</h1>
              <p className="text-lg text-black font-medium">{newData?.name}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Titration Count (Amount Used)</h1>
              <p className="text-lg text-black font-medium">{newData?.titrationCount}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Unit</h1>
              <p className="text-lg text-black font-medium">{newData?.unit}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Concentration</h1>
              <p className="text-lg text-black font-medium">{newData?.concentration}</p>
            </div>
            <div className="flex flex-col gap-2 border-black border-b pb-4">
              <h1 className="text-lg text-gray-500 font-thin">Notes</h1>
              <p className="text-lg text-black font-medium">{newData?.note}</p>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default ChmicalCalcDetails;

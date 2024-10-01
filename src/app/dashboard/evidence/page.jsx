"use client";
import { ItemsContext } from "@/components/context/items.context";
import EvidenceModal from "@/components/evidence/EvidenceModal";
import ModalComponent from "@/components/modals/Modal";
import useEvidence from "@/hooks/useEvidence";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
 
  const evidence = [
    {
      name: "Receipt",
      imageUrls: [
        "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      name: "Witness Statement",
      imageUrls: [
        "https://images.unsplash.com/photo-1595599512948-b9831e5fc11c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      name: "Video Recording",
      imageUrls: [
        "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1597962261938-8714a29fa42c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ], // Note: Only the first image URL will be displayed for videos
    },
    {
      name: "Fingerprint Analysis",
      imageUrls: [
        "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ], // No images for this evidence
    },
    {
      name: "DNA Sample",
      imageUrls: [
        "https://images.unsplash.com/photo-1582913130063-8318329a94a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1582913130063-8318329a94a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ], // No images for this evidence
    },
  ];
  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);
  const newRole = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { allEvidence, getEvidence, loading } = useEvidence();

  useEffect(() => {
    if(newRole?.toLocaleLowerCase() == 'admin'){ 
      getEvidence();
    }else{ 
      getEvidence(selectedFacilityId)
    }
   
  }, [selectedFacilityId]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }

  console.log("first", allEvidence);
  return (
    <div className="bg-white dark:bg-slate-800 text-black  h-screen lg:p-10 p-5 w-full">
      {" "}
      <header>
        <h1 className="text-xl lg:text-3xl text-black font-black dark:text-white ">
          Evidence
        </h1>
        <p className="text-gray-700 dark:text-white text-sm pt-2 lg:text-lg">
          View Evidence and Images upload fo each evidence
        </p>
      </header>
      <>
        {allEvidence?.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-6 mt-5 gap-4">
            {allEvidence?.map((item) => (
              <Link
                href={`/dashboard/evidence/${item?._id}`}
                key={item?._id}
                // onClick={() => {
                //   setItems(item?.evidence);
                //   openModal();
                // }}
                className="flex flex-col items-center space-y-2 cursor-pointer"
              >
                <Image
                  src="/file-evidence.png"
                  alt="Logo"
                  width={200}
                  height={120}
                  className="w-40 h-auto object-cover"
                />
                <p className="font-thin italic text-xs text-center text-black dark:text-white">{`${
                  item?.name
                } ${formatDate(item?.createdAt)}`}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full mt-10 lg:mt-20">
            <p className="text-red-500 font-bold ">No data available</p>
          </div>
        )}
      </>
      {loading && (
        <div className="fixed inset-0 transition-opacity z-[1000]">
          <div className="absolute  inset-0 bg-black opacity-50 flex justify-center items-center">
            <div className="relative">
              <div className="flex items-center justify-center pt-5">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <EvidenceModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
};

export default page;

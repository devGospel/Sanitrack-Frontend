"use client";
import BackButton from "@/components/BackButton";
import { ItemsContext } from "@/components/context/items.context";
import EvidenceModal from "@/components/evidence/EvidenceModal";
import EvidenceTabs from "@/components/evidence/EvidenceTabs";
import Spinner from "@/components/loaders/Loader";
import ModalComponent from "@/components/modals/Modal";
import useEvidence from "@/hooks/useEvidence";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Suspense, useContext, useEffect, useState } from "react";

const EvidenceTaskDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const params = useParams();
  const {
    allInspectorEvidenceTask,
    allCleanerEvidenceTask,
    getEvidenceTask,
    loading,
  } = useEvidence();

  useEffect(() => {
    getEvidenceTask(params?.id);
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }

  console.log("first", allInspectorEvidenceTask, allCleanerEvidenceTask);
  return (
    <div className="bg-white dark:bg-slate-800 text-black  h-screen lg:p-10 p-5 w-full">
      {" "}
      <div className="flex items-start">
        <BackButton />
        <header>
          <h1 className="text-xl lg:text-3xl text-black font-black dark:text-white ">
            Evidence
          </h1>
          <p className="text-gray-700 dark:text-white text-sm pt-2 lg:text-lg">
            View Evidence and Images upload fo each evidence
          </p>
        </header>
      </div>
      <Suspense fallback={<Spinner />}>
        <EvidenceTabs
          inspectors={allInspectorEvidenceTask}
          cleaners={allCleanerEvidenceTask}
          loading={false}
        />
      </Suspense>
       
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

export default EvidenceTaskDetails;

"use client";
import { setItem } from "@/redux/features/adminId/adminSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "../modals/Modal";
import EvidenceModal from "./EvidenceModal";
import NotesModal from "./NotesModal";

const SpecificEvidence = ({ newData, staffRole }) => {
  console.log('staff role is', staffRole)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [staffImages, setStaffImages] = useState([])
  const [staffNotes, setStaffNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noteCurrentIndex, setNoteCurrentIndex] = useState(0)

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < staffImages?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousNote = () => {
    if (noteCurrentIndex > 0) {
      setNoteCurrentIndex(noteCurrentIndex - 1);
    }
  };

  const handleNextNote = () => {
    if (noteCurrentIndex < staffNotes?.length - 1) {
      setNoteCurrentIndex(noteCurrentIndex + 1);
    }
  };
  const closeModal = () => {
    setCurrentIndex(0)
    setNoteCurrentIndex(0)
    setIsModalOpen(false);
  };

  const closeNoteModal = () => {
    setCurrentIndex(0)
    setNoteCurrentIndex(0)
    setIsNoteModalOpen(false);
  };

  const handleImageDisplay = (e, data) => { 
    e.preventDefault()
    console.log('user clicked on the evidence folder for a staff', data)

    const evidenceImages = data.flatMap((evidenceItem) =>
      evidenceItem.evidence.images.map((image, index) => ({ 
        url: image?.url, 
        role: staffRole === 'inspector' 
          ? evidenceItem.inspector 
          : evidenceItem.cleaner,
      }))
    )

    console.log('settt',evidenceImages)
    setStaffImages(evidenceImages)
    // open the modal to show the images
    setIsModalOpen(true)
  }

  const handleNotesDisplay = (e, data) => { 
    e.preventDefault()

    const evidenceNotes = data.flatMap((evidenceItem) =>
      evidenceItem.evidence.notes.map((note) => ({ 
        note: note?.note !== undefined ? note?.note  : "No note uploaded", 
        role: staffRole === 'inspector' 
          ? evidenceItem.inspector 
          : evidenceItem.cleaner,
      }))
    )
    setStaffNotes(evidenceNotes)
    setIsNoteModalOpen(true)
  }

  return (
    <div>
      <>
        {newData?.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-6 mt-5 gap-4">
            <span
              onClick={(e) => {handleImageDisplay(e, newData)}}
              className="flex flex-col items-center space-y-2 cursor-pointer"
            >
              <Image
                src="/file-evidence.png"
                alt="Logo"
                width={200}
                height={120}
                className="w-40 h-auto object-cover"
              />
              <p className="font-thin italic text-xs text-center text-black dark:text-white">
                Image Evidence
              </p>
            </span>

            <span
           
              onClick={(e) => {handleNotesDisplay(e, newData)}}
              className="flex flex-col items-center space-y-2 cursor-pointer"
            >
              <Image
                src="/file-evidence-blue.png"
                alt="Logo"
                width={200}
                height={120}
                className="w-40 h-auto object-cover"
              />
              <p className="font-thin italic text-xs text-center text-black dark:text-white">
                Notes
              </p>
            </span>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full mt-10 lg:mt-20">
            <p className="text-red-500 font-bold">No data available</p>
          </div>
        )}
      </>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}
      >
        <div className="p-5">
         {staffImages.length > 0 ? (
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
              <p>Uploaded by: {staffImages[currentIndex]?.role?.username}</p>
              <Image
                src={staffImages[currentIndex]?.url}
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
                currentIndex === staffImages?.length - 1
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={handleNext}
              disabled={currentIndex === staffImages?.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold  text-sm text-center pt-5">
          No Evidence Uploaded by Inspector
        </p>
      )}
         </div>
        {/* <EvidenceModal closeModal={closeModal} /> */}
      </ModalComponent>

      <ModalComponent
        isOpen={isNoteModalOpen}
        onClose={closeNoteModal}
        setIsModalOpen={setIsNoteModalOpen}
      >
         <div className="p-5">
         {staffNotes.length > 0 ? (
        <div className="w-full gap-3 mt-3">
          <span>
            {" "}
            <div className="relative">
              <p>Uploaded by: {staffNotes[noteCurrentIndex]?.role?.username}</p>
              <textarea 
                readOnly 
                value={`${staffNotes[noteCurrentIndex]?.note}`} 
                className="w-full mt-2 p-2 border rounded"
              ></textarea>
            </div>
          </span>
          <div className="flex justify-between items-center mt-5">
            <button
              className={`px-3 py-2 text-white shadow-md ${
                noteCurrentIndex === 0
                  ? "bg-red-100 cursor-not-allowed"
                  : "bg-red-500 "
              }`}
              onClick={handlePreviousNote}
              disabled={noteCurrentIndex === 0}
            >
              Previous
            </button>
            <button
              className={` px-3 py-2 text-white shadow-md ${
                noteCurrentIndex === staffNotes?.length - 1
                  ? "bg-green-200 cursor-not-allowed"
                  : "bg-green-500"
              }`}
              onClick={handleNextNote}
              disabled={noteCurrentIndex === staffNotes?.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold  text-sm text-center pt-5">
          No Note uploaded
        </p>
      )}
         </div>
        {/* <NotesModal closeModal={closeNoteModal} /> */}
      </ModalComponent>
    </div>
  );
};

export default SpecificEvidence;

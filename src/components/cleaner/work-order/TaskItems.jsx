"use client";
import ModalComponent from "@/components/modals/Modal";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import NoteModal from "../modals/NoteModal";
import axios, { Axios } from "axios";
import { toast, Flip } from "react-toastify";
import useWorkOrder from "@/hooks/useWorkOrder";
import { IoTrashBin } from "react-icons/io5";
import ImagesModal from "../modals/ImagesModal";
import Modal from "react-modal";
const url = `${process.env.NEXT_PUBLIC_BASE_URL}cleaner/upload`;

const TaskItems = ({
  name,
  taskType,
  workOrderTaskId,
  id,
  // key,
  upload,
  workOrderId,
  workOrderImage = [],
  workOrderNote,
  workOrderEvidenceId,
  params,
}) => {
  console.log("yupye", workOrderNote);
  const fileInputRef = useRef(null);
  const { uploadCleanerEvidence, deleteCleanerImage, buttonLoading, success } =
    useWorkOrder();
  const [images, setImages] = useState(workOrderImage);
  const [storedNotes, setStoredNotes] = useState(workOrderNote);
  // Use useEffect to update local state when workOrderImage prop changes
  // useEffect(() => {
  //   // console.log('not equal')
  //   setImages(workOrderImage);

  //   // console.log('things', workOrderImage)
  // }, [workOrderImage]);
  // useEffect(() => {
  //   // console.log('not equal')
  //   setStoredNotes(workOrderNote);

  //   // console.log('things', workOrderImage)
  // }, [workOrderNote]);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpload, setIsModalOpenUpload] = useState(false);
  const [uploadId, setUploadId] = useState(upload);
  useEffect(() => {
    setUploadId(upload);
    console.log(`work order images updated`);
  }, [upload]); // Dependency array, updates when workOrderImage changes

  console.log("items", images);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModalUpload = (e) => {
    e.preventDefault();
    setIsModalOpenUpload(true);
  };

  const closeModalUpload = () => {
    setIsModalOpenUpload(false);
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleAddNote = async (note) => {
    // console.log(
    //   `note added for workOrder ${workOrderId} and task => ${workOrderTaskId}`
    // );
    // console.log('I called you when I click on the btn')
    // console.log('The note I am passing is ', note)
    const formData = new FormData();
    formData.append("workOrderId", workOrderId);
    formData.append("note", note);

    try {
      const newNote = await uploadCleanerEvidence(
        formData,
        workOrderTaskId,
        closeModal,
        params?.id
      );
      // setUploadId(newImage?._id);
      console.log("helllo",newNote)
      setStoredNotes(newNote?.notes); // Update state with new image
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
    // uploadCleanerEvidence(formData, workOrderTaskId, closeModal, params?.id);
  };

  const handleFileChange = async (event) => {
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("workOrderId", workOrderId);
    formData.append("image", files);

    try {
      const newImage = await uploadCleanerEvidence(
        formData,
        workOrderTaskId,
        closeModal,
        params?.id
      ); // Assume this returns the new image object
      setUploadId(newImage?._id);
      setImages(newImage?.images); // Update state with new image
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }

    // console.log(files);
    // const newImages = files.map((file) => URL.createObjectURL(file));
    // setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };
  // console.log(images);
  const handleRemoveImage = async (id, data) => {
    const payloadData = { publicId: data };
    await deleteCleanerImage(id, payloadData);
    const newImages = images.filter((img) => data !== img.public_url);
    setImages(newImages);
  };

  return (
    <div
      // key={key}
      className="flex flex-col border  py-2 gap-1 bg-slate-50 dark:bg-black rounded-md"
    >
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="font-semibold dark:text-slate-50">{name}</h1>
          <p className="text-sm font-extralight dark:text-slate-50">
            {taskType}
          </p>
        </div>
        {/* <div className=" font-bold text-xs flex items-center gap-1">
          <Image
            height={15}
            width={15}
            src="/scan.png"
            alt="uploadImage"
            className=" object-cover rounded-lg"
          />
          <p className="dark:text-slate-50">Scan QR</p>
        </div> */}
      </div>
      <hr className="my-1 bg-gray-50 h-[2px] mx-2" />
      <div>
        {/* <div className="bg-slate-800 p-2 flex flex-wrap gap-4">
          {images?.length > 0 ? (
            images?.map((item) => (

              <div
                className="relative rounded-lg overflow-hidden shadow-md flex flex-wrap items-center justify-center"
                key={item._id}
              >
                <Image
                  height={500}
                  width={500}
                  src={item.url}
                  alt="Work Order"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute top-0 right-0">
                  <IoTrashBin
                    className="text-red-500 text-sm cursor-pointer"
                    onClick={(e) =>
                      handleRemoveImage(workOrderEvidenceId, item.public_url)
                    }
                  />
                </span>
              </div>
            ))
          ) : (
            <small className=" text-nowrap text-red-300">No images uploaded</small>
          )}
        </div> */}

        <div className="flex items-center justify-between mb-2 p-4">
          <button
            className="btn btn-sm"
            onClick={(e) => {
              openModalUpload(e);
            }}
          >
            Uploads
          </button>

          <div>
            <button
              onClick={(e) => {
                openModal(e);
              }}
              className="btn btn-sm"
            >
              <Image
                height={15}
                width={15}
                src="/group.png"
                alt="uploadImage"
                className="object-cover rounded-lg"
              />
              <p>Notes</p>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={()=> subtitle.style.color = '#f00'}
        onRequestClose={closeModal}
        // style={customStyles}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="Overlay"
        contentLabel="Add Note"
      >
        <NoteModal
          closeModal={closeModal}
          saveNote={handleAddNote}
          id={id}
          loading={buttonLoading}
          allNotes={storedNotes}
        />
      </Modal>
      <Modal
        isOpen={isModalOpenUpload}
        onRequestClose={closeModalUpload}
        setIsModalOpen={setIsModalOpenUpload}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="Overlay"
        contentLabel="Add Note"
      >
        <ImagesModal
          closeModal={closeModalUpload}
          uploadImage={handleFileChange}
          handleUpload={handleUploadClick}
          id={id}
          images={images}
          fileInputRef={fileInputRef}
          handleRemoveImage={handleRemoveImage}
          workOrderEvidenceId={workOrderEvidenceId}
          buttonLoading={buttonLoading}
        />
      </Modal>
    </div>
  );
};

export default TaskItems;

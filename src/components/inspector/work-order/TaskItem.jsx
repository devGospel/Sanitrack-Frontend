import NoteModal from "@/components/cleaner/modals/NoteModal";
import ModalComponent from "@/components/modals/Modal";
import useWorkOrder from "@/hooks/useWorkOrder";
import Image from "next/image";
import { IoTrashBin } from "react-icons/io5";
import React, { useState, useRef, useEffect } from "react";
import ImagesModal from "@/components/cleaner/modals/ImagesModal";
import CleanerImagesModal from "./modals/CleanerEvidenceModal";
import { useDispatch } from "react-redux";
import { setItem } from "@/redux/features/adminId/adminSlice";
import Modal from "react-modal";
const url = `${process.env.NEXT_PUBLIC_BASE_URL}inspector/upload`;

const TaskItem = ({
  upload,
  name,
  taskType,
  workOrderTaskId,
  id,
  workOrderId,
  workOrderImage = [],
  workOrderNote,
  workOrderEvidenceId,
  taskStatuses,
  toggle,
  cleanerEvidence,
  params,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const { uploadInspectorEvidence, buttonLoading, deleteInspectorImage } =
    useWorkOrder();
  let subtitle;
  const dispatch = useDispatch();
  const [storedNotes, setStoredNotes] = useState(workOrderNote);
  const [isModalOpenUpload, setIsModalOpenUpload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleanerModalOpen, setIsCleanerModalOpen] = useState(false);
  // const [selectedImages, setSelectedImages] = useState([]);
  const openModalUpload = (e) => {
    e.preventDefault();
    setIsModalOpenUpload(true);
  };

  const closeModalUpload = () => {
    setIsModalOpenUpload(false);
  };

  const openCleanerModalUpload = (e) => {
    e.preventDefault();
    setIsCleanerModalOpen(true);
  };

  const closeCleanerModalUpload = () => {
    setIsCleanerModalOpen(false);
  };
  const [images, setImages] = useState(workOrderImage);
  // useEffect(() => {
  //   // Only update if the new prop is different from the current state
  //   if (workOrderImage !== images) {
  //     setImages(workOrderImage);
  //     console.log(`work order images updated`, workOrderEvidenceId);
  //   }
  // }, [workOrderImage]);

  const fileInputRef = useRef(null);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddNote = async (note) => {
    console.log("bitch I passed a note", note);
    const formData = new FormData();
    formData.append("workOrderId", workOrderId);
    formData.append("note", note);

    try {
      const newNote = await uploadInspectorEvidence(
        formData,
        workOrderTaskId,
        closeModal,
        params
      );
      // setUploadId(newImage?._id);
      console.log("helllo", newNote);
      setStoredNotes(newNote?.notes); // Update state with new image
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files[0];
    const formData = new FormData();
    formData.append("workOrderId", workOrderId);
    formData.append("image", files);

    const newImage = await uploadInspectorEvidence(
      formData,
      workOrderTaskId,
      closeModal,
      params
    );
    setImages(newImage?.images);
    // console.log(files)
    // const newImages = files.map((file) => URL.createObjectURL(file));
    // setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = async (id, data) => {
    const payloadData = { publicId: data };
    await deleteInspectorImage(id, payloadData);
    const newImages = images.filter((img) => data !== img.public_url);
    setImages(newImages);
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  return (
    <div className="flex flex-col border py-2 gap-1 dark:bg-black bg-slate-50 rounded-md mr-4">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="font-semibold dark:text-slate-50">{name}</h1>
          <p className="text-sm font-extralight dark:text-slate-50">
            {taskType}
          </p>
        </div>
        <label class="inline-flex items-center cursor-pointer">
          <span class="mr-3 text-xs lg:text-sm  font-medium text-gray-900 dark:text-gray-300">
            Fail
          </span>
          <input
            type="checkbox"
            onChange={() => toggle(workOrderTaskId)}
            checked={taskStatuses.find((task) => task.task_id === id)?.status}
            value=""
            class="sr-only peer"
          />
          <div class="relative w-6 lg:w-11 h-4 lg:h-6 bg-red-500 peer-focus:outline-none  rounded-full peer dark:bg-red-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-3 after:h-3 lg:after:h-5 lg:after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span class="ms-3 text-xs lg:text-sm font-medium text-gray-900 dark:text-gray-300">
            Pass
          </span>
        </label>
        {/* <div className="flex gap-2 items-center">
        
          <input
            type="checkbox"
            checked={taskStatuses.find((task) => task.task_id === id)?.status}
           
          />
          <label className="dark:text-white text-black">
            {taskStatuses.find((task) => task.task_id === workOrderTaskId)
              ?.status
              ? "Pass"
              : "Fail"}
          </label>
        </div> */}
      </div>
      <hr className="my-1 bg-gray-50 h-[2px] mx-2" />

      {/* <div className="bg-slate-500 p-2 flex flex-wrap gap-4">
          {images.length > 0 ? (
            images.map((item) => (
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
                    onClick={(e) => handleRemoveImage(workOrderEvidenceId, item.public_url)}
                  />
                </span>
              </div>
            ))
          ) : (
            <p>No images uploaded</p>
          )}
        </div> */}
      <div className="flex items-center justify-between mb-2 px-4">
        {/* <button className="btn btn-sm bg-sanBlue text-white" onClick={handleUploadClick}>
          Upload
        </button>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        /> */}
        <button
          className="btn btn-xs lg:btn-sm bg-sanBlue text-white"
          onClick={(e) => {
            openModalUpload(e);
          }}
        >
          Uploads
        </button>
        <button
          className="btn btn-xs lg:btn-sm bg-sanBlue text-white"
          onClick={(e) => {
            openCleanerModalUpload(e);
            // dispatch(setItem())
          }}
        >
          Cleaner Uploads
        </button>
        <div>
          <button
            onClick={(e) => {
              openModal(e);
            }}
            className="btn btn-xs lg:btn-sm bg-sanBlue text-white"
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
      <div className="px-4">
        {/* {selectedImages.map((image, index) => (
          <div key={index} className="relative inline-block m-1">
            <Image
              src={image}
              alt={`Selected image ${index + 1}`}
              width={100}
              height={100}
              className="rounded-full h-10 w-10"
            />
            <button
              onClick={() => handleRemoveImage(image)}
              className="absolute top-0 right-0 bg-red-500 h-5 w-5 rounded-full flex items-start justify-center"
            >
              <p className=" text-xs font-semibold text-white">x</p>
            </button>
          </div>
        ))} */}
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        // onAfterOpen={()=> subtitle.style.color = '#f00'}
        onRequestClose={closeModal}
        style={customStyles}
        // contentLabel="Example Modal"
      ></Modal> */}
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
          // loading={buttonLoading}
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
          buttonLoading={buttonLoading}
          uploadImage={handleFileChange}
          handleUpload={handleUploadClick}
          id={id}
          images={images}
          fileInputRef={fileInputRef}
          handleRemoveImage={handleRemoveImage}
          workOrderEvidenceId={workOrderEvidenceId}
        />
      </Modal>
      <Modal
        isOpen={isCleanerModalOpen}
        onRequestClose={closeCleanerModalUpload}
        setIsModalOpen={setIsCleanerModalOpen}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="Overlay"
        contentLabel="Add Note"
      >
        <CleanerImagesModal
          closeModal={closeCleanerModalUpload}
          id={id}
          workOrderEvidenceId={workOrderEvidenceId}
          data={cleanerEvidence ?? []}
        />
      </Modal>
    </div>
  );
};

export default TaskItem;

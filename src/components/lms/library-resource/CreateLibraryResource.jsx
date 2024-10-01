"use client";

import React, { useContext, useState } from "react";
import { BiArrowBack, BiCheck } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";
import LmsHeader from "@/components/lms/LmsHeader";
import Image from "next/image";
import { FaUpload } from "react-icons/fa";
import ModalComponent from "@/components/modals/Modal";
import { MdCancel } from "react-icons/md";
import BackButton from "@/components/BackButton";
import { ItemsContext } from "@/components/context/items.context";
import { Flip, ToastContainer, toast } from "react-toastify";
import useResources from "@/hooks/useResource";

const CreateLibraryResource = () => {
  const { addResource, buttonLoader } = useResources();
  const [selectedType, setSelectedType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const { updateData, data } = useContext(ItemsContext);
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateData("thumbnailUrl", e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      updateData("resourceUrls", e.target.files[0]);
      setShowModal(false);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedType(e.target.value);
    setShowModal(true);
    updateData("resourceType", e.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(data).length === 4) {
      const formData = new FormData();
      formData.append("resourceType", data?.resourceType);
      formData.append("resourceUrls", data?.resourceUrls);
      formData.append("thumbnailUrl", data?.thumbnailUrl);
      formData.append("resourceTitle", data?.resourceTitle);
      addResource(formData);
    }
    if (Object.keys(data).length < 4) {
      toast.error("Please select all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }
  };
  return (
    <>
      {/* <LmsHeader /> */}
      <ToastContainer />
      <div className="flex items-center gap-4 mt-6 lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">Create Library Resource</h2>
      </div>
      <form className=" flex flex-col gap-3 lg:gap-5 lg:px-10 px-5 mt-8 ">
        <h1 className=" text-lg text-gray-600">Resource Thumbnail</h1>
        <div className=" flex flex-col lg:flex-row gap-8 lg:max-w-2xl">
          <div className=" p-6 h-[200px] min-w-[250px] flex items-center justify-center bg-gray-200 rounded-md">
            {image ? (
              <Image
                height={1000}
                width={1000}
                src={image}
                alt="uploadImage"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Image
                height={1000}
                width={1000}
                src={"/img-upload.png"}
                alt="uploadImage"
                className="w-[120px] h-[120px] object-cover rounded-lg"
              />
            )}
          </div>
          <div className=" flex flex-col gap-4">
            <p className=" text-gray-400">
              Upload your course Thumbnail here. Important guidelines: 1200x800
              pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or .png
            </p>
            <div className="relative  border-gray-400 rounded-lg  cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
              <button className=" bg-blue-200 rounded-sm p-3 cursor-pointer flex flex-row gap-4 items-center">
                <span>Upload image</span>
                <span className=" text-blue-400">
                  <FaUpload />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row gap-8 w-full ">
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="p-3 border rounded w-full text-gray-600 text-lg"
              placeholder="Resource Title"
              // value={title}
              onChange={(e) => updateData("resourceTitle", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <select
              value={selectedType}
              onChange={handleSelectChange}
              className="p-4 border rounded w-full"
            >
              <option value="" className=" text-gray-600 text- p-2">
                Resource Type
              </option>
              <option value="PDF" className=" text-gray-600 text-lg p-2">
                PDF
              </option>
              <option value="Video" className=" text-gray-600 text-lg p-2">
                Video
              </option>
              <option value="Article" className=" text-gray-600 text-lg p-2">
                Article
              </option>
            </select>
            {file && (
              <div className="mt-4 p-2 border flex justify-between items-center border-green-400 rounded">
                <span>{file.name}</span>
                <span className=" text-white p-1 bg-green-500 rounded-full">
                  <BiCheck />
                </span>
              </div>
            )}
          </div>
        </div>

        <div className=" flex flex-row items-center justify-between pb-9">
          <button className=" text-blue-500 font-semibold bg-blue-100 rounded-sm p-2 w-[150px] text-center">
            Cancel
          </button>
          <button
            // type="submit"
            disabled={buttonLoader}
            onClick={handleSubmit}
            className=" text-white font-semibold bg-blue-600 rounded-sm p-2 w-[150px] text-center"
          >
            {buttonLoader ? "Loading..." : "Save"}
          </button>
        </div>
      </form>

      {showModal && (
        <ModalComponent
          isOpen={showModal}
          setIsModalOpen={setShowModal}
          onClose={handleModalClose}
        >
          <div className=" flex items-center flex-col">
            <div className="bg-white flex flex-col gap-5 p-5 rounded-lg max-w-md w-full">
              <div className=" flex flex-row justify-between items-center">
                <h3 className="text-xl mb- text-blue-500">
                  Upload {selectedType.toUpperCase()}
                </h3>
                <span
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className=" p-1 ring-1 ring-blue-300 rounded-full text-blue-400 cursor-pointer"
                >
                  <MdCancel />
                </span>
              </div>

              <div className="relative  border-gray-400 rounded-lg  cursor-pointer">
                <input
                  type="file"
                  accept={
                    selectedType === "PDF"
                      ? ".pdf"
                      : selectedType === "Video"
                      ? "Video/*"
                      : "text/*"
                  }
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <button className=" bg-red-100 rounded-sm text-red-500 text-lg p-4 w-full cursor-pointer items-center flex flex-col gap-4 items-cente">
                  {selectedType === "PDF" && (
                    <>
                      <Image
                        height={1000}
                        width={1000}
                        src={"/upload-icon.svg"}
                        alt="uploadImage"
                        className="w-[50px] h-[50px] object-cover rounded-lg"
                      />
                      <span>Upload PDF DOC.PPTX</span>
                    </>
                  )}
                  {selectedType === "Video" && (
                    <>
                      <Image
                        height={1000}
                        width={1000}
                        src={"/upload-icon.svg"}
                        alt="uploadImage"
                        className="w-[50px] h-[50px] object-cover rounded-lg"
                      />
                      <span>Upload Video MP4.MOV</span>
                    </>
                  )}
                  {selectedType === "Article" && (
                    <>
                      <Image
                        height={1000}
                        width={1000}
                        src={"/upload-icon.svg"}
                        alt="uploadImage"
                        className="w-[50px] h-[50px] object-cover rounded-lg"
                      />
                      <span>Upload Article</span>
                    </>
                  )}
                </button>
              </div>

              {file && (
                <div className="mt-4 p-2 border flex justify-between items-center border-green-400 rounded">
                  <span>{file.name}</span>
                  <span className=" text-white p-1 bg-green-500 rounded-full">
                    <BiCheck />
                  </span>
                </div>
              )}

              <div className="flex justify-end w-full">
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="p-3 bg-blue-500 text-white rounded-sm w-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </>
  );
};

export default CreateLibraryResource;

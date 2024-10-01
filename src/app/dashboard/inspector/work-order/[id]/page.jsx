"use client";
import BackButton from "@/components/BackButton";
import GeneralNoteModal from "@/components/cleaner/modals/GeneralNotes";
import TaskItem from "@/components/inspector/work-order/TaskItem";
import ModalComponent from "@/components/modals/Modal";
import useFetch from "@/hooks/useFetch";
import useWorkOrder from "@/hooks/useWorkOrder";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleTask = ({ params }) => {
  // const { data, isLoading } = useFetch(`/inspector/asset/?roomId=${params.id}`);
  const {
    submitInspectorTask,
    buttonLoading,
    getInspectorWorkOrder,
    allInspectorWorkOrder,
  } = useWorkOrder();
  // console.log(data);
  const [taskStatuses, setTaskStatuses] = useState([]); //creates the structure for submission
  const [formattedCleanerEvidence, setCleanerEvidence] = useState([]);

  useEffect(() => {
    const formatCleanerEvidence = (allInspectorWorkOrder) => {
      return (
        allInspectorWorkOrder?.flatMap((item) =>
          item.cleanerEvidence.flatMap((cleaner) =>
            cleaner.evidence.images.map((image) => ({
              _id: image._id,
              url: image.url,
              public_url: image.public_url,
              uploadedAt: image.uploadedAt,
            }))
          )
        ) || []
      );
    };

    // Format cleaner evidence and update state
    const formattedEvidence = formatCleanerEvidence(allInspectorWorkOrder);
    setCleanerEvidence(formattedEvidence);

    // Log formatted evidence for debugging
    console.log("Formatted Cleaner Evidence:", formattedEvidence);
  }, [allInspectorWorkOrder]);

  useEffect(() => {
    getInspectorWorkOrder(params.id);
  }, []);

  useEffect(() => {
    setTaskStatuses(
      allInspectorWorkOrder?.map((item) => ({
        task_id: item?.details?.workOrderTaskId,
        status: false,
      }))
    );
  }, [allInspectorWorkOrder]);

  console.log("hey", taskStatuses);
  // Function to toggle checkbox status
  const toggleTaskStatus = (taskId) => {
    setTaskStatuses((prevStatuses) =>
      prevStatuses.map((task) =>
        task?.task_id === taskId ? { ...task, status: !task?.status } : task
      )
    );
  };

  useEffect(() => {
    console.log("heyy from inspector", allInspectorWorkOrder);
  }, []);

  // Function to handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Task Statuses:", taskStatuses);

    // "tasks": [
    //     {"task_id": "66aa0de77db209c7e909f535", "status": true} //true means pass. false means fail
    // ]
    const data = { tasks: taskStatuses };
    submitInspectorTask(data);
  };
  const [generalNotes, setGeneralNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  var settings = {
    dots: true,
    infinite: allInspectorWorkOrder.length > 3,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplaySpeed: 5000,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {allInspectorWorkOrder.length === 0 ? (
        <div className="flex justify-center items-center w-full h-screen">
          <p className="font-bold text-red-500">
            No work Order available for this room{" "}
          </p>
        </div>
      ) : (
        <div className="relative text-black flex flex-col gap-4 dark:bg-slate-900 h-screen max-h-screen overflow-y-auto  bg-white lg:px-10 px-5 py-5 w-full">
          <div className="flex w-full lg:w-3/5  items-center mt-2">
            <BackButton />
            <h2 className="text-xl font-bold dark:text-slate-50">
              {allInspectorWorkOrder[0]?.roomDetails?.roomName ??
                "Room Name"}
            </h2>
          </div>
          {allInspectorWorkOrder?.length === 0 ? (
            <div className="flex  justify-center  w-full pt-5">
              <p className="text-red-500 font-serif text-xl">
                No data available
              </p>
            </div>
          ) : (
            <div className="">
              <Slider {...settings} className={""}>
                {allInspectorWorkOrder?.map((item) => (
                  <TaskItem
                    upload={item?.workOrderEvidence?._id}
                    name={item?.details?.workOrder?.assetId?.name}
                    taskType={
                      item?.details?.workOrder?.assetTaskType?.cleaningType
                        ?.name
                    }
                    workOrderTaskId={item.details?.workOrderTaskId}
                    key={item.details?.workOrderTaskId}
                    // assetId={item?.workOrder?.assetTaskType?.assetId}
                    workOrderId={item?.details?.workOrderId}
                    cleanerEvidence={item?.cleanerEvidence}
                    workOrderImage={item?.workOrderEvidence?.evidence?.images}
                    cleanerWorkOrderImage={formattedCleanerEvidence}
                    workOrderNote={item?.workOrderEvidence?.evidence?.notes}
                    workOrderEvidenceId={item?.workOrderEvidence?._id}
                    taskStatuses={taskStatuses}
                    toggle={toggleTaskStatus}
                    params={params}
                  />
                ))}
              </Slider>
            </div>
          )}
          <div className="flex items-center justify-center">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border-base-300 border mb-4 bg-white dark:bg-black"
            >
              <div className="collapse-title text-lg font-semibold dark:text-slate-50">
                General Evidence & Notes
                <p className="text-red-500 text-xs">Not working yet</p>
              </div>
              <div className="collapse-content flex gap-2 flex-wrap items-center">
                <div className=" flex-1">
                  <div
                    onClick={() => {
                      openModal();
                    }}
                    className="flex cursor-pointer w-full items-center justify-between border py-4  flex-1 px-4 gap-1  bg-blue-100 dark:bg-black"
                  >
                    <h1 className=" dark:text-slate-50">Note</h1>
                    <Image
                      height={25}
                      width={25}
                      src="/arrow-up.png"
                      alt="uploadImage"
                      className=" object-cover rounded-lg !text-black"
                    />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between border flex-1 px-4 py-4 gap-1  bg-slate-50 dark:bg-black">
                  <h1 className=" dark:text-slate-50">Evidence</h1>
                  <Image
                    height={25}
                    width={25}
                    src="/arrow-up.png"
                    alt="uploadImage"
                    className=" object-cover rounded-lg !text-black"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border-base-300 border mb-4 bg-white dark:bg-black"
            >
              <div className="collapse-title text-lg font-semibold dark:text-slate-50">
                Details
              </div>

              {allInspectorWorkOrder?.length === 0 ? (
                <div className="flex  justify-center  w-full pt-5">
                  <p className="text-red-500 font-serif text-xl">
                    No data available
                  </p>
                </div>
              ) : (
                <div className="collapse-content flex gap-1 flex-col">
                  {allInspectorWorkOrder.map((item) => (
                    <div>
                      <div className="flex items-center  flex-1 px-4 gap-1">
                        <b className="text-sm dark:text-slate-50">Date:</b>
                        <span className="text-xs font-extralight dark:text-slate-50">
                          {item?.workOrderSchedule?.startDate?.split("T")[0]}
                        </span>
                      </div>
                      <div className="flex items-center  flex-1 px-4 gap-1">
                        <b className="text-sm dark:text-slate-50">Time:</b>
                        <span className="text-xs font-extralight dark:text-slate-50">
                          {item?.workOrderSchedule?.startDate
                            ?.split("T")[1]
                            .split(":")
                            .slice(0, 2)
                            .join(":")}
                        </span>
                      </div>
                      {/* <div className="flex items-center  flex-1 px-4 gap-1">
                      <b className=" dark:text-slate-50 text-sm">Duration:</b>
                      <span className="text-xs font-extralight dark:text-slate-50">
                        2 weeks
                      </span>
                    </div>
                    <div className="flex  items-center flex-1 px-4 gap-1">
                      <b className="text-sm dark:text-slate-50">Frequency:</b>
                      <span className="text-xs font-extralight dark:text-slate-50">
                        Weekly
                      </span>
                    </div> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              tabIndex={0}
              className="collapse collapse-arrow border-base-300 border mb-4 bg-white dark:bg-black"
            >
              <div className="collapse-title text-lg font-semibold dark:text-slate-50">
                Resources
                <p className="text-xs font-extralight dark:text-slate-50">
                  1 PDF, 1 Video
                </p>
                <p className="text-red-500 text-xs">Not working yet</p>
              </div>
              <div className="collapse-content flex gap-2 flex-wrap items-center">
                <div className="flex w-full items-center justify-between border py-4 dark:bg-black  flex-1 px-4 gap-1  bg-blue-100">
                  <div className="flex items-center gap-2 justify-center">
                    <Image
                      alt="uploadImage"
                      height={25}
                      width={25}
                      src="/profile.png"
                      className=" object-cover rounded-lg"
                    />
                    <h1 className="dark:text-slate-50">Note</h1>
                  </div>
                  <Image
                    height={25}
                    width={25}
                    src="/arrow-up.png"
                    alt="uploadImage"
                    className=" object-cover rounded-lg"
                  />
                </div>
                <div className="flex w-full items-center justify-between py-4 border  flex-1 px-4 gap-1  bg-slate-50 dark:bg-black">
                  <div className="flex items-center gap-2 justify-center">
                    <Image
                      alt="uploadImage"
                      height={25}
                      width={25}
                      src="/profile.png"
                      className=" object-cover rounded-lg"
                    />
                    <h1 className=" dark:text-slate-50">Note</h1>
                  </div>
                  <Image
                    height={25}
                    width={25}
                    src="/arrow-up.png"
                    alt="uploadImage"
                    className=" object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn dark:text-white "
            onClick={handleSubmit}
            disabled={buttonLoading}
          >
            {buttonLoading ? "Loading.." : " Submit Task"}
          </button>
          <ModalComponent
            isOpen={isModalOpen}
            onClose={closeModal}
            setIsModalOpen={setIsModalOpen}
          >
            <GeneralNoteModal
              closeModal={closeModal}
              setGeneralNotes={setGeneralNotes}
            />
          </ModalComponent>
        </div>
      )}
    </>
  );
};

export default SingleTask;

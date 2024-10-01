"use client";
import BackButton from "@/components/BackButton";
import GeneralNoteModal from "@/components/cleaner/modals/GeneralNotes";

import Stopwatch from "@/components/cleaner/work-order/Stopwatch";

import TaskItems from "@/components/cleaner/work-order/TaskItems";
import ModalComponent from "@/components/modals/Modal";
import useFetch from "@/hooks/useFetch";
import useWorkOrder from "@/hooks/useWorkOrder";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
const SingleTask = () => {
  const params = useParams();
  // const { data, loading } = useFetch(`/cleaner/asset-task?roomId=${params.id}`);
  const time = new Date();
  const {
    submitCleanerTask,
    buttonLoading,
    getCleanerWorkOrder,
    success,
    allCleanerWorkOrder,
  } = useWorkOrder();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCleanerWorkOrder(params.id);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [generalNotes, setGeneralNotes] = useState("");

  const ids = allCleanerWorkOrder?.map((item) => {
    return item?.details?.workOrderTaskId;
  });

  // const handlePrep = (e) => {
  //   e.preventDefault()
  //   const data = {workOrderTaskId: ids}
  //   console.log(`submitting`, data)
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { workOrderTaskId: ids };
    await submitCleanerTask(data);
  };
  console.log("dsss", ids);
  var settings = {
    dots: true,
    infinite: allCleanerWorkOrder?.length > 3,
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
      {allCleanerWorkOrder?.length === 0 ? (
        <div className="flex justify-center items-center w-full h-screen">
          <p className="font-bold text-red-500">
            No work Order available for this room{" "}
          </p>
        </div>
      ) : (
        <div className="text-black flex flex-col gap-4 dark:bg-slate-900 h-screen max-h-screen overflow-y-auto  bg-white lg:px-10 px-5 py-5 w-full">
          <div className="flex w-full lg:w-3/5  items-center mt-2">
            <BackButton />
            <h2 className="text-xl font-bold dark:text-slate-50"> {allCleanerWorkOrder[0]?.roomDetails?.roomName ??
                "Room Name"}</h2>
          </div>
          {allCleanerWorkOrder?.length === 0 ? (
            <div className="flex  justify-center  w-full pt-5">
              <p className="text-red-500 font-serif text-xl">
                No data available
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 lg:gap-y-4">
              <Stopwatch params={params} expiryTimestamp={time} />

              <div className="">
                <Slider {...settings}>
                  {allCleanerWorkOrder?.map((item) => {
                    
                    return (
                      <TaskItems
                        upload={item?.workOrderEvidence?._id}
                        name={item?.details?.workOrder?.assetId?.name}
                        taskType={
                          item?.details?.workOrder?.assetTaskType?.cleaningType
                            ?.name
                        }
                        params={params}
                        workOrderTaskId={item.details?.workOrderTaskId}
                        key={item.workOrder?.assetId?._id}
                        // assetId={item?.workOrder?.assetTaskType?.assetId}
                        workOrderId={item?.details?.workOrderId}
                        workOrderImage={
                          item?.workOrderEvidence?.evidence?.images
                        }
                        workOrderNote={item?.workOrderEvidence?.evidence?.notes}
                        workOrderEvidenceId={item?.workOrderEvidence?._id}
                        // taskTypeId={item?.workOrder?.assetTaskType?.cleaningType?._id}
                      />
                    );
                  })}
                </Slider>
              </div>
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

              {allCleanerWorkOrder?.length === 0 ? (
                <div className="flex  justify-center  w-full pt-5">
                  <p className="text-red-500 font-serif text-xl">
                    No data available
                  </p>
                </div>
              ) : (
                <div className="collapse-content flex gap-1 flex-col">
                  {allCleanerWorkOrder.map((item) => (
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

              <div className="collapse-content flex gap-2 flex-wrap items-center"></div>
            </div>
          </div>
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={buttonLoading}
          >
            {/* <Link href="/dashboard/cleaner/success"> */}
            {buttonLoading ? "Submitting..." : " Submit Task"}
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

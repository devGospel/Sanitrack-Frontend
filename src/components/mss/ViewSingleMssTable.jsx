"use client";

import Link from "next/link";
import React, { forwardRef, useEffect, useState } from "react";
import ModalComponent from "../modals/Modal";
import { usePathname } from "next/navigation";
import Spinner from "../loaders/Loader";
import FreePagination from "../pagination/FreePagination";
import { addDays, format, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import {
  getCurrentDateInLosAngeles,
  getNextDateInLosAngelesFormatted,
  getPreviousDateInLosAngelesFormatted,
} from "@/utils/getCurrentDate";

const ButtonInput = forwardRef(({ onClick, type }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="flex justify-start items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-sanBlue dark:text-white  border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    <FaCalendarAlt /> <p>Select a Specific Date</p>
  </button>
));
const ViewSingleMssTable = ({
  data,
  loading,
  selectedDate,
  setSelectedDate,
}) => {
  let searchTimeout;
  const [filtered, setFiltered] = useState([]);
  console.log("late", data);
  useEffect(() => {
    setFiltered(data);
  }, [data]);
  const [startDate, setStartDate] = useState(new Date());

  const onStartChange = (date) => {
    // const [start, end] = dates;
    setSelectedDate(format(date, "yyyy-MM-dd"));
    console.log(format(date, "yyyy-MM-dd"));
  };
  // console.log(format(getCurrentDateInLosAngeles(), "yyyy-MM-dd"), selectedDate)

  // const isActive = (type) => {
  //   const today = new Date();
  //   switch (type) {
  //     case "yesterday":
  //       return selectedDate === getPreviousDateInLosAngelesFormatted();
  //     case "today":
  //       return (
  //         format(selectedDate, "yyyy-MM-dd") ===
  //         format(getCurrentDateInLosAngeles(), "yyyy-MM-dd")
  //       );
  //     case "tomorrow":
  //       return selectedDate === getNextDateInLosAngelesFormatted();
  //     default:
  //       return "today";
  //   }
  // };

  // Function to set the date based on the tab selected
  // const handleTabClick = (type) => {
  //   switch (type) {
  //     case "yesterday":
  //       setSelectedDate(getPreviousDateInLosAngelesFormatted());
  //       break;
  //     case "today":
  //       setSelectedDate(getCurrentDateInLosAngeles());
  //       break;
  //     case "tomorrow":
  //       setSelectedDate(getNextDateInLosAngelesFormatted());
  //       break;
  //     default:
  //       setSelectedDate(getCurrentDateInLosAngeles());
  //   }
  // };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(filtered?.length / itemsPerPage));
  };
  // const [filteredData, setFilteredData] = useState([]);
  // useEffect(() => {
  //   setFilteredData(currentItems);
  // }, [data]);
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (e.target.value.length > 0) {
        const filteredValue = data.filter(
          (item) =>
            item?.assetTaskType?.roomId?.roomName
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase()) ||
            item?.assetTaskType?.assetId?.name
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase())
        );
        console.log("ewo", filteredValue);
        setFiltered(filteredValue);
      }
      if (e.target.value === "") {
        setFiltered(data);
      }
    }, 1000);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    console.log("first", e.target.value);
    if (e.target.value === "Active") {
      const filteredValue = data.filter(
        (item) => item?.assetTaskType?.isActive
      );

      setFiltered(filteredValue);
    } else if (e.target.value === "Submitted") {
      const filteredValue = data.filter((item) => item?.mostRecentTask?.isDone);

      setFiltered(filteredValue);
    } else if (e.target.value === "all") {
      setFiltered(data);
    } else if (e.target.value === "yes") {
      const filteredValue = data.filter(
        (item) => item?.pastDue.toLowerCase() === "yes"
      );
      setFiltered(filteredValue);
    }
  };
  return (
    <div>
      <div className="flex lg:flex-row gap-y-4 items-center flex-col gap-x-4 w-full mb-5">
        <div className="w-full md:w-[70%]">
          <input
            type="search"
            onChange={handleSearch}
            className="w-full md:w-full p-3 border border-gray-500 dark:text-white focus-within:border-gray-500  focus:border-gray-500 rounded-lg text-sm"
            placeholder="Search by Item Name, Room Name or Asset"
          />
        </div>
        <span className="flex justify-end pt-3 pb-5 w-full md:w-[30%]">
          <select
            id="status"
            name={"status"}
            onChange={(e) => handleChangeStatus(e)}
            className="w-full lg:w-72 capitalize lg:py-1 bg-gray-100 border border-gray-500 h-12 rounded-lg sm:px-3    text-xs md:text-base text-black  border-none cursor-pointer focus-within:border-none"
          >
            <option hidden>Filter by Status</option>
            <option value="all">All</option>
            {/* <option value="Submitted">Submitted</option> */}
            <option value="Active">Approved</option>
            <option value="yes">Past Due</option>
          </select>
        </span>
      </div>
      {loading ? (
        <div class=" lg:mt-10 mt-5 shadow rounded-md   w-full mx-auto">
          <div className="animate-pulse flex flex-col space-x-4">
            <div className="grid  grid-cols-3  animate-pulse w-full mt-10">
              <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
              <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
              <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
            </div>
            <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
              {/* <div className="h-2 bg-slate-700 rounded"></div> */}
              <div className="">
                <div className="flex flex-col">
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                </div>
                {/* <div className="h-2 bg-slate-700 rounded"></div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Table data={currentItems} loading={loading} />
          <FreePagination
            itemsPerPage={itemsPerPage}
            totalItems={data?.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={currentPage}
            firstPage={firstPage}
            lastPage={lastPage}
          />
        </>
      )}
    </div>
  );
};

export default ViewSingleMssTable;

const Table = ({ data, loading }) => {
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [viewInspectorImageModal, setInspectorModal] = useState(false);
  const [inspectorEvidence, setInspectorEvidence] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleInspectorEvidence = (e, item) => {
    e.preventDefault();
    console.log(
      "we want to open the inspector modal ",
      item?.workOrderEvidence
    );
    // Map through workOrderEvidence to extract the required data
    const evidenceData = item.workOrderEvidence.flatMap((evidenceItem) =>
      evidenceItem?.evidence?.images?.map((image, index) => ({
        url: image?.url, // Extract the URL from each image
        inspector: evidenceItem?.inspector,
        note:
          evidenceItem?.evidence?.notes[index] !== undefined
            ? evidenceItem?.evidence?.notes[index]?.note
            : "No note uploaded",
      }))
    );

    setInspectorEvidence(evidenceData || []);
    setInspectorModal(true);
  };

  useEffect(() => {
    console.log("evidence is", inspectorEvidence);
  }, [inspectorEvidence]);
  const handleImageLoaded = () => {
    setIsLoading(false);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < inspectorEvidence?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const pathname = usePathname();

  const handleDelete = () => {
    setDelModalOpen(false);
  };

  return (
    <div className="w-full overflow-auto no-scrollbar  h-auto">
      <>
        {/* <p>
          {data[0]?.workOrderTask?.assetTaskType?.assetId?.assetPrefix}
          {data[0]?.workOrderTask?.assetTaskType?.assetId?.assetCode}_
          {data[0]?.workOrderTask?.assetTaskType?.assetId?.name}
        </p> */}
        <table className="w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Time
              </th>

              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset Code
              </th> */}
              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset
              </th> */}
              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Task
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Frequency
              </th> */}

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Cleaned
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Approved
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Past Due
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
               Duration
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Last Cleaned
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Inspector Evidence
              </th>
              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Next Clean Date
              </th> */}
            </tr>
          </thead>

          {data && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {data?.map((item, index) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  <td className="px-5 py-3   text-sm">{index + 1}</td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.scheduledDate
                        ? format(
                            item?.workOrderTask?.scheduledDate,
                            "yyyy-MM-dd"
                          )
                        : "N/A"}
                    </p>
                  </td>
                  <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.scheduledDate === "null" ||
                      item?.workOrderTask?.scheduledDate == null
                        ? "N/A"
                        :`${item?.workOrderTask?.scheduledDate.slice(11,16)}` 
                      }
                    </p>
                  </td>
                  {/* <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.workOrderTask?.assetTaskType?.assetId?.assetPrefix}${item?.workOrderTask?.assetTaskType?.assetId?.assetCode}`}
                    </p>
                  </td> */}
                  {/* <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.workOrderTask?.assetTaskType?.assetId?.name}`}
                    </p>
                  </td> */}
                  {/* <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.cleaningType?.name}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.cleaningTypeFrequency?.name}
                    </p>
                  </td> */}

                  <td className="px-5 py-3 text-sm">
                    <p
                      className={`whitespace-no-wrap text-sm capitalize ${
                        item?.pastDue === "Yes"
                          ? "text-red-500 font-bold"
                          : item?.workOrderTask?.isDone
                          ? "text-green-500"
                          : ""
                      }`}
                      key={item?.workOrderTask?._id}
                    >
                      {item?.workOrderTask?.isDone
                        ? "Yes"
                        : item?.pastDue === "N/A"
                        ? "N/A"
                        : "No"}
                    </p>
                  </td>

                  <td className="px-5 py-3 text-sm">
                    <p
                      className={`whitespace-no-wrap text-sm capitalize ${
                        item?.pastDue === "Yes"
                          ? "text-red-500 font-bold"
                          : item?.workOrderTask?.isApproved
                          ? "text-green-500"
                          : ""
                      }`}
                      key={item?.workOrderTask?._id}
                    >
                      {item?.workOrderTask?.isApproved
                        ? "Yes"
                        : item?.pastDue == "N/A"
                        ? "N/A"
                        : "No"}
                    </p>
                  </td>

                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize ${
                        item?.pastDue === "Yes"
                          ? "text-red-500 font-bold"
                          : "font-normal"
                      }`}
                    >
                      {item?.pastDue ? item?.pastDue : "N/A"}
                    </p>
                  </td>
                  {/* scheduled period  */}

                  {/* valid cleaning period */}
                  <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.validCleaningPeriod === "null" ||
                      item?.workOrderTask?.validCleaningPeriod == null
                        ? "N/A"
                        : `${item?.workOrderTask?.validCleaningPeriod.slice(
                            0,
                            10
                          )}_${item?.workOrderTask?.validCleaningPeriod.slice(
                            11,
                            16
                          )}`}
                    </p>
                  </td>

                  {/* last cleaned period  */}
                  <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.lastCleaned === "null" ||
                      item?.workOrderTask?.lastCleaned == null
                        ? "N/A"
                        : item?.workOrderTask?.lastCleaned?.slice(0, 10)}
                    </p>
                  </td>
                  <td className="px-5 py-3    text-sm ">
                    <button onClick={(e) => handleInspectorEvidence(e, item)}>
                      View
                    </button>
                  </td>
                  {/* <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.workOrderTask?.lastCleaned === "null" || item?.workOrderTask?.nextCleaned == null
                        ? "N/A"
                        : item?.workOrderTask?.nextCleaned?.slice(0, 10)}
                    </p>
                  </td> */}
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <ModalComponent
          isOpen={viewInspectorImageModal}
          onClose={() => setInspectorModal(false)}
          setIsModalOpen={setInspectorModal}
        >
          <div className="p-5">
            {inspectorEvidence.length > 0 ? (
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
                    <p>
                      Uploaded by:{" "}
                      {inspectorEvidence[currentIndex]?.inspector?.username}
                    </p>
                    <Image
                      src={inspectorEvidence[currentIndex]?.url}
                      onLoad={handleImageLoaded}
                      alt="Evidence Image"
                      width={500}
                      height={500}
                      className="w-full h-72 object-contain  cursor-pointer"
                    />
                    <p>Uploaded Note:</p>
                    <textarea
                      readOnly
                      value={`${inspectorEvidence[currentIndex]?.note}`}
                      className="w-full mt-2 p-2 border rounded"
                    ></textarea>
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
                      currentIndex === inspectorEvidence?.length - 1
                        ? "bg-green-200 cursor-not-allowed"
                        : "bg-green-500"
                    }`}
                    onClick={handleNext}
                    disabled={currentIndex === inspectorEvidence?.length - 1}
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
        </ModalComponent>
        {!loading && data?.length < 1 && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg font-bold">
              No Orders available
            </p>
          </div>
        )}
      </>
    </div>
  );
};

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
}

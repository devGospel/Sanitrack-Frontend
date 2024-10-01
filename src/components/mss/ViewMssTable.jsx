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
const ViewMssTable = ({ data, loading, selectedDate, setSelectedDate }) => {
  let searchTimeout;
  const [filtered, setFiltered] = useState([]);
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

  const isActive = (type) => {
    const today = new Date();
    switch (type) {
      case "yesterday":
        return selectedDate === getPreviousDateInLosAngelesFormatted();
      case "today":
        return (
          format(selectedDate, "yyyy-MM-dd") ===
          format(getCurrentDateInLosAngeles(), "yyyy-MM-dd")
        );
      case "tomorrow":
        return selectedDate === getNextDateInLosAngelesFormatted();
      default:
        return "today";
    }
  };

  // Function to set the date based on the tab selected
  const handleTabClick = (type) => {
    switch (type) {
      case "yesterday":
        setSelectedDate(getPreviousDateInLosAngelesFormatted());
        break;
      case "today":
        setSelectedDate(getCurrentDateInLosAngeles());
        break;
      case "tomorrow":
        setSelectedDate(getNextDateInLosAngelesFormatted());
        break;
      default:
        setSelectedDate(getCurrentDateInLosAngeles());
    }
  };
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
      <div className="flex lg:flex-row gap-y-4 items-center flex-col gap-x-4  mb-5 ">
        <div className="flex flex-col lg:flex-row w-full ">
          <button
            onClick={() => handleTabClick("yesterday")}
            className={`py-2 px-4 border-gray-300 border-r transition ${
              isActive("yesterday")
                ? "bg-white text-black w-full lg:w-72 shadow-lg"
                : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
            }`}
          >
            Yesterday
          </button>
          <button
            onClick={() => handleTabClick("today")}
            className={`py-2 px-4 border-gray-300 border-r transition ${
              isActive("today")
                ? "bg-white text-black w-full lg:w-72 shadow-lg"
                : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => handleTabClick("tomorrow")}
            className={`py-2 px-4 border-gray-300 border-r transition ${
              isActive("tomorrow")
                ? "bg-white text-black w-full lg:w-72 shadow-lg "
                : "bg-gray-400 text-black w-full lg:w-72 hover:bg-sanBlue hover:text-white"
            }`}
          >
            Tomorrow
          </button>
        </div>
        <div className="w-full">
          <DatePicker
            // selected={startDate}
            onChange={onStartChange}
            customInput={<ButtonInput type={"start"} />}
            showDisabledMonthNavigation
          />
        </div>

        {/* <div className="mt-8">
          <h2 className="text-xl font-bold">Selected Date:</h2>
          <p className="text-lg mt-2">{format(selectedDate, "yyyy-MM-dd")}</p>
        </div> */}
      </div>
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

export default ViewMssTable;

const Table = ({ data, loading }) => {
  const [delModalOpen, setDelModalOpen] = useState(false);
  const pathname = usePathname();

  const handleDelete = () => {
    setDelModalOpen(false);
  };

  return (
    <div className="w-full overflow-auto no-scrollbar  h-auto">
      <>
        <table className="w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Room
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset Code
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Asset
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Task
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Frequency
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Assigned To
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Supervised By
              </th>
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
                Last Cleaned
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Next Clean Date
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                
              </th>
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
                      {item?.assetTaskType?.roomId?.roomName}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.assetTaskType?.assetId?.assetPrefix}-${item?.assetTaskType?.assetId?.assetCode}`}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.assetTaskType?.assetId?.name}`}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTaskType?.cleaningType?.name}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.assetTaskType?.cleaningTypeFrequency?.name}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {Array.isArray(item.team) &&
                      item.team.length === 0 &&
                      Array.isArray(item.cleaner) &&
                      item.cleaner.length === 0
                        ? "NA"
                        : Array.isArray(item.team) && item.team.length > 0
                        ? item.team.map((t) => t.teamName).join(", ")
                        : Array.isArray(item.cleaner) && item.cleaner.length > 0
                        ? item.cleaner
                            .slice(0, 5)
                            .map((c) => c.username)
                            .join(", ")
                        : "NA"}
                    </p>
                  </td>

                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {Array.isArray(item.team) &&
                      item.team.length === 0 &&
                      Array.isArray(item.supervisor) &&
                      item.cleaner.length === 0
                        ? "NA"
                        : Array.isArray(item.supervisor) &&
                          item.supervisor.length > 0
                        ? item.supervisor
                            .slice(0, 5)
                            .map((c) => c.username)
                            .join(", ")
                        : Array.isArray(item.team) && item.team.length > 0
                        ? item.team.map((t) => t.teamName).join(", ")
                        : "NA"}
                    </p>
                  </td>

                  <td className="px-5 py-3 text-sm">
                    <p
                      className={`whitespace-no-wrap text-sm capitalize ${
                        item?.pastDue === "Yes"
                          ? "text-red-500 font-bold"
                          : item?.workOrderDetails?.isDone
                          ? "text-green-500"
                          : ""
                      }`}
                      key={item?.workOrderDetails?._id}
                    >
                      {item?.workOrderDetails?.isDone
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
                          : item?.workOrderDetails?.isApproved
                          ? "text-green-500"
                          : ""
                      }`}
                      key={item?.workOrderDetails?._id}
                    >
                      {item?.workOrderDetails?.isApproved
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
                      {item?.pastDue === "N/A" || item?.pastDue === null
                        ? "N/A"
                        : item?.pastDue}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.lastCleaned === "null" || item?.lastCleaned == null
                        ? "N/A"
                        : item?.lastCleaned?.slice(0, 10)}
                    </p>
                  </td>
                  <td className="px-5 py-3    text-sm ">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.lastCleaned === "null" || item?.nextCleaned == null
                        ? "N/A"
                        : item?.nextCleaned?.slice(0, 10)}
                    </p>
                  </td>
                  <td className="px-5 py-3    text-sm ">
                    <Link
                    href={`/dashboard/mss/${item?.assetTaskType._id}`}
                      className={` whitespace-no-wrap text-sm font-normal    capitalize rounded bg-white text-black p-2`}
                    >
                     View
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          )}
        </table>

        <ModalComponent
          isOpen={delModalOpen}
          onClose={() => setDelModalOpen(false)}
          setIsModalOpen={setDelModalOpen}
        >
          <div className="p-4 py-6">
            <h2 className="text-lg font-semibold py-2">Delete Work Order?</h2>
            <p className="text-gray-500 py-2">
              Are you sure you want to delete work order?
            </p>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setDelModalOpen(false)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  disabled={loading}
                  onClick={handleDelete}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  {loading ? <Spinner /> : "Delete"}
                </button>
              </span>
            </div>
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

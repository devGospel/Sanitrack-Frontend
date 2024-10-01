"use client";

import React, { useState } from "react";
import LmsHeader from "@/components/lms/LmsHeader";
import FreePagination from "@/components/pagination/FreePagination";
import { BiArrowBack, BiCaretDown } from "react-icons/bi";
import BackButton from "@/components/BackButton";

const sections = [
  // Example sections data
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
  {
    headers: ["Team 101", "Status", "Remarks"],
    items: [
      ["Enoch Ayorinde", "Completed", "Approved"],
      ["Enoch Ayorinde", "Completed", "Rejected"],
      ["Enoch Ayorinde", "Completed", "Pending"],
    ],
  },
];

const ViewTrainingTable = ({ data, singleData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of sections per page

  const totalItems = singleData.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const previousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const nextPage = () =>
    currentPage < Math.ceil(totalItems / itemsPerPage) &&
    setCurrentPage(currentPage + 1);
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(Math.ceil(totalItems / itemsPerPage));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSections = singleData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-500";
      default:
        return "bg-red-200 text-red-500";
    }
  };

  const renderTable = (headers, items) => {
    return (
      <table className="w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
        <thead>
          <tr className="border-gray-100 bg-gray-100">
            <th className="px-5 py-3 text-left text-lg font-semibold text-black capitalize tracking-wider">
              <span>Name</span>
            </th>
            <th className="px-5 py-3 text-left text-lg font-semibold text-black capitalize tracking-wider">
              <span>Training Name</span>
            </th>
            <th className="px-5 py-3 text-left text-lg font-semibold text-black capitalize tracking-wider">
              <span>Status</span>
            </th>
            <th className="px-5 py-3 text-left text-lg font-semibold text-black capitalize tracking-wider">
              <>
                <span>Remark</span>
                <BiCaretDown className="ml-5 h-4 w-4 inline-block text-lg" />
              </>
            </th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-blue-100 text-black text-lg [&>*:nth-child(even)]:text-black [&>*:nth-child(even)]:bg-white shadow-lg w-full">
          {currentSections?.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td  className="px-5 py-3 text-sm">
                <p
                  className={`whitespace-no-wrap text-sm font-normal w-fit py- px-2 rounded-sm capitalize `}
                >
                  {item?.userId?.username}
                </p>
              </td>

              <td  className="px-5 py-3 text-sm">
                <p
                  className={`whitespace-no-wrap text-sm font-normal w-fit py- px-2 rounded-sm capitalize `}
                >
                  {data?.name}
                </p>
              </td>
              <td  className="px-5 py-3 text-sm">
                <p
                  className={`whitespace-no-wrap text-sm font-normal w-fit py- px-2 rounded capitalize ${
                    item?.status?.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-green-100 text-green-500"
                  }`}
                >
                  {item?.status}
                </p>
              </td>
              <td  className="px-5 py-3 text-sm">
                <p
                  className={`whitespace-no-wrap text-sm font-normal w-fit py- px-2 rounded-sm capitalize ${
                    item?.remark?.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-green-100 text-green-500"
                  } `}
                >
                  {item?.remark}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }
  return (
    <>
      {/* <LmsHeader /> */}
      <div className="flex w-full lg:w-3/5  justify-between mt-6 lg:px-10 px-5 ">
        <BackButton />
        <h2 className="text-xl font-bold">View Training</h2>
      </div>
      <div className="px-4 lg:px-10 mt-5">
        <div className="flex flex-col gap-4 p-5 lg:p-10 border border-gray-500 rounded ">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span>
              <p className="text-lg font-bold">Name of Training</p>
            </span>
            <span>
              <p className="text-lg font-thin">Name of Training</p>
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span>
              <p className="text-lg font-bold">Date</p>
            </span>
            <span>
              <p className="text-lg font-thin">
                {" "}
                {data?.dateCreated ? formatDate(data?.dateCreated) : "N/A"}
              </p>
            </span>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <span>
              <p className="text-lg font-bold">Time</p>
            </span>
            <span>
              <p className="text-lg font-thin">
                {data?.scheduledTime ? data?.scheduledTime : "N/A"}
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="text-black flex flex-col gap-6 bg-white lg:p-10 p-5 w-full">
        <div className="ring-1 ring-gray-200 rounded-md">
          <div className="w-full overflow-auto no-scrollbar h-auto rounded-md">
            {renderTable()}
          </div>
        </div>

        <FreePagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>
    </>
  );
};

export default ViewTrainingTable;

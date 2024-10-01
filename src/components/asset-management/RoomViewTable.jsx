"use client";

import useAssets from "@/hooks/useAssets";
import Link from "next/link";
import { useEffect, useState } from "react";
import FreePagination from "../pagination/FreePagination";
import { useSelector } from "react-redux";

export default function RoomView({

 
}) {
  let searchTimeout;
  const role =
  typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const [filteredData, setFilteredData] = useState([]);
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const { getGeneralSchedule, allGeneralSchedule, loading } = useAssets();
  useEffect(() => {
    getGeneralSchedule();
  }, []);
  useEffect(() => {
    if (role?.toLowerCase() === "manager") {
      getGeneralSchedule();
    }
  }, [selectedFacilityId]);

  console.log("gen", allGeneralSchedule);
  const [sortByFreq, setSortByFreq] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allGeneralSchedule.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(allGeneralSchedule?.length / itemsPerPage));
  };

  
  useEffect(() => {
    setFilteredData(allGeneralSchedule);
  }, [allGeneralSchedule]);
  const handleSortingTabs = (e) => {
    if (e.target.value !== "all") {
      const filtered = currentItems.filter(
        (item) =>
          item?.cleaningTypeFrequency?.unit.toLowerCase() ===
          e.target.value.toLowerCase()
      );
      setFilteredData(filtered);
    } else if (e.target.value === "all") {
      setFilteredData(currentItems);
    }
    setSortByFreq(e.target.value);
  };
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (e.target.value.length > 0) {
        const filteredValue = currentItems.filter(
          (item) =>
            item?.assetId?.name
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase()) ||
            item?.roomId?.roomName
              ?.toLowerCase()
              .includes(e.target.value?.toLowerCase())
        );
        console.log("ewo", filteredValue);
        setFilteredData(filteredValue);
      }
      if (e.target.value === "") {
        setFilteredData(currentItems);
      }
    }, 1000);
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log("first", e.target.value);
    if (e.target.value === "Active") {
      const filteredValue = currentItems.filter((item) => item?.active);

      setFilteredData(filteredValue);
    } else if (e.target.value === "Inactive") {
      const filteredValue = currentItems.filter((item) => !item?.active);

      console.log("ewo", filteredValue);
      setFilteredData(filteredValue);
    } else if (e.target.value === "all") {
      setFilteredData(currentItems);
    }
  };
  return (
    <div className=" w-full py-4">
      <div className=" w-full  flex flex-col  py-5 h-auto">
        {/* <h1 className="font-bold">{title}</h1> */}
        <div className=" w-full flex-1 sm:flex flex-col sm:flex-row  mb-5 lg:mb-10  items-center justify-between ">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-gray-200 dark:bg-sanBlue p-2 rounded-md overflow-auto no-scrollbar w-full">
              <button
                onClick={handleSortingTabs}
                value="all"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "all"
                    ? "bg-white dark:bg-slate-900 text-blue-500  dark:text-white  font-semibold"
                    : null
                }`}
              >
                All
              </button>
              <button
                onClick={handleSortingTabs}
                value="hourly"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "hourly"
                    ? "bg-white text-blue-500  font-semibold"
                    : null
                }`}
              >
                Hourly
              </button>
              <button
                onClick={handleSortingTabs}
                value="daily"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "daily"
                    ? "bg-white text-blue-500  font-semibold"
                    : null
                }`}
              >
                Daily
              </button>
              <button
                onClick={handleSortingTabs}
                value="weekly"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "weekly"
                    ? "bg-white text-blue-500  font-semibold"
                    : null
                }`}
              >
                Weekly
              </button>
              <button
                onClick={handleSortingTabs}
                value="monthly"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "monthly"
                    ? "bg-white text-blue-500  font-semibold"
                    : null
                }`}
              >
                Monthly
              </button>
              <button
                onClick={handleSortingTabs}
                value="yearly"
                className={`px-4 py-1 rounded ${
                  sortByFreq === "yearly"
                    ? "bg-white text-blue-500  font-semibold"
                    : null
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3 md:mt-0">
            <div className=" relative">
              <input
                type="search"
                onChange={handleSearch}
                placeholder="Search Room or Facility Name"
                className="pl-7 pr-7 py-2  border-gray-700 rounded-md outline-none border dark:bg-black bg-white dark:text-white text-black"
              />
              <span className=" absolute left-1 top-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  className="fill-black dark:fill-white"
                >
                  <path d="M10 2a8 8 0 0 1 6.32 12.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
                </svg>
              </span>
            </div>
            {/* <select
            name=""
            className="px-4 py-2 text-black rounded-md outline-none border-gray-700 border"
            onChange={(e) => handleChange(e)}
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}
          </div>
        </div>
        <div className="w-full overflow-auto no-scrollbar  h-auto">
          <table className=" rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
            <thead>
              <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  S/N
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Asset Name
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Room Name
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Task
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Frequency
                </th>
                {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {filteredData?.map((item, i) => (
                <tr
                  key={item._id}
                  className="border-b w-full border-gray-200 whitespace-nowrap"
                >
                  <td className="px-5 py-2 text-left   text-sm">
                    <p>{i +1 }</p>
                  </td>
                  <td className="px-5 py-2 text-left   text-sm">
                    <p>{item?.assetId?.name}</p>
                  </td>
                  <td className="px-5 py-2 text-left capitalize  text-sm">
                    <p>{item?.roomId?.roomName}</p>
                  </td>
                  <td className="px-5 py-2 text-left capitalize  text-sm">
                    <p>{item?.cleaningType?.name}</p>
                  </td>
                  <td className="px-5 py-2 capitalize  text-sm">
                    {item?.cleaningTypeFrequency?.name ?? "N/A"}
                  </td>

                  {/* <td className="px-5 py-2 text-sm flex items-center">
                    <div className="flex items-center gap-x-3">

                      <button onClick={() => openModalEdit(item._id)}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_194_10938)">
                            <path
                              d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
                              fill="black"
                              fillOpacity="0.8"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_194_10938">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                      <button
                        onClick={() => openModalDel(item._id)}
                        className={`whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                            fill="black"
                            fillOpacity="0.8"
                          />
                        </svg>
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredData.length === 0 && (
          <div className="text-center py-4 text-red-500 font-bold">
            No Data Available
          </div>
        )}
        <FreePagination
          itemsPerPage={itemsPerPage}
          totalItems={allGeneralSchedule?.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
        {loading && allGeneralSchedule?.length === 0 && (
          <div className="min-h-[60vh] w-full flex items-center flex-col">
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

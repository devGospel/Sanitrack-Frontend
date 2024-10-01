"use client";

import Image from "next/image";
import { forwardRef, useEffect, useState } from "react";

import Link from "next/link";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import { useDispatch, useSelector } from "react-redux";

import { usePathname } from "next/navigation";

import FreePagination from "@/components/pagination/FreePagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import EditInventoryModal from "../inventory/modals/EditInventoryModal";
// import RemoveInventory from "../inventory/modals/RemoveInventory";
// import EditFacilityModal from "./modals/EditFacilityModal";
// import RemoveFacility from "./modals/RemoveFacility";
// import useFacilities from "@/hooks/useFacilities";
import useReport from "@/hooks/useReport";
import { addMonths, format } from "date-fns";
import { FaCalendarAlt, FaFilePdf } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentPage from "./DocumentPage";

const ButtonInput = forwardRef(({ onClick, type }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex justify-start items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-sanBlue dark:text-white  border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
  >
    <FaCalendarAlt />{" "}
    <p>{type === "start" ? "Select a Start Date" : "Select an End Date"}</p>
  </button>
));
const DairyTable = ({}) => {
  const { getAllReports, loading, allReports } = useReport();

  useEffect(() => {
    getAllReports();
  }, []);
  console.log(allReports);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onStartChange = (date) => {
    // const [start, end] = dates;
    setStartDate(format(date, "yyyy-MM-dd"));
    console.log(format(date, "yyyy-MM-dd"));
  };
  const onEndChange = (date) => {
    // const [start, end] = dates;
    setEndDate(format(date, "yyyy-MM-dd"));
    getAllReports(
      `?startDate=${format(startDate, "yyyy-MM-dd")}&endDate=${format(
        date,
        "yyyy-MM-dd"
      )}`
    );
    console.log(format(date, "yyyy-MM-dd"));
  };
  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allReports?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allReports.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(allReports?.length / itemsPerPage));
  };
  const [component, setComponent] = useState(null);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);

  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  const openModalEdit = (e) => {
    e.preventDefault();

    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const openModalDel = (e) => {
    e.preventDefault();

    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };
  const pathname = usePathname();
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 w-full justify-between items-center">
        <DatePicker
          selected={startDate}
          onChange={onStartChange}
          customInput={<ButtonInput type={"start"} />}
          showDisabledMonthNavigation
        />
        <DatePicker
          selected={endDate}
          onChange={onEndChange}
          customInput={<ButtonInput />}
          showDisabledMonthNavigation
        />
      </div>

      {allReports?.length > 0 && (
        <PDFDownloadLink
          document={<DocumentPage data={allReports} />}
          fileName="diary-report.pdf"
          className="inline-flex justify-center items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-sanBlue dark:text-white  border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
        >
          {({ loading }) =>
            loading ? (
              "Preparing document..."
            ) : (
              <>
                {" "}
                <FaFilePdf className="text-red-500  text-lg" />{" "}
                <p className="text-lg">Download Pdf</p>
              </>
            )
          }
        </PDFDownloadLink>
      )}
      <div className="w-full overflow-auto no-scrollbar  h-auto">
        <table
          className=" rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden"
          //   ref={targetRef}
        >
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Updated By
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Date Created
              </th>
              {/* <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                No. of Rooms
              </th> */}
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider"></th>
            </tr>
          </thead>

          {allReports && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {currentItems?.map((item, index) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {index + 1}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.title}`}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.recordedBy?.username}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {format(item?.createdAt, "yyyy-MM-dd")}
                    </p>
                  </td>
                  {/* <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.rooms ? item?.rooms : "N/A"}
                    </p>
                  </td> */}
                  <td className="px-5 py-3    text-sm flex items-center">
                    <>
                      <PDFDownloadLink
                        document={<DocumentPage single={item} />}
                        fileName="diary-report.pdf"
                        // className="inline-flex justify-center items-center gap-2 w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-sanBlue dark:text-white  border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                      >
                        {({ loading }) =>
                          loading ? (
                            "Preparing document..."
                          ) : (
                            <>
                              {" "}
                              <FaFilePdf className="text-red-500  text-lg" />{" "}
                              {/* <p className="text-lg">Download Pdf</p> */}
                            </>
                          )
                        }
                      </PDFDownloadLink>
                      <span
                        value={"edit"}
                        title="Edit Facility"
                        onClick={(e) => {
                          dispatch(setItem(item));
                          openModalEdit(e);
                        }}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
                          width="16"
                          className="dark:stroke-white stroke-black"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_194_10938)">
                            <path
                              d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
                              fill="black"
                              fill-opacity="0.8"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_194_10938">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      {/* <button
                        value={"edit"}
                        title="Delete Facility"
                        onClick={(e) => {
                          //   window?.localStorage.setItem(
                          //     "singleId",
                          //     JSON.stringify(item?._id)
                          //   );
                          dispatch(setItem(item));
                          openModalDel(e);
                        }}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
                          className="dark:stroke-white stroke-black"
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                            fill="black"
                            fill-opacity="0.8"
                          />
                        </svg>
                      </button> */}
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {allReports?.length === 0 && !loading && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg font-bold">No Data available</p>
          </div>
        )}
      </div>
      {loading && (
        <div class=" lg:mt-5 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
          <div className="animate-pulse flex flex-col space-x-4">
            <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
              <div className="s">
                <div className="flex flex-col">
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={allReports?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </>
  );
};

export default DairyTable;

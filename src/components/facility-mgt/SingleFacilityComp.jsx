"use client";
import React, { useEffect, useState } from "react";
import { FaAddressCard, FaBarcode, FaBuilding } from "react-icons/fa";
import { CiBarcode } from "react-icons/ci";
import BackButton from "../BackButton";
import { useParams } from "next/navigation";
import useFacilities from "@/hooks/useFacilities";
import Link from "next/link";
import ModalComponent from "../modals/Modal";
import AddRoomModal from "../room-management/modals/AddRoomModal";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FreePagination from "../pagination/FreePagination";
import EditFacilityModal from "./modals/EditFacilityModal";
import { useDispatch } from "react-redux";
import AssignFacilityModal from "./modals/AssignFacilityModal";
import { IoTrashBin } from "react-icons/io5";
import RemoveFacility from "./modals/RemoveFacility";
const SingleFacilityComp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const openModalEdit = (e) => {
    e.preventDefault();

    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };
  const openModalAssign = (e) => {
    e.preventDefault();

    setIsModalOpenAssign(true);
  };

  const closeModalAssign = () => {
    setIsModalOpenAssign(false);
  };
  const openModalDel = (e) => {
    e.preventDefault();

    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const item =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("singleItem"))
      : null;

  console.log("first", item);
  const { getSingleFacility, singleFacility, loading } = useFacilities();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = singleFacility?.rooms?.slice(
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
    if (
      currentPage !== Math.ceil(singleFacility?.rooms.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(singleFacility?.rooms?.length / itemsPerPage));
  };
  const tabs = [
    // {
    //   name: "Facility",
    //   component: (
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-5">
    //       <div className="dark:bg-sanBlue bg-dashLighter text-black dark:text-white p-3 rounded flex flex-col gap-y-3">
    //         <div className="flex items-center gap-3 ">
    //           <FaBuilding />
    //           <p>{singleFacility?.location?.facility_name}</p>
    //         </div>
    //         <div className="flex items-center gap-3 ">
    //           <CiBarcode />
    //           <p>{`${singleFacility?.location?.facilityPrefix}${singleFacility?.location?.facilityCode}`}</p>
    //         </div>
    //         <div className="flex items-center gap-3 ">
    //           <FaAddressCard />
    //           <p>
    //             {singleFacility?.location?.postal_code !== "empty"
    //               ? singleFacility?.location?.postal_code
    //               : "N/A"}
    //           </p>
    //         </div>
    //       </div>
    //       <div className="dark:bg-sanBlue bg-dashLighter text-black dark:text-white p-3 rounded flex flex-col gap-y-3">
    //         <div className="flex items-center gap-3 ">
    //           <p className="font-semibold">Country:</p>
    //           <p>{singleFacility?.location?.country}</p>
    //         </div>
    //         <div className="flex items-center gap-3 ">
    //           <p className="font-semibold">City:</p>
    //           <p>{singleFacility?.location?.city}</p>
    //         </div>
    //         <div className="flex items-center gap-3 ">
    //           <p className="font-semibold">State:</p>
    //           <p>{singleFacility?.location?.state}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: "Rooms ",
      component: (
        <div className="pt-5">
          <div className="flex justify-end pb-4">
            <button
              onClick={() => {
                setId(params.id);
                openModal();
              }}
              className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
            >
              Add Room
            </button>
          </div>
          <table className=" rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
            <thead>
              <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Code
                </th>

                <th className="px-5 py-3 text-center text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {currentItems?.map((room, index) => (
                <tr key={room?._id} className="border-b border-gray-200">
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {room?.roomName}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {room?.roomPrefix + room?.roomCode}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm flex justify-center">
                    <>
                      <Link
                        title="View Room"
                        href={`/dashboard/room-management/${room?._id}`}
                        className={` whitespace-no-wrap text-md font-semibold ml-3 p-2 rounded-md text-black bg-white cursor-pointer  `}
                      >
                        View Room
                      </Link>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FreePagination
            itemsPerPage={itemsPerPage}
            totalItems={singleFacility?.rooms?.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={currentPage}
            firstPage={firstPage}
            lastPage={lastPage}
          />
        </div>
      ),
    },

    {
      name: "Assignees",
      component: (
        <div className="my-4">
          <div className="flex justify-end pb-4">
            <button
              onClick={(e) => {
                dispatch(setId(params?.id));
                openModalAssign(e);
              }}
              className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
            >
              Assign Facility
            </button>
          </div>
          {/* <header className="text-center py-5">
            <h2 className="text-lg dark:text-white text-black">Assignees</h2>
          </header> */}
          <div className="flex flex-wrap items-center mb-3 gap-4 ">
            {singleFacility?.inspectors?.length > 0 &&
              singleFacility?.inspectors[0]?.assignedInspectors?.map((room) => {
                return (
                  <Link
                    key={room?._id}
                    href={`/dashboard/room-management/${room?._id}`}
                    className="flex flex-col border w-full lg:w-[48%] px-4 py-2 gap-1 bg-base-50 dark:bg-sanBlue rounded hover:dark:bg-black shadow-lg hover:bg-sanBlue hover:dark:text-white text-black hover:text-white dark:text-slate-50"
                  >
                    <h1 className="font-semibold capitalize">
                      {room?.username}
                    </h1>
                    <p className="text-sm font-extralight dark:text-slate-50">
                      {room?.email}
                    </p>
                    <p className="text-xs font-bold dark:text-gray-300">
                      Role: Inspector
                    </p>
                  </Link>
                );
              })}
            {singleFacility?.cleaners?.length > 0 &&
              singleFacility?.cleaners[0]?.assignedCleaners?.map((room) => {
                return (
                  <Link
                    key={room?._id}
                    href={`/dashboard/room-management/${room?._id}`}
                    className="flex flex-col border w-full lg:w-[48%] px-4 py-2 gap-1 bg-base-50 dark:bg-sanBlue rounded hover:dark:bg-black shadow-lg hover:bg-sanBlue hover:dark:text-white text-black hover:text-white dark:text-slate-50"
                  >
                    <h1 className="font-semibold capitalize">
                      {room?.username}
                    </h1>
                    <p className="text-sm font-extralight dark:text-slate-50">
                      {room?.email}
                    </p>
                    <p className="text-xs font-bold dark:text-gray-300">
                      Role: Cleaner
                    </p>
                  </Link>
                );
              })}
            {singleFacility?.managers &&
              singleFacility?.managers[0]?.assignedManagers?.map((room) => {
                return (
                  <Link
                    key={room?._id}
                    href={`/dashboard/room-management/${room?._id}`}
                    className="flex flex-col border w-full lg:w-[48%] px-4 py-2 gap-1 bg-base-50 dark:bg-sanBlue rounded hover:dark:bg-black shadow-lg hover:bg-sanBlue hover:dark:text-white text-black hover:text-white dark:text-slate-50"
                  >
                    <h1 className="font-semibold capitalize">
                      {room?.username}
                    </h1>
                    <p className="text-sm font-extralight dark:text-slate-50">
                      {room?.email}
                    </p>
                    <p className="text-xs font-bold dark:text-gray-300">
                      Role: Manager
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      ),
    },
  ];

  // Extract the first word of the tab name to use as a key
  const getTabKey = (name) => name.split(" ")[0].toLowerCase();

  // Get the active tab name from the URL search params or default to the first tab
  const activeTabKey = searchParams.get("tab") || getTabKey(tabs[0].name);
  const activeTab =
    tabs.find((tab) => getTabKey(tab.name) === activeTabKey) || tabs[0];

  const handleTabClick = (tab) => {
    // Update the URL search params when a tab is clicked
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", getTabKey(tab.name));
    router.push(`?${newSearchParams.toString()}`);
  };

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const openModal = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  useEffect(() => {
    getSingleFacility(params.id);
  }, []);
  console.log(singleFacility);

  return (
    <>
      <div className="flex justify-between items-center pb-5 pt-10">
        <header className=" flex  items-start gap-2">
          <BackButton />
          <span className=" flex flex-col items-start gap-2">
            <h2 className="text-center dark:text-white text-black text-2xl font-bold">
              {singleFacility?.location?.facility_name ?? "N/A"}
            </h2>
            <p className="dark:text-gray-200 text-gray-600">{`${
              singleFacility?.location?.facilityPrefix ?? "N/A"
            }${singleFacility?.location?.facilityCode ?? "N/A"}`}</p>
          </span>
        </header>
        <div className="dropdown inline-block relative">
          <button className="  group px-4 rounded inline-flex gap-2 items-center">
            <span class="text-black text-sm mr-1 capitalize font-bold dark:text-white">
              Settings
            </span>
            <svg
              className="shrink-0 h-4 w-4 dark:fill-white fill-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1 .1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9 .4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9 .1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1 .1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z" />
            </svg>
          </button>
          <ul className="dropdown-menu rounded-b text-black shadow-md bg-white dark:bg-black text-left absolute hidden p-2 w-40">
            <li className="d-link w-full p-2">
              <button
                onClick={(e) => {
                  dispatch(setItem(item));
                  openModalEdit(e);
                }}
                className="flex w-auto px-2 py-1 bg-sanBlue rounded-md text-white justify-center items-center font-thin gap-2"
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
                <p className="font-extralight text-sm">Edit Facility</p>
              </button>
            </li>
            <li className="d-link w-full p-2">
              <button
                onClick={(e) => {
                  //   window?.localStorage.setItem(
                  //     "singleId",
                  //     JSON.stringify(item?._id)
                  //   );
                  dispatch(setItem(item));
                  openModalDel(e);
                }}
                className="flex w-auto px-2 py-1 bg-sanBlue rounded-md text-white justify-center items-center font-thin gap-2"
              >
                <IoTrashBin />
                <p className="font-extralight text-sm">Delete Facility</p>
              </button>
            </li>
          </ul>
                  
        </div>
      </div>

      {!loading ? (
        <>
          <main className="bg-white dark:bg-slate-900 w-full h-screen">
            <div className="p-5 lg:p">
              <ul className="flex gap-x-5 border-b border-gray-300 dark:border-white text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
                {tabs.map((tab) => (
                  <li
                    onClick={() => handleTabClick(tab)}
                    className={`mr-2  cursor-pointer ${
                      activeTab.name === tab.name
                        ? "border-b-2 border-sanBlue text-gray-900 dark:text-sanBlue font-bold transform transition-all duration-300 ease-in font-bold "
                        : " transform transition-all duration-150 ease-out text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="py-3 inline-block">{tab.name}</p>
                  </li>
                ))}
              </ul>
              <div>
                <>{activeTab.component}</>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="w-10 h-10  text-gray-200 animate-spin  fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#5B5BE3"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="white"
            />
          </svg>
        </div>
      )}
      <ModalComponent
        isOpen={isModalOpenAdd}
        onClose={closeModalAdd}
        setIsModalOpen={setIsModalOpenAdd}
      >
        <AddRoomModal />
      </ModalComponent>
      <ModalComponent
        isOpen={isModalOpenEdit}
        onClose={closeModalEdit}
        setIsModalOpen={setIsModalOpenEdit}
      >
        <EditFacilityModal closeModal={closeModalEdit} />
      </ModalComponent>
      <ModalComponent
        isOpen={isModalOpenAssign}
        onClose={closeModalAssign}
        setIsModalOpen={setIsModalOpenAssign}
      >
        <AssignFacilityModal closeModal={closeModalAssign} />
      </ModalComponent>
      <ModalComponent
        isOpen={isModalOpenDel}
        onClose={closeModalDel}
        setIsModalOpen={setIsModalOpenDel}
      >
        <RemoveFacility closeModal={closeModalDel} />
      </ModalComponent>
    </>
  );
};

export default SingleFacilityComp;

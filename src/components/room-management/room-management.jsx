"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ModalComponent from "../modals/Modal";
import useRooms from "@/hooks/useRoom";
import { useForm } from "react-hook-form";
import useUser from "@/hooks/useUser";
import Spinner from "../loaders/Loader";
import { ToastContainer } from "react-toastify";
import AddChemicalModal from "../chemical_calc/Modals/AddChemicalModal";
import AddRoomModal from "./modals/AddRoomModal";
import EditRoomModal from "./modals/EditRoomModal";
import DeleteRoomModal from "./modals/DeleteRoomModal";
import FrequencyModal from "./modals/FrequencyModal";
import ListView from "./ListView";
import FacilityView from "./FacilityView";
import { useSelector } from "react-redux";

export default function Rooms() {
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const [activeTabs, setActiveTabs] = useState("activeTab_1");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAddFreq, setIsModalOpenAddFreq] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const { getAllRooms, allRooms, loading, createRoom, editRoom, buttonLoader } =
    useRooms();
  const { getLocations, allLocations } = useUser();
  const handleActiveTabs = (tabName) => {
    setActiveTabs(tabName);
  };

  const openModal = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };
  const openModalEdit = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };
  const openModalDel = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };

  const openAddRoomFreq = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpenAddFreq(true);
  };

  const closeAddRoomFreq = () => {
    setIsModalOpenDel(false);
  };

  useEffect(() => {
    if (role?.toLowerCase() !== "manager") {
      getAllRooms();
    }

    getLocations();
  }, []);
  useEffect(() => {
    if (role?.toLowerCase() === "manager") {
      getAllRooms(selectedFacilityId);
    }
  }, [selectedFacilityId]);
  console.log("Rooms", allRooms);

  const handleEditRoom = async (data) => {
    // const detailsArray = Array.from(data.details).map(detail => ({ name: detail }));
    const details = [
      { name: "desk" },
      { name: "bathroom" },
      { name: "fridge" },
      { name: "work desk" },
    ];
    const roomId = "6668323df1dc0754b56c7427";
    const payload = { ...data, details, roomId };
    // console.log("PPPPPPPP", payload)
    try {
      await editRoom(payload);
      reset();
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };
  const handleSubmit = () => {
    console.log("submit");
  };
  // console.log("LLLLLLLLLLLL", allLocations)
  return (
    <main className="w-full bg-white h-screen dark:bg-slate-900">
      <div className="w-full p-10">
        <div className="flex-1 w-full">
          <div className="flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center">
            <div>
              <h1 className="text-black lg:text-2xl font-semibold dark:text-white">
                Rooms
              </h1>
              <p className="text-dashText text-sm dark:text-white">
                Manage, create and oversee room management within the system.
              </p>
            </div>
            <div>
              <button
                onClick={() => openModal()}
                className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>

        {/* SKELETON_LOADERS */}
        {loading && (
          <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-2  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
              <div className="grid  grid-cols-2  animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
              </div>
              <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
                {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                <div className="s">
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
        )}

        {/* TABS_BUTTONS */}
        <div className=" overflow-auto no-scrollbar mt-5 p-1.5 lg:p-2 flex bg-dashLighter dark:text-white text-black dark:bg-sanBlue rounded-[30px] justify-between pb-2 mb-2 items-center flex-row lg:space-x-6 space-x-4 sticky top-0 w-full overflow-y-hidden z-10 lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
          <button
            onClick={() => handleActiveTabs("activeTab_1")}
            className={`mr-2 cursor-pointer text-center p-2 rounded-[30px] w-1/2 ${
              activeTabs === "activeTab_1"
                ? " text-darkText bg-white dark:bg-black dark:text-white font-bold  text-sm lg:text-lg text-darkText p-2 transform transition-all duration-300 ease-in "
                : "text-black dark:text-white text-sm lg:text-lg font-thin transform transition-all duration-150 ease-out"
            }`}
          >
            <>List View</>
          </button>
          <button
            onClick={() => handleActiveTabs("activeTab_2")}
            className={` mr-2 cursor-pointer text-center p-2 rounded-[30px] w-1/2 ${
              activeTabs === "activeTab_2"
                ? "bg-white dark:bg-black dark:text-white shadow text-dashText font-semibold"
                : null
            } max-w-lg rounded p-2 text-center`}
          >
            <>Facility View</>
          </button>
        </div>

        {/* TABS_COMPONENTS_SECTIONS */}

        <div className="p-2 w-full">
          {activeTabs === "activeTab_1" && (
            <ListView
              allRooms={allRooms}
              loading={loading}
              openModalEdit={openModalEdit}
              openModalDel={openModalDel}
              openAddRoomFreq={openAddRoomFreq}
            />
          )}

          {activeTabs === "activeTab_2" && (
            <FacilityView
              allRooms={allRooms}
              loading={loading}
              openModalEdit={openModalEdit}
              openModalDel={openModalDel}
              openAddRoomFreq={openAddRoomFreq}
            />
          )}
        </div>
      </div>

      {/* MODALS_COMPONENTS_SECTION */}

      {isModalOpenAdd && (
        <ModalComponent
          isOpen={isModalOpenAdd}
          onClose={closeModalAdd}
          setIsModalOpen={setIsModalOpenAdd}
        >
          <ToastContainer />
          <AddRoomModal allLocations={allLocations} />
        </ModalComponent>
      )}

      {isModalOpenEdit && (
        <ModalComponent
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          setIsModalOpen={setIsModalOpenEdit}
        >
          <ToastContainer />
          <EditRoomModal allLocations={allLocations} />
        </ModalComponent>
      )}

      {isModalOpenDel && (
        <ModalComponent
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          setIsModalOpen={setIsModalOpenDel}
        >
          <DeleteRoomModal
            closeModalDel={closeModalDel}
            currentUserId={currentUserId}
          />
        </ModalComponent>
      )}

      {isModalOpenAddFreq && (
        <ModalComponent
          isOpen={isModalOpenAddFreq}
          onClose={closeAddRoomFreq}
          setIsModalOpen={setIsModalOpenAddFreq}
        >
          <FrequencyModal currentUserId={currentUserId} />
        </ModalComponent>
      )}
    </main>
  );
}

// function ListView({ openModalEdit, openModalDel, openAddRoomFreq, allRooms, loading }) {

//     return (
//         <>
//             <div className='pt-10 h-auto overflow-x-auto no-scrollbar'>
//                 <table className="table-auto rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
//                     <thead>
//                         <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
//                             <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
//                                 Room Name
//                             </th>
//                             <th className="px-5 py-3  text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
//                                 Facitility Name
//                             </th>
//                             <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
//                                 QR Code
//                             </th>
//                             <th className="px-5  py-3 text-left  text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
//                                 Actions
//                             </th>

//                         </tr>
//                     </thead>

//                     <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
//                         {allRooms?.map((data) => (
//                             <tr key={data._id} className="border-b border-gray-200 whitespace-nowrap">
//                                 <td className="px-5 py-3 text-sm">{data.roomName}</td>
//                                 <td className="px-5 py-3 text-sm">{data.location_id.facility_name}</td>
//                                 <td className="px-5 py-3 text-sm"><Link href={"/"} className='text-blue-400'>View QR Code</Link></td>
//                                 <td className="px-5 py-3 text-sm">
//                                     <div className='flex items-center gap-x-4'>
//                                         {/* Will add the icon later */}
//                                         <button onClick={() => openAddRoomFreq(data._id)}>
//                                             <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
//                                                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                                 <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
//                                                 <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
//                                             </svg>
//                                         </button>
//                                         <button onClick={() => openModalEdit(data._id)}>
//                                             <svg
//                                                 width="16"
//                                                 height="16"
//                                                 viewBox="0 0 16 16"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <g clipPath="url(#clip0_194_10938)">
//                                                     <path
//                                                         d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
//                                                         fill="green"
//                                                         fillOpacity="0.8"
//                                                     />
//                                                 </g>
//                                                 <defs>
//                                                     <clipPath id="clip0_194_10938">
//                                                         <rect width="16" height="16" fill="white" />
//                                                     </clipPath>
//                                                 </defs>
//                                             </svg>
//                                         </button>
//                                         <button onClick={() => openModalDel(data._id)}>
//                                             <svg
//                                                 width="14"
//                                                 height="16"
//                                                 viewBox="0 0 14 16"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
//                                                     fill="red"
//                                                     fillOpacity="0.8"
//                                                 />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//                 {loading && allRooms.length === 0 && <div className='text-center py-4 '>No Data yet</div>}
//             </div>
//         </>
//     )
// }

// function FacilityView({ openModalEdit, openModalDel, openAddRoomFreq, allRooms, loading, title }) {

//     return (
//         <div className=' w-full py-4'>
//             <div className=' w-full  flex flex-col  py-5 h-auto'>
//                     <h1 className='font-bold'>{title}</h1>
//                     <table className="w-full leading-normal overflow-x-auto">
//                         <thead>
//                             <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
//                                 <th className="px-5 py-3 text-left text-sm font-normal text-black capitalize tracking-wider">
//                                     Facility
//                                 </th>
//                                 <th className=" py-3 text-left  text-sm font-normal shrink-1 text-black capitalize tracking-wider">
//                                     {/* Actions */}
//                                 </th>
//                                 <th className=" px-5 py-3 text-left  text-sm font-normal shrink-1 text-black capitalize tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
//                             {allRooms?.map((table_data) => (
//                                 <tr key={table_data._id} className="border-b w-full border-gray-200 whitespace-nowrap">
//                                     <td className="px-5 py-2 text-left   text-sm">
//                                         <p>{table_data.roomName}</p>
//                                     </td>
//                                     <td className="px-5 py-2   text-sm">
//                                         <Link className='text-blue-400' href={"/"}>View Qr Code</Link>
//                                     </td>

//                                     <td className="px-5 py-2 text-sm flex items-center">
//                                         <div className='flex items-center gap-x-3'>
//                                             <button onClick={() => openAddRoomFreq(table_data._id)}>
//                                                 <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
//                                                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                                     <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
//                                                     <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
//                                                 </svg>
//                                             </button>

//                                             <button onClick={() => openModalEdit(table_data._id)}>
//                                                 <svg
//                                                     width="16"
//                                                     height="16"
//                                                     viewBox="0 0 16 16"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                     <g clipPath="url(#clip0_194_10938)">
//                                                         <path
//                                                             d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
//                                                             fill="green"
//                                                             fillOpacity="0.8"
//                                                         />
//                                                     </g>
//                                                     <defs>
//                                                         <clipPath id="clip0_194_10938">
//                                                             <rect width="16" height="16" fill="white" />
//                                                         </clipPath>
//                                                     </defs>
//                                                 </svg>
//                                             </button>
//                                             <button
//                                                 onClick={() => openModalDel(table_data._id)}
//                                                 className={`whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
//                                             >
//                                                 <svg
//                                                     width="14"
//                                                     height="16"
//                                                     viewBox="0 0 14 16"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                     <path
//                                                         d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
//                                                         fill="red"
//                                                         fillOpacity="0.8"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {loading && allRooms.length === 0 && <div className='text-center py-4 '>No Data yet</div>}
//                 </div>
//         </div>
//     )
// }

// 'use client'

// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'
// import ModalComponent from '../modals/Modal';

// export default function Rooms() {
//     const [activeTabs, setActiveTabs] = useState('activeTab_1');
//     const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
//     const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
//     const [isModalOpenAddFreq, setIsModalOpenAddFreq] = useState(false)
//     const [currentUserId, setCurrentUserId] = useState(null);
//     const [isModalOpenDel, setIsModalOpenDel] = useState(false);

//     // const router = useRouter()

//     const handleActiveTabs = (tabName) => {
//         setActiveTabs(tabName)
//     }

//     const openModal = () => {
//         setIsModalOpenAdd(true);

//     };

//     const closeModalAdd = () => {
//         setIsModalOpenAdd(false);
//     };
//     const openModalEdit = (userId) => {
//         setCurrentUserId(userId);
//         setIsModalOpenEdit(true);

//     };

//     const closeModalEdit = () => {
//         setIsModalOpenEdit(false);
//     };
//     const openModalDel = (userId) => {
//         setCurrentUserId(userId);
//         setIsModalOpenDel(true);
//     };

//     const closeModalDel = () => {
//         setIsModalOpenDel(false);
//     };

//     const openAddRoomFreq = (userId) => {
//         setCurrentUserId(userId);
//         setIsModalOpenAddFreq(true);
//     };

//     const closeAddRoomFreq = () => {
//         setIsModalOpenDel(false);
//     };

//     return (
//         <>
//             <div className='w-full px-4 sm:px-5'>

//                 <div className='flex-1 w-full'>
//                     <div className='flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center'>
//                         <div>
//                             <h1 className='text-black text-2xl font-semibold'>Rooms</h1>
//                             <p>Manage, create and oversee room management within the system.</p>
//                         </div>
//                         <div>
//                             <button onClick={() => openModal()} className={`flex w-auto px-3 py-1 bg-sanBlue rounded-md text-white justify-center items-center font-thin`}>Add Room</button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='bg-[#F5F5F5] p-2 my-3 rounded w-full grid grid-cols-2 gap-5'>
//                     <button onClick={() => handleActiveTabs('activeTab_1')} className={`${activeTabs === "activeTab_1" ? "bg-white shadow text-blue-500 font-semibold" : null} max-w-lg rounded p-2 text-center`}><>List View</></button>
//                     <button onClick={() => handleActiveTabs('activeTab_2')} className={`${activeTabs === "activeTab_2" ? "bg-white shadow text-blue-500 font-semibold" : null} max-w-lg rounded p-2 text-center`} ><>Facility View</></button>

//                 </div>

//                 <div className='p-2 w-full'>
//                     {activeTabs === "activeTab_1" && <ListView openModalEdit={openModalEdit} openModalDel={openModalDel} openAddRoomFreq={openAddRoomFreq} />}
//                     {activeTabs === "activeTab_2" && <FacilityView openModalEdit={openModalEdit} openModalDel={openModalDel} openAddRoomFreq={openAddRoomFreq} />}
//                 </div>
//             </div>
//             {isModalOpenAdd && <ModalComponent isOpen={isModalOpenAdd}
//                 onClose={closeModalAdd}
//                 setIsModalOpen={setIsModalOpenAdd}>
//                 <form action="" className='flex flex-col gap-2 p-4 bg-white w-full'>
//                     <h1 className='text-blue-400 font-medium'>Add Room</h1>
//                     <input type="text" placeholder='Name' className='p-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin' />
//                     <select name="facility" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
//                         <option value="">Facility 1</option>
//                         <option value="">Facility 2</option>
//                         <option value="">Facility 3</option>
//                     </select>
//                     <button className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>Add Room</button>
//                 </form>
//             </ModalComponent>}
//             {isModalOpenEdit && <ModalComponent isOpen={isModalOpenEdit}
//                 onClose={closeModalEdit}
//                 setIsModalOpen={setIsModalOpenEdit}>
//                 <form action="" className='flex flex-col gap-2 p-4 bg-white w-full'>
//                     <h1 className='text-blue-400 font-medium'>Edit Room {currentUserId}</h1>
//                     <input type="text" placeholder='Name' className='p-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin' />
//                     <select name="facility" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
//                         <option value="">Facility 1</option>
//                         <option value="">Facility 2</option>
//                         <option value="">Facility 3</option>
//                     </select>
//                     <button className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>Edit Room</button>
//                 </form>
//             </ModalComponent>}

//             {isModalOpenDel && (
//                 <ModalComponent
//                     isOpen={isModalOpenDel}
//                     onClose={closeModalDel}
//                     setIsModalOpen={setIsModalOpenDel}
//                 >
//                     <div className='p-4 flex flex-col'>
//                         <h1 className='text-red-500 text-xl font-semibold'>Delete?</h1>
//                         <h1 className='text-sm py-2'>Are You sure u want to delete this Faclitity {currentUserId} ? This action cannot be undone</h1>
//                         <div className='flex items-center gap-4 justify-between py-2'>
//                             <button onClick={closeModalDel} className='px-4 py-2 text-black bg-gray-400 hover:bg-gray-400/50 text-center rounded-md'>Cancel</button>
//                             <button className='px-4 py-2 text-white bg-red-500 hover:bg-red-500/50 active:bg-red-600 text-center rounded-md'>Delete</button>
//                         </div>
//                     </div>
//                 </ModalComponent>)}

//             {isModalOpenAddFreq && (
//                 <ModalComponent
//                     isOpen={isModalOpenAddFreq}
//                     onClose={closeAddRoomFreq}
//                     setIsModalOpen={setIsModalOpenAddFreq}
//                 >
//                     <form action="" className='flex flex-col gap-2 p-4'>
//                         <h1 className='text-blue-400 font-medium'>Add Room Frequency {currentUserId}</h1>
//                         <select name="frequency" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
//                             <option className='my-2' value="">Daily 1</option>
//                             <option className='my-2' value="">Weekly 2</option>
//                             <option className='my-2' value="">Monthly 3</option>
//                             <option className='my-2' value="">Yearly 3</option>
//                         </select>
//                         <button className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>Submit</button>
//                     </form>
//                 </ModalComponent>)}

//         </>
//     )
// }

// function ListView({ openModalEdit, openModalDel, openAddRoomFreq }) {

//     const data = [
//         { facilityName: "Facility 1 ", roomName: 'Support Room', qrCode: "/dashboard/room-management", id: 1 },
//         { facilityName: "Discovery Mall ", roomName: 'Sanitation Room', qrCode: "/dashboard/room-management", id: 2 },
//         { facilityName: "Is-ahraf Mall", roomName: 'Cook Room', qrCode: "/dashboard/room-management", id: 3 },
//         { facilityName: "Mongo Park ", roomName: 'Salad Room', qrCode: "/dashboard/room-management", id: 4 },
//         { facilityName: "Chicken Republic ", roomName: 'Noodle Production Room', qrCode: "/dashboard/room-management", id: 5 },
//         { facilityName: "Federal Medical Centre ", roomName: 'Support Room', qrCode: "/dashboard/room-management", id: 7 },
//         { facilityName: "Mongo House ", roomName: 'Salad Room', qrCode: "/dashboard/room-management", id: 8 },
//         { facilityName: "Chicken Republic ", roomName: 'Noodle Production Room', qrCode: "/dashboard/room-management", id: 9 },
//         { facilityName: "Is-ahraf Mall", roomName: 'Cook Room', qrCode: "/dashboard/room-management", id: 10 },
//         { facilityName: "Mongo Park ", roomName: 'Salad Room', qrCode: "/dashboard/room-management", id: 11 },
//         { facilityName: "Chicken Republic ", roomName: 'Noodle Production Room', qrCode: "/dashboard/room-management", id: 12 },
//     ];

//     return (
//         <>
//             <div className='pt-10 h-auto overflow-x-auto no-scrollbar'>
//                 <table className="table-auto rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
//                     <thead>
//                         <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
//                             <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
//                                 Room Name
//                             </th>
//                             <th className="px-5 py-3  text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
//                                 Facitility Name
//                             </th>
//                             <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
//                                 QR Code
//                             </th>
//                             <th className="px-5  py-3 text-left  text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
//                                 Actions
//                             </th>

//                         </tr>
//                     </thead>

//                     <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
//                         {data.map((data) => (
//                             <tr key={data.id} className="border-b border-gray-200 whitespace-nowrap">
//                                 <td className="px-5 py-3 text-sm">{data.roomName}</td>
//                                 <td className="px-5 py-3 text-sm">{data.facilityName}</td>
//                                 <td className="px-5 py-3 text-sm"><Link href={data.qrCode} className='text-blue-400'>View QR Code</Link></td>
//                                 <td className="px-5 py-3 text-sm">
//                                     <div className='flex items-center gap-x-4'>
//                                         {/* Will add the icon later */}
//                                         <button onClick={() => openAddRoomFreq(data.id)}>
//                                             <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
//                                                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                                 <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
//                                                 <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
//                                             </svg>
//                                         </button>
//                                         <button onClick={() => openModalEdit(data.id)}>
//                                             <svg
//                                                 width="16"
//                                                 height="16"
//                                                 viewBox="0 0 16 16"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <g clipPath="url(#clip0_194_10938)">
//                                                     <path
//                                                         d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
//                                                         fill="green"
//                                                         fillOpacity="0.8"
//                                                     />
//                                                 </g>
//                                                 <defs>
//                                                     <clipPath id="clip0_194_10938">
//                                                         <rect width="16" height="16" fill="white" />
//                                                     </clipPath>
//                                                 </defs>
//                                             </svg>
//                                         </button>
//                                         <button onClick={() => openModalDel(data.id)}>
//                                             <svg
//                                                 width="14"
//                                                 height="16"
//                                                 viewBox="0 0 14 16"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
//                                                     fill="red"
//                                                     fillOpacity="0.8"
//                                                 />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//                 {data.length === 0 && <div className='text-center py-4 '>No Data yet</div>}

//             </div>
//         </>
//     )
// }

// function FacilityView({ openModalEdit, openModalDel, openAddRoomFreq }) {

//     const data = [
//         { qrCode: "/dashboard/room-management", name: "Facility 1" },
//         { qrCode: "/dashboard/room-management", name: "Noodle Production Room" },
//         { qrCode: "/dashboard/room-management", name: "Noodle Production Room2" },
//     ]
//     const data2 = [
//         { qrCode: "/dashboard/room-management", name: "Facility Room1" },
//         { qrCode: "/dashboard/room-management", name: "Noodle Production Room" },
//         { qrCode: "/dashboard/room-management", name: "Software Room2" },
//     ]
//     const data3 = [
//         { qrCode: "/dashboard/room-management", name: "Noodle Production Room" },
//         { qrCode: "/dashboard/room-management", name: "Facility 1" },
//         { qrCode: "/dashboard/room-management", name: "Production Room6" },
//     ]

//     const DataTable = ({ data, title }) => {
//         return (
//             <>
//                 <div className='overflow-x-auto w-full  flex flex-col no-scrollbar py-5 h-auto'>
//                     <h1 className='font-bold'>{title}</h1>
//                     <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
//                         <thead>
//                             <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
//                                 <th className="px-5 py-3 text-left text-sm font-normal text-black capitalize tracking-wider">
//                                     Facility
//                                 </th>
//                                 <th className=" py-3 text-left  text-sm font-normal shrink-1 text-black capitalize tracking-wider">
//                                     {/* Actions */}
//                                 </th>
//                                 <th className=" px-5 py-3 text-left  text-sm font-normal shrink-1 text-black capitalize tracking-wider">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
//                             {data?.map((table_data, id) => (
//                                 <tr key={id} className="border-b w-full border-gray-200 whitespace-nowrap">
//                                     <td className="px-5 py-2 text-left   text-sm">
//                                         <p>{table_data.name}</p>
//                                     </td>
//                                     <td className="px-5 py-2   text-sm">
//                                         <Link className='text-blue-400' href={table_data.qrCode}>View Qr Code</Link>
//                                     </td>

//                                     <td className="px-5 py-2 text-sm flex items-center">
//                                         <div className='flex items-center gap-x-3'>
//                                             <button onClick={() => openAddRoomFreq(data.id)}>
//                                             <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="21" height="21" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
//                                                 <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//                                                 <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
//                                                 <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
//                                             </svg>
//                                             </button>

//                                             <button onClick={() => openModalEdit(id)}>
//                                                 <svg
//                                                     width="16"
//                                                     height="16"
//                                                     viewBox="0 0 16 16"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                     <g clipPath="url(#clip0_194_10938)">
//                                                         <path
//                                                             d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
//                                                             fill="green"
//                                                             fillOpacity="0.8"
//                                                         />
//                                                     </g>
//                                                     <defs>
//                                                         <clipPath id="clip0_194_10938">
//                                                             <rect width="16" height="16" fill="white" />
//                                                         </clipPath>
//                                                     </defs>
//                                                 </svg>
//                                             </button>
//                                             <button
//                                                 onClick={() => openModalDel(id)}
//                                                 className={`whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
//                                             >
//                                                 <svg
//                                                     width="14"
//                                                     height="16"
//                                                     viewBox="0 0 14 16"
//                                                     fill="none"
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                 >
//                                                     <path
//                                                         d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
//                                                         fill="red"
//                                                         fillOpacity="0.8"
//                                                     />
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </>

//         )
//     }
//     return (
//         <div className=' w-full py-4'>
//             <DataTable data={data} title={"Facility 1"} />
//             <DataTable data={data2} title={"Facility 2"} />
//             <DataTable data={data3} title={"Facility 3"} />
//         </div>
//     )
// }

"use client";
import BackButton from "@/components/BackButton";
import AddAssetsModal from "@/components/asset-management/Modals/AddAssetsModal";
import ModalComponent from "@/components/modals/Modal";
import useRooms from "@/hooks/useRoom";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FreePagination from "@/components/pagination/FreePagination";
import EditRoomModal from "@/components/room-management/modals/EditRoomModal";
import useUser from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import QRCode from "react-qr-code";

const RoomDetails = () => {
  const { getSingleRoom, singleRooms, loading } = useRooms();
  const router = useRouter();
  const dispatch = useDispatch();
  const data =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("singleItem"))
      : null;

  const searchParams = useSearchParams();
  const params = useParams();
  const { getLocations, allLocations } = useUser();
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = singleRooms?.assets?.slice(
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
    if (currentPage !== Math.ceil(singleRooms?.assets.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(singleRooms?.assets?.length / itemsPerPage));
  };
  const tabs = [
    // {
    //   name: "Room",
    //   component: (
    //     <div className="flex lg:flex-row flex-col lg:gap-8 w-full py-4">
    //       <div className="w-full lg:w-[100%] bg-white dark:bg-sanBlue shadow-xl p-3">
    //         <header>
    //           <h2 className="dark:text-white text-black font-bold text-xl text-center pb-3">
    //             Room Info
    //           </h2>
    //         </header>
    //         <div className="flex flex-col space-y-6 dark:text-white text-black">
    //           <div className="flex items-center gap-3 text-sm border-b border-gray-400 pb-2">
    //             <p className="font-semibold">Name:</p>
    //             <p>{singleRooms?.room?.roomName}</p>
    //           </div>
    //           <div className="flex items-center gap-3 border-b border-gray-400 pb-2">
    //             <p className="font-semibold">Code:</p>
    //             <p>{`${singleRooms?.room?.roomPrefix}${singleRooms?.room?.roomCode}`}</p>
    //           </div>
    //           {/* <div className="flex items-center gap-3 border-b border-gray-400 pb-2">
    //           <p className="font-semibold">State:</p>
    //           <p>{singleRooms?.state}</p>
    //         </div> */}
    //         </div>

    //         <div className="flex flex-col gap-y-3"></div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: "Assets ",
      component: (
        <div className="pt-5 " >
          <div className="flex justify-end pb-4">
            <button
              onClick={() => {
                setId(params.id);
                openModal();
              }}
              className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
            >
              Add Asset
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
              {currentItems?.map((asset, index) => (
                <tr key={asset?._id} className="border-b border-gray-200">
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {asset?.name}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${asset?.assetPrefix}${asset?.assetCode}`}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm flex justify-center">
                    <>
                      <Link
                        title="View Assets"
                        href={`/dashboard/asset-management/${asset?._id}`}
                        className={` whitespace-no-wrap text-md font-semibold ml-3 p-2 rounded-md text-black bg-white cursor-pointer  `}
                      >
                        View Assets
                      </Link>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <FreePagination
            itemsPerPage={itemsPerPage}
            totalItems={singleRooms?.assets?.length}
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
    // {
    //   name: "Tasks",
    //   component: AssetTasks,
    // },
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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    getSingleRoom(params.id);
  }, []);

  console.log("first", singleRooms);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const openModal = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };

  console.log("jmm", singleRooms);
  return (
    <div className="text-black  bg-white dark:bg-slate-800  h-screen  lg:px-10 p-5 w-full">
      <div className="flex justify-between items-start pb-5 pt-10">
        <header className=" flex  items-start gap-2">
          <BackButton />
          <span className=" flex flex-col items-start gap-2">
            <h2 className="text-center dark:text-white text-black text-2xl font-bold">
              {singleRooms?.room?.roomName}
            </h2>
            <p className="dark:text-gray-200 text-gray-600">{`${singleRooms?.room?.roomPrefix}${singleRooms?.room?.roomCode}`}</p>
          </span>
        </header>
        <div>
          <button
            onClick={() => {
              dispatch(setItem(data));
              openModalEdit(params?.id);
            }}
            className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
          >
            Edit Room
          </button>
        </div>
      </div>

      <>
        <main className="bg-white dark:bg-slate-800 w-full h-screen">
          <div className="p-5 lg:p">
            <div className=" flex justify-center items-center p-5">
              <QRCode
                value={params?.id}
                height={10}
                className="w-12 h-12  md:h-40 md:w-40 dark:text-white text-black"
              />
            </div>
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

      {isModalOpenAdd && (
        <AddAssetsModal
          isModalOpenAdd={isModalOpenAdd}
          setIsModalOpenAdd={setIsModalOpenAdd}
          closeModalAdd={closeModalAdd}
        />
      )}
      {isModalOpenEdit && (
        <ModalComponent
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          setIsModalOpen={setIsModalOpenEdit}
        >
          <EditRoomModal allLocations={allLocations} />
        </ModalComponent>
      )}
    </div>
  );
};

export default RoomDetails;

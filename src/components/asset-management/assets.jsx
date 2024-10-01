"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddAssetsModal from "./Modals/AddAssetsModal";
import EditAssetsModal from "./Modals/EditAssetsModal";
import DeleteAssetsModal from "./Modals/DeleteAssetsModal";
import AddAssetsFrequency from "./Modals/AddAssetsFrequency";
import AddAssetsInventory from "./Modals/AddAssetsInventory";
import ListView from "./ListViewTable";
import RoomView from "./RoomViewTable";
import useAssets from "@/hooks/useAssets";
import { useSelector } from "react-redux";

export default function AssetsComp() {
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const [activeTabs, setActiveTabs] = useState("activeTab_1");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAddFreq, setIsModalOpenAddFreq] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [openDropDown, setOpenDropdown] = useState(false);
  const [InventoryModal, setInventoryModal] = useState(false);

  const [isAddInventory, setIsAddInventory] = useState("add");
  const { getAssets, allAssets, loading } = useAssets();

  useEffect(() => {
    if (role?.toLowerCase() !== "manager") {
      getAssets();
    } 
  }, []);
  useEffect(() => {
    if (role?.toLowerCase() === "manager") {
      getAssets(selectedFacilityId);
    }
  }, [selectedFacilityId]);


  const handleActiveTabs = (tabName) => {
    setActiveTabs(tabName);
  };

  const openModal = () => {
    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };
  const openModalEdit = (assetId) => {
    setCurrentUserId(assetId);
    // setCurrentRoomDetails(roomDetails);
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    // setCurrentRoomDetails(null);
  };
  const openModalDel = (assetId) => {
    setCurrentUserId(assetId);
    setIsModalOpenDel(true);
    // setassetIdToDelete(roomId);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };

  const openAddRoomFreq = (assetId) => {
    setCurrentUserId(assetId);
    setIsModalOpenAddFreq(true);
  };

  const closeAddRoomFreq = () => {
    setIsModalOpenDel(false);
  };

  const openInventory = (assetId) => {
    setCurrentUserId(assetId);
    setInventoryModal(true);
  };

  const closeInventory = () => {
    setInventoryModal(false);
  };
  const toggleDropdown = (assetId) => {
    setOpenDropdown((prevId) => (prevId === assetId ? null : assetId));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className="bg-white h-screen dark:bg-slate-900 w-full">
      <div className="w-full px-10 py-10">
        <div className="flex-1 w-full">
          <div className="flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center">
            <div>
              <h1 className="text-black dark:text-white lg:text-2xl font-semibold">
                Assets in Rooms
              </h1>
              <p className="text-dashText dark:text-white text-sm">
                Manage, create and oversee asset management within the system.
              </p>
            </div>
            <div>
              <button
                onClick={() => openModal()}
                className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
              >
                Add Assets
              </button>
            </div>
          </div>
        </div>

        <div className=" overflow-auto no-scrollbar mt-5 p-1.5 lg:p-2 flex bg-dashLighter dark:text-white text-black dark:bg-sanBlue rounded-[30px] justify-between pb-2 mb-2 items-center flex-row lg:space-x-6 space-x-4 sticky top-0 w-full overflow-y-hidden z-10 lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
          <button
            onClick={() => handleActiveTabs("activeTab_1")}
            className={`mr-2 cursor-pointer text-center p-2 rounded-[30px] w-1/2 ${
              activeTabs === "activeTab_1"
                ? " text-darkText bg-white dark:bg-black dark:text-white font-bold  text-sm lg:text-lg text-darkText p-2 transform transition-all duration-300 ease-in "
                : "text-black dark:text-white text-sm lg:text-lg font-thin transform transition-all duration-150 ease-out"
            }`}
          >
            <>Assets</>
          </button>
          <button
            onClick={() => handleActiveTabs("activeTab_2")}
            className={` mr-2 cursor-pointer text-center p-2 rounded-[30px] w-1/2 ${
              activeTabs === "activeTab_2"
                ? "bg-white dark:bg-black dark:text-white shadow text-dashText font-semibold"
                : null
            } max-w-lg rounded p-2 text-center`}
          >
            <>General Schedule</>
          </button>
        </div>

        <div className="p-2 w-full bg-white dark:bg-slate-900">
          {activeTabs === "activeTab_1" && (
            <ListView
              assets={allAssets}
              isLoading={loading}
              
            />
          )}

          {activeTabs === "activeTab_2" && (
            <>
              <RoomView
                allRooms={allAssets}
                loading={loading}
                openInventory={openInventory}
                openDropDown={openDropDown}
                openDropDownOptions={toggleDropdown}
                openModalEdit={openModalEdit}
                openModalDel={openModalDel}
                openAddRoomFreq={openAddRoomFreq}
              />
            </>
          )}
        </div>
      </div>

      {isModalOpenAdd && (
        <AddAssetsModal
          isModalOpenAdd={isModalOpenAdd}
          setIsModalOpenAdd={setIsModalOpenAdd}
          closeModalAdd={closeModalAdd}
        />
      )}

      {isModalOpenEdit && (
        <EditAssetsModal
          isModalOpenEdit={isModalOpenEdit}
          setIsModalOpenEdit={setIsModalOpenEdit}
          closeModalEdit={closeModalEdit}
        />
      )}

      {isModalOpenDel && (
        <DeleteAssetsModal
          isModalOpenDel={isModalOpenDel}
          setIsModalOpenDel={setIsModalOpenDel}
          closeModalDel={closeModalDel}
          currentUserId={currentUserId}
        />
      )}

      {isModalOpenAddFreq && (
        <AddAssetsFrequency
          isModalOpenAddFreq={isModalOpenAddFreq}
          setIsModalOpenAddFreq={setIsModalOpenAddFreq}
          currentUserId={currentUserId}
          closeAddRoomFreq={closeAddRoomFreq}
        />
      )}

      {InventoryModal && (
        <AddAssetsInventory
          InventoryModal={InventoryModal}
          setInventoryModal={setInventoryModal}
          closeInventory={closeInventory}
        />
      )}
    </div>
  );
}

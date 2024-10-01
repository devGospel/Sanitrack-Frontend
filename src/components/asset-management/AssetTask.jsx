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
import AssetTaskTable from "./AssetTaskTable";
import AddAssetTaskModal from "./Modals/AddAssetTaskModal";
import Link from "next/link";
import { useParams } from "next/navigation";
import BackButton from "../BackButton";

export default function AssetsTasks() {
  const [activeTabs, setActiveTabs] = useState("activeTab_1");
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAddFreq, setIsModalOpenAddFreq] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [openDropDown, setOpenDropdown] = useState(false);
  const [InventoryModal, setInventoryModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const newData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("assetData"))
      : null;

  const data = isClient ? newData : {};
  const [isAddInventory, setIsAddInventory] = useState("add");
  const { getAssets, allAssets, loading } = useAssets();
  const params = useParams();
  useEffect(() => {
    getAssets();
  }, []);
  console.log("Assets", allAssets);

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
          <div className="flex justify-center  lg:justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center">
            <div className="flex gap-2 items-start">
              <BackButton/>
              <div>
              <h1 className="text-black dark:text-white lg:text-2xl font-semibold">
               {data?.name}
              </h1>
              <p className="text-dashText dark:text-white text-sm">
               {data?.room}
              </p>
              </div>
              
            </div>
            <div>
              <Link
                href={`/dashboard/asset-management/create/${params?.id}?search=${data.roomId}`}
                className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
              >
                Add Asset Tasks
              </Link>
            </div>
          </div>
        </div>

        <div className="p-2 w-full bg-white dark:bg-black">
          <AssetTaskTable
            allRooms={allAssets}
            isLoading={loading}
            openInventory={openInventory}
            openDropDown={openDropDown}
            openDropDownOptions={toggleDropdown}
            openModalEdit={openModalEdit}
            openModalDel={openModalDel}
            openAddRoomFreq={openAddRoomFreq}
          />
        </div>
      </div>

      {isModalOpenAdd && (
        <AddAssetTaskModal
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

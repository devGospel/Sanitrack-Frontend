"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/modals/Modal";
import { Controller, useForm } from "react-hook-form";
import useAssets from "@/hooks/useAssets";
import useRooms from "@/hooks/useRoom";
import useSettings from "@/hooks/useSettings";
import useUser from "@/hooks/useUser";
import Select from "react-select";
import useWorkOrder from "@/hooks/useWorkOrder";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, Flip } from "react-toastify";
import {
  setManageMss,
  updateManageMss,
  clearManageMss
} from "@/redux/features/manageMss/manageMss";
import { clearStoredWorkOrderDetails } from "@/redux/features/adminId/adminSlice";
import { Roles } from "@/constant/roles";

export default function UpdateTeamsModal({
  // isModalOpenAdd,
  // setIsModalOpenAdd,
  // closeModalAdd,
  closeModal
}) {
  const id = useSelector((state) => state.id.storedId);
  const item = useSelector((state) => state.id.storedItem);
  const roomId = useSelector((state) => state.id.storedRoomId)
  const startHour = useSelector((state) => state.id.storedHour)
  // const manageOrders = useSelector((state) => state.manageMss.manageOrders)
  const dispatch = useDispatch();

  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const storedOrder = useSelector((state) => state.id.storedWorkId);

  console.log(item);
  
  console.log("stored",storedOrder)

  const { addAssets, buttonLoader } = useAssets();
  const [showFirstInput, setShowFirstInput] = useState(true);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedCleaners, setSelectedCleaners] = useState([]);
  const { getAllFrequency, allFrequency, getAllAssetTask, allAssetTask } = useSettings();
  //   const { allRooms, getAllRooms } = useRooms();
  const { getTeams, allTeams, getCleaners, allCleaners, getAvailableTeams, allAvailableTeams, getAvailableCleaners, allAvailableCleaners, getFacilityCleaners, allFacilityCleaners } = useUser();
  const { updateWO, buttonLoading, getAllWorkOrdersForManagement } = useWorkOrder();

  const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];

  const argumentPassed = {roomId: roomId, startHour: startHour}
  // console.log('the start hour and roomId for row clicked on', roomId, startHour)
  // console.log('parameter passed to fn =>', argumentPassed)

  useEffect(() => {
    if(selectedFacilityId && role?.toLocaleLowerCase() == "manager"){ 
      getAvailableTeams(argumentPassed, selectedFacilityId)
      getAvailableCleaners(argumentPassed, selectedFacilityId)
    }else{ 
      getAvailableTeams(argumentPassed)
      getAvailableCleaners(argumentPassed)
    }
  }, [role, selectedFacilityId]);

  let allTeamsOptions
  let allCleanersOptions

  allTeamsOptions = allAvailableTeams?.map((item) => ({
    value: item._id,
    label: `${item.teamName} : ${item.isAvailable ? 'Available' : 'Not Available'}`,
    color: item.isAvailable ? 'green' : 'red' 
  }));

  allCleanersOptions = allAvailableCleaners?.map((item) => ({
    value: item?.user_id?._id,
    label: `${item.user_name} : ${item.isAvailable ? 'Available' : 'Not Available'}`,
    color: item.isAvailable ? 'green' : 'red' 
  }));

  const customStyles ={
    option: (provided, state) => ({
      ...provided,
      color: state.data.color || 'black', // Apply color if available
      backgroundColor: state.isSelected ? 'lightgray' : 'white', // Optional: highlight selected option
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color || 'black', // Apply color if available
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: '200px', // Set a fixed height for the dropdown menu
      overflowY: 'auto',  // Enable scrolling within the menu
      zIndex: 9999,       // Ensure the menu is above other elements
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,         // Remove padding to ensure consistent height calculation
    }),
  };

  const handleTeams = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTeams(values);
    console.log('selected teams',values);
  };
  const handleCleaners = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    
    setSelectedCleaners(values);
    console.log('selected cleaners',values);
  };

  // clean the ids to be passed 
  const validTeamIds = new Set(allTeamsOptions.map(option => option.value));
  const validCleanerIds  = new Set(allCleanersOptions.map(option => option.value));

  const filterSelectedTeams = (selectedTeams) => {
    return selectedTeams.filter(teamId => validTeamIds.has(teamId));
  };

  const filterSelectedCleaners = (selectedCleaners) => { 
    return selectedCleaners.filter(cleanerId => validCleanerIds.has(cleanerId));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedTeams);
    const filteredTeams = filterSelectedTeams(selectedTeams);
    const filteredCleaners = filterSelectedCleaners(selectedCleaners)

    const data = {"teams": filteredTeams, "cleaners": filteredCleaners}

    // const teamData = { teams: selectedTeams };
    // const cleanerData = { cleaners: selectedCleaners };

    if (storedOrder?.length > 1) {
      console.log('we want to submit multiple work orders ')

      const updatePromise = storedOrder.map(workOrderId => updateWO(workOrderId, data, true))
      const result = await Promise.all(updatePromise)

      const failedUpdates = result.filter(result => result.error)

      let newResponse;
      if (selectedFacilityId && validRoles.includes(role?.toLocaleLowerCase())) {
        newResponse = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase(), selectedFacilityId);
      } else {
        newResponse = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase());
      }

      if(newResponse.length > 0){ 
        let updatedFilteredData;
        
        if (storedOrder) {
          // console.log('from handle multiple updating', filteredWorkOrderIds)
          // Filter the newResponse to include only the previously filtered work orders
          updatedFilteredData = newResponse.filter(order => 
            storedOrder.includes(order.workOrderId)
          );
        } else {
          updatedFilteredData = newResponse;
        }
  
        dispatch(clearManageMss())
        dispatch(setManageMss(updatedFilteredData))
      }
      dispatch(clearStoredWorkOrderDetails())
      closeModal()
      // map throught the stored Orders
      // 
      if (failedUpdates.length > 0) {
        // const failedIds = failedUpdates.map(fail => fail.workOrderId);
        const failedMessages = failedUpdates.map(fail => `Work Order ID ${fail.workOrderId}: ${fail.message}`).join('\n');
        
        toast.error(`Failed to update the following work orders:\n${failedMessages}`, {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Flip,
        });
      } else {
        toast.success("All Work Orders Updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Flip,
        });
      }
      
    } else {
        console.log('data => ',data)
        await updateWO(id, data)

        // update the manage mss state 
        let newResponse
        if(selectedFacilityId && validRoles.includes(role?.toLocaleLowerCase())){ 
          newResponse = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase(), selectedFacilityId)
        }else{ 
          newResponse = await getAllWorkOrdersForManagement(role?.toLocaleLowerCase())
        }
        if(newResponse){ 
          dispatch(clearManageMss())
          dispatch(setManageMss(newResponse))
        }
        closeModal()
      // if (showFirstInput) {
      //   updateWO(id, cleanerData);
      // } else {
      //   updateWO(id, teamData);
      // }
    }

    // addAssets(data);
  };

  return (
    <div className="bg-white dark:bg-black "style={{ overflowY: 'auto' }}>
      <div className="pt-5 text-center sm:mt-0 sm:ml-4">
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          Teams
        </h3>
      </div>
      <div className="grid lg:grid-cols-1 grid-cols-1 px-4">
        {item?.map((team) => (
          <span
            key={team?._id}
            className="bg-sanLightBlue text-black dark:bg-sanBlue dark:text-white rounded-[10px] text-xs p-2 capitalize"
          >
            Assigned to: {team?.teamName}
          </span>
        ))}
      </div>
      <form className="flex flex-col gap-2 px-4 pt-2 pb-4 w-full">
        <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
          <div className="flex justify-center items-center pt-10">
            <div className="flex bg-sanBlue p-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowFirstInput(true);
                }}
                className={`px-4 py-2 rounded ${
                  showFirstInput
                    ? "bg-sanBlue dark:bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Cleaners
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowFirstInput(false);
                }}
                className={`px-4 py-2 rounded ${
                  !showFirstInput
                    ? "bg-sanBlue dark:bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Teams
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
            {showFirstInput ? (
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Cleaners</h2>
                <Select
                  placeholder="Select Cleaners"
                  classNames={{
                    control: () =>
                      "border border-gray-300 rounded-md dark:bg-black text-white",
                    input: () =>
                      " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                    menu: () =>
                      "dark:bg-black dark:text-white hover:text-black",
                    singleValue: () => "text-black",
                  }}
                  onChange={handleCleaners}
                  options={allCleanersOptions}
                  styles={customStyles}
                  isMulti
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Team</h2>
                <Select
                  placeholder="Select Teams"
                  classNames={{
                    control: () =>
                      "border border-gray-300 rounded-md dark:bg-black text-white",
                    input: () =>
                      " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                    menu: () =>
                      "dark:bg-black dark:text-white hover:text-black",
                    singleValue: () => "text-black",
                  }}
                  onChange={handleTeams}
                  options={allTeamsOptions}
                  styles={customStyles}
                  isMulti
                />
              </div>
            )}
          </div>
        </div>
        <button
          disabled={buttonLoading}
          onClick={handleSubmit}
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
        >
          {buttonLoading ? "Loading..." : " Update Team/Cleaners"}
        </button>
      </form>
    </div>
  );
}

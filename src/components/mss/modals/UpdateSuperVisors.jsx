"use client";

import React, { useEffect, useState } from "react";
import ModalComponent from "@/components/modals/Modal";
import { Controller, useForm } from "react-hook-form";
import useAssets from "@/hooks/useAssets";
import useRooms from "@/hooks/useRoom";
import { toast, Flip } from "react-toastify";
import useSettings from "@/hooks/useSettings";
import useUser from "@/hooks/useUser";
import Select from "react-select";
import useWorkOrder from "@/hooks/useWorkOrder";
import { useSelector, useDispatch } from "react-redux";
import FreePagination from "@/components/pagination/FreePagination";
import {
  setManageMss,
  clearManageMss
} from "@/redux/features/manageMss/manageMss";
import { clearStoredWorkOrderDetails } from "@/redux/features/adminId/adminSlice";
import { Roles } from "@/constant/roles";

export default function UpdateSupervisorsModal({
  // isModalOpenAdd,
  // setIsModalOpenAdd,
  // closeModalAdd,
  closeModal
}) {
  const id = useSelector((state) => state.id.storedId);
  const item = useSelector((state) => state.id.storedItem);
  const storedOrder = useSelector((state) => state.id.storedWorkId);
  const roomId = useSelector((state) => state.id.storedRoomId)
  const startHour = useSelector((state) => state.id.storedHour)

  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  const dispatch = useDispatch();

  const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];

  const { updateWO, buttonLoading, getAllWorkOrdersForManagement } = useWorkOrder();
  const { getInspectors, allInspectors, getAvailableInspectors , allAvailableInspectors} = useUser();
  const [selectedInspectors, setSelectedInspectors] = useState([]);

  const argumentPassed = {roomId: roomId, startHour:startHour}

  useEffect(() => {
    if(selectedFacilityId && role?.toLocaleLowerCase() == "manager"){ 
      getAvailableInspectors(argumentPassed, selectedFacilityId)
    }else{ 
      getAvailableInspectors(argumentPassed)
    }
    // getInspectors();
  }, [role, selectedFacilityId]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm();

  
  console.log("hehehehehe", storedOrder);


  const [selectedTeams, setSelectedTeams] = useState([]);

  //   const { allRooms, getAllRooms } = useRooms();



  // const handleSend = () => {
  //   // Logic for sending selected inspectors
  //   console.log("Selected Inspectors:", selectedInspectors);
  //   const newData = { inspectors: selectedInspectors };
  //   updateWO(id, newData);
  // };

  const { getAllRooms, allRooms } = useRooms();
  

  const handleSubmitData = async (data) => {
    console.log(data);
    // const newData = { inspectors: data };
    const newData = { inspectors: [data?.inspectors] };

    if (storedOrder?.length > 1) {
      const updatePromise = storedOrder.map(workOrderId => updateWO(workOrderId, newData, true))

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
      await updateWO(id, newData);
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
    }
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="pt-5 text-center sm:mt-0 sm:ml-4">
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          Supervisors
        </h3>
      </div>

      <>
        {" "}
        {/* <div className="grid grid-cols-2 gap-4 w-full p-4">
          {currentItems?.map((inspector) => (
            <div
              key={inspector?._id}
              className={`p-4 border rounded cursor-pointer  ${
                selectedInspectors.some(
                  (selected) => selected._id === inspector._id
                )
                  ? "bg-blue-200 dark:bg-sanBlue "
                  : "dark:bg-transparent dark:text-white bg-sanBlue"
              }`}
              onClick={() => toggleSelection(inspector?._id)}
            >
              {inspector?.username}
            </div>
          ))}
        </div> */}
        <div className="">
          <form
            className="flex flex-col space-y-2 mx-auto max-w-4xl  bg-white dark:bg-black shadow-xl h-full p-5 mb-10 rounded-[10px]"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <div className="flex flex-col space-y-2 pb-5">
              <label id="inspectors">Select Supervisors</label>
              <div className="text-black w-full flex flex-col items-start">
                <Controller
                  name="inspectors" // Name of the field in the form data
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                    >
                      <option disabled>Select Supervisors</option>
                      {allAvailableInspectors?.map((item) => (
                        <option
                          key={item?._id}
                          className={`capitalize ${!item.isAvailable ? 'text-red-500' : 'text-green-500'}`}
                          value={item?.user_id?._id}
                        >
                          {item?.user_name} {item?.isAvailable ? 'Available' : 'Not Available'}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors && errors?.inspectors?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.inspectors.message}
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={buttonLoading}
              className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
            >
              {buttonLoading ? "Loading..." : " Update Inspectors"}
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

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
  clearManageMss,
} from "@/redux/features/manageMss/manageMss";
import { clearStoredWorkOrderDetails } from "@/redux/features/adminId/adminSlice";
import { Roles } from "@/constant/roles";
import useTeam from "@/hooks/useTeam";

export default function AddTeamsModal({
  // isModalOpenAdd,
  // setIsModalOpenAdd,
  // closeModalAdd,
  closeModal,
}) {
  const [isClient, setIsClient] = useState(false);
const {addTeamMember,buttonLoader}=useTeam()
  useEffect(() => {
    setIsClient(true);
  }, []);
  const id = useSelector((state) => state.id.storedId);

  const dispatch = useDispatch();

  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const storedOrder = useSelector((state) => state.id.storedWorkId);

  const role = isClient ? newRole : "";
  const [selectedUser, setSelectedUser] = useState([]);

  const {
    getTeams,
    allTeams,
    getCleaners,
    allCleaners,
    getAvailableTeams,
    allAvailableTeams,
    getAvailableCleaners,
    allAvailableCleaners,
    getFacilityCleaners,
    allFacilityCleaners,
    getFacilityInspectors,
    allFacilityInspectors,
  } = useUser();
  useEffect(() => {
    if (selectedFacilityId && role?.toLocaleLowerCase() == "manager") {
      //for some reason the selectedFaciltyId is tied to the admin as well so I am add this check

      getFacilityInspectors(selectedFacilityId);
      getFacilityCleaners(selectedFacilityId);
    }
  }, [role, selectedFacilityId]);

  const allUsers = allFacilityCleaners.concat(allFacilityInspectors);
  const validRoles = [
    Roles.MANAGER.toLowerCase(),
    Roles.INSPECTOR.toLowerCase(),
    Roles.SUPERVISOR.toLowerCase(),
  ];

  let allUserOptions;
  let allCleanersOptions;

  allUserOptions = allUsers?.map((item) => ({
    value: item.user_id,
    label: `${item.user_name}`,
  }));

  allCleanersOptions = allAvailableCleaners?.map((item) => ({
    value: item?.user_id?._id,
    label: `${item.user_name} : ${
      item.isAvailable ? "Available" : "Not Available"
    }`,
    color: item.isAvailable ? "green" : "red",
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.color || "black", // Apply color if available
      backgroundColor: state.isSelected ? "lightgray" : "white", // Optional: highlight selected option
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color || "black", // Apply color if available
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px", // Set a fixed height for the dropdown menu
      overflowY: "auto", // Enable scrolling within the menu
      zIndex: 9999, // Ensure the menu is above other elements
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0, // Remove padding to ensure consistent height calculation
    }),
  };

  const handleUsers = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedUser(values);
    console.log("selected teams", values);
  };
  const handleCleaners = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];

    setSelectedCleaners(values);
    console.log("selected cleaners", values);
  };

  // clean the ids to be passed

  console.log(allUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUser?.length > 0) {
      const filteredUsers = allUsers
        .filter((user) => selectedUser.includes(user.user_id))
        .map((user) => ({
          userId: user.user_id,
          roleId: user.role_id,
        }));
    //   const latest = allUsers.filter((user) =>
    //     selectedUser.includes(user.user_id)
    //   );
    const data ={members:filteredUsers}
     addTeamMember(data,id)
    }
    //    else {
    //     return [...prevSelected, { userId: id,roleId:role_id }];
    //   }
  };

  return (
    <div className="bg-white dark:bg-black " style={{ overflowY: "auto" }}>
      <div className="pt-5 text-center sm:mt-0 sm:ml-4">
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          Update Teams
        </h3>
      </div>

      <form className="flex flex-col gap-2 px-4 pt-2 pb-4 w-full">
        <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
            {
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Team Member</h2>
                <Select
                  placeholder="Select Users"
                  classNames={{
                    control: () =>
                      "border border-gray-300 rounded-md dark:bg-black text-white",
                    input: () =>
                      " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                    menu: () =>
                      "dark:bg-black dark:text-white hover:text-black",
                    singleValue: () => "text-black",
                  }}
                  onChange={handleUsers}
                  options={allUserOptions}
                  styles={customStyles}
                  isMulti
                />
              </div>
            }
          </div>
        </div>
        <button
            disabled={buttonLoader}
          onClick={handleSubmit}
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
        >
          {buttonLoader ? "Loading..." : " Add Member(s)"}
        </button>
      </form>
    </div>
  );
}

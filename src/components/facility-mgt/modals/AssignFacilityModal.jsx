"use client";

import React, { useEffect, useState } from "react";

import useAssets from "@/hooks/useAssets";

import useSettings from "@/hooks/useSettings";
import useUser from "@/hooks/useUser";
import Select from "react-select";
import useWorkOrder from "@/hooks/useWorkOrder";
import { useSelector } from "react-redux";
import useFacilities from "@/hooks/useFacilities";

export default function AssignFacilityModal({
  isModalOpenAdd,
  setIsModalOpenAdd,
  closeModalAdd,
}) {
  const id = useSelector((state) => state.id.storedId);
  const item = useSelector((state) => state.id.storedItem);
  console.log("high d", id);
  const storedOrder = useSelector((state) => state.id.storedWorkId);
  console.log("stored", storedOrder);

  const [showFirstInput, setShowFirstInput] = useState("cleaner");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedCleaners, setSelectedCleaners] = useState([]);
  const [selectedInspectors, setSelectedInspectors] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  //   const { allRooms, getAllRooms } = useRooms();
  const {
    getTeams,
    allTeams,
    getCleaners,
    allCleaners,
    getInspectors,
    allInspectors,
    getManagers,
    allManagers
  } = useUser();
  const { assignFacilities, buttonLoader } = useFacilities();
  useEffect(() => {
    getTeams();
    getInspectors();
    getCleaners();
    getManagers()
  }, []);
  const allManagersOptions = allManagers?.map((item) => ({
    value: item._id,
    label: item.username,
  }));
  const allInspectorOptions = allInspectors?.map((item) => ({
    value: item._id,
    label: item.username,
  }));
  const allCleanersOptions = allCleaners?.map((item) => ({
    value: item._id,
    label: item.username,
  }));
  const handleManagers = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedManagers(values);
  };
  const handleInspectors = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedInspectors(values);
  };
  const handleCleaners = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    console.log(values);
    setSelectedCleaners(values);
  };
  const handleChange = (e) => {
    setShowFirstInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedTeams);
    const teamData = { teams: selectedTeams };
    const cleanerData = { cleaners: selectedCleaners };
    const inspectorData = { inspectors: selectedInspectors };
    const managerData = { managers: selectedManagers };
    const data =
      showFirstInput === "cleaner"
        ? cleanerData
        : showFirstInput === "inpsector"
        ? inspectorData
        : managerData;

    const url =
      showFirstInput === "cleaner"
        ? `assign-cleaner?facilityId=${id}`
        : showFirstInput === "inpsector"
        ? `assign-inspector?facilityId=${id}`
        : `assign-manager?facilityId=${id}`;
    assignFacilities(url, data);
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="pt-5 text-center sm:mt-0 sm:ml-4">
        <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
          Assign to Facility
        </h3>
      </div>
      
      <form className="flex flex-col gap-2 px-4 pt-2 pb-4 w-full">
        <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-2 ">
          <div className="text-black w-full flex flex-col items-start">
            <select
              placeholder=" Select Assignee"
              onChange={handleChange}
              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 bg-white dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
            >
              <option disabled>Select Assignee</option>
              <option value="cleaner">Cleaners</option>
              <option value="inpsector">Inspectors</option>
              <option value="managers">Managers</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
            {showFirstInput === "cleaner" ? (
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
                  isMulti
                />
              </div>
            ) : showFirstInput === "inpsector" ? (
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Inspectors</h2>
                <Select
                  placeholder="Select Inspectors"
                  classNames={{
                    control: () =>
                      "border border-gray-300 rounded-md dark:bg-black text-white",
                    input: () =>
                      " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                    menu: () =>
                      "dark:bg-black dark:text-white hover:text-black",
                    singleValue: () => "text-black",
                  }}
                  onChange={handleInspectors}
                  options={allInspectorOptions}
                  isMulti
                />
              </div>
            ) : (
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Managers</h2>
                <Select
                  placeholder="Select Managers"
                  classNames={{
                    control: () =>
                      "border border-gray-300 rounded-md dark:bg-black text-white",
                    input: () =>
                      " w-full  px-5  md:text-sm rounded-md   dark:placeholder:text-gray-100 dark:text-white text-black",
                    menu: () =>
                      "dark:bg-black dark:text-white hover:text-black",
                    singleValue: () => "text-black",
                  }}
                  onChange={handleManagers}
                  options={allManagersOptions}
                  isMulti
                />
              </div>
            )}
          </div>
        </div>
        <button
          disabled={buttonLoader}
          onClick={handleSubmit}
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
        >
          {buttonLoader ? "Loading..." : " Assign"}
        </button>
      </form>
    </div>
  );
}

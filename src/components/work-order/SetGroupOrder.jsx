"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "./Input";
import { Controller, useForm } from "react-hook-form";
import TasksPopover from "./TasksPopover";
import BackButton from "../BackButton";
import useRooms from "@/hooks/useRoom";
import useSettings from "@/hooks/useSettings";
import useAssets from "@/hooks/useAssets";
import Select from "react-select";
import useUser from "@/hooks/useUser";
import useWorkOrder from "@/hooks/useWorkOrder";
// import useUpload from "@/hooks/useUpload";


const SetGroupOrder = () => {



  const handleSSOPFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm();
  const { getAllRooms, allRooms } = useRooms();
  const [showFirstInput, setShowFirstInput] = useState(true);
  const [room, setRoom] = useState(null);
  const [assetId, setAssId] = useState(null);
  const [time, setSelectedTime] = useState("");
  const [type, setType] = useState(null);

  const [fetchedInspectors, setFetchedInspectores] = useState([]);
  const [freq, setFrequency] = useState({});

  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );

  const {
    getTeams,
    allTeams,
    getCleaners,
    allCleaners,
    getInspectors,
    allInspectors,
    getAvailableTeams,
    allAvailableTeams,
    getAvailableInspectors,
    allAvailableInspectors,
    getFacilityInspectors,
    allFacilityInspectors,
    getFacilityCleaners,
    allFacilityCleaners,

    getAvailableCleaners,
    allAvailableCleaners,
  } = useUser();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedFacilityId && role?.toLocaleLowerCase() == "manager") {
      //for some reason the selectedFaciltyId is tied to the admin as well so I am add this check
      getAllRooms(selectedFacilityId);
      getFacilityInspectors(selectedFacilityId);
      getFacilityCleaners(selectedFacilityId);
      getTeams(selectedFacilityId);
    } else {
      getCleaners();
      getTeams();
      getAllRooms();
      getInspectors();
    }
  }, [role, selectedFacilityId]);

  // console.log(`flooorrr it room ${room} hour ${time}`)
  // console.log(`facility inspector => ${allFacilityInspectors}`)
  // console.log(`available cleaners for facility => ${allAvailableCleaners}`)
  useEffect(() => {
    if (room && time) {
      const hourPart = time.split(":")[0];
      const formattedHour = parseInt(hourPart, 10);
      const data = { roomId: room, startHour: formattedHour };

      if (selectedFacilityId && role?.toLocaleLowerCase() == "manager") {
        getAvailableTeams(data, selectedFacilityId);
        getAvailableCleaners(data, selectedFacilityId);
        getAvailableInspectors(data, selectedFacilityId);
      } else {
        getAvailableTeams(data);
        getAvailableInspectors(data);
        getAvailableCleaners(data);
      }
    }
  }, [time, room]);
  console.log("all", allCleaners);
  const { getAllFrequency, allFrequency } = useSettings();

  const { getAssetsByRoom, assetsByRoom, getAllAssetTasks, allAssetTasks } =
    useAssets();

  useEffect(() => {
    getAssetsByRoom(room);
  }, [room]);

  useEffect(() => {
    const freq = allAssetTasks.filter((item) => item?._id === type);
    setFrequency(freq[0]?.cleaningTypeFrequency);
    console.log("freq", freq[0]?.cleaningTypeFrequency);
  }, [type]);

  useEffect(() => {
    getAllAssetTasks(assetId);
  }, [assetId]);

  console.log("ass by room", allAssetTasks);
  const { buttonLoading, createWO } = useWorkOrder();
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedCleaners, setSelectedCleaners] = useState([]);

  let allTeamsOptions;
  let allCleanersOptions;

  if (allAvailableTeams.length > 0) {
    allTeamsOptions = allAvailableTeams?.map((item) => ({
      value: item._id,
      label: `${item.teamName} : ${
        item.isAvailable ? "Available" : "Not Available"
      }`,
      color: item.isAvailable ? "green" : "red",
    }));
  } else {
    allTeamsOptions = allTeams.map((item) => ({
      value: item._id,
      label: item.teamName,
      color: "black",
    }));
  }
  if (selectedFacilityId && role?.toLocaleLowerCase() == "manager") {
    if (allAvailableCleaners.length > 0) {
      allCleanersOptions = allAvailableCleaners?.map((item) => ({
        value: item?.user_id?._id,
        label: `${item.user_name} : ${
          item.isAvailable ? "Available" : "Not Available"
        }`,
        color: item.isAvailable ? "green" : "red",
      }));
    } else {
      allCleanersOptions = allFacilityCleaners.map((item) => ({
        value: item?.user_id,
        label: item.user_name,
        color: "black",
      }));
    }
  } else {
    // console.log(`No facility Id set`)
    if (allAvailableCleaners.length > 0) {
      allCleanersOptions = allAvailableCleaners?.map((item) => ({
        value: item?.user_id?._id,
        label: `${item.user_name} : ${
          item.isAvailable ? "Available" : "Not Available"
        }`,
        color: item.isAvailable ? "green" : "red",
      }));
    } else {
      allCleanersOptions = allCleaners?.map((item) => ({
        value: item._id,
        label: item.username,
        color: "black",
      }));
    }
  }

  useEffect(() => {
    const role =
      typeof window !== "undefined" ? localStorage.getItem("role") : null ?? ""; //logged in user id
    console.log(`for this ${role} the selected`, selectedFacilityId);
    console.log(`all Cleaners set`, allCleanersOptions);
    console.log(`all set inspectors `, allAvailableInspectors);
    console.log("----------------------------------------------------------");
    console.log("all default inspectors", allInspectors);
    console.log("all facility inspectors", allFacilityInspectors);
    // if (allAvailableCleaners.length > 0) {
    //   allAvailableCleaners.map((item) => {
    //     console.log(`all available cleaners no facility id => `, item);
    //   })
    // }else{
    //   allCleaners.map((item) => {
    //     console.log(`all cleaners no facility id => `, item);
    //   })
    // }
  }, [allCleanersOptions]);

  // Function to apply styles based on the color field
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
  };

  // const allCleanersOptions = allCleaners?.map((item) => ({
  //   value: item._id,
  //   label: item.username,
  // }));

  const handleTeams = (selectedOptions) => {
    console.log(`team selected`);
    // console.log('all team options for filter',allTeamsOptions.map(item => item.value))
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    // console.log(`values are =>`, values)
    setSelectedTeams(values);
  };

  const handleCleaners = (selectedOptions) => {
    // console.log('all team options for filter',allCleanersOptions.map(item => item.value))
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    console.log(values);
    setSelectedCleaners(values);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("document", file);
  };
  const { getAllAssets, assets } = useAssets();
  const [open, setOpen] = useState(false);

  // clean the ids to be passed
  const validTeamIds = new Set(allTeamsOptions.map((option) => option.value));
  const validCleanerIds = new Set(
    allCleanersOptions.map((option) => option.value)
  );

  const filterSelectedTeams = (selectedTeams) => {
    return selectedTeams.filter((teamId) => validTeamIds.has(teamId));
  };

  const filterSelectedCleaners = (selectedCleaners) => {
    return selectedCleaners.filter((cleanerId) =>
      validCleanerIds.has(cleanerId)
    );
  };

  // console.log(`actual selected cleaners => ${filterSelectedCleaners(selectedCleaners)}`)

  const onSubmit = (data) => {
    const filteredTeams = filterSelectedTeams(selectedTeams);
    const filteredCleaners = filterSelectedCleaners(selectedCleaners);
    // console.log(`fffffffffffffffffffffffffffffff => ${time}`);
    const newData = {
      name: data.name,

      assets: [
        {
          assetId: data.assets,
          assetTaskType: data?.cleaningType,
          exclude: false,
          roomId: data?.roomId,
        },
      ],
      inspectors: [data.inspectors],
      assignToIndividual: false,
      teamIds: filteredTeams,
      cleaners: filteredCleaners,
      frequency: freq._id,
      start_date: `${data?.start_date}T${time}:00.000Z`,
      end_date: data?.end_date,
      cleaningValidPeriod: data?.duration,
      pdfUrl: pdf
    };
    // console.log("New Data:", newData);
    createWO(newData);
  };

  return (
    <form
      className="flex flex-col space-y-2 mx-auto max-w-4xl  bg-white dark:bg-sanBlue shadow-xl h-full lg:p-10 p-5 mb-10 rounded-[10px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full   justify-center ">
        <h2 className="text-xl font-bold text-center">Set Custom New Order</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="my-2 p-4 border border-sanGray rounded-lg  flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label id="name">Name of Word Order</label>
            <Input
              name={"name"}
              placeholder={"Set work order name..."}
              type={"text"}
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex flex-row items-center max-sm:flex-col md:space-x-2 space-y-2 items-center">
            <div className="flex flex-col space-y-2 w-full ">
              <label id="roomId">Room</label>
              <div className="text-black w-full flex flex-col items-start">
                <Controller
                  name="roomId" // Name of the field in the form data
                  control={control}
                  rules={{
                    required: "Room is required",
                  }} // Validation rules if needed
                  render={({ field }) => (
                    <select
                      {...field}
                      onClick={(e) => setRoom(e.target.value)}
                      className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                    >
                      <option hidden>Select a Room</option>

                      {allRooms?.map((room) => (
                        <option
                          key={room?._id}
                          className="capitalize"
                          value={room?._id}
                        >
                          {room?.roomName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors && errors?.roomId?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.roomId.message}
                  </span>
                )}
              </div>

              <div className="my-2 p-4 border border-sanGray rounded-lg  flex flex-col space-y-3">
                <div className="flex flex-col space-y-2">
                  <label id="asset">Assets to Clean</label>
                  <div className="text-black w-full flex flex-col items-start">
                    <Controller
                      name="assets" // Name of the field in the form data
                      control={control}
                      rules={{
                        required: "Asset is required",
                      }} // Validation rules if needed
                      render={({ field }) => (
                        <select
                          {...field}
                          onClick={(e) => setAssId(e.target.value)}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                        >
                          <option hidden>Select an Asset</option>

                          {assetsByRoom?.map((item) => (
                            <option
                              key={item?._id}
                              className="capitalize"
                              value={item?._id}
                            >
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors && errors?.assets?.type === "required" && (
                      <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                        {errors?.assets.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 w-full basis-[48%]">
                  <label id="cleaningType">Cleaning Type</label>
                  <div className="text-black w-full flex flex-col items-start">
                    <Controller
                      name="cleaningType" // Name of the field in the form data
                      control={control}
                      rules={{
                        required: "Type is required",
                      }}
                      render={({ field }) => (
                        <select
                          {...field}
                          onClick={(e) => setType(e.target.value)}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                        >
                          <option hidden>Select a Cleaning Type</option>

                          {allAssetTasks?.map((item) => (
                            <option
                              key={item?._id}
                              className="capitalize"
                              value={item?._id}
                            >
                              {`${item?.cleaningType?.name}`}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors && errors?.cleaningType?.type === "required" && (
                      <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                        {errors?.cleaningType.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label id="level">Enhance Upload Level</label>
            <select
              placeholder={"Upload level..."}
              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400"
              name="level"
              {...register("level")}
            >
              <option disabled>Upload level...</option>
              {[1, 2, 3, 4].map((_) => (
                <option key={_} value={"Level " + _}>
                  Upload level {_}.
                </option>
              ))}
            </select>
          </div>
          <div
            defaultValue={"Task List..."}
            className="flex flex-col space-y-2"
          >
            <label id="permission">Set Permissions</label>
            <select
              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400"
              name="permission"
              {...register("permission")}
            >
              <option disabled>Set Permissions</option>
              {["Reset", "View", "Add"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col space-y-3 p-4 border border-sanGray rounded-lg mt-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col space-y-2">
              <label id="asset">Frequency</label>
              <div className="text-black w-full flex flex-col items-start">
                <Controller
                  name="frequency" // Name of the field in the form data
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      disabled
                      className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                    >
                      <option
                        className="capitalize"
                        // value={item?._id}
                      >
                        {freq?.name}
                      </option>
                    </select>
                  )}
                />
                {errors && errors?.duration?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.duration.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label id="duration">Duration</label>
              <select
                placeholder={"Duration..."}
                className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400"
                name="level"
                {...register("duration", { required: "Duration is required." })}
              >
                <option>Duration...</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_) => (
                  <option key={_} value={_}>
                    {_}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col space-x-2 w-full">
            <Input
              name={"start_date"}
              placeholder={"Start Date"}
              register={register}
              errors={errors}
              type={"date"}
              label={"Start Date"}
            />
            <Input
              name={"end_date"}
              placeholder={"End date"}
              register={register}
              errors={errors}
              type={"date"}
              label={"End Date"}
            />
            <div className="text-black w-full flex flex-col items-start">
              <label className="text-gray-500 dark:text-white py-2">Time</label>
              <div className="relative w-full">
                <input
                  id="time"
                  type="time"
                  // defaultValue={item?.category}
                  onChange={(e) => {
                    console.log("You are channgeee");
                    console.log(e.target.value);
                    setSelectedTime(e.target.value);
                  }}
                  value={time}
                  placeholder=" Time"
                  className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:text-white"
                  name="name"
                  // {...register("time", { required: "Time is required." })}
                />
                {errors && errors?.time?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.time.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>




      <div className="my-2 p-4 border border-sanGray rounded-lg flex justify-center items-center gap-8">
            <div>
              <input
                type="file"
                name='pdf'
                id="document"
                {...register("document")}
                className="hidden"
                accept="application/pdf" // Ensure that only PDF files are selectable
                onChange={handleSSOPFileChange} // File selection handler
              />
              <label
                htmlFor="document"
                className="inline-block cursor-pointer px-4 py-2 border border-blue-500 dark:border-white dark:text-white text-blue-500 bg-transparent rounded hover:bg-blue-100 dark:hover:bg-none"
              >
                Upload Training/SSOP Document
              </label>

              {/* Display message while uploading */}
              <p className="text-blue-500 text-xs">
                {buttonLoader ? "Uploading..." : "Ready to upload your SSOP document"}
              </p>
            </div>

            <div>
              {/* Upload button */}
              <button
                // onClick={handleUpload} // Trigger upload on click
                disabled={buttonLoader}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {buttonLoader ? "Uploading..." : "Upload PDF"}
              </button>
            </div>
          </div>




        <section className="flex flex-col space-y-3 p-4 border border-sanGray rounded-lg mt-4">
          <div className="flex flex-col space-y-2">
            <label id="inspectors">Select Supervisors</label>
            <div className="text-black w-full flex flex-col items-start">
              <Controller
                name="inspectors" // Name of the field in the form data
                control={control}
                rules={{
                  required: "Supervisor is required",
                }} // Validation rules if needed
                render={({ field }) => (
                  <select
                    {...field}
                    className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                  >
                    <option hidden>Select Supervisors</option>
                    {isMounted &&
                    selectedFacilityId &&
                    role?.toLocaleLowerCase() == "manager" //basically, if a selectedFacilityId is available use the avaialble Inspector for the facility else use the inspectors assigned to the facility
                      ? allAvailableInspectors.length > 0
                        ? allAvailableInspectors.map((item) => (
                            <option
                              key={item?._id}
                              className={`capitalize ${
                                !item.isAvailable
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                              value={item?.user_id?._id}
                            >
                              {item?.user_name}{" "}
                              {item?.isAvailable
                                ? "Available"
                                : "Not Available"}
                            </option>
                          ))
                        : allFacilityInspectors.map((item) => (
                            <option
                              key={item?._id}
                              className="capitalize"
                              value={item?.user_id}
                            >
                              {item?.user_name} - {item?.user_id}
                            </option>
                          ))
                      : allAvailableInspectors.length > 0
                      ? allAvailableInspectors.map((item) => (
                          <option
                            key={item?._id}
                            className={`capitalize ${
                              !item.isAvailable
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                            value={item?.user_id?._id}
                          >
                            {item?.user_name} -{" "}
                            {item?.isAvailable ? "Available" : "Not Available"}
                          </option>
                        ))
                      : allInspectors.map((item) => (
                          <option
                            key={item?._id}
                            className="capitalize"
                            value={item?._id}
                          >
                            {item?.username}
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
          <div className="flex justify-center items-center pt-10">
            <div className="flex ">
              <button
                type="button"
                onClick={() => setShowFirstInput(true)}
                className={`px-4 py-2 rounded ${
                  showFirstInput
                    ? "bg-sanBlue dark:bg-black text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Cleaners
              </button>
              <button
                type="button"
                onClick={() => setShowFirstInput(false)}
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

          <div className="grid grid-cols-1 gap-x-3">
            {showFirstInput ? (
              <div className="flex flex-col space-y-2 ">
                <h2 className="text-xs font-bold">Select Cleaners</h2>
                <Select
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
        </section>
      </div>

      <button
        type="submit"
        disabled={buttonLoading}
        className="bg-sanBlue mx-auto text-white px-6 py-3 border-none outline rounded-md focus-within:outline-none focus:outline-none w-full my-3 max-w-[500px]"
      >
        {buttonLoading ? "Loading..." : "Save"}
      </button>
    </form>
  );
};

export default SetGroupOrder;
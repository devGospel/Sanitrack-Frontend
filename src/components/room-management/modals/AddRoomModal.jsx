"use client";
import Spinner from "@/components/loaders/Loader";
import useRooms from "@/hooks/useRoom";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddRoomModal = ({ allLocations }) => {
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const params = useParams();
  const { createRoom, buttonLoader } = useRooms();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data) => {
    const newData = { roomName: data?.roomName, location_id: params?.id || selectedFacilityId };
    if (params?.id || selectedFacilityId) {
      createRoom(newData);
    } else createRoom(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-4 bg-white dark:bg-black w-full"
      >
        <h1 className="text-blue-400 dark:text-white font-medium">Add Room</h1>
        <div className="flex flex-col">
          <input
            type="text"
            id="roomName"
            name="roomName"
            {...register("roomName", { required: "name is required" })}
            placeholder="Name"
            className="p-2 w-full my-2 rounded-md outline-none border border-gray-300 dark:border-black dark:text-white bg-white text-black font-thin dark:bg-sanBlue"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">Room name is required</p>
          )}
        </div>

        {!params?.id || !selectedFacilityId  && (
          <div className="flex flex-col">
            <select
              name="location_id"
              {...register("location_id", { required: true })}
              className="p-2 w-full my-2 rounded-md outline-none border border-gray-300 dark:border-black dark:text-white bg-white text-black font-thin dark:bg-sanBlue"
            >
              <option hidden className="px-5">
                Select Facility location
              </option>
              {allLocations?.map((location) => (
                <option
                  key={location?._id}
                  value={location?._id}
                  className="capitalize"
                >
                  {location?.facility_name}
                </option>
              ))}
            </select>

            {errors.location_id && (
              <p className="text-red-500 text-xs">location id missing</p>
            )}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 dark:bg-sanBlue text-center text-white p-3 rounded-md w-full my-2"
          disabled={buttonLoader}
        >
          {buttonLoader ? <Spinner /> : "Create Room"}
        </button>
      </form>
    </div>
  );
};

export default AddRoomModal;

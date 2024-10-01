import useRooms from "@/hooks/useRoom";
import useUser from "@/hooks/useUser";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditRoomModal = ({
 allLocations
}) => {
  const { createRoom, buttonLoader } = useRooms();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const item = useSelector((state) => state.id.storedItem);
 
  const handleEditRoom = (data) => {
    const newData = { roomName: data?.roomName, location_id: params?.id };
    if (params?.id) {
      createRoom(newData);
    } else createRoom(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleEditRoom)}
        className="flex flex-col gap-2 p-4 bg-white dark:bg-black w-full"
      >
        <h1 className="text-black dark:text-white font-medium text-center">Edit Room</h1>
        <div className="flex flex-col">
          <input
            type="text"
            id="roomName"
            name="roomName"
            defaultValue={item?.roomName}
            {...register("roomName", { required: "name is required" })}
            placeholder="Name"
             className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">Room name is required</p>
          )}
        </div>

        <div className="flex flex-col">
          <select
            name="locationId"
            {...register("locationId", { required: true })}
             className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
          >
            <option hidden className="px-5">
            {item?.location_id?.facility_name}
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
        <button
          type="submit"
          className="px-5 py-3 w-full md:w-full text-white bg-sanBlue rounded-md mt-5"
          disabled={buttonLoader}
        >
          {buttonLoader ? <Spinner /> : "Edit Room"}
        </button>
      </form>
    </div>
  );
};

export default EditRoomModal;

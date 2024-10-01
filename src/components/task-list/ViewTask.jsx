import React from "react";
import TaskListHeader from "./TaskListHeader";
import BackButton from "../BackButton";
import AssetTable from "./AssetTable";
import RoomTable from "./RoomTable";
import { useSearchParams } from "next/navigation";

const assetData = [
  {
    id: 1,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 2,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 3,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 4,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
];
const roomData = [
  {
    id: 1,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 2,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 3,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
  {
    id: 4,
    assetName: "Deep Fryer",
    roomName: "Salad Room",
    facility: "Facility 3",
  },
];

const ViewTask = () => {
  const params = useSearchParams();
  const taskId = params.get("id");

  const loading = false;

  const proposedSingleTaskData = {
    id: 1,
    name: "Mopping Stick",
    creator: "Admin",
    date: "22 - 05 - 2024",
    description: "To classify all brown colored chairs",
  };

  const data = proposedSingleTaskData;

  return (
    <div className="w-full flex flex-col gap-4 max-w-5xl mx-auto h-screen ">
      <div className=" w-full flex flex-col no-scrollbar px-4 sm:px-6 py-2">
        <TaskListHeader
          hideBtn={true}
          heading={"Task "}
          paragraph={
            "Manage, create and oversee task list management within the system."
          }
          title="Create New List"
          path={"/dashboard/task-list/create-task"}
        />
      </div>
      <div className="flex w-full lg:w-3/5  justify-between lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">View Task List</h2>
      </div>

      <div className="lg:px-10 px-5 ">
        <div className=" ring-1 ring-gray-300 rounded-md flex flex-col gap-4 text-lg p-4 lg:p-6">
          <div className=" flex flex-row justify-between">
            <h1 className=" font-semibold text-lg">Task List Name</h1>
            <span>{data?.name}</span>
          </div>
          <div className=" flex flex-row justify-between">
            <h1 className="font-semibold text-lg">Date Created</h1>
            <span>{data?.date}</span>
          </div>
          <div className=" flex flex-row justify-between">
            <h1 className="font-semibold text-lg">Name of creator</h1>
            <span>{data?.creator}</span>
          </div>
          <div className=" flex flex-row justify-between">
            <h1 className="font-semibold text-lg">Description</h1>
            <span>{data?.description}</span>
          </div>
        </div>
      </div>

      <div className="lg:px-10 px-5 ">
        <AssetTable assetData={assetData} />
        {/* <RoomTable roomData={roomData} /> */}
      </div>

      <div className="lg:px-10 px-5 self-center w-1/2  ">
        <button className=" bg-sanBlue p-3 text-white rounded-md w-full">
          Set Work Order
        </button>
      </div>
    </div>
  );
};

export default ViewTask;

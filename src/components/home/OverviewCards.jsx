import { Roles } from "@/constant/roles";
import useAttendance from "@/hooks/useAttendance";
import useRooms from "@/hooks/useRoom";
import useStats from "@/hooks/useStats";
import useTask from "@/hooks/useTask";
import useUser from "@/hooks/useUser";
import useWorkOrder from "@/hooks/useWorkOrder";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDocumentScanner } from "react-icons/md";
import { useSelector } from "react-redux";

const OverviewCards = () => {
  const {
    allCleaners,
    allInspectors,
    allLocations,
    allTeams,
    getCleaners,
    getInspectors,
    getLocations,
    getTeams,
  } = useUser();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
 
  const newRole = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const facId = typeof window !== "undefined" ? localStorage.getItem("hasFacility") : null;
  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);
  const role = isClient ? newRole : "";
  const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];

  const {cardStats,getCardStats}=useStats()
  const { getAllRooms, allRooms } = useRooms();
  const { getAttendance, data } = useAttendance();
  const { getAllTasks, allTasks } = useTask();
  const { getAllWorkOrders, allWorkOrders } = useWorkOrder();
  useEffect(() => {

    if(validRoles.includes(role?.toLocaleLowerCase())){ 
      getCardStats(selectedFacilityId)
    }else{
      getCardStats()
    }
    // getCleaners();
    // getInspectors();
    getLocations();
    // getTeams();
    // getAllRooms();
    // getAttendance();
    // getAllTasks();
    // getAllWorkOrders();
  }, [selectedFacilityId]);
  console.log("cards",cardStats)
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2  gap-6">
      <Link
        href={"/dashboard/user-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-blue-100 text-blue-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo1.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          NUMBER OF CLEANERS
        </div>
        <div className={`text-blue-500 font-bold`}>{cardStats?.allCleaners}</div>
      </Link>
      <Link
        href={"/dashboard/user-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-green-100 text-green-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo2.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          NUMBER OF SUPERVISORS
        </div>
        <div className={`text-green-500 font-bold`}>
          {cardStats?.allInspectors}
        </div>
      </Link>
      {newRole.toLocaleLowerCase() == 'admin' && (
        <Link
        href={"/dashboard/facilities"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-red-100 text-red-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo3.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          NUMBER OF FACILITIES
        </div>
        <div className={`text-red-500 font-bold`}>{allLocations?.length}</div>
      </Link>
      )}
      
      <Link
        href={"/dashboard/room-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-yellow-100 text-yellow-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo4.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          NUMBER OF ROOMS
        </div>
        <div className={`text-yellow-500 font-bold`}>{cardStats?.rooms}</div>
      </Link>

      <Link
        href={"/dashboard/asset-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-yellow-100 text-yellow-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo4.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          NUMBER OF ASSETS
        </div>
        <div className={`text-yellow-500 font-bold`}>{cardStats?.assets}</div>
      </Link>


      <Link
        href={"/dashboard/work-order"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-green-100 text-green-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo5.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          ACTIVE WORK ORDERS
        </div>
        <div
          className={`text-green-400 font-bold`}
        >{`${cardStats?.workOrders ?? 0}`}</div>
      </Link>
      {/* <Link
        href={"/dashboard/task-list"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-blue-100 text-blue-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo6.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          ALL TASKS
        </div>
        <div className={`text-blue-500 font-bold`}>{`${allTasks?.length}`}</div>
      </Link> */}
      {/* <Link
        href={"/dashboard/attendance-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-yellow-100 text-yellow-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo7.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          TOTAL STAFF ATTENDANCE
        </div>
        <div className={`text-yellow-500 font-bold`}>{data?.length}</div>
      </Link> */}
      <Link
        href={"/dashboard/team-management"}
        className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
      >
        <div className={`bg-red-100 text-red-400 p-2  rounded-md`}>
          <Image
            height={500}
            width={500}
            src={"/fo8.svg"}
            alt="uploadImage"
            className="w-6 h-6 object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm dark:text-white">
          TOTAL TEAMS ENROLLED
        </div>
        <div className={`text-red-500 font-bold`}>{allTeams?.length}</div>
      </Link>
    </div>
  );
};

export default OverviewCards;

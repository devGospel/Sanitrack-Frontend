"use client";

import React, { useEffect, useState } from "react";
import TopLayout from "./TopLayout";
import Image from "next/image";
import ProfimeImage from "../../../public/profile.png";
import { useRouter } from "next/navigation";
import Frame1 from "../../../public/frame1.svg";
import Frame2 from "../../../public/frame2.svg";
import Frame3 from "../../../public/frame3.svg";
import useAttendance from "@/hooks/useAttendance";
import useTraining from "@/hooks/useTraining";
import useUser from "@/hooks/useUser";
import useStaffHistory from "@/hooks/useHistory";
import FreePagination from "../pagination/FreePagination";

export default function UserProfile() {
  const username =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("username"))
      : null;
  const { getSingleUser, singleUser } = useUser();

  useEffect(() => {
    getSingleUser(username);
  }, []);
  const [activeTabs, setActiveTabs] = useState("activeTab_1");
  const router = useRouter();

  const handleActiveTabs = (tabName) => {
    setActiveTabs(tabName);
  };

  const handleRouter = () => {
    router.push("/dashboard/user-management/edit-user");
  };
  return (
    <section className="w-full   px-4   pb-10 mb-3 mt-4 sm:px-6">
      <TopLayout
        heading={"User Profile"}
        hideBtn={true}
        paragraph={"Users individual profiles and progress report"}
      />
      <div className="flex flex-col border border-[#0357EE]/50 max-w-5xl  py-5 px-4 lg:mx-6 mt-4 mx-auto rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Image src={ProfimeImage} alt="user_profile_image" className=" h-16 w-16 rounded-full" /> */}
            <div className="flex flex-col space-y-1">
              <h1 className=" font-medium capitalize">
                {singleUser?.username}
              </h1>
              <p>Supervisor</p>
            </div>
          </div>

          <button
            onClick={() => handleRouter}
            className="px-4 py-2 bg-sanBlue hover:bg-[#3478F3]/50 text-center rounded-md text-white"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-[#F5F5F5] dark:bg-black p-2 my-3 rounded w-full grid grid-cols-2 sm:grid-cols-3 gap-5">
          <button
            onClick={() => handleActiveTabs("activeTab_1")}
            className={`${
              activeTabs === "activeTab_1"
                ? "bg-white dark:bg-sanBlue dark:text-white shadow text-blue-500 font-semibold"
                : null
            } max-w-lg rounded p-2 text-center`}
          >
            <>General Information</>
          </button>
          <button
            onClick={() => handleActiveTabs("activeTab_2")}
            className={`${
              activeTabs === "activeTab_2"
                ? "bg-white dark:bg-sanBlue dark:text-white shadow text-blue-500 font-semibold"
                : null
            } max-w-lg rounded p-2 text-center`}
          >
            <>Trainings</>
          </button>
          <button
            onClick={() => handleActiveTabs("activeTab_3")}
            className={`${
              activeTabs === "activeTab_3"
                ? "bg-white dark:bg-sanBlue dark:text-white shadow text-blue-500 font-semibold"
                : null
            } max-w-lg rounded p-2 text-center col-span-2 sm:col-span-1`}
          >
            <>Attendance</>
          </button>
        </div>

        <div className="border-t border-[#3478F3] p-2 w-full">
          {activeTabs === "activeTab_1" && <GeneralInfo />}
          {activeTabs === "activeTab_2" && <Training />}
          {activeTabs === "activeTab_3" && <Attendance />}
        </div>
      </div>
    </section>
  );
}

export function GeneralInfo() {
  const username =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("username"))
      : null;
  const { getSingleUser, singleUser } = useUser();

  useEffect(() => {
    getSingleUser(username);
  }, []);
  console.log("user", singleUser);
  return (
    <div className="w-full  grid grid-cols-1 gap-x-20 md:grid-cols-2">
      <div>
        <div className="flex flex-col border-b border-black/50 mb-4 py-2">
          <h1 className="text-gray-500 text-sm">Full Name</h1>
          <h1 className="capitalize">{singleUser?.username}</h1>
        </div>
        {/* <div className='flex flex-col border-b border-black/50 mb-4 py-2'>
                    <h1 className='text-gray-500 text-sm'>Date of Birth</h1>
                    <h1>July 14, 1995</h1>
                </div> */}
        {/* <div className='flex flex-col border-b border-black/50 mb-4 py-2'>
                    <h1 className='text-gray-500 text-sm'>Gender</h1>
                    <h1 >Male</h1>
                </div> */}
        <div className="flex flex-col border-b border-black/50 mb-4 py-2">
          <h1 className="text-gray-500 text-sm">Address</h1>
          <h1 className="capitalize">{singleUser?.address_id}</h1>
        </div>
        <div className="flex flex-col border-b border-black/50 mb-4 py-2">
          <h1 className="text-gray-500 text-sm">Email Address</h1>
          <h1 className="">{singleUser?.email}</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-col border-b border-black/50 mb-4 py-2">
          <h1 className="text-gray-500 text-sm">Mobile Number</h1>
          <h1 className="capitalize">{singleUser?.phone_number}</h1>
        </div>
        {/* <div className='flex flex-col border-b border-black/50 mb-4 py-2'>
                    <h1 className='text-gray-500 text-sm'>Marital Status</h1>
                    <h1>Married</h1>
                </div> */}
        {/* <div className='flex flex-col border-b border-black/50 mb-4 py-2'>
                    <h1 className='text-gray-500 text-sm'>Nationality</h1>
                    <h1>America</h1>
                </div> */}
        {/* <div className='flex flex-col border-b border-black/50 mb-4 py-2'>
                    <h1 className='text-gray-500 text-sm'>City</h1>
                    <h1>California</h1>
                </div> */}
        <div className="flex flex-col border-b border-black/50 mb-4 py-2">
          <h1 className="text-gray-500 text-sm">Password</h1>
          <h1>**********</h1>
        </div>
        <div className="flex flex-col border-b border-black py-2">
          <h1 className="text-gray-500 text-sm">Role</h1>
          <h1>Supervisor</h1>
        </div>
        {/* <div className='flex flex-col border-b border-black py-2'>
                    <h1 className='text-gray-500 text-sm'>Working days</h1>
                    <h1>Full Time (7 days)</h1>
                </div> */}
      </div>
    </div>
  );
}

export function Training({}) {
  const { getSingleUserTraining, singleUserTraining } = useTraining();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  console.log(userId);
  useEffect(() => {
    getSingleUserTraining(userId);
  }, []);
  console.log(singleUserTraining);
  const data = [
    {
      name: "Montilisy Ecommerce Platform",
      status: "Completed",
      startDate: new Date().toDateString(),
      finishDate: new Date().toDateString(),
      id: 1,
    },
    {
      name: "Amongus - Discovery Phase",
      status: "Completed",
      startDate: new Date().toDateString(),
      finishDate: new Date().toDateString(),
      id: 2,
    },
    {
      name: "Hingutsan Web Development",
      status: "In Progress",
      startDate: new Date().toDateString(),
      finishDate: new Date().toDateString(),
      id: 3,
    },
    {
      name: "Hingutsan Web Development",
      status: "In Progress",
      startDate: new Date().toDateString(),
      finishDate: new Date().toDateString(),
      id: 4,
    },
  ];

  return (
    <div className=" w-full h-full">
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
        <div className="bg-white shadow border border-gray-200 rounded-md p-3 flex flex-col justify-center items-center">
          <div className="flex items-center py-2 justify-center">
            <Image
              src={Frame1}
              alt="Icon_image"
              className=" h-8 w-8 object-contain"
            />
          </div>
          <h1 className="text-center">ENROLLED COURSES</h1>
          <p className="font-bold text-lg">15</p>
        </div>
        <div className="bg-white shadow border border-gray-200 rounded-md p-2 flex flex-col justify-center items-center">
          <div className="flex items-center py-2 justify-center">
            <Image
              src={Frame2}
              alt="Icon_image"
              className=" h-8 w-8 object-contain"
            />
          </div>
          <h1 className="text-center">COMPLETED COURSES</h1>
          <p className="font-bold text-lg">30</p>
        </div>
        <div className="bg-white shadow border border-gray-200 rounded-md p-2 flex flex-col justify-center items-center">
          <div className="flex items-center py-2 justify-center">
            <Image
              src={Frame3}
              alt="Icon_image"
              className=" h-8 w-8 object-contain"
            />
          </div>
          <h1 className="text-center">DROPPED COURSES </h1>
          <p className="font-bold text-lg">15</p>
        </div>
        <div className="bg-white shadow border border-gray-200 rounded-md p-2 flex flex-col justify-center items-center">
          <div className="flex items-center py-2 justify-center">
            <Image
              src={Frame2}
              alt="Icon_image"
              className=" h-8 w-8 object-contain"
            />
          </div>
          <h1 className="text-center">AVERAGE ASSESSMENT PERFORMANCE</h1>
          <p className="font-bold text-lg">15</p>
        </div>
      </div>

      <div className="pt-10 h-auto overflow-x-auto no-scrollbar">
        <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                LMS Training
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
                Start Date
              </th>
              <th className="px-5  py-3 text-left  text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                Finish Date
              </th>
              <th className="px-5  py-3 text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          {singleUserTraining.map((data) => (
            <tbody key={data._id} className=" w-full">
              <tr className="border-b border-gray-200 whitespace-nowrap">
                <td className="px-5 py-3 text-sm">{data.id}</td>
                <td className="px-5 py-3 text-sm">{data.name}</td>
                <td className="px-5 py-3 text-sm">{data.startDate}</td>
                <td className="px-5 py-3 text-sm">{data.finishDate}</td>
                <td
                  className={`px-5 py-3 text-sm ${
                    data.status === "Completed"
                      ? "text-green-700 font-medium"
                      : "text-yellow-400"
                  }`}
                >
                  {data.status}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {data.length === 0 && (
          <div className="text-center py-4 ">No Trainings yet</div>
        )}
      </div>
    </div>
  );
}

export function Attendance() {
  const { getAttendance, data: attendaceData, isLoading } = useAttendance();
  const {
    fetchStaffHistory,
    staffHistory,
    isLoading: loading,
  } = useStaffHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getAttendance();
    const staffId = "65d47e28b91921dedd5e98af"; // Replace with actual staffId
    const roleId = "65bbb1e6960a9012fd81f0b9"; // Replace with actual roleId
    fetchStaffHistory(staffId, roleId);
  }, []);

  console.log("Staff", staffHistory);
  console.log("Attendance", attendaceData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  staffHistory.length > 0 ? Math.ceil(staffHistory.length / itemsPerPage) : 0;
  const currentItems = staffHistory?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(staffHistory.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(staffHistory?.length / itemsPerPage));
  };

  return (
    <div className="w-full h-full">
      <div className="py-5 h-auto overflow-x-auto no-scrollbar">
        <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
                Date
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                Facility Name
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 capitalize tracking-wider">
                Check In
              </th>
              {/* <th className="px-5  py-3 text-left  text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                                Check Out
                            </th>
                            <th className="px-5  py-3 text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                                Working Hours
                            </th> */}
              <th className="px-5  py-3 text-left text-sm font-semibold shrink-1 text-gray-500 capitalize tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          {currentItems?.map((data, _id) => (
            <tbody key={data._id} className=" w-full">
              <tr className="border-b border-gray-200 whitespace-nowrap">
                <td className="px-5 py-3 text-sm">{_id}</td>
                <td className="px-5 py-3 text-sm">
                  {formatDate(data.clockInTime)}
                </td>
                <td className="px-5 py-3 text-sm">
                  {data.facilityId.facility_name}
                </td>
                <td className="px-5 py-3 text-sm">
                  {formatDate(data.clockInTime)}
                </td>
                {/* <td className="px-5 py-3 text-sm">{data.checkOut}</td>
                                <td className="px-5 py-3 text-sm">{data.workingHrs}</td> */}
                <td
                  className={`px-5 py-3 text-sm ${
                    data.status === "on time"
                      ? "text-green-700 font-semibold"
                      : " text-pink-700"
                  }`}
                >
                  <p
                    className={`p-1 ${
                      data.status === "on time" ? "bg-green-100" : "bg-pink-100"
                    } w-fit rounded-md`}
                  >
                    {data.status}
                  </p>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {isLoading && (
          <div className="min-h-[60vh] w-full flex items-center flex-col">
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
          </div>
        )}
        {!isLoading && staffHistory?.length === 0 && (
          <div className="text-center py-4 font-bold text-red-500">
            No Attendace yet
          </div>
        )}
      </div>

      <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={staffHistory?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  );
}

function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
}

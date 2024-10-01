"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";

import { useParams, usePathname } from "next/navigation";
import ModalComponent from "@/components/modals/Modal";

import FreePagination from "@/components/pagination/FreePagination";

import RemoveTeamMember from "./modals/RemoveTeamMember";
import useTeam from "@/hooks/useTeam";
import TopLayout from "../user-management/TopLayout";
import BackButton from "../BackButton";
import { FaPlusSquare } from "react-icons/fa";
import AddTeamsModal from "./modals/AddTeamMember";

const TeamDetailsTable = ({}) => {
  const params = useParams();
  const { getSingleTeam, singleTeams, loading } = useTeam();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const newRole = isClient ? role : "";
  useEffect(() => {
    getSingleTeam(params?.id);
  }, []);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  console.log("ghgh", singleTeams);

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = singleTeams?.members?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (
      currentPage !== Math.ceil(singleTeams?.members?.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(singleTeams?.members?.length / itemsPerPage));
  };
  const [component, setComponent] = useState(null);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenAssign, setIsModalOpenAssign] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);

  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
  };
  const openModalAssign = (e) => {
    e.preventDefault();

    setIsModalOpenAssign(true);
  };

  const closeModalAssign = () => {
    setIsModalOpenAssign(false);
  };

  const openModalEdit = (e) => {
    e.preventDefault();

    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const openModalDel = (e) => {
    e.preventDefault();

    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };
  const pathname = usePathname();
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }

  return (
    <>
      <div className="flex gap-2 items-start">
        <BackButton />
        <TopLayout
          heading={singleTeams?.teamName}
          isManager={false}
          paragraph={`${singleTeams?.teamPrefix}${singleTeams?.teamCode}`}
          btn={
            <button
              onClick={(e) => {
                //   window?.localStorage.setItem(
                //     "singleId",
                //     JSON.stringify(item?._id)
                //   );
                dispatch(setId(params?.id));
                openModalAdd(e);
              }}
              className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
            >
              Add Member
            </button>
          }
          // title="Create New Team"
          // path={"/dashboard/team-management/create-team"}
        />
      </div>

      <div className="w-full overflow-auto no-scrollbar  h-auto">
        <table className=" rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                S/N
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Phone Number
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Email
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Role
              </th>

              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider"></th>
            </tr>
          </thead>

          {singleTeams && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
              {currentItems?.map((item, index) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  <td className="px-5 py-3 text-sm">{index + 1}</td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.userId?.username}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {`${item?.userId?.phone_number}`}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.userId?.email}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.roleId?.role_name}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm flex items-center">
                    {/* <>
                      <button
                        value={"add"}
                        title="Add User"
                       
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <FaPlusSquare className="dark:text-white text-green-500 text-lg"/>
                      
                      </button>
                    </> */}
                    <>
                      <button
                        value={"edit"}
                        title="Remove User"
                        onClick={(e) => {
                          //   window?.localStorage.setItem(
                          //     "singleId",
                          //     JSON.stringify(item?._id)
                          //   );
                          dispatch(setId(params?.id));
                          dispatch(setItem(item));
                          openModalDel(e);
                        }}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
                          className="dark:stroke-red-500 stroke-red-500"
                          width="14"
                          height="16"
                          viewBox="0 0 14 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                            fill="black"
                            fill-opacity="0.8"
                          />
                        </svg>
                      </button>
                    </>
                    <Link
                      href={"/dashboard/user-management/user-profile"}
                      onClick={() =>
                        window?.localStorage.setItem(
                          "username",
                          JSON.stringify(item?.userId?.username)
                        )
                      }
                      className=" underline ml-2"
                    >
                      View User
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        <ModalComponent
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          setIsModalOpen={setIsModalOpenDel}
        >
          <RemoveTeamMember closeModal={closeModalDel} />
        </ModalComponent>
        <ModalComponent
          isOpen={isModalOpenAdd}
          onClose={closeModalAdd}
          setIsModalOpen={setIsModalOpenAdd}
        >
          <AddTeamsModal closeModal={closeModalAdd} />
        </ModalComponent>
        {singleTeams?.members?.length === 0 && !loading && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg font-bold">No Data available</p>
          </div>
        )}
      </div>
      {loading && (
        <div class=" lg:mt-5 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
          <div className="animate-pulse flex flex-col space-x-4">
            {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 animate-pulse w-full">
                <div className="rounded-sm bg-slate-300 h-60   w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
              </div> */}
            {/* <div className="grid  grid-cols-2  animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
              </div> */}
            <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
              {/* <div className="h-2 bg-slate-700 rounded"></div> */}
              <div className="s">
                <div className="flex flex-col">
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                </div>
                {/* <div className="h-2 bg-slate-700 rounded"></div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={singleTeams?.members?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </>
  );
};

export default TeamDetailsTable;

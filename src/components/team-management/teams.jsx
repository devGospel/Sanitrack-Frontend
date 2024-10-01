"use client";

import TopLayout from "@/components/user-management/TopLayout";
import { useEffect, useState } from "react";
import ModalComponent from "../modals/Modal";
import FreePagination from "../pagination/FreePagination";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";

const DataTable = ({ title, data, openModalEdit, openModalDel }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Set hours to 0 to remove time portion

    return date.toISOString().slice(0, 10);
  }
  return (
    <div className="overflow-x-auto w-full  flex flex-col no-scrollbar py-5 h-auto">
      <h1 className="font-bold">{title}</h1>
      <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
        <thead>
          <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              S/N
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              Team Name
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              Date Created
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
          {data?.map((table_data, i) => (
            <tr
              key={table_data?._id}
              className="border-b border-gray-200 whitespace-nowrap"
            >
              <td className="px-5 py-3 text-sm">{i + 1}</td>
              <td className="px-5 py-2   text-sm">
                <div className="flex gap-2 items-center capitalize">
                  <p>{table_data?.teamName}</p>
                </div>
              </td>
              <td className="px-5 py-2   text-sm">
                <div className="flex gap-2 items-center capitalize">
                  <p>{formatDate(table_data?.dateCreated)}</p>
                </div>
              </td>
              <td className="px-5 py-2 text-sm flex items-start justify-start">
                <>
                  {/* <Link href={`/dashboard/user-management/edit-users/${table_data._id}`}> */}
                  <button
                    onClick={() => openModalEdit(table_data.id)}
                    className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_194_10938)">
                        <path
                          d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
                          fill="green"
                          fillOpacity="0.8"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_194_10938">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  {/* </Link> */}
                  <Link
                    href={`/dashboard/team-management/${table_data?._id}`}
                    onClick={() => {
                      window?.localStorage.setItem(
                        "assetData",
                        JSON.stringify({
                          name: `${data?.name} ${data?.assetPrefix}${
                            data?.assetCode ?? ""
                          }`,
                          room: data?.roomId?.roomName,
                        })
                      );
                    }}
                    className="p-1.5 bg-sanBlue dark:bg-white rounded flex gap-2 items-center"
                  >
                    <p className="dark:text-black text-white text-xs">
                      View Team
                    </p>
                  
                  </Link>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function TeamManagement({ data, loading }) {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentUserId, setCurrentUserId] = useState(null);

  const teams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
    { id: 4, name: "Team Delta" },
    { id: 5, name: "Team Epsilon" },
    { id: 6, name: "Team Zeta" },
    { id: 7, name: "Team Eta" },
    { id: 8, name: "Team Theta" },
    { id: 9, name: "Team Iota" },
    { id: 10, name: "Team Kappa" },
  ];

  const openModalEdit = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
  };

  const openModalDel = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpenDel(true);
  };

  const closeModalDel = () => {
    setIsModalOpenDel(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages =
    data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 0;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(data?.length / itemsPerPage));
  };

  return (
    <div className="w-full bg-white dark:bg-slate-800 h-screen">
      <div className=" w-full flex flex-col no-scrollbar p-10">
        <TopLayout
          heading={"Teams"}
          paragraph={
            "Manage, create and oversee team management within the system."
          }
          title="Create New Team"
          path={"/dashboard/team-management/create-team"}
        />
        <div className="overflow-x-auto w-full no-scrollbar  py-5">
          {loading ? (
            <div className="min-h-[60vh] w-full flex items-center flex-col">
              <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
              <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
              <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
              <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
              <div className="bg-slate-200 rounded p-6 w-full my-2 animate-pulse" />
            </div>
          ) : (
            <>
              <DataTable
                title={"Team Name"}
                data={data}
                openModalEdit={openModalEdit}
                openModalDel={openModalDel}
              />
              {data?.length === 0 && !loading && (
                <div className="flex  justify-center  w-full pt-5">
                  <p className="text-red-500 text-lg font-bold">
                    No Data available
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <FreePagination
          itemsPerPage={itemsPerPage}
          totalItems={data?.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>

      {isModalOpenEdit && (
        <ModalComponent
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          setIsModalOpen={setIsModalOpenEdit}
        >
          <div className="p-4 flex flex-col">
            <h1 className="text-blue-500 text-lg">Create New Team</h1>
            <form className=" p-4">
              <div className="flex flex-col w-full ">
                <label className="text-blue-400" htmlFor="Name of Team">
                  Name of Team
                </label>
                <input
                  type="text"
                  name="team-name"
                  placeholder="Enter Here"
                  className="p-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-center p-3 rounded-md w-full my-2"
              >
                Edit
              </button>
            </form>
          </div>
        </ModalComponent>
      )}

      {isModalOpenDel && (
        <ModalComponent
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          setIsModalOpen={setIsModalOpenDel}
        >
          <div className="p-4 flex flex-col">
            <h1 className="text-red-500 text-xl font-semibold">Delete?</h1>
            <h1 className="text-sm py-2">
              Are You sure u want to delete this user {currentUserId} ? This
              action cannot be undone
            </h1>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={closeModalDel}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  // onClick={handleDelete}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
}

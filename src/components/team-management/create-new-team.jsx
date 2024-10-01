"use client";

import TopLayout from "@/components/user-management/TopLayout";
import { useEffect, useState } from "react";
import ModalComponent from "../modals/Modal";
import useUser from "@/hooks/useUser";
import FreePagination from "../pagination/FreePagination";
import useRole from "@/hooks/useRole";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "@/redux/features/adminId/adminSlice";
import { useForm } from "react-hook-form";
import BackButton from "../BackButton";
import useTeam from "@/hooks/useTeam";
import { ToastContainer } from "react-toastify";

const DataTable = ({
  title,
  data,
  openModal,
  isManager,
  role,
  selectedUsers,
  setSelectedUsers,
}) => {
  const singleRole = role?.filter((item) => item?.role_name === title);
  console.log("single", data);
  console.log(selectedUsers, isManager, data);
  const handleCheckboxChange = (userId, roleId, id) => {
    if (isManager) {
      setSelectedUsers((prevSelected) => {
        if (prevSelected.some((user) => user.userId === userId)) {
          return prevSelected.filter((user) => user.userId !== userId);
        } else {
          return [...prevSelected, { userId: id, roleId }];
        }
      });
    } else
      setSelectedUsers((prevSelected) => {
        if (prevSelected.some((user) => user.userId === userId)) {
          return prevSelected.filter((user) => user.userId !== userId);
        } else {
          return [...prevSelected, { userId, roleId: singleRole[0]?._id }];
        }
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchData, setSearchData] = useState("");
  // ...
  const newData = searchData.length > 0 ? searchData : data;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(newData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };
  const lastPage = () => {
    setCurrentPage(Math.ceil(newData?.length / itemsPerPage));
  };
  // selectedUsers.some(item => item?.userId === table_data?._id)
  const handleSearch = (e) => {
    e.preventDefault();
    const newData = data.filter((item) =>
      item?.username.toLowerCase().includes(e.target.value)
    );

    setSearchData(newData);
  };

  const isUserIdIncluded = (userId) => {
    console.log("select", selectedUsers);
    for (let i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers[i].userId === userId) {
        return true;
      }
    }
    return false;
  };
  console.log(
    "first check",
    selectedUsers.some(
      (selectedUser) => selectedUser.userId === "65bbb1e6960a9012fd81f0b9"
    )
  );
  return (
    <div className="overflow-x-auto w-full  flex flex-col no-scrollbar py-5 h-auto">
      <div className="p-3 border border-gray-300 flex items-center justify-between">
        {" "}
        <h1 className="font-bold text-black dark:text-white">{title}</h1>{" "}
        <div>
          <input
            type="search"
            name=""
            id=""
            onChange={handleSearch}
            className=" rounded border border-gray-400 p-2"
            placeholder="Search..."
          />
        </div>
      </div>

      <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
        <thead>
          <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              S/N
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
          {currentItems?.map((table_data, index) => (
            <tr
              key={table_data._id}
              className="border-b border-gray-200 whitespace-nowrap"
            >
              <td className="px-5 py-2   text-sm">
                <div className="flex gap-2 items-center">{index + 1}</div>
              </td>
              <td className="px-5 py-2   text-sm">
                <div className="flex gap-2 items-center">
                  <div className="h-8 w-8 rounded-full font-semibold text-white bg-blue-600 text-sm flex items-center justify-center uppercase">
                    {isManager
                      ? table_data.user_name?.slice(0, 2)
                      : table_data.username?.slice(0, 2)}
                  </div>
                  <p className="capitalize">
                    {isManager ? table_data?.user_name : table_data?.username}
                  </p>
                </div>
              </td>
              <td className="px-5 py-2 text-sm flex items-center">
                <>
                  <button
                    // onClick={() => openModal(table_data._id)}
                    className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                  >
                    <input
                      type="checkbox"
                      name="check"
                      id={isManager ? table_data?._id : table_data?.user_id}
                      defaultChecked={
                        isManager
                          ? isUserIdIncluded(table_data?._id)
                          : data.some((user) =>
                              selectedUsers.some(
                                (role) => role.userId === user.user_id
                              )
                            )
                      }
                      onChange={() =>
                        handleCheckboxChange(
                          table_data._id,
                          table_data.role_id,
                          table_data.user_id
                        )
                      }
                    />
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={newData?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
    </div>
  );
};

export default function CreateNewTeam() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    getCleaners,
    getInspectors,
    allCleaners,
    allInspectors,
    loading,
    getFacilityInspectors,
    allFacilityInspectors,
    getFacilityCleaners,
    allFacilityCleaners,
  } = useUser();
  const { addTeam, buttonLoader } = useTeam();
  const { getAllRoles, allRoles } = useRole();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const role = isClient ? newRole : "";
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    getCleaners();
    getInspectors();
    getAllRoles();
  }, []);
  useEffect(() => {
    if (selectedFacilityId && role?.toLocaleLowerCase() == "manager") {
      //for some reason the selectedFaciltyId is tied to the admin as well so I am add this check

      getFacilityInspectors(selectedFacilityId);
      getFacilityCleaners(selectedFacilityId);
    }
  }, [role, selectedFacilityId]);

  const [currentUserId, setCurrentUserId] = useState(null);

  const teams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ];
  const team2 = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
  ];

  const openModal = (userId) => {
    setCurrentUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddTeam = (data) => {
    // e.preventDefault();

    const newData = { ...data, members: selectedUsers };

    addTeam(newData);
  };
  return (
    <div className="w-full">
      <ToastContainer />
      <div className=" w-full flex flex-col no-scrollbar px-4 sm:px-6 py-10">
        <div className="flex-1 w-full">
          <div className="flex  gap-2  space-y-4 md:space-y-0 w-full py-2 items-start">
            <BackButton />
            <div>
              <h1 className="text-black dark:text-white text-2xl font-semibold">
                Teams
              </h1>
              <p>
                Manage, create and oversee team management within the system.
              </p>
            </div>
          </div>
        </div>
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
                role={allRoles}
                title={"Cleaner"}
                isManager={
                  selectedFacilityId && role?.toLocaleLowerCase() == "manager"
                }
                data={
                  selectedFacilityId && role?.toLocaleLowerCase() == "manager"
                    ? allFacilityCleaners
                    : allCleaners
                }
                openModal={openModal}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
              <DataTable
                role={allRoles}
                title={"Inspector"}
                isManager={
                  selectedFacilityId && role?.toLocaleLowerCase() == "manager"
                }
                data={
                  selectedFacilityId && role?.toLocaleLowerCase() == "manager"
                    ? allFacilityInspectors
                    : allInspectors
                }
                openModal={openModal}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
              />
              {/* <DataTable title={"Manager"} data={team2} openModal={openModal} /> */}
            </>
          )}
        </div>

        <div className="max-w-3xl  mx-auto">
          <button
            onClick={() => {
              // dispatch(setItem(selectedUsers))
              openModal();
            }}
            className="bg-blue-500 text-white text-center px-6 py-3 rounded-md w-full"
          >
            Create New Team
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          setIsModalOpen={setIsModalOpen}
        >
          <div className="p-4 flex flex-col max-w-full">
            <h1 className="text-sanBlue font-bold text-lg">Create New Team</h1>
            <form
              onSubmit={handleSubmit(handleAddTeam)}
              className=" p-4 max-w-3xl"
            >
              <div className="flex flex-col w-full ">
                <label
                  className="text-sanBlue dark:text-white py-2"
                  htmlFor="Name of Team"
                >
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  {...register("teamName", {
                    required: "Team Name is required",
                  })}
                  placeholder="Enter Here"
                  className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                />
                {errors && errors?.teamName?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.teamName.message}
                  </span>
                )}
              </div>
              <button
                disabled={buttonLoader}
                className="bg-sanBlue disabled:bg-blue-400 text-white text-center p-3 rounded-md w-full my-2"
              >
                {buttonLoader ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </ModalComponent>
      )}
    </div>
  );
}

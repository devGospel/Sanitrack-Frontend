"use client";

import Image from "next/image";
import { useState } from "react";

import Link from "next/link";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";



import { usePathname } from "next/navigation";
import ModalComponent from "@/components/modals/Modal";

import FreePagination from "@/components/pagination/FreePagination";
import EditUserRoleModal from "./Modals/EditUserRoleModal";
import RemoveUserRoleModal from "./Modals/RemoveUserRoleModal";



const UserRoles = ({newData:data, loading }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // console.log("URRRRRRRRR:", data)

  // ...

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
  const [component, setComponent] = useState(null);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDel, setIsModalOpenDel] = useState(false);

  const openModalAdd = (e) => {
    e.preventDefault();

    setIsModalOpenAdd(true);
  };

  const closeModalAdd = () => {
    setIsModalOpenAdd(false);
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

  return (
    <>
      <div className="w-full overflow-auto no-scrollbar  h-auto">
        <table className="w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200 border- bg-white">
              <th className="px-5 py-3 b text-left text-lg font-bold text-black  capitalize tracking-wider">
              S/N
              </th>

              <th className="px-5 py-3 b text-left text-lg font-bold text-black capitalize tracking-wider">
              Role Name
              </th>

              {/* <th className="px-5 py-3 b text-left text-lg font-bold text-black capitalize tracking-wider">
              Actions
              </th> */}
            </tr>
          </thead>

          {data && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
              {currentItems?.map((item, index) => (
                <tr key={item?._id} className="border- border-gray-200">
                   <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {index + 1}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.role_name}
                    </p>
                  </td>

                  {/* <td className="px-5 py-3    text-sm flex items-center"> */}
                    <>
                      {/* <button
                        // href={`/dashboard/lms/edit-training?id=${item?._id || index + 1}`}
                        value={"edit"}
                        onClick={(e) => {
                          dispatch(setItem(item));
                          openModalEdit(e);
                        }}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_194_10938)">
                            <path
                              d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
                              fill="black"
                              fill-opacity="0.8"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_194_10938">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button> */}
                      {/* <button
                        value={"edit"}
                        onClick={(e) => {
                          dispatch(setItem(item));
                          openModalDel(e);
                        }}
                        // onClick={() => setIsModalOpenDel(true)}
                        className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                      >
                        <svg
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
                      </button> */}
                    </>
                  {/* </td> */}

                  <ModalComponent
                    isOpen={isModalOpenEdit}
                    onClose={closeModalEdit}
                    setIsModalOpen={setIsModalOpenEdit}
                  >
                    <EditUserRoleModal closeModal={closeModalEdit} />
                  </ModalComponent>
                  <ModalComponent
                    isOpen={isModalOpenDel}
                    onClose={closeModalDel}
                    setIsModalOpen={setIsModalOpenDel}
                  >
                    <RemoveUserRoleModal closeModal={closeModalDel} item={item} />
                  </ModalComponent>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="flex  justify-center  w-full pt-5">
            <svg
              aria-hidden="true"
              className="w-10 h-10   text-gray-200 animate-spin  fill-blueMain"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {/* <ModalComponent
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          setIsModalOpen={setIsModalOpenEdit}
        >
          <EditUserRoleModal closeModal={closeModalEdit} />
        </ModalComponent>
        <ModalComponent
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          setIsModalOpen={setIsModalOpenDel}
        >
          <RemoveUserRoleModal closeModal={closeModalDel} />
        </ModalComponent> */}
        {data?.length === 0 && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg">No data available</p>
          </div>
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
    </>
  );
};

export default UserRoles;

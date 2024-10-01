"use client";

import Image from "next/image";
import { useState } from "react";

import Link from "next/link";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImBin } from "react-icons/im";



import { usePathname } from "next/navigation";
import ModalComponent from "@/components/modals/Modal";
import RemoveChemical from "@/components/chemical_calc/Modals/RemoveChemicalModal";
import FreePagination from "@/components/pagination/FreePagination";



const TrainingsTabContent = ({ data, loading }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
            <tr className="border-gray-200 border-2 bg-white">
              <th className="px-5 py-3 b text-left text-sm font-normal text-black  capitalize tracking-wider">
                Name
              </th>

              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
                Date
              </th>

              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
               Time
              </th>
              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {data && !loading && (
            <tbody  className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
              {currentItems?.map((item, index) => (
                <tr
                  key={item?._id}
                  className="border-b border-gray-200"
                  >
                   <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.name}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.date}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {item?.time}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm flex items-center">
                    {
                      item?.status === "completed" && 
                      (
                        <p className=" text-green-600 w-[100px] text-center bg-green-200 px-2 py-1 rounded-md">
                        
                          completed
                        </p>
                      )
                    }
                    {
                      item?.status === "in-progress" && 
                      (
                        <p className=" text-yellow-600 w-[100px] text-center bg-yellow-200 px-2 py-1 rounded-md">
                        
                          In progress
                        </p>
                      )
                    }
                    {
                      item?.status === "pending" && 
                      (
                        <p className=" text-red-600 w-[100px] text-center bg-red-200 px-2 py-1 rounded-md">
                        
                          Pending
                        </p>
                      )
                    }

                    <span className=" ml-5 text-white rounded-md py-1 px-2 font-bold bg-blue-500">
                      <Link href={`/dashboard/user/lms/view-training?id=${index + 1}`}>View</Link>
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="flex  justify-center  w-ful pt-5">
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
        <ModalComponent
          isOpen={isModalOpenDel}
          onClose={closeModalDel}
          setIsModalOpen={setIsModalOpenDel}
        >
          <RemoveChemical closeModal={closeModalDel} />
        </ModalComponent>
        {data?.length === 0 && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg">No data available</p>
          </div>
        )}
      </div>

      {/* <FreePagination
        itemsPerPage={itemsPerPage}
        totalItems={data?.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        firstPage={firstPage}
        lastPage={lastPage}
      /> */}
    </>
  );
};

export default TrainingsTabContent;

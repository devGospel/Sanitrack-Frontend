
"use client";

import TopLayout from '@/components/user-management/TopLayout';
import { useEffect, useState } from "react";
import ModalComponent from '../modals/Modal';
import FreePagination from '../pagination/FreePagination';
import Link from 'next/link';

const DataTable = ({ title, data, openModalEdit, openModalDel }) => (
    <div className='overflow-x-auto w-full  flex flex-col no-scrollbar  h-auto ring-1 ring-gray-300 rounded-md '>
        <h1 className='font-bold'>{title}</h1>
        <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
            <thead>
                <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
                    <th className="px-5 py-3 text-left text-sm font-bold text-black capitalize tracking-wider">
                    Asset Name
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-bold text-black capitalize tracking-wider">
                    Room Name
                    </th>
                    <th className="px-5 py-3 text-left text-sm font-bold text-black capitalize tracking-wider">
                    Facilities
                    </th>
                    <th className=" py-3 text-right px-5  text-sm font-bold shrink-1 text-black capitalize tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
                {data?.map((table_data) => (
                    <tr key={table_data?._id} className="border-b border-gray-200 whitespace-nowrap">
                        <td className="px-5 py-2   text-sm">
                            <div className='flex gap-2 items-center'>
                                <p>{table_data?.assetName}</p>
                            </div>
                        </td>
                        <td className="px-5 py-2   text-sm">
                            <div className='flex gap-2 items-center'>
                                <p>{table_data?.roomName}</p>
                            </div>
                        </td>
                        <td className="px-5 py-2   text-sm">
                            <div className='flex gap-2 items-center'>
                                <p>{table_data?.facility}</p>
                            </div>
                        </td>
                        <td className="px-5 py-2 text-sm flex items-end justify-end">
                            <>
                                <Link href={`/dashboard/task-list/edit-task?id=${table_data._id}`} 
                                className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}>
                                {/* <button
                                    onClick={() => openModalEdit(table_data.id)}
                                    className={` whitespace-no-wrap text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                                > */}
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
                                                fill="black"
                                                fillOpacity="0.8"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_194_10938">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                {/* </button> */}
                                </Link>
                                <button
                                    onClick={() => openModalDel(table_data.id)}
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
                                            fillOpacity="0.8"
                                        />
                                    </svg>
                                </button>

                                {/* <Link
                                    href={`/dashboard/task-list/view-task?id=${table_data._id}`}
                                    className={` whitespace-no-wrap underline text-md font-semibold  ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                                >
                                   View
                                </Link> */}

                            </>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export default function AssetTable({assetData}) {
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenDel, setIsModalOpenDel] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [currentUserId, setCurrentUserId] = useState(null);

   
    
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
        assetData.length > 0 ? Math.ceil(assetData.length / itemsPerPage) : 0;
    const currentItems = assetData?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(assetData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    const firstPage = () => {
        setCurrentPage(1);
    };
    const lastPage = () => {
        setCurrentPage(Math.ceil(assetData?.length / itemsPerPage));
    };





    return (
        <div className=' w-full '>
            <div className=' w-full flex flex-col no-scrollbar '>
               
                <div className="overflow-x-auto w-full no-scrollbar  py-5">
                    {assetData.length === 0 ? (
                        <div className="min-h-[60vh] w-full flex items-center flex-col">
                            <div className='bg-slate-200 rounded p-6 w-full my-2 animate-pulse' />
                            <div className='bg-slate-200 rounded p-6 w-full my-2 animate-pulse' />
                            <div className='bg-slate-200 rounded p-6 w-full my-2 animate-pulse' />
                            <div className='bg-slate-200 rounded p-6 w-full my-2 animate-pulse' />
                            <div className='bg-slate-200 rounded p-6 w-full my-2 animate-pulse' />
                        </div>
                    ) : (
                        <>
                            <DataTable
                                // title={"Team Name"}
                                data={assetData}
                                openModalEdit={openModalEdit}
                                openModalDel={openModalDel}
                            />

                        </>
                    )}
                </div>
                {/* <FreePagination
                    itemsPerPage={itemsPerPage}
                    totalItems={assetData?.length}
                    paginate={paginate}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                    firstPage={firstPage}
                    lastPage={lastPage}
                /> */}

            </div>

            {isModalOpenEdit && (
                <ModalComponent
                    isOpen={isModalOpenEdit}
                    onClose={closeModalEdit}
                    setIsModalOpen={setIsModalOpenEdit}
                >
                    <div className='p-4 flex flex-col'>
                        <h1 className='text-blue-500 text-lg'>Create New Team</h1>
                        <form className=' p-4'>
                           <div className='flex flex-col w-full '>
                            <label className='text-blue-400' htmlFor="Name of Team">Name of Team</label>
                           <input
                                type="text"
                                name="team-name"
                                placeholder='Enter Here'
                                className='p-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'
                            />
                           </div>
                            <button type="submit" className='bg-blue-500 text-center p-3 rounded-md w-full my-2'>Edit</button>
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
                    <div className='p-4 flex flex-col'>
                        <h1 className='text-red-500 text-xl font-semibold'>Delete?</h1>
                        <h1 className='text-sm py-2'>Are You sure u want to delete this asset {currentUserId} ? This action cannot be undone</h1>
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

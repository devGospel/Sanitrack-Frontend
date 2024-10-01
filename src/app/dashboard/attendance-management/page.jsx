'use client';
import FreePagination from '@/components/pagination/FreePagination';
import useAttendance from '@/hooks/useAttendance';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AttendanceMangement = () => {
  const { getAttendance, data, isLoading } = useAttendance();
  const data1 = [
    {
      name: 'Leasie Watson',
      designation: 'Cleaner',
      facility: 'Facility 1',
      time: '09:27 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Darlene Robertson',
      designation: 'Supervisor',
      facility: 'Facility 3',
      time: '10:15 AM',
      status: 'Late',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Jacob Jones',
      designation: 'Supervisor',
      facility: 'Facility 1',
      time: '10:24 AM',
      status: 'Late',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Kathryn Murphy',
      designation: 'Cleaner',
      facility: 'Facility 1',
      time: '09:10 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Leslie Alexander',
      designation: 'Supervisor',
      facility: 'Facility 3',
      time: '09:15 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Ronald Richards',
      designation: 'Supervisor',
      facility: 'Facility 1',
      time: '09:29 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Guy Hawkins',
      designation: 'Cleaner',
      facility: 'Facility 1',
      time: '09:29 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Albert Flores',
      designation: 'Cleaner',
      facility: 'Facility 3',
      time: '09:29 AM',
      status: 'On Time',
      img: 'https://via.placeholder.com/32',
    },
    {
      name: 'Savannah Nguyen',
      designation: 'Supervisor',
      facility: 'Facility 3',
      time: '10:50 AM',
      status: 'Late',
      img: 'https://via.placeholder.com/32',
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(10);

  // ...

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
  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center flex-1">
      <div className=" flex justify-between items-center flex-row  py-4 pl-5 lg:pl-8 pr-4 w-full">
        <div className=" flex flex-col gap-2">
          <h1 className=" text-black font-semibold">Attendance</h1>
          <span className=" text-darkText text-sm">All Employees Attendance</span>
        </div>

        <input
          placeholder="Search"
          className="h-[31px] w-[201px] border border-[#3478F3] rounded-md bg-transparent placeholder-[#3478F3] px-5"
        />
      </div>
      <div className="flex  p-6 w-full">
        {!isLoading && (
          <div className="bg-white overflow-hidden w-full p-[10px] rounded-lg border  border-[#0357EE]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facility Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clock In Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((employee, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <img
                        className="w-8 h-8 rounded-full mr-4"
                        src="https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
                        alt="Image"
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {employee?.user[0].username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee?.role.length && employee?.role[0].role_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee?.facility.length &&
                          employee?.facility[0].facility_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {
                          employee?.latestAttendance?.clockInTime
                            ?.split('T')[1]
                            .split(':')[0]
                        }
                        :
                        {
                          employee?.latestAttendance?.clockInTime
                            ?.split('T')[1]
                            .split(':')[1]
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                          employee.latestAttendance.status == 'late'
                            ? 'bg-red-100 text-red-800'
                            : ' bg-green-100  text-green-800'
                        }`}>
                        {employee.latestAttendance.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200 text-[#828282]">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Showing</span>
                <select
                  className="border-gray-300 rounded-md h-[46px] w-[76px]"
                  defaultValue={itemsPerPage}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="flex items-center">
                <span>{`Showing ${currentPage} to ${
                  currentPage * itemsPerPage < data.length
                    ? currentPage * itemsPerPage
                    : data.length
                } out of ${data.length} records`}</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-gray-900 cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.4685 17.5856C14.7919 17.3269 14.8444 16.8549 14.5856 16.5315L10.9604 12L14.5856 7.46849C14.8444 7.14505 14.7919 6.67308 14.4685 6.41432C14.145 6.15556 13.6731 6.208 13.4143 6.53145L9.41432 11.5315C9.19519 11.8054 9.19519 12.1946 9.41432 12.4685L13.4143 17.4685C13.6731 17.7919 14.145 17.8444 14.4685 17.5856Z"
                      fill="#16151C"
                    />
                  </svg>
                </button>
                {/* {Array.from({ length: totalPages }, (_, index) => (
              <button
                className={`text-gray-600 hover:text-gray-900 h-[32px] w-[32px] rounded-lg border ${
                  index + 1 == currentPage && 'border-blue-500 text-blue-500'
                }`}
                key={index}>
                {index + 1}
              </button>
            ))} */}
                <button className="hover:text-gray-900 h-[32px] w-[32px] rounded-lg border border-blue-500 text-blue-500">
                  {currentPage}
                </button>
                <button
                 
                  className="text-gray-600 hover:text-gray-900 rotate-180 cursor-pointer">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.4685 17.5856C14.7919 17.3269 14.8444 16.8549 14.5856 16.5315L10.9604 12L14.5856 7.46849C14.8444 7.14505 14.7919 6.67308 14.4685 6.41432C14.145 6.15556 13.6731 6.208 13.4143 6.53145L9.41432 11.5315C9.19519 11.8054 9.19519 12.1946 9.41432 12.4685L13.4143 17.4685C13.6731 17.7919 14.145 17.8444 14.4685 17.5856Z"
                      fill="#16151C"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="min-h-[60vh] w-full flex items-center justify-center bg-white">
          <Skeleton height={70} width="80vw" count={5} />
        </div>
      )}
    </div>
  );
};

export default AttendanceMangement;

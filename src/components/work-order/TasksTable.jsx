'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import ModalComponent from '../modals/Modal'
import { usePathname } from 'next/navigation'
import Spinner from '../loaders/Loader'
import { useDispatch } from 'react-redux'

const tasks = [
  {
    _id: 1,
    name: 'Task 1',
    creator: 'John Doe',
    dateCreated: '2021-09-01',
  },
  {
    _id: 2,
    name: 'Task 2',
    creator: 'Jane Doe',
    dateCreated: '2021-09-02',
  },
  {
    _id: 3,
    name: 'Task 3',
    creator: 'John Doe',
    dateCreated: '2021-09-03',
  },
  {
    _id: 4,
    name: 'Task 4',
    creator: 'Jane Doe',
    dateCreated: '2021-09-04',
  },
  {
    _id: 5,
    name: 'Task 5',
    creator: 'John Doe',
    dateCreated: '2021-09-05',
  },
  {
    _id: 6,
    name: 'Task 6',
    creator: 'Jane Doe',
    dateCreated: '2021-09-06',
  },
  {
    _id: 7,
    name: 'Task 7',
    creator: 'John Doe',
    dateCreated: '2021-09-07',
  },
  {
    _id: 8,
    name: 'Task 8',
    creator: 'Jane Doe',
    dateCreated: '2021-09-08',
  },
  {
    _id: 9,
    name: 'Task 9',
    creator: 'John Doe',
    dateCreated: '2021-09-09',
  },
  {
    _id: 10,
    name: 'Task 10',
    creator: 'Jane Doe',
    dateCreated: '2021-09-10',
  }
]

const TasksTable = ({ newData:data, loading }) => {
  // console.log("DDDDDDDDDDDDDDD", data)
    // if (loading) return <div>Loading...</div>
  return (
    <div>
        <Table data={data} loading={loading} />
    </div>
  )
}

export default TasksTable


const Table = ({data, loading}) => {
    const [delModalOpen, setDelModalOpen] = useState(false);
    const pathname = usePathname()
    const dispatch = useDispatch();


    const handleDelete = () => {
      // Make some silly request to API endpoint.
    }

    return (
        <div className="w-full overflow-auto no-scrollbar  h-auto">
        <table className="w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200 border-2 bg-white">
              <th className="px-5 py-3 b text-left text-sm font-normal text-black  capitalize tracking-wider">
                Task list name
              </th>

              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
                Creator
              </th>
              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
                Date Created
              </th>

              <th className="px-5 py-3 b text-left text-sm font-normal text-black capitalize tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          

          {data && !loading && (
            <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-white [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
              {data?.map((item, index) => (
                <tr key={item?._id} className="border-b border-gray-200">
                  {/* <td className="px-5 py-3   text-sm">{index + 1}</td> */}
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
                      {item?.creator}
                    </p>
                  </td>
                  <td className="px-5 py-3   text-sm">
                    <p
                      className={` whitespace-no-wrap text-sm font-normal    capitalize`}
                    >
                      {formatDate(item?.dateCreated)}
                    </p>
                  </td>

                  <td className="px-5 py-3    text-sm flex items-center">
                    <>

                      <Link
                        href={`${pathname}/edit/${item?._id}`}
                        className={` whitespace-no-wrap text-md font-semibold rounded-md text-Hwhite cursor-pointer  `}
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
                      </Link>
                      <button
                        value={"del"}
                        onClick={(e) => {
                        setDelModalOpen(true)
                        }}
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
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && (
          <div className="flex  justify-center  w-full pt-5">
            <svg
              aria-hidden="true"
              className="w-10 h-10   text-gray-200 animate-spin  fill-sanBlue"
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
          isOpen={delModalOpen}
          onClose={() => setDelModalOpen(false)}
          setIsModalOpen={setDelModalOpen}
        >
          <div className='p-4 py-6'>
            <h2 className='text-lg font-semibold py-2'>Delete Task?</h2>
            <p className='text-gray-500 py-2'>
              Are you sure you want to delete this this task?
            </p>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={() => setDelModalOpen(false)}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                disabled={loading}
                onClick={handleDelete}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {loading ? <Spinner /> : "Delete"}
              </button>
            </span>
          </div>
          </div>
        </ModalComponent>
        {!loading && data?.length < 1 && (
          <div className="flex  justify-center  w-full pt-5">
            <p className="text-red-500 text-lg font-bold">
              No Tasks available
            </p>
          </div>
        )}
      </div>
    )
}

function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
  
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return `${day}-${month}-${year}`;
  }
  
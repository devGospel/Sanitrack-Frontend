"use client";
import { setId, setItem } from "@/redux/features/adminId/adminSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ModalComponent from "../modals/Modal";
import RoomQrModal from "./modals/RoomQrModal";
import { useState } from "react";

export default function ListView({
  openModalEdit,
  openModalDel,
  openAddRoomFreq,
  allRooms,
  loading,
}) {
  const dispatch = useDispatch();
  const [isModalOpenQr, setIsModalOpenQr] = useState(false);
  const openModalQr = () => {
    setIsModalOpenQr(true);
  };

  const closeModalQr = () => {
    setIsModalOpenQr(false);
  };
  return (
    <>
      <div className="pt-10 h-auto overflow-x-auto no-scrollbar">
        <table className="table-auto rounded-lg w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
            <tr className="border-gray-200  whitespace-nowrap border bg-white dark:bg-black dark:border-gray-50">
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Code
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                Room Name
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold shrink-1 text-gray-500 dark:text-white capitalize tracking-wider">
                Facility Name
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                QR Code
              </th>
              <th className="px-5 py-3  text-left text-sm font-semibold text-gray-500 dark:text-white capitalize tracking-wider">
                No. of Assets
              </th>
              <th className="px-5  py-3 text-left  text-sm font-semibold shrink-1 text-gray-500 dark:text-white capitalize tracking-wider"></th>
            </tr>
          </thead>

          <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue dark:[&>*:nth-child(odd)]:bg-slate-900 dark:text-white text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white dark:[&>*:nth-child(even)]:bg-sanBlue dark:[&>*:nth-child(even)]:text-white shadow-lg w-full">
            {allRooms?.map((data) => (
              <tr
                key={data._id}
                className="border-b border-gray-200 dark:border-black whitespace-nowrap"
              >
                <td className="px-5 py-3 text-sm">{`${data?.roomPrefix}${
                  data?.roomCode ?? ""
                }`}</td>
                <td className="px-5 py-3 text-sm">{data?.roomName}</td>
                <td className="px-5 py-3 text-sm">
                  {data?.location_id?.facility_name}
                </td>
                <td className="px-5 py-3 text-sm">
                  <span
                    // href={`/dashboard/room-management/${data?._id}`}
                    onClick={() => {
                      openModalQr();
                      dispatch(setId(data?._id));
                    }}
                    className="text-blue-400 cursor-pointer"
                  >
                    View QR Code
                  </span>
                </td>
                <td className="px-5 py-3 text-sm">
                  {data?.assetCount ? data.assetCount : 0}
                </td>
                <td className="px-5 py-3 text-sm">
                  <div className="flex items-center gap-x-4">
                    {/* Will add the icon later */}
                    <Link
                      href={`/dashboard/room-management/${data?._id}`}
                      onClick={() => {
                        window?.localStorage.setItem(
                          "singleItem",
                          JSON.stringify(data)
                        );
                      }}
                      className={` whitespace-no-wrap text-md font-semibold ml-3 p-2 rounded-md text-Hwhite cursor-pointer  `}
                    >
                      <svg
                        width="16"
                        className="dark:stroke-white stroke-black"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM8 13.5C6.91221 13.5 5.84884 13.1774 4.94437 12.5731C4.0399 11.9687 3.33495 11.1098 2.91867 10.1048C2.50238 9.09977 2.39347 7.9939 2.60568 6.927C2.8179 5.86011 3.34173 4.8801 4.11092 4.11091C4.8801 3.34172 5.86011 2.8179 6.92701 2.60568C7.9939 2.39346 9.09977 2.50238 10.1048 2.91866C11.1098 3.33494 11.9687 4.03989 12.5731 4.94436C13.1774 5.84883 13.5 6.9122 13.5 8C13.4983 9.45818 12.9184 10.8562 11.8873 11.8873C10.8562 12.9184 9.45819 13.4983 8 13.5ZM9 11C9 11.1326 8.94732 11.2598 8.85356 11.3536C8.75979 11.4473 8.63261 11.5 8.5 11.5C8.23479 11.5 7.98043 11.3946 7.7929 11.2071C7.60536 11.0196 7.5 10.7652 7.5 10.5V8C7.36739 8 7.24022 7.94732 7.14645 7.85355C7.05268 7.75979 7 7.63261 7 7.5C7 7.36739 7.05268 7.24021 7.14645 7.14645C7.24022 7.05268 7.36739 7 7.5 7C7.76522 7 8.01957 7.10536 8.20711 7.29289C8.39465 7.48043 8.5 7.73478 8.5 8V10.5C8.63261 10.5 8.75979 10.5527 8.85356 10.6464C8.94732 10.7402 9 10.8674 9 11ZM7 5.25C7 5.10166 7.04399 4.95666 7.1264 4.83332C7.20881 4.70999 7.32595 4.61386 7.46299 4.55709C7.60003 4.50032 7.75083 4.48547 7.89632 4.51441C8.04181 4.54335 8.17544 4.61478 8.28033 4.71967C8.38522 4.82456 8.45665 4.9582 8.48559 5.10368C8.51453 5.24917 8.49968 5.39997 8.44291 5.53701C8.38615 5.67406 8.29002 5.79119 8.16668 5.8736C8.04334 5.95601 7.89834 6 7.75 6C7.55109 6 7.36032 5.92098 7.21967 5.78033C7.07902 5.63968 7 5.44891 7 5.25Z"
                          fill="black"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(setItem(data));
                        openModalEdit(data._id);
                        
                      }}
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
                    {/* <button onClick={() => openModalDel(data._id)}>
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                          fill="red"
                          fillOpacity="0.8"
                        />
                      </svg>
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && allRooms.length === 0 && (
          <div className="text-center py-4 text-red-500">
            No Rooms available for this Facility{" "}
          </div>
        )}
        <ModalComponent
          isOpen={isModalOpenQr}
          onClose={closeModalQr}
          setIsModalOpen={setIsModalOpenQr}
        >
          <RoomQrModal />
        </ModalComponent>
      </div>
    </>
  );
}

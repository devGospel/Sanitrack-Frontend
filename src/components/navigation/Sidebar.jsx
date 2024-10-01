/* eslint-disable no-unused-vars */
"use client";
import { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TbCameraPlus } from "react-icons/tb";

import { BsQrCode } from "react-icons/bs";
import { SidebarContext } from "../context/sidebar.context";
import SidebarMenu from "./SidebarMenu";
import { FaPlusCircle, FaQrcode, FaSort, FaWarehouse } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import useWorkOrder from "@/hooks/useWorkOrder";
import { PiArrowsInLineVerticalThin } from "react-icons/pi";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import useFacilities from "@/hooks/useFacilities";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedFacilityId,
  setSelectedFacilityName,
} from "@/redux/features/facility/facilitySlice";
import ModalComponent from "../modals/Modal";
import ScanModal from "./ScanModal";
// import { ToastContainer } from "react-toastify";

function Sidebar() {
  const { getAssignedFacilities, managerFacilities, loading } = useFacilities();
  const { genLoading, generateWO, resetWO, resetLoading } = useWorkOrder();
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const [storedSidebarExpanded, setStoredSidebarExpanded] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [scanModal, setScanModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const openScanModal = () => {
    setScanModal(true);
  };

  const closeScanModal = () => {
    setScanModal(false);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectFacility = () => {
    setSidebarOpen(false);
    setOpenModal(true);
    getAssignedFacilities();
  };
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("sidebar-expanded");
    setStoredSidebarExpanded(value);
  }, []);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sanUser"))
      : null;
  // close on click outside

  const facName = useSelector((state) => state.facility.selectedFacilityName);
  const name = isClient ? facName : "";
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };

    typeof document !== "undefined" &&
      document.addEventListener("click", clickHandler);
    return () =>
      typeof document !== "undefined" &&
      document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      typeof document !== "undefined" &&
        document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      typeof document !== "undefined" &&
        document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  console.log("facility id",selectedFacilityId)
  const dispatch = useDispatch();
  // Handler to update the selected facility
  const handleSelect = (id, name) => {
    dispatch(setSelectedFacilityId(id));
    dispatch(setSelectedFacilityName(name));
    setOpenModal(false);
    // setTimeout(() => {
    //   window.location.reload();

    // }, 1500);
  };

  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const role = isClient ? newRole : "";
  // console.log(pathname)
  const adminLinks = [
    // {
    //   name: "Overview ",
    //   link: "/dashboard/home",
    //   id: 12456,

    //   svg: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className={` w-5 h-5 ${
    //         pathname.includes("home")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       height="1em"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("home")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Diary Report",
    //   link: "/dashboard/diary-report",
    //   id: 1,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5  ${
    //         pathname === "/dashboard/diary-report"
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 576 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("/dashboard/diary-report")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M569.5 440C588 472 564.8 512 527.9 512H48.1c-36.9 0-60-40.1-41.6-72L246.4 24c18.5-32 64.7-32 83.2 0l239.9 416zM288 354c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Evidence",
    //   link: "/dashboard/evidence",
    //   id: 1,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5  ${
    //         pathname === "/dashboard/evidence"
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("/dashboard/evidence")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M505 442.7l-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zm-297-90.7c-79.5 0-144-64.3-144-144 0-79.5 64.4-144 144-144 79.5 0 144 64.3 144 144 0 79.5-64.4 144-144 144zm0-240c-40.8 0-73.8 33.1-73.8 73.8 0 33 48.3 93.1 66.8 114.9a9.2 9.2 0 0 0 14.2 0c18.5-21.8 66.8-81.9 66.8-114.9 0-40.8-33.1-73.8-73.8-73.8zm0 96c-13.3 0-24-10.8-24-24 0-13.3 10.8-24 24-24s24 10.7 24 24c0 13.3-10.8 24-24 24z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Task ",
      link: "/dashboard/task-list",
      id: 2,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/task-list"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("task-list")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
          />
        </svg>
      ),
    },
    {
      name: "MSS ",
      link: "/dashboard/mss",
      id: 230,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/mss"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            className={` ${
              pathname.includes("mss")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
          />
        </svg>
      ),
      sub: [
        {
          name: "View MSS",
          link: "/dashboard/mss",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/view-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                className={` ${
                  pathname.includes("view-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"
              />
            </svg>
          ),
        },
        {
          name: "Manage MSS",
          link: "/dashboard/mss/manage-mss",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5  ${
                pathname === "/dashboard/mss/manage-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("manage-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
              />
            </svg>
          ),
        },
        {
          name: " Custom Work Order",
          link: "/dashboard/mss/set-order",
          id: 15,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname.includes("set-order")
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("set-order")
                    ? "text-lmsWhite"
                    : "text-sanfill-dashText dark:fill-white"
                }`}
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              />
            </svg>
          ),
        },
      ],
      button1: (
        <button
          onClick={() => generateWO()}
          className="flex w-40 lg:w-40 px-3 py-2 bg-lmsBlue text-white justify-center items-center gap-2 text-xs bg-green-500"
        >
          <FaPlusCircle />
          <p>Generate MSS</p>
        </button>
      ),
      button2: (
        <button
          onClick={() => resetWO()}
          className="flex w-40 lg:w-40 px-3 py-2 text-xs bg-lmsBlue text-white justify-center items-center bg-red-500 gap-2"
        >
          <FiRefreshCcw />
          <p>Reset MSS</p>
        </button>
      ),
    },
    {
      name: "Facilities",
      link: "/dashboard/facilities",
      id: 212,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/facilities"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname === "/dashboard/facilities"
                ? "text-lmsWhite"
                : "text-sanfill-dashText dark:fill-white"
            }`}
            d="M436 480h-20V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v456H12c-6.6 0-12 5.4-12 12v20h448v-20c0-6.6-5.4-12-12-12zM128 76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76zm0 96c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm52 148h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm76 160h-64v-84c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84zm64-172c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
          />
        </svg>
      ),
      sub: [
        {
          name: "Facilities",
          link: "/dashboard/facilities",
          id: 2,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/facilities"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                className={` ${
                  pathname === "/dashboard/facilities"
                    ? "text-lmsWhite"
                    : "text-sanfill-dashText dark:fill-white"
                }`}
                d="M436 480h-20V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v456H12c-6.6 0-12 5.4-12 12v20h448v-20c0-6.6-5.4-12-12-12zM128 76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76zm0 96c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm52 148h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm76 160h-64v-84c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84zm64-172c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
              />
            </svg>
          ),
        },
        {
          name: "Rooms ",
          link: "/dashboard/room-management",
          id: 2,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/room-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("room-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"
              />
            </svg>
          ),
        },
        {
          name: "Assets ",
          link: "/dashboard/asset-management",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/asset-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("asset-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M502.6 214.6l-45.3-45.3c-6-6-14.1-9.4-22.6-9.4H384V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v80H77.3c-8.5 0-16.6 3.4-22.6 9.4L9.4 214.6c-6 6-9.4 14.1-9.4 22.6V320h128v-16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v16h128v-16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v16h128v-82.8c0-8.5-3.4-16.6-9.4-22.6zM320 160H192V96h128v64zm64 208c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-16H192v16c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-16H0v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96H384v16z"
              />
            </svg>
          ),
        },
        {
          name: "Teams ",
          link: "/dashboard/team-management",
          id: 2,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/team-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("team-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
              />
            </svg>
          ),
        },

        {
          name: "Attendance ",
          link: "/dashboard/attendance-management",
          id: 2,

          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname.includes("attendance-management")
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("attendance-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M496 224c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm64 150.3c0 5.3-4.4 9.7-9.7 9.7h-60.6c-5.3 0-9.7-4.4-9.7-9.7v-76.6c0-5.3 4.4-9.7 9.7-9.7h12.6c5.3 0 9.7 4.4 9.7 9.7V352h38.3c5.3 0 9.7 4.4 9.7 9.7v12.6zM320 368c0-27.8 6.7-54.1 18.2-77.5-8-1.5-16.2-2.5-24.6-2.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h347.1c-45.3-31.9-75.1-84.5-75.1-144zm-96-112c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "User Management",
      link: "/dashboard/user-management",
      id: 20,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/user-management"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname.includes("user-management")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"
          />
        </svg>
      ),
      sub: [
        {
          name: "User Management",
          link: "/dashboard/user-management",
          id: 20,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/user-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                className={` ${
                  pathname.includes("user-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"
              />
            </svg>
          ),
        },
        {
          name: "Roles & Permissions",
          link: "/dashboard/role-management",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/role-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("role-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7 .1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z"
              />
            </svg>
          ),
        },
      ],
    },
    // {
    //   name: "Certifications",
    //   link: "/dashboard/certifications",
    //   id: 111,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5  ${
    //         pathname === "/dashboard/certifications"
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("/dashboard/certifications")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M458.6 255.9l46-45c13.7-13 7.3-36-10.7-40.3l-62.7-16 17.7-62c5-17.8-11.8-34.7-29.7-29.7l-62 17.7-16-62.7C337.1 .2 313.8-6.3 301 7.2L256 53.6 211 7.2c-12.6-13.4-36-7.2-40.3 10.7l-16 62.7-62-17.7C74.9 57.9 58.1 74.7 63 92.6l17.7 62-62.7 16C.1 174.9-6.3 197.9 7.4 210.9l46 45-46 45c-13.7 13-7.3 36 10.7 40.3l62.7 16-17.7 62c-5 17.8 11.8 34.7 29.7 29.7l62-17.7 16 62.7c4.4 18.6 27.7 24 40.3 10.7L256 458.6l45 46c12.5 13.5 36 7.5 40.3-10.7l16-62.7 62 17.7c17.8 5 34.7-11.8 29.7-29.7l-17.7-62 62.7-16c18-4.3 24.4-27.4 10.7-40.3l-46-45z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Task Management ",
    //   link: "/dashboard/task-management",
    //   id: 2,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname === "/dashboard/task-management"
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("task-management")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Chemical Calculator",
    //   link: "/dashboard/chemical_calc",
    //   id: 2,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname.includes("chemical_calc")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 448 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("chemical_calc")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Inventory",
    //   link: "/dashboard/inventory",
    //   id: 2,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname.includes("inventory")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 640 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("inventory")
    //             ? "text-lmsWhite"
    //             : "text-sanfill-dashText dark:fill-white"
    //         }`}
    //         d="M50.2 375.6c2.3 8.5 11.1 13.6 19.6 11.3l216.4-58c8.5-2.3 13.6-11.1 11.3-19.6l-49.7-185.5c-2.3-8.5-11.1-13.6-19.6-11.3L151 133.3l24.8 92.7-61.8 16.5-24.8-92.7-77.3 20.7C3.4 172.8-1.7 181.6 .6 190.1l49.6 185.5zM384 0c-17.7 0-32 14.3-32 32v323.6L5.9 450c-4.3 1.2-6.8 5.6-5.6 9.8l12.6 46.3c1.2 4.3 5.6 6.8 9.8 5.6l393.7-107.4C418.8 464.1 467.6 512 528 512c61.9 0 112-50.1 112-112V0H384zm144 448c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Work Order",
    //   link: "/dashboard/work-order",
    //   id: 15,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname.includes("work-order")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("work-order")
    //             ? "text-lmsWhite"
    //             : "text-sanfill-dashText dark:fill-white"
    //         }`}
    //         d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16h-64a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.2 0 21.4-17.2 11.3-27.3l-80-96a16 16 0 0 0 -22.6 0l-80 96C-5.4 142.7 1.8 160 16 160z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Traning/LMS",
    //   link: "/dashboard/lms",
    //   id: 1,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname.includes("lms")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 576 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("lms")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M386.5 111.5l15.1 249-11-.3c-36.2-.8-71.6 8.8-102.7 28-31-19.2-66.4-28-102.7-28-45.6 0-82.1 10.7-123.5 27.7L93.1 129.6c28.5-11.8 61.5-18.1 92.2-18.1 41.2 0 73.8 13.2 102.7 42.5 27.7-28.3 59-41.7 98.5-42.5zM569.1 448c-25.5 0-47.5-5.2-70.5-15.6-34.3-15.6-70-25-107.9-25-39 0-74.9 12.9-102.7 40.6-27.7-27.7-63.7-40.6-102.7-40.6-37.9 0-73.6 9.3-107.9 25C55.2 442.2 32.7 448 8.3 448H6.9L49.5 98.9C88.7 76.6 136.5 64 181.8 64 218.8 64 257 71.7 288 93.1 319 71.7 357.2 64 394.2 64c45.3 0 93 12.6 132.3 34.9L569.1 448zm-43.4-44.7l-34-280.2c-30.7-14-67.2-21.4-101-21.4-38.4 0-74.4 12.1-102.7 38.7-28.3-26.6-64.2-38.7-102.7-38.7-33.8 0-70.3 7.4-101 21.4L50.3 403.3c47.2-19.5 82.9-33.5 135-33.5 37.6 0 70.8 9.6 102.7 29.6 31.8-20 65.1-29.6 102.7-29.6 52.2 0 87.8 14 135 33.5z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Historical Uploads ",
      link: "/dashboard/upload",
      id: 900,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/upload"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            className={` ${
              pathname === "/dashboard/upload"
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
          />
        </svg>
      ),
      sub: [
        {
          name: "User Upload",
          link: "/dashboard/upload",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/upload"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname === "/dashboard/upload"
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
              />
            </svg>
          ),
        },
        {
          name: "Work Order Upload",
          link: "/dashboard/upload/work-order-upload",
          id: 1111,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/upload/work-order-upload"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("work-order-upload")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
              />
            </svg>
          ),
        },
      ],
    },
  ];
  const managerLinks = [
    {
      name: "Overview ",
      link: "/dashboard/home",
      id: 124566,

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={` w-5 h-5 ${
            pathname.includes("home")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("home")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"
          />
        </svg>
      ),
    },
    {
      name: "Diary Report",
      link: "/dashboard/diary-report",
      id: 109,
      svg: (
        <svg
          className={` w-5 h-5  ${
            pathname === "/dashboard/diary-report"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/diary-report")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M569.5 440C588 472 564.8 512 527.9 512H48.1c-36.9 0-60-40.1-41.6-72L246.4 24c18.5-32 64.7-32 83.2 0l239.9 416zM288 354c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
          />
        </svg>
      ),
    },
    {
      name: "Evidence",
      link: "/dashboard/evidence",
      id: 231,
      svg: (
        <svg
          className={` w-5 h-5  ${
            pathname === "/dashboard/evidence"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/evidence")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M505 442.7l-99.7-99.7c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6 .1-34zm-297-90.7c-79.5 0-144-64.3-144-144 0-79.5 64.4-144 144-144 79.5 0 144 64.3 144 144 0 79.5-64.4 144-144 144zm0-240c-40.8 0-73.8 33.1-73.8 73.8 0 33 48.3 93.1 66.8 114.9a9.2 9.2 0 0 0 14.2 0c18.5-21.8 66.8-81.9 66.8-114.9 0-40.8-33.1-73.8-73.8-73.8zm0 96c-13.3 0-24-10.8-24-24 0-13.3 10.8-24 24-24s24 10.7 24 24c0 13.3-10.8 24-24 24z"
          />
        </svg>
      ),
    },
    {
      name: "Task ",
      link: "/dashboard/task-list",
      id: 11112,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/task-list"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("task-list")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
          />
        </svg>
      ),
    },
    {
      name: "MSS ",
      link: "/dashboard/mss",
      id: 23043,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/mss"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            className={` ${
              pathname.includes("mss")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
          />
        </svg>
      ),
      sub: [
        {
          name: "View MSS",
          link: "/dashboard/mss",
          id: 122321,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/view-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                className={` ${
                  pathname.includes("view-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"
              />
            </svg>
          ),
        },
        {
          name: "Manage MSS",
          link: "/dashboard/mss/manage-mss",
          id: 551,
          svg: (
            <svg
              className={` w-5 h-5  ${
                pathname === "/dashboard/mss/manage-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("manage-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
              />
            </svg>
          ),
        },
        {
          name: " Custom Work Order",
          link: "/dashboard/mss/set-order",
          id: 125,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname.includes("set-order")
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("set-order")
                    ? "text-lmsWhite"
                    : "text-sanfill-dashText dark:fill-white"
                }`}
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              />
            </svg>
          ),
        },
      ],
      button1: (
        <button
          onClick={() => generateWO()}
          className="flex w-40 lg:w-40 px-3 py-2 bg-lmsBlue text-white justify-center items-center gap-2 text-xs bg-green-500"
        >
          <FaPlusCircle />
          <p>Generate MSS</p>
        </button>
      ),
      button2: (
        <button
          onClick={() => resetWO()}
          className="flex w-40 lg:w-40 px-3 py-2 text-xs bg-lmsBlue text-white justify-center items-center bg-red-500 gap-2"
        >
          <FiRefreshCcw />
          <p>Reset MSS</p>
        </button>
      ),
    },
    {
      name: "Facilities",
      link: "/dashboard/facilities",
      id: 212111105,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/facilities"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname === "/dashboard/facilities"
                ? "text-lmsWhite"
                : "text-sanfill-dashText dark:fill-white"
            }`}
            d="M436 480h-20V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v456H12c-6.6 0-12 5.4-12 12v20h448v-20c0-6.6-5.4-12-12-12zM128 76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76zm0 96c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm52 148h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm76 160h-64v-84c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84zm64-172c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
          />
        </svg>
      ),
      sub: [
        {
          name: "Facilities",
          link: "/dashboard/facilities",
          id: 2322,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/facilities"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                className={` ${
                  pathname === "/dashboard/facilities"
                    ? "text-lmsWhite"
                    : "text-sanfill-dashText dark:fill-white"
                }`}
                d="M436 480h-20V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v456H12c-6.6 0-12 5.4-12 12v20h448v-20c0-6.6-5.4-12-12-12zM128 76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76zm0 96c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm52 148h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm76 160h-64v-84c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84zm64-172c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"
              />
            </svg>
          ),
        },
        {
          name: "Rooms ",
          link: "/dashboard/room-management",
          id: 452,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/room-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("room-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M320 384H128V224H64v256c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V224h-64v160zm314.6-241.8l-85.3-128c-6-8.9-16-14.2-26.7-14.2H117.4c-10.7 0-20.7 5.3-26.6 14.2l-85.3 128c-14.2 21.3 1 49.8 26.6 49.8H608c25.5 0 40.7-28.5 26.6-49.8zM512 496c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V224h-64v272z"
              />
            </svg>
          ),
        },
        {
          name: "Assets ",
          link: "/dashboard/asset-management",
          id: 111113321,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/asset-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("asset-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M502.6 214.6l-45.3-45.3c-6-6-14.1-9.4-22.6-9.4H384V80c0-26.5-21.5-48-48-48H176c-26.5 0-48 21.5-48 48v80H77.3c-8.5 0-16.6 3.4-22.6 9.4L9.4 214.6c-6 6-9.4 14.1-9.4 22.6V320h128v-16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v16h128v-16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v16h128v-82.8c0-8.5-3.4-16.6-9.4-22.6zM320 160H192V96h128v64zm64 208c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-16H192v16c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-16H0v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96H384v16z"
              />
            </svg>
          ),
        },
        {
          name: "Teams ",
          link: "/dashboard/team-management",
          id: 9092,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/team-management"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("team-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
              />
            </svg>
          ),
        },

        {
          name: "Attendance ",
          link: "/dashboard/attendance-management",
          id: 12092,

          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname.includes("attendance-management")
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("attendance-management")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M496 224c-79.6 0-144 64.4-144 144s64.4 144 144 144 144-64.4 144-144-64.4-144-144-144zm64 150.3c0 5.3-4.4 9.7-9.7 9.7h-60.6c-5.3 0-9.7-4.4-9.7-9.7v-76.6c0-5.3 4.4-9.7 9.7-9.7h12.6c5.3 0 9.7 4.4 9.7 9.7V352h38.3c5.3 0 9.7 4.4 9.7 9.7v12.6zM320 368c0-27.8 6.7-54.1 18.2-77.5-8-1.5-16.2-2.5-24.6-2.5h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h347.1c-45.3-31.9-75.1-84.5-75.1-144zm-96-112c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "User Management",
      link: "/dashboard/user-management",
      id: 2032,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/user-management"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname.includes("user-management")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"
          />
        </svg>
      ),
      // sub: [
      //   {
      //     name: "User Management",
      //     link: "/dashboard/user-management",
      //     id: 20,
      //     svg: (
      //       <svg
      //         className={` w-5 h-5 ${
      //           pathname === "/dashboard/user-management"
      //             ? "fill-dashText dark:fill-white"
      //             : "fill-dashText dark:fill-white"
      //         }`}
      //         xmlns="http://www.w3.org/2000/svg"
      //         viewBox="0 0 448 512"
      //       >
      //         <path
      //           className={` ${
      //             pathname.includes("user-management")
      //               ? "fill-dashText dark:fill-white"
      //               : "fill-dashText dark:fill-white"
      //           }`}
      //           d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"
      //         />
      //       </svg>
      //     ),
      //   },
      //   {
      //     name: "Roles & Permissions",
      //     link: "/dashboard/role-management",
      //     id: 1,
      //     svg: (
      //       <svg
      //         className={` w-5 h-5 ${
      //           pathname === "/dashboard/role-management"
      //             ? "fill-dashText dark:fill-white"
      //             : "fill-dashText dark:fill-white"
      //         }`}
      //         xmlns="http://www.w3.org/2000/svg"
      //         viewBox="0 0 640 512"
      //       >
      //         <path
      //           className={` ${
      //             pathname.includes("role-management")
      //               ? "fill-dashText dark:fill-white"
      //               : "fill-dashText dark:fill-white"
      //           }`}
      //           d="M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7 .1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z"
      //         />
      //       </svg>
      //     ),
      //   },
      // ],
    },
    {
      name: "Certifications",
      link: "/dashboard/certifications",
      id: 1151,
      svg: (
        <svg
          className={` w-5 h-5  ${
            pathname === "/dashboard/certifications"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/certifications")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M458.6 255.9l46-45c13.7-13 7.3-36-10.7-40.3l-62.7-16 17.7-62c5-17.8-11.8-34.7-29.7-29.7l-62 17.7-16-62.7C337.1 .2 313.8-6.3 301 7.2L256 53.6 211 7.2c-12.6-13.4-36-7.2-40.3 10.7l-16 62.7-62-17.7C74.9 57.9 58.1 74.7 63 92.6l17.7 62-62.7 16C.1 174.9-6.3 197.9 7.4 210.9l46 45-46 45c-13.7 13-7.3 36 10.7 40.3l62.7 16-17.7 62c-5 17.8 11.8 34.7 29.7 29.7l62-17.7 16 62.7c4.4 18.6 27.7 24 40.3 10.7L256 458.6l45 46c12.5 13.5 36 7.5 40.3-10.7l16-62.7 62 17.7c17.8 5 34.7-11.8 29.7-29.7l-17.7-62 62.7-16c18-4.3 24.4-27.4 10.7-40.3l-46-45z"
          />
        </svg>
      ),
    },
    // {
    //   name: "Task Management ",
    //   link: "/dashboard/task-management",
    //   id: 2,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname === "/dashboard/task-management"
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("task-management")
    //             ? "fill-dashText dark:fill-white"
    //             : "fill-dashText dark:fill-white"
    //         }`}
    //         d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Chemical Calculator",
      link: "/dashboard/chemical_calc",
      id: 211111221113,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("chemical_calc")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname.includes("chemical_calc")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"
          />
        </svg>
      ),
    },
    {
      name: "Inventory",
      link: "/dashboard/inventory",
      id: 20909,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("inventory")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            className={` ${
              pathname.includes("inventory")
                ? "text-lmsWhite"
                : "text-sanfill-dashText dark:fill-white"
            }`}
            d="M50.2 375.6c2.3 8.5 11.1 13.6 19.6 11.3l216.4-58c8.5-2.3 13.6-11.1 11.3-19.6l-49.7-185.5c-2.3-8.5-11.1-13.6-19.6-11.3L151 133.3l24.8 92.7-61.8 16.5-24.8-92.7-77.3 20.7C3.4 172.8-1.7 181.6 .6 190.1l49.6 185.5zM384 0c-17.7 0-32 14.3-32 32v323.6L5.9 450c-4.3 1.2-6.8 5.6-5.6 9.8l12.6 46.3c1.2 4.3 5.6 6.8 9.8 5.6l393.7-107.4C418.8 464.1 467.6 512 528 512c61.9 0 112-50.1 112-112V0H384zm144 448c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
          />
        </svg>
      ),
    },
    // {
    //   name: "Work Order",
    //   link: "/dashboard/work-order",
    //   id: 15,
    //   svg: (
    //     <svg
    //       className={` w-5 h-5 ${
    //         pathname.includes("work-order")
    //           ? "fill-dashText dark:fill-white"
    //           : "fill-dashText dark:fill-white"
    //       }`}
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 512 512"
    //     >
    //       <path
    //         className={` ${
    //           pathname.includes("work-order")
    //             ? "text-lmsWhite"
    //             : "text-sanfill-dashText dark:fill-white"
    //         }`}
    //         d="M240 96h64a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16h-64a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zm0 128h128a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zm256 192H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm-256-64h192a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16H240a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.2 0 21.4-17.2 11.3-27.3l-80-96a16 16 0 0 0 -22.6 0l-80 96C-5.4 142.7 1.8 160 16 160z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: "Traning/LMS",
      link: "/dashboard/lms",
      id: 10990067,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("lms")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            className={` ${
              pathname.includes("lms")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M386.5 111.5l15.1 249-11-.3c-36.2-.8-71.6 8.8-102.7 28-31-19.2-66.4-28-102.7-28-45.6 0-82.1 10.7-123.5 27.7L93.1 129.6c28.5-11.8 61.5-18.1 92.2-18.1 41.2 0 73.8 13.2 102.7 42.5 27.7-28.3 59-41.7 98.5-42.5zM569.1 448c-25.5 0-47.5-5.2-70.5-15.6-34.3-15.6-70-25-107.9-25-39 0-74.9 12.9-102.7 40.6-27.7-27.7-63.7-40.6-102.7-40.6-37.9 0-73.6 9.3-107.9 25C55.2 442.2 32.7 448 8.3 448H6.9L49.5 98.9C88.7 76.6 136.5 64 181.8 64 218.8 64 257 71.7 288 93.1 319 71.7 357.2 64 394.2 64c45.3 0 93 12.6 132.3 34.9L569.1 448zm-43.4-44.7l-34-280.2c-30.7-14-67.2-21.4-101-21.4-38.4 0-74.4 12.1-102.7 38.7-28.3-26.6-64.2-38.7-102.7-38.7-33.8 0-70.3 7.4-101 21.4L50.3 403.3c47.2-19.5 82.9-33.5 135-33.5 37.6 0 70.8 9.6 102.7 29.6 31.8-20 65.1-29.6 102.7-29.6 52.2 0 87.8 14 135 33.5z"
          />
        </svg>
      ),
    },
    {
      name: "Historical Uploads ",
      link: "/dashboard/upload",
      id: 64900,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/upload"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            className={` ${
              pathname === "/dashboard/upload"
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
          />
        </svg>
      ),
      sub: [
        {
          name: "User Upload",
          link: "/dashboard/upload",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/upload"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname === "/dashboard/upload"
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
              />
            </svg>
          ),
        },
        {
          name: "Work Order Upload",
          link: "/dashboard/upload/work-order-upload",
          id: 12,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/upload/work-order-upload"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                className={` ${
                  pathname.includes("work-order-upload")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"
              />
            </svg>
          ),
        },
      ],
    },
  ];
  const cleanerLinks = [
    {
      name: "Today's Tasks",
      link: "/dashboard/cleaner/work-order",
      id: 1,

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={` w-5 h-5 ${
            pathname.includes("/dashboard/cleaner/work-order")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/cleaner/work-order")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"
          />
        </svg>
      ),
    },
    {
      name: "Attendance",
      link: "/dashboard/clock-in",
      id: 1,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("clock-in")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname.includes("clock-in")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"
          />
        </svg>
      ),
    },
    {
      name: "Learning Mgt.",
      link: "/dashboard/user/lms",
      id: 1,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("user/lms")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            className={` ${
              pathname.includes("user/lms")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M386.5 111.5l15.1 249-11-.3c-36.2-.8-71.6 8.8-102.7 28-31-19.2-66.4-28-102.7-28-45.6 0-82.1 10.7-123.5 27.7L93.1 129.6c28.5-11.8 61.5-18.1 92.2-18.1 41.2 0 73.8 13.2 102.7 42.5 27.7-28.3 59-41.7 98.5-42.5zM569.1 448c-25.5 0-47.5-5.2-70.5-15.6-34.3-15.6-70-25-107.9-25-39 0-74.9 12.9-102.7 40.6-27.7-27.7-63.7-40.6-102.7-40.6-37.9 0-73.6 9.3-107.9 25C55.2 442.2 32.7 448 8.3 448H6.9L49.5 98.9C88.7 76.6 136.5 64 181.8 64 218.8 64 257 71.7 288 93.1 319 71.7 357.2 64 394.2 64c45.3 0 93 12.6 132.3 34.9L569.1 448zm-43.4-44.7l-34-280.2c-30.7-14-67.2-21.4-101-21.4-38.4 0-74.4 12.1-102.7 38.7-28.3-26.6-64.2-38.7-102.7-38.7-33.8 0-70.3 7.4-101 21.4L50.3 403.3c47.2-19.5 82.9-33.5 135-33.5 37.6 0 70.8 9.6 102.7 29.6 31.8-20 65.1-29.6 102.7-29.6 52.2 0 87.8 14 135 33.5z"
          />
        </svg>
      ),
    },
  ];

  const InspLinks = [
    {
      name: "Today's Tasks",
      link: "/dashboard/inspector/work-order",
      id: 1,

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={` w-5 h-5 ${
            pathname.includes("/dashboard/inspector/work-order")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/cleaner/work-order")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M296 32h192c13.255 0 24 10.745 24 24v160c0 13.255-10.745 24-24 24H296c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24zm-80 0H24C10.745 32 0 42.745 0 56v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zM0 296v160c0 13.255 10.745 24 24 24h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm296 184h192c13.255 0 24-10.745 24-24V296c0-13.255-10.745-24-24-24H296c-13.255 0-24 10.745-24 24v160c0 13.255 10.745 24 24 24z"
          />
        </svg>
      ),
    },
    {
      name: "MSS ",
      link: "/dashboard/mss",
      id: 230,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname === "/dashboard/mss"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            className={` ${
              pathname.includes("mss")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
          />
        </svg>
      ),
      sub: [
        {
          name: "View MSS",
          link: "/dashboard/mss",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname === "/dashboard/view-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                className={` ${
                  pathname.includes("view-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"
              />
            </svg>
          ),
        },
        {
          name: "Manage MSS",
          link: "/dashboard/mss/manage-mss",
          id: 1,
          svg: (
            <svg
              className={` w-5 h-5  ${
                pathname === "/dashboard/mss/manage-mss"
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("manage-mss")
                    ? "fill-dashText dark:fill-white"
                    : "fill-dashText dark:fill-white"
                }`}
                d="M139.6 35.5a12 12 0 0 0 -17 0L58.9 98.8l-22.7-22.1a12 12 0 0 0 -17 0L3.5 92.4a12 12 0 0 0 0 17l47.6 47.4a12.8 12.8 0 0 0 17.6 0l15.6-15.6L156.5 69a12.1 12.1 0 0 0 .1-17zm0 159.2a12 12 0 0 0 -17 0l-63.7 63.7-22.7-22.1a12 12 0 0 0 -17 0L3.5 252a12 12 0 0 0 0 17L51 316.5a12.8 12.8 0 0 0 17.6 0l15.7-15.7 72.2-72.2a12 12 0 0 0 .1-16.9zM64 368c-26.5 0-48.6 21.5-48.6 48S37.5 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16zm0-320H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0 -16-16zm0 160H208a16 16 0 0 0 -16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0 -16-16z"
              />
            </svg>
          ),
        },
        {
          name: " Custom Work Order",
          link: "/dashboard/mss/set-order",
          id: 15,
          svg: (
            <svg
              className={` w-5 h-5 ${
                pathname.includes("set-order")
                  ? "fill-dashText dark:fill-white"
                  : "fill-dashText dark:fill-white"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className={` ${
                  pathname.includes("set-order")
                    ? "text-lmsWhite"
                    : "text-sanfill-dashText dark:fill-white"
                }`}
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Attendance",
      link: "/dashboard/clock-in",
      id: 1,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("clock-in")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            className={` ${
              pathname.includes("clock-in")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"
          />
        </svg>
      ),
    },
    {
      name: "Diary Report",
      link: "/dashboard/diary-report",
      id: 1,
      svg: (
        <svg
          className={` w-5 h-5  ${
            pathname === "/dashboard/diary-report"
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            className={` ${
              pathname.includes("/dashboard/diary-report")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M569.5 440C588 472 564.8 512 527.9 512H48.1c-36.9 0-60-40.1-41.6-72L246.4 24c18.5-32 64.7-32 83.2 0l239.9 416zM288 354c-25.4 0-46 20.6-46 46s20.6 46 46 46 46-20.6 46-46-20.6-46-46-46zm-43.7-165.3l7.4 136c.3 6.4 5.6 11.3 12 11.3h48.5c6.4 0 11.6-5 12-11.3l7.4-136c.4-6.9-5.1-12.7-12-12.7h-63.4c-6.9 0-12.4 5.8-12 12.7z"
          />
        </svg>
      ),
    },
    {
      name: "Learning Mgt.",
      link: "/dashboard/user/lms",
      id: 1,
      svg: (
        <svg
          className={` w-5 h-5 ${
            pathname.includes("user/lms")
              ? "fill-dashText dark:fill-white"
              : "fill-dashText dark:fill-white"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            className={` ${
              pathname.includes("user/lms")
                ? "fill-dashText dark:fill-white"
                : "fill-dashText dark:fill-white"
            }`}
            d="M386.5 111.5l15.1 249-11-.3c-36.2-.8-71.6 8.8-102.7 28-31-19.2-66.4-28-102.7-28-45.6 0-82.1 10.7-123.5 27.7L93.1 129.6c28.5-11.8 61.5-18.1 92.2-18.1 41.2 0 73.8 13.2 102.7 42.5 27.7-28.3 59-41.7 98.5-42.5zM569.1 448c-25.5 0-47.5-5.2-70.5-15.6-34.3-15.6-70-25-107.9-25-39 0-74.9 12.9-102.7 40.6-27.7-27.7-63.7-40.6-102.7-40.6-37.9 0-73.6 9.3-107.9 25C55.2 442.2 32.7 448 8.3 448H6.9L49.5 98.9C88.7 76.6 136.5 64 181.8 64 218.8 64 257 71.7 288 93.1 319 71.7 357.2 64 394.2 64c45.3 0 93 12.6 132.3 34.9L569.1 448zm-43.4-44.7l-34-280.2c-30.7-14-67.2-21.4-101-21.4-38.4 0-74.4 12.1-102.7 38.7-28.3-26.6-64.2-38.7-102.7-38.7-33.8 0-70.3 7.4-101 21.4L50.3 403.3c47.2-19.5 82.9-33.5 135-33.5 37.6 0 70.8 9.6 102.7 29.6 31.8-20 65.1-29.6 102.7-29.6 52.2 0 87.8 14 135 33.5z"
          />
        </svg>
      ),
    },
  ];

  const links =
    role?.toLowerCase() === "admin"
      ? adminLinks
      : role?.toLowerCase() === "manager"
      ? managerLinks
      : role?.toLowerCase() === "cleaner"
      ? cleanerLinks
      : role?.toLowerCase() === "inspector"
      ? InspLinks
      : [];
  if (
    pathname === "/" ||
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("forgot-password") ||
    pathname.includes("reset-password-account") ||
    pathname.includes("terms&conditions") ||
    pathname.includes("verify-multi-factor-auth") ||
    pathname.includes("new-password") ||
    pathname.includes("verification")
  )
    return null;
  return (
    <div className="relative">
      {openModal && (
        <div
          className="fixed z-[1000] overflow-y-auto top-16 w-full lg:-left-72 left-0"
          id="modal"
        >
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 w-full text-center sm:flex sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-gray-500 opacity-75 z-[1000]"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <div
              className="   bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg sm:w-full md:max-w-xs p-2 lg:p-5"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <header>
                <h2
                  className={`font-bold text-lg text-center dark:text-white text-black pb-5 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-64"
                  }`}
                >
                  Select Default Facility
                </h2>
              </header>
              <ul className="space-y-2">
                {loading ? (
                  <span className="flex justify-center items-center">
                    <svg
                      aria-hidden="true"
                      className="w-7 h-7  text-gray-200 animate-spin  fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#5B5BE3"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#5B5BE3"
                      />
                    </svg>
                  </span>
                ) : (
                  managerFacilities?.map((facility) => (
                    <li
                      key={facility?.facilityId}
                      onClick={() =>
                        handleSelect(
                          facility?.facilityId,
                          facility?.facilityName
                        )
                      }
                      className="flex items-center justify-between p-3 cursor-pointer rounded-lg border-b-gray-100 border-b shadow-sm hover:bg-gray-50 dark:text-white text-black dark:hover:text-black hover:text-black transition duration-150"
                    >
                      <div className="flex gap-2 items-start">
                        <span className="dark:bg-white bg-sanBlue rounded p-1.5 text-white dark:text-black">
                          <FaWarehouse />
                        </span>
                        <span className="text-sm ">
                          {facility?.facilityName}
                        </span>
                      </div>

                      <input
                        type="radio"
                        name="facility"
                        checked={selectedFacilityId === facility?.facilityId}
                        className="form-radio h-5 w-5 text-blue-600 dark:accent-white accent-sanBlue"
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-50 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={` flex flex-col absolute z-[1000] left-0 top-0 lg:static no-scrollbar lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto  w-60 lg:w-20 lg:sidebar-expanded:!w-60  shrink-0  bg-dashGray dark:bg-black shadow-lg bg-center bg-no-repeat object-cover transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        {genLoading && (
          <div className="fixed inset-0 transition-opacity z-20 w-full">
            <div className="absolute  inset-0 bg-black opacity-75 flex justify-center items-center">
              <div className="relative">
                <div className="w-32 h-32 relative rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent"></div>
                <span className="absolute right-2 top-10">
                  <p className="text-center text-white font-bold">
                    Generating Work Order
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}
        {resetLoading && (
          <div className="fixed inset-0 transition-opacity z-20 w-full">
            <div className="absolute  inset-0 bg-black opacity-75 flex justify-center items-center">
              <div className="relative">
                <div className="w-32 h-32 relative rounded-full animate-spin border-8 border-dashed border-red-500 border-t-transparent"></div>
                <span className="absolute right-2 top-10">
                  <p className="text-center text-white font-bold">
                    Resetting Work Order
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-start items-center   ">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-black 0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-10 h-6 fill-lmsWhite"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
        </div>
        <div className="flex justify-center items-center gap-2 h-20 p-5">
          <Image
            src="/logo.png"
            alt="Logo"
            width={600}
            height={80}
            className="w-28 h-auto object-cover"
          />
        </div>
        {role?.toLowerCase() !== "admin" && (
          <div className="px-5 w-full  items-start justify-between flex ">
            <div
              className=" p-2  dark:bg-sanLightBlue bg-gray-200  rounded flex items-start w-full justify-between cursor-pointer"
              onClick={handleSelectFacility}
            >
              <div className="flex gap-2 items-start">
                <span className="dark:bg-black bg-sanBlue rounded p-1.5 text-white">
                  <FaWarehouse />
                </span>
                <span className="flex flex-col justify-between">
                  <p className="text-black font-thin text-sm">{name}</p>
                  <p className="text-xs font-extralight text-gray-400">
                    Default
                  </p>
                </span>
              </div>

              <span>
                <FaSort className="text-black font-thin" />
              </span>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="space-y-8 p-4 lg:mt-5">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>

            <ul className="space-y-4">
              {(role?.toLowerCase() === "inspector" ||
                role?.toLowerCase() === "cleaner") && (
                <li
                  onClick={() => openScanModal()}
                  className={`px-3 py-3 rounded-[10px] mb-0.5 last:mb-0 cursor-pointer hover:bg-sanLightBlue hover:text-white bg-opacity-75 bg-sanLightBlue hover:dark:bg-sanBlue flex justify-between items-center `}
                >
                  <span
                    onClick={() => setSidebarOpen(false)}
                    className={`block text-black truncate transition duration-150 w-full cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <FaQrcode />

                      <span
                        className={`    ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200  `}
                      >
                        <p className="text-sm">Scan Room</p>
                      </span>
                    </div>
                  </span>
                </li>
              )}
              <SidebarMenu links={links} setSidebarOpen={setSidebarOpen} />
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="  p-4 mt-auto ">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden  text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="  text-gray-200 font-thin text-md ">
                ACTIONS
              </span>
            </h3>
            <ul className="mt-3 space-y-2">
              {/* transactions */}
              <li>
                <Image
                  src="/bottom-logo.png"
                  alt="Logo"
                  width={600}
                  height={100}
                  className="w-32 h-auto object-cover"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ModalComponent
        isOpen={scanModal}
        onClose={closeScanModal}
        setIsModalOpen={setScanModal}
      >
        <ScanModal role={role} close={closeScanModal} />
      </ModalComponent>
    </div>
  );
}

export default Sidebar;

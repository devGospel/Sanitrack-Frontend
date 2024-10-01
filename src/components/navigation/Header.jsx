"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/sidebar.context";
import { FaArchive, FaPlug, FaPlus, FaPlusCircle } from "react-icons/fa";
import useTask from "@/hooks/useTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie } from "cookies-next";
import { ThemeToggle } from "../ThemeToggle";
import { clearFacilityDetails } from "@/redux/features/facility/facilitySlice";
import { useDispatch } from "react-redux";
import { clearStoredWorkOrderDetails } from "@/redux/features/adminId/adminSlice";
import useNotifications from "@/hooks/useNotifications";
import useAuth from "@/hooks/useAuth";
import { format, formatDistance } from "date-fns";

function Header() {
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  const [showNotification, setShowNotification] = useState(false);
  const [toggleView, setToggleView] = useState(false);
  const {
    getTopNotifications,
    topNotifications,
    getAllNotifications,
    archiveNotification,
  } = useNotifications();
  useEffect(() => {
    getTopNotifications();
  }, []);
 
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const role = isClient ? newRole : "";
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sanUser"))
      : null ?? "";
  const newUser = isClient ? user?.username : "";
 
  const router = useRouter();
  // const { generateTask, loading } = useTask();
  if (
    pathname === "/" ||
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("forgot-password") ||
    pathname.includes("reset-password-account") ||
    pathname.includes("terms&conditions") ||
    pathname.includes("verify-multi-factor-auth") ||
    pathname.includes("new-password") ||
    pathname.includes("new-password") ||
    pathname.includes("verification")
  )
    return null;

  const logOutUser = () => {
    // make request to login logs endpoint
    dispatch(clearFacilityDetails());
    dispatch(clearStoredWorkOrderDetails());

    window?.localStorage.removeItem("sanUser");
    window?.localStorage.removeItem("isLoggedIn");
    window?.localStorage.removeItem("role");
    window?.localStorage.removeItem("auth-token");
    deleteCookie("sanitrack-auth-token");
    deleteCookie("san-role");
    router.push("/");
  };
  const formatDate = (dateString) => {
    const givenDate = new Date(dateString);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = now - givenDate;

    if (diffInMs < 60 * 1000) {
      // Less than a minute
      const seconds = Math.floor(diffInMs / 1000);
      return `${seconds} seconds ago`;
    } else if (diffInMs < 60 * 60 * 1000) {
      // Less than an hour
      const minutes = Math.floor(diffInMs / (60 * 1000));
      return `${minutes} minutes ago`;
    } else if (diffInMs < 24 * 60 * 60 * 1000) {
      // Less than a day
      const hours = Math.floor(diffInMs / (60 * 60 * 1000));
      return `${hours} hours ago`;
    } else {
      // More than a day
      return format(givenDate, "yyyy-MM-dd");
    }
  };

  return (
    <header className="sticky top-0 bg-[#fff] dark:bg-black   shadow-md z-50">
      <ToastContainer />
      {showNotification && (
        <div
          className="w-full right-0 h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 z-[1000]"
          id="chec-div"
        >
          <div className="fixed inset-0 transition-opacity w-full">
            <div
              className="absolute inset-0  z-[1000]"
              onClick={() => setShowNotification(false)}
            />
          </div>
          <div
            className="lg:w-4/12 w-4/5  absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="notification"
          >
            <div className=" w-full   bg-gray-50 dark:bg-black h-screen overflow-y-auto p-8 absolute right-0">
              <div className="flex items-center justify-between">
                <p
                  tabindex="0"
                  className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800 dark:text-white"
                >
                  Notifications
                </p>
                <button
                  role="button"
                  aria-label="close modal"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
                  onClick={() => setShowNotification(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="stroke-[#4B5563] dark:stroke-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#4B5563"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#4B5563"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {topNotifications.length !== 0 ? (
                topNotifications?.map((item) => (
                  <div className="w-full p-3 mt-8 bg-white rounded dark:bg-sanBlue flex  slide-right">
                    <div
                      tabindex="0"
                      aria-label="heart icon"
                      role="img"
                      className="focus:outline-none w-8 h-8  flex items-center justify-center"
                    >
                      <svg
                        width="45"
                        height="45"
                        className="w-6 h-6 stroke-dashText dark:stroke-white"
                        viewBox="0 0 45 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                          fill="dashText"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                          fill="dashText"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                          fill="dashText"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                          fill="dashText"
                        />
                      </svg>
                    </div>
                    <div className="pl-3">
                      <p
                        tabindex="0"
                        className="focus:outline-none text-sm leading-none"
                      >
                        <span className="text-indigo-700 dark:text-white">
                          {item?.message}
                        </span>
                      </p>
                      <div className="flex justify-between items-center pt-2">
                        <p
                          tabindex="0"
                          className="focus:outline-none text-xs leading-3 pt-1 text-gray-500 dark:text-gray-400 font-thin"
                        >
                          {formatDate(item?.dateAdded)}
                        </p>
                        <button
                          onClick={() => {
                            archiveNotification({
                              notificationIds: [item?._id],
                            });
                          }}
                        >
                          <FaArchive className="text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="flex justify-center items-center lg:mt-10 mt-5">
                  <p className="text-red-500 font-semibold text-center">
                    You have no new notifications !!!
                  </p>
                </span>
              )}
              {/* <div className="w-full p-3 mt-4 bg-white rounded dark:bg-sanBlue shadow flex flex-shrink-0 slide-right">
                <div
                  tabindex="0"
                  aria-label="group icon"
                  role="img"
                  className="focus:outline-none w-8 h-8  flex flex-shrink-0 items-center justify-center"
                >
                  <svg
                    width="45"
                    height="45"
                    className="w-6 h-6 stroke-dashText dark:stroke-white"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                      fill="dashText"
                    />
                  </svg>
                </div>
                <div className="pl-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <p
                      tabindex="0"
                      className="focus:outline-none text-sm leading-none"
                    >
                      <span className="text-indigo-700 dark:text-white">
                        Sash
                      </span>{" "}
                      added you to the group:{" "}
                      <span className="text-indigo-700 dark:text-white">
                        UX Designers
                      </span>
                    </p>
                  </div>
                  <p
                    tabindex="0"
                    className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                  >
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-white rounded dark:bg-sanBlue flex slide-right">
                <div
                  tabindex="0"
                  aria-label="post icon"
                  role="img"
                  className="focus:outline-none w-8 h-8  flex items-center justify-center"
                >
                  <svg
                    width="45"
                    height="45"
                    className="w-6 h-6 stroke-dashText dark:stroke-white"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                      fill="dashText"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p
                    tabindex="0"
                    className="focus:outline-none text-sm leading-none"
                  >
                    <span className="text-indigo-700 dark:text-white">
                      Sarah
                    </span>{" "}
                    posted in the thread:{" "}
                    <span className="text-indigo-700 dark:text-white">
                      Update gone wrong
                    </span>
                  </p>
                  <p
                    tabindex="0"
                    className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                  >
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-white dark:bg-sanBlue rounded flex items-center slide-right">
                <div
                  tabindex="0"
                  aria-label="storage icon"
                  role="img"
                  className="focus:outline-none w-8 h-8  flex items-center flex-shrink-0 justify-center"
                >
                  <svg
                    width="45"
                    height="45"
                    className="w-6 h-6 stroke-dashText dark:stroke-white"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                      fill="dashText"
                    />
                  </svg>
                </div>
                <div className="pl-3 w-full flex items-center justify-between">
                  <p
                    tabindex="0"
                    className="focus:outline-none text-sm leading-none text-black dark:text-white "
                  >
                    Low on storage: 2.5/32gb remaining
                  </p>
                  <p
                    tabindex="0"
                    className="focus:outline-none text-xs leading-3 cursor-pointer underline text-right text-red-700"
                  >
                    Manage
                  </p>
                </div>
              </div>
              <div className="w-full p-3 mt-4 bg-white rounded dark:bg-sanBlue flex slide-right">
                <div
                  tabindex="0"
                  aria-label="loading icon"
                  role="img"
                  className="focus:outline-none w-8 h-8  flex items-center justify-center"
                >
                  <svg
                    width="45"
                    height="45"
                    className="w-6 h-6 stroke-dashText dark:stroke-white"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                      fill="dashText"
                    />
                  </svg>
                </div>
                <div className="pl-3">
                  <p
                    tabindex="0"
                    className="focus:outline-none text-sm leading-none"
                  >
                    Shipmet delayed for order
                    <span className="text-indigo-700 dark:text-white">
                      {" "}
                      #25551
                    </span>
                  </p>
                  <p
                    tabindex="0"
                    className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"
                  >
                    2 hours ago
                  </p>
                </div>
              </div> */}

              <div className="flex items-center justiyf-between">
                <hr className="w-full" />
                {toggleView ? (
                  <button
                    onClick={() => {
                      getTopNotifications();
                      setToggleView(false);
                    }}
                    tabindex="0"
                    className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
                  >
                    View Less :(
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      getAllNotifications();
                      setToggleView(true);
                    }}
                    tabindex="0"
                    className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500"
                  >
                    View More :)
                  </button>
                )}
                <hr className="w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className=" lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-black dark:fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center justify-end lg:justify-between space-x-3 w-full flex-grow">
            <div className="lg:flex hidden items-center gap-x-2">
              <h3 className="text-dashText dark:text-white text-lg font-semibold capitalize">
                {role}
              </h3>
            </div>

            <div className="relative flex justify-end gap-x-2 items-center">
              <div className="w-full flex text-right gap-4 items-center">
                <button
                  onClick={() => setShowNotification(true)}
                  className={`relative flex items-center justify-center    rounded-md  p-1`}
                >
                  <span className="absolute top-0 right-0 bg-red-500 p-1.5 w-2 h-2 rounded-full flex justify-center items-center">
                    <p className="text-[10px] text-white">
                      {topNotifications.length}
                    </p>
                  </span>
                  <span className="sr-only">Notifications</span>
                  <svg
                    width="45"
                    height="45"
                    className="w-6 h-6 stroke-dashText dark:stroke-white"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M28.7571 5.18023C29.0027 4.44343 29.7991 4.04524 30.5359 4.29084L30.8246 4.38706C34.6038 5.6468 37.5693 8.61235 38.8291 12.3916L38.9253 12.6802C39.1709 13.417 38.7727 14.2134 38.0359 14.459C37.2991 14.7046 36.5027 14.3064 36.2571 13.5696L36.1609 13.281C35.1811 10.3416 32.8746 8.03503 29.9352 7.05523L29.6465 6.95901C28.9097 6.71341 28.5115 5.91702 28.7571 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.4255 5.18023C16.1799 4.44343 15.3835 4.04524 14.6467 4.29084L14.3581 4.38706C10.5788 5.6468 7.61329 8.61235 6.35355 12.3916L6.25733 12.6802C6.01173 13.417 6.40992 14.2134 7.14672 14.459C7.88351 14.7046 8.6799 14.3064 8.9255 13.5696L9.02172 13.281C10.0015 10.3416 12.3081 8.03503 15.2475 7.05523L15.5361 6.95901C16.2729 6.71341 16.6711 5.91702 16.4255 5.18023Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.4343 8.53067C17.8262 6.08626 19.9449 4.21875 22.4997 4.21875C25.0546 4.21875 27.1733 6.08626 27.5652 8.53067C31.0675 10.0396 33.7024 13.1091 34.1338 16.9101L34.8674 23.3743C34.9664 24.2466 35.336 25.0977 35.9609 25.8318C37.2672 27.3664 37.3084 29.2955 36.4569 30.7961C35.6192 32.2722 33.9637 33.2812 31.9779 33.2812H13.0215C11.0358 33.2812 9.3803 32.2722 8.54261 30.7961C7.69105 29.2955 7.73223 27.3664 9.03856 25.8318C9.66348 25.0977 10.033 24.2466 10.1321 23.3743L10.8657 16.9101C11.2971 13.1092 13.932 10.0396 17.4343 8.53067ZM22.4997 7.03125C21.2196 7.03125 20.1819 8.069 20.1819 9.34913V9.51929C20.1819 10.1204 19.7998 10.655 19.2311 10.8497C16.1386 11.9085 13.9844 14.3713 13.6603 17.2273L12.9266 23.6914C12.7613 25.1476 12.1489 26.5169 11.1802 27.6548C10.6867 28.2346 10.6841 28.8713 10.9887 29.408C11.3071 29.9691 12.0076 30.4688 13.0215 30.4688H31.9779C32.9919 30.4688 33.6924 29.9691 34.0108 29.408C34.3153 28.8713 34.3127 28.2346 33.8193 27.6548C32.8506 26.5169 32.2381 25.1476 32.0729 23.6914L31.3392 17.2273C31.015 14.3713 28.8608 11.9085 25.7683 10.8497C25.1997 10.655 24.8176 10.1204 24.8176 9.51929V9.34913C24.8176 8.069 23.7799 7.03125 22.4997 7.03125Z"
                      fill="dashText"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3384 35.625C20.3384 36.9194 21.3877 37.9688 22.6821 37.9688C23.9765 37.9688 25.0259 36.9194 25.0259 35.625H27.8384C27.8384 38.4727 25.5298 40.7812 22.6821 40.7812C19.8344 40.7812 17.5259 38.4727 17.5259 35.625H20.3384Z"
                      fill="dashText"
                    />
                  </svg>
                </button>

                <ThemeToggle />
                <div className="dropdown inline-block relative">
                  <button className="  group px-4 rounded inline-flex gap-2 items-center">
                    <span className="text-black text-sm mr-1 capitalize font-bold dark:text-white">
                      {newUser}
                    </span>
                    <svg
                      className="fill-current text-black h-4 w-4 block opacity-50 dark:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 0 1-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z" />
                    </svg>
                  </button>
                  <ul className="dropdown-menu rounded-b text-black shadow-md bg-white dark:bg-black text-left absolute hidden p-2 w-40">
                    <li className="d-link w-full p-2">
                      <button
                        onClick={() => logout()}
                        className="flex w-auto px-2 py-1 bg-sanBlue rounded-md text-white justify-center items-center font-thin gap-2"
                      >
                        <svg
                          className="shrink-0 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          <path
                            className={`fill-white
                        `}
                            d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                          />
                        </svg>
                        <p className="font-extralight text-sm">Logout</p>
                      </button>
                    </li>
                    <li className="d-link w-full p-2">
                      <Link
                        href="/dashboard/settings"
                        className=" text-sm block w-full flex items-center gap-2"
                      >
                        <svg
                          className="shrink-0 h-4 w-4 dark:fill-white fill-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1 .1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9 .4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9 .1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1 .1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z" />
                        </svg>
                        <p className="font-extralight text-sm text-black dark:text-white">
                          Settings
                        </p>
                      </Link>
                    </li>
                  </ul>
                          
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

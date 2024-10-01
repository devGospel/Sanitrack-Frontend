"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SidebarMenu = ({ links, setSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname();
  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };
  return (
    <>
      {" "}
      {links?.map((link) => (
        <>
          <li
            key={link?.id}
          
            className={`px-3 py-3 rounded-[10px] mb-0.5 last:mb-0 cursor-pointer hover:bg-dashLighter hover:dark:bg-sanBlue flex justify-between items-center ${
              pathname.includes(link.link) && "bg-dashLighter dark:bg-sanBlue"
            }`}
          >
            <Link
              href={link?.link}
              onClick={() => setSidebarOpen(false)}
              className={`block text-slate-200 truncate transition duration-150 w-full cursor-pointer ${
                pathname.includes(link.link)
                  ? "hover:text-dashText "
                  : "hover:text-dashText font-semibold"
              }`}
            >
              <div className="flex items-center">
                {link?.svg}

                <span
                  className={`    ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200  ${
                    pathname.includes(link?.link)
                      ? "text-dashText dark:text-white font-semibold"
                      : "text-dashText dark:text-white font-thin"
                  } `}
                >
                  <p className="text-sm">{link?.name}</p>
                </span>
              </div>
            </Link>
            {link.sub && (
              <svg
                onClick={() => toggleMenu(link.id)}
                className={`w-5 h-5 transform transition-transform ${
                  activeMenu === link.id ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </li>
          {link.sub && activeMenu === link.id && (
            <ul className="p-3 space-y-3 bg-white dark:bg-slate-800 rounded-[10px]">
              {link.sub.map((subItem) => (
                <li
                  key={subItem.id}
                  onClick={() => {setSidebarOpen(false)
                    setActiveMenu(null)
                  }}
                  className={`p-1.5 rounded-[10px] mb-0.5 last:mb-0 cursor-pointer hover:bg-dashLighter hover:dark:bg-sanBlue flex justify-between items-center ${
                    pathname.includes(subItem.link) && "bg-dashLighter  dark:bg-sanBlue "
                  }`}
                >
                  <Link
                    href={subItem.link}
                    className={`block w-full text-slate-200 dark:text-white truncate transition duration-150 cursor-pointer ${
                      pathname.includes(subItem.link)
                        ? "hover:text-dashText dark:text-white"
                        : "hover:text-dashText dark:text-white font-semibold"
                    }`}
                  >
                    <div
                     className="flex items-center"
                    >
                      {subItem.svg}
                      <span
                        className={`    ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100  duration-200  ${
                          pathname.includes(subItem?.link)
                            ? "text-dashText font-semibold dark:text-white"
                            : "text-dashText font-thin dark:text-white"
                        } `}
                      >
                        <p className="text-xs">{subItem?.name}</p>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
<li> {link.button1 && (link.button1)}</li>
<li> {link.button2 && (link.button2)}</li>  
            </ul>
          )}
        </>
      ))}
    </>
  );
};

export default SidebarMenu;

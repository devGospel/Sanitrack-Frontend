"use client";
import { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";

import Password from "./Password";

const tabs = [
  {
    id: 1,
    name: "Change Password",
    component: <Password />,
  },
  //   {
  //     id: 2,
  //     name: "Roles",
  //     component: <Roless />,
  //   },
  //   {
  //     id: 3,
  //     name: "Privelege",
  //     component: <Privelege />,
  //   },

  // Add more tabs if needed
];

const Security = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  /**
   *ternary that protects qr code route based on role
   */

  return (
   
    <div className="flex flex-col  lg:flex-row lg:gap-x-5 lg:items-start pt-5">
      <div className="flex bg-white dark:bg-slate-800 flex-row  lg:flex-col w-full lg:w-3/12 relative">
        <div className="md:fixed w-full mx-5 lg:mx-0  lg:w-[20%]">
          {tabs?.map((tab) => (
            <div
              className={` p-5 border-black border-b hover:bg-sanBlue hover:text-white hover:font-bold  cursor-pointer ${
                activeTab.id === tab.id ? "bg-sanBlue text-white" : "bg-white"
              }`}
              key={tab?.id}
              onClick={() => handleTabClick(tab)}
            >
              <div className=" ">
                <span
                  className="question  cursor-pointer select-none w-full outline-none text-lg font-medium capitalize
    "
                >
                  {tab.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-9/12  px-5 flex justify-end flex-col">
        {activeTab.component}
      </div>
    </div>
  );
};

export default Security;

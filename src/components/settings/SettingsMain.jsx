"use client";
import AssetTasks from "@/components/settings/AssetTasks";
import Frequency from "@/components/settings/Frequency";
import General from "@/components/settings/General";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EvidenceLevel from "./EvidenceLevel";
import Password from "./Password";
import Security from "./Security";

const SettingsMain  = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    {
      name: "General",
      component: General,
    },
     {
      name: "Security",
      component: Security,
    },
    {
      name: "Frequency",
      component: Frequency,
    },
   
    {
      name: "Evidence Level",
      component: EvidenceLevel,
    },
  ];
  const [newData, setNewData] = useState([]);
  // Extract the first word of the tab name to use as a key
  const getTabKey = (name) => name.split(" ")[0].toLowerCase();

  // Get the active tab name from the URL search params or default to the first tab
  const activeTabKey = searchParams.get("tab") || getTabKey(tabs[0].name);
  const activeTab =
    tabs.find((tab) => getTabKey(tab.name) === activeTabKey) || tabs[0];

  const handleTabClick = (tab) => {
    // Update the URL search params when a tab is clicked
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("tab", getTabKey(tab.name));
    router.push(`?${newSearchParams.toString()}`);
  };
  // const newData = activeTab.name === "Training" ? trainingData : data;

  return (
    <main className="bg-white dark:bg-slate-900 w-full h-screen">
      <div className="p-5 lg:p-10">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white px-6 md:px-0">
          Account Settings
        </h1>
        <ul className="flex gap-x-5 border-b border-gray-300 dark:border-white text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
          {tabs.map((tab) => (
            <li
              onClick={() => handleTabClick(tab)}
              className={`mr-2 text-gray-900 dark:text-white cursor-pointer ${
                activeTab.name === tab.name
                  ? "border-b-2 border-sanBlue transform transition-all duration-300 ease-in font-bold "
                  : " transform transition-all duration-150 ease-out"
              }`}
            >
              <p className="py-3 inline-block">{tab.name}</p>
            </li>
          ))}

        
        </ul>
        <div>
        <>
          {React.createElement(activeTab.component)}
        </>
      </div>
      </div>
    </main>
  );
};

export default SettingsMain;

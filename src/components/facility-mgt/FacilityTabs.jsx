"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FacilityTable from "./FacilityTable";
import LibraryResourceTabContent from "../lms/library-resource/LibraryResourceTabContent";
import FacilityMap from "./FacilityMap";

const FacilityTabs = ({ data, loading, trainingData ,resourceData}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    {
      name: "List View",
      component: FacilityTable,
    },
    {
      name: "Map View",
      component: FacilityMap,
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

  useEffect(() => {
    if (activeTab.name === "List View") {
      setNewData(data);
    } else setNewData(resourceData);
  }, [activeTab,trainingData]);
  return (
    <div className="flex flex-col">
      {/* <div className="lg:py-1 py-1 px-1 rounded-sm flex bg-[#F5F5F5] justify-between pb-2 mb-10 items-center flex-row lg:space-x-6 space-x-4 sticky top-0 w-full overflow-y-hidden z-10 lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
        {tabs.map((tab) => (
          <p
            key={tab.name}
            className={`mr-2 cursor-pointer text-center p-4 rounded-sm w-full ${
              activeTab.name === tab.name
                ? "font-bold text-[#3478F3] bg-white text-sm lg:text-lg text-payWhite p-2"
                : "text-black text-sm lg:text-lg font-bold"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </p>
        ))}
      </div> */}

      <div>
        <Suspense fallback={"Loading"}>
          {React.createElement(activeTab.component, { newData, loading })}
        </Suspense>
      </div>
    </div>
  );
};

export default FacilityTabs;

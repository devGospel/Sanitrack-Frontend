"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserRoles from './user-roles/UserRoles';
import UserPermissions from './user-permissions/UserPermissions';

const RoleTabs = ({ data, loading, permissionData, permissionLoading, roleData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    {
      name: "User Roles",
      component: UserRoles,
    },
    {
      name: "User Permissions",
      component: UserPermissions,
    },
  ];

  const [newData, setNewData] = useState([]);


  // Extract the first word of the tab name to use as a key
  const getTabKey = (name) => name.split(' ')[1].toLowerCase();

  // Get the active tab name from the URL search params or default to the first tab
  const activeTabKey = searchParams.get('tab') || getTabKey(tabs[0].name);
  const activeTab = tabs.find(tab => getTabKey(tab.name) === activeTabKey) || tabs[0];

  const handleTabClick = (tab) => {
    // Update the URL search params when a tab is clicked
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tab', getTabKey(tab.name));
    router.push(`?${newSearchParams.toString()}`);
  };

  // console.log(activeTab)


  useEffect(() => {
    if (activeTab.name === "User Roles") {
      setNewData(roleData);
    } else setNewData(permissionData);
  }, [activeTab,roleData, permissionData]);

  // console.log("NNNNNNNNNN", newData)

  return (
    <div className='flex flex-col'>
     <div className="lg:p-2 flex bg-dashLighter rounded-[30px] justify-between pb-2 mb-10 items-center flex-row lg:space-x-6 space-x-4 sticky top-0 w-full overflow-y-hidden z-10 lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
        {tabs.map((tab) => (
          <p
            key={tab.name}
            className={`mr-2 cursor-pointer text-center p-2 rounded-[30px] w-full ${
              activeTab.name === tab.name
                ? " text-darkText bg-white font-bold  text-sm lg:text-lg text-darkText p-2 transform transition-all duration-300 ease-in "
                : "text-black text-sm lg:text-lg font-thin transform transition-all duration-150 ease-out"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </p>
        ))}
      </div>


      <div>
        <Suspense fallback={"Loading"}>
          {React.createElement(activeTab.component, { newData, loading })}
        </Suspense>
      </div>
    </div>
  );
}

export default RoleTabs;

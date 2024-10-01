"use client"

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TrainingsTabContent from './trainings/TrainingsTabContent';
import LibraryResourceTabContent from './library-resource/LibraryResourceTabContent';
import useTraining from '@/hooks/useTraining';
import useResources from '@/hooks/useResource';


const data = [
    {
      id:1,
      name: "Hydrogen Peroxide Usage",
      date:"25-05-2024",
      time:"10:00am",
      titrationCount: 5,
      unit: "mL",
      concentration: "5%",
      note: "Commonly used as a disinfectant and bleach.",
      status:"completed"
    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 3,
      id:2,
      unit: "mL",
      concentration: "10%",
      note: "Effective for removing mineral deposits and rust.",
      status:"in-progress"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 4,
      id:3,
      unit: "mL",
      concentration: "25%",
      note: "Used in various cleaning agents and detergents.",
      status:"pending"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      id:4,
      titrationCount: 2,
      unit: "mL",
      concentration: "70%",
      note: "Widely used as a disinfectant and solvent.",
      status:"completed"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 6,
      id:5,
      unit: "mL",
      concentration: "5%",
      note: "Vinegar-based cleaner, effective against bacteria and mold.",
      status:"in-progress"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 4,
      id:6,
      unit: "mL",
      concentration: "10%",
      note: "Strong base used for cleaning ovens and drains.",
      status:"pending"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 3,
      id:7,
      unit: "mL",
      concentration: "3%",
      note: "Used as a bleaching agent and disinfectant.",
      status:"completed"

    },
    {
        name: "Hydrogen Peroxide Usage",
        date:"25-05-2024",
        time:"10:00am",
      titrationCount: 5,
      id:8,
      unit: "mL",
      concentration: "50%",
      note: "Effective at removing lime scale and rust stains.",
      status:"in-progress"

    },
  ];

const Tabs = ({allUserTraining, allUserResource, trainingLoading, resourceLoading}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // console.log("Heyyyyyyyyyyyyyyy",allUserTraining)

  const statusFilter = searchParams.get('status');

  const filterDataByStatus = (data, status) => {
    if (status) {
      return data.filter(item => item.status === status);
    }
    return data;
  };
   
  //NOTE:I'm just using a demo data, allUserTraining should be used
  const filteredTrainingData = filterDataByStatus(allUserTraining?.courses, statusFilter);

  const tabs = [
    {
      name: "Training",
      component: TrainingsTabContent,
    },
    {
      name: "Library Resource",
      component: LibraryResourceTabContent,
    },
  ];

  // Extract the first word of the tab name to use as a key
  const getTabKey = (name) => name.split(' ')[0].toLowerCase();

  // Get the active tab name from the URL search params or default to the first tab
  const activeTabKey = searchParams.get('tab') || getTabKey(tabs[0].name);
  const activeTab = tabs.find(tab => getTabKey(tab.name) === activeTabKey) || tabs[0];

  const handleTabClick = (tab) => {
    // Update the URL search params when a tab is clicked
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tab', getTabKey(tab.name));
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className='flex flex-col'>
      <div className="lg:py-1 py-1 px-1 rounded-sm flex bg-[#F5F5F5] justify-between pb-2 mb-10 items-center flex-row lg:space-x-6 space-x-4 sticky top-0 w-full overflow-y-hidden z-10 lg:overflow-x-hidden overflow-x-scroll no-scrollbar">
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
      </div>

      <div>
        <Suspense fallback={"Loading"}>
          {React.createElement(activeTab.component, { 
            data: activeTab.name === "Training" ? filteredTrainingData : allUserResource, 
            loading: activeTab.name === "Training" ? trainingLoading : resourceLoading 
          })}
        </Suspense>
      </div>
    </div>
  );
}

export default Tabs;

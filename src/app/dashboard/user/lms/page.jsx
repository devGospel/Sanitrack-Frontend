"use client"

import CleanerOverviewCards from '@/components/user-lms/CleanerOverviewCards';
import Tabs from '@/components/user-lms/Tabs';
import useResources from '@/hooks/useResource';
import useTraining from '@/hooks/useTraining';
import { Suspense, useEffect } from 'react';


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

const UserCleanerLmsPage = () => {

      const { getAllUserTraining, allUserTraining, loading: trainingLoading } = useTraining();
      const { getAllUserResource, allUserResource, loading: resourceLoading } = useResources();


      useEffect(() => {
        getAllUserTraining();
        getAllUserResource();
      }, []);

  return (
          <Suspense fallback={"Loading"}>
            <div className="text-black  bg-white  h-screen w-full">

                <div className="text-black flex flex-col gap-4  bg-white lg:p-10 p-5 w-full">
                  <CleanerOverviewCards 
                  allUserTraining={allUserTraining}
                   />
                  <Tabs 
                    allUserTraining={allUserTraining} 
                    allUserResource={allUserResource} 
                    trainingLoading={trainingLoading} 
                    resourceLoading={resourceLoading} 
                   />
                </div>
            </div>
          </Suspense>
  )
}

export default UserCleanerLmsPage
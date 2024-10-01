"use client";
import LmsHeader from "@/components/lms/LmsHeader";
import OverviewCards from "@/components/lms/OverviewCards";
import Tabs from "@/components/lms/Tabs";
import Spinner from "@/components/loaders/Loader";
import useResources from "@/hooks/useResource";
import useTraining from "@/hooks/useTraining";
import { Suspense, useEffect } from "react";

const data = [
  {
    id: 1,
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 5,
    unit: "mL",
    concentration: "5%",
    note: "Commonly used as a disinfectant and bleach.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 3,
    id: 2,
    unit: "mL",
    concentration: "10%",
    note: "Effective for removing mineral deposits and rust.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 4,
    id: 3,
    unit: "mL",
    concentration: "25%",
    note: "Used in various cleaning agents and detergents.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    id: 4,
    titrationCount: 2,
    unit: "mL",
    concentration: "70%",
    note: "Widely used as a disinfectant and solvent.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 6,
    id: 5,
    unit: "mL",
    concentration: "5%",
    note: "Vinegar-based cleaner, effective against bacteria and mold.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 4,
    id: 6,
    unit: "mL",
    concentration: "10%",
    note: "Strong base used for cleaning ovens and drains.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 3,
    id: 7,
    unit: "mL",
    concentration: "3%",
    note: "Used as a bleaching agent and disinfectant.",
  },
  {
    name: "Hydrogen Peroxide Usage",
    date: "25-05-2024",
    time: "10:00am",
    titrationCount: 5,
    id: 8,
    unit: "mL",
    concentration: "50%",
    note: "Effective at removing lime scale and rust stains.",
  },
];

const LibraryManageMentResourcePage = () => {
  const {
    getAllStaffTraining,
    loading,
    allStaffTraining,
    staffDashboardStats,
    getAllStaffDashboardStats,
  } = useTraining();

  const { getAllStaffResources, allStaffResources } = useResources();
  useEffect(() => {
    getAllStaffDashboardStats();
    getAllStaffTraining();
    getAllStaffResources();
  }, []);

  return (
    <div className="text-black  bg-white  h-screen w-full">
         <Suspense fallback={<Spinner />}> <LmsHeader /></Suspense>
     

      <>
        {loading ? (
          <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 animate-pulse w-full">
                <div className="rounded-sm bg-slate-300 h-60   w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
              </div>
              <div className="grid  grid-cols-2  animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
              </div>
              <div className="flex-1 space-y-6 py-1 lg:mt-10 mt-5">
                {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                <div className="s">
                  <div className="flex flex-col">
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-black flex flex-col gap-4  bg-white lg:px-10 px-5 w-full">
            <OverviewCards data={staffDashboardStats} />
            <Suspense fallback={<Spinner />}>
              <Tabs
                data={data}
                trainingData={allStaffTraining}
                loading={false}
                resourceData={allStaffResources}
              />
            </Suspense>
          </div>
        )}
      </>
    </div>
  );
};

export default LibraryManageMentResourcePage;

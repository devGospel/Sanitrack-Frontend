"use client";
import HomeTabs from "@/components/home/HomeTabs";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import LmsHeader from "@/components/lms/LmsHeader";
import OverviewCards from "@/components/lms/OverviewCards";
import Tabs from "@/components/lms/Tabs";
import Spinner from "@/components/loaders/Loader";
import { Roles } from "@/constant/roles";
import useInventory from "@/hooks/useInventory";
import useResources from "@/hooks/useResource";
import useStats from "@/hooks/useStats";
import useTraining from "@/hooks/useTraining";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

const Inventory = () => {
  const { mssOverview, getMssOverview, loading } = useStats();
  const router = useRouter();
  const newRole = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const facId = typeof window !== "undefined" ? localStorage.getItem("hasFacility") : null;
  const selectedFacilityId = useSelector((state) => state.facility.selectedFacilityId);

  useEffect(() => {
    console.log('person just logged in what is their role and facility it', newRole, facId)
    if (!facId ) {
      if(newRole?.toLocaleLowerCase() !== 'admin'){
        router.push("/dashboard/empty");
      }
    
    }
  }, []);

  // const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];

  // useEffect(() => {
  //   if(validRoles.includes(newRole?.toLocaleLowerCase())){ 
  //     getMssOverview(selectedFacilityId)
  //   }else{
  //     getMssOverview()
  //   }
    
  // }, [selectedFacilityId, newRole]);
  
  return (
    <div className="text-black  bg-white dark:bg-slate-800  h-screen w-full">
      <>
        {loading ? (
          <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
              {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 animate-pulse w-full">
                <div className="rounded-sm bg-slate-300 h-60   w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
              </div> */}
              <div className="grid  grid-cols-3  animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
                <div className="rounded-sm bg-slate-500 h-12 w-auto"></div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse w-full mt-10">
                <div className="rounded-sm bg-slate-300 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-300 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-700 h-40 w-auto"></div>
                <div className="rounded-sm bg-slate-500 h-40 w-auto"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-black flex flex-col gap-4  bg-white dark:bg-slate-800 lg:p-10 p-5 w-full">
            <Suspense fallback={<Spinner />}>
              <HomeTabs loading={false} />
            </Suspense>
          </div>
        )}
      </>
    </div>
  );
};

export default Inventory;

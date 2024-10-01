"use client";

import RoleHeader from "@/components/role-management/RoleHeader";
import RoleTabs from "@/components/role-management/RoleTabs";
import React, { useEffect, useState, Suspense } from "react";
import usePermission from "@/hooks/usePermission";
import useRole from "@/hooks/useRole";

const RoleManagement = () => {
  const { getAllPermission, allPermission, loading } = usePermission();
  const { allRoles, getAllRoles } = useRole();

  useEffect(() => {
    getAllRoles()
    getAllPermission()
  }, []);

  // console.log("ALLLLRRRRRRR", allRoles)
  // console.log("ALLLLPPPPPPP", allPermission)

  const data = [
    { id: 1, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 2, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 3, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 4, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 5, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 6, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 7, user_id: "6382047352grhst42984", role: "Cleaner" },
    { id: 8, user_id: "6382047352grhst42984", role: "Cleaner" },
  ];

  return (
    <Suspense fallback={"Loading"}>
      <div className="text-black bg-white h-screen w-full">
        <RoleHeader />

        <>
         {
          loading ? 
          (
            <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
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
                    <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-10 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  {/* <div className="h-2 bg-slate-700 rounded"></div> */}
                </div>
              </div>
            </div>
          </div>
          ) :
          (
          <div className="text-black flex flex-col gap-4 bg-white lg:px-10 px-5 w-full">
            <RoleTabs 
            data={data} 
            loading={loading} 
            permissionData={allPermission} 
            permissionLoading={loading}
            roleData={allRoles}
            />
          </div>
            
          )
         }
        
        </>
      </div>
    </Suspense>
  );
};

export default RoleManagement;

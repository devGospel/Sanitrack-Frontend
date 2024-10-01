"use client";

import Spinner from "@/components/loaders/Loader";
import MssHeader from "@/components/mss/MssHeader";
import ViewMssTable from "@/components/mss/ViewMssTable";
import WorkOrderHeader from "@/components/work-order/WorkOrderHeader";
import WorkOrderTabs from "@/components/work-order/WorkOrderTabs";
import { Roles } from "@/constant/roles";
import useStats from "@/hooks/useStats";
import useTask from "@/hooks/useTask";
import useWorkOrder from "@/hooks/useWorkOrder";
import { getCurrentDateInLosAngeles } from "@/utils/getCurrentDate";
import { format } from "date-fns";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Mss = () => {
  const { loading, getDailyComp, dailyComp } = useStats();

  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );

  const [selectedDate, setSelectedDate] = useState(getCurrentDateInLosAngeles());
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  // useEffect(() => {
  //   if(role.toLowerCase() == "manager"){ 
  //     getDailyComp(selectedFacilityId)
  //   }else{ 
  //     getDailyComp();
  //   }
  
  // }, []);

  const validRoles = [Roles.MANAGER.toLowerCase(), Roles.INSPECTOR.toLowerCase(), Roles.SUPERVISOR.toLowerCase()];

  useEffect(() => {
    if(validRoles.includes(role?.toLocaleLowerCase())){ 
      getDailyComp(format(selectedDate, "yyyy-MM-dd"), selectedFacilityId)
    }else{
      getDailyComp(format(selectedDate, "yyyy-MM-dd"));
    }
    
  }, [selectedDate, selectedFacilityId, role]);

  console.log(dailyComp);
  return (
    <>
      <div className="text-black bg-white dark:bg-slate-900 h-screen flex flex-col space-y-3 w-full">
        <MssHeader
        manageMssScreen={false}
        viewMssScreen={true}
        />
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 lg:px-10 px-5 w-full">
        
          <ViewMssTable
            data={dailyComp}
            loading={loading}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
      </div>
    </>
  );
};

export default Mss;

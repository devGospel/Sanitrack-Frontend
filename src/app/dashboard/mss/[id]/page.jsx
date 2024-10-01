"use client";

import BackButton from "@/components/BackButton";
import Spinner from "@/components/loaders/Loader";
import MssHeader from "@/components/mss/MssHeader";
import ViewMssTable from "@/components/mss/ViewMssTable";
import ViewSingleMssTable from "@/components/mss/ViewSingleMssTable";
import WorkOrderHeader from "@/components/work-order/WorkOrderHeader";
import WorkOrderTabs from "@/components/work-order/WorkOrderTabs";
import { Roles } from "@/constant/roles";
import useStats from "@/hooks/useStats";
import useTask from "@/hooks/useTask";
import useWorkOrder from "@/hooks/useWorkOrder";
import { getCurrentDateInLosAngeles } from "@/utils/getCurrentDate";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Mss = () => {
  const { loading, getSingleMss, allSingleMss } = useStats();

  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );

  const [selectedDate, setSelectedDate] = useState(
    getCurrentDateInLosAngeles()
  );
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const params = useParams();
  useEffect(() => {
    getSingleMss(params?.id);
  }, []);

  const validRoles = [
    Roles.MANAGER.toLowerCase(),
    Roles.INSPECTOR.toLowerCase(),
    Roles.SUPERVISOR.toLowerCase(),
  ];

  
  return (
    <>
      <div className="text-black bg-white dark:bg-slate-900 h-screen flex flex-col space-y-3 w-full">
        <header className="flex gap-2 items-start lg:p-10 p-5">
          <BackButton />
          <div className=" flex flex-col gap-2">
            {allSingleMss && (
              <h1 className=" text-black dark:text-white lg:text-2xl font-semibold capitalize">
                {allSingleMss[0]
                  ? `${allSingleMss[0]?.workOrderTask?.assetTaskType?.assetId?.assetPrefix}
                 ${allSingleMss[0]?.workOrderTask?.assetTaskType?.assetId?.assetCode}_
                 ${allSingleMss[0]?.workOrderTask?.assetTaskType?.assetId?.name}`
                  : "N/A"}
              </h1>
            )}
          
            <span className=" text-dashText dark:text-white text-sm">
            {allSingleMss[0]?.workOrderTask?.assetTaskType?.cleaningType?.name}
            </span>
          </div>
        </header>
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 lg:px-10 px-5 w-full">
          <ViewSingleMssTable
            data={allSingleMss}
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

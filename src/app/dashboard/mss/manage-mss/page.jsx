"use client";

import Spinner from "@/components/loaders/Loader";
import ManageMssTable from "@/components/mss/ManageMssTable";
import MssHeader from "@/components/mss/MssHeader";
import ViewMssTable from "@/components/mss/ViewMssTable";
import WorkOrderHeader from "@/components/work-order/WorkOrderHeader";
import WorkOrderTabs from "@/components/work-order/WorkOrderTabs";
import useTask from "@/hooks/useTask";
import useWorkOrder from "@/hooks/useWorkOrder";
import React, { Suspense, useEffect } from "react";


const ManageMss = () => {
  const { loading, getAllWorkOrders, allWorkOrders } = useWorkOrder();
  const { allTasks, getAllTasks } = useTask();

  useEffect(() => {
    getAllWorkOrders();
    getAllTasks();
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="text-black bg-white dark:bg-slate-900 h-screen flex flex-col space-y-3 w-full">
        <MssHeader 
        manageMssScreen={true}
        viewMssScreen={false}
        />
        <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 lg:px-10 px-5 w-full">
          {loading && (
            <div class=" lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
              <div className="animate-pulse flex flex-col space-x-4">
                <div className="grid  grid-cols-3  animate-pulse w-full mt-10">
                  <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                  <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
                  <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
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
          )}
         <ManageMssTable/>
        </div>
      </div>
    </Suspense>
  );
};

export default ManageMss;

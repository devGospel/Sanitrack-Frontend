"use client";
import ViewTrainingTable from "@/components/lms/trainings/ViewTrainingTable";
import Spinner from "@/components/loaders/Loader";
import useResources from "@/hooks/useResource";
import useTraining from "@/hooks/useTraining";
import { useParams, usePathname } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const ViewTrainingPage = () => {
  const path = usePathname();


  const {
    getSingleStaffTraining,
    singleStaffTraining,
    loading,
    getIndividualsForTraining,
    singleIndividualForTraining,
  } = useTraining();
  useEffect(() => {
    getSingleStaffTraining();
    getIndividualsForTraining();
  }, []);


  return (
    <Suspense fallback={<Spinner />}>
      <div className="text-black flex flex-col bg-white h-screen w-full">
        {loading ? (
          <div class="border border-blue-300 lg:mt-10 mt-5 shadow rounded-md px-4 lg:px-20  w-full mx-auto">
            <div className="animate-pulse flex flex-col space-x-4">
              <div className="grid grid-cols-1 gap-4 animate-pulse w-full">
                <div className="rounded-sm bg-slate-300 h-60 w-auto"></div>
              </div>
              {/* <div className="grid  grid-cols-2  animate-pulse w-full mt-10">
                  <div className="rounded-sm bg-slate-300 h-12 w-auto"></div>
                  <div className="rounded-sm bg-slate-700 h-12 w-auto"></div>
                </div> */}
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
          <ViewTrainingTable
            data={singleStaffTraining}
            singleData={singleIndividualForTraining}
          />
        )}
      </div>
    </Suspense>
  );
};

export default ViewTrainingPage;

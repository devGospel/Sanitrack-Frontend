"use client";
import FacilityHeader from "@/components/facility-mgt/FacilityHeader";
import FacilityTabs from "@/components/facility-mgt/FacilityTabs";
import LmsHeader from "@/components/lms/LmsHeader";
import OverviewCards from "@/components/lms/OverviewCards";
import Tabs from "@/components/lms/Tabs";
import Spinner from "@/components/loaders/Loader";
import useResources from "@/hooks/useResource";
import useTraining from "@/hooks/useTraining";
import { Suspense, useEffect } from "react";


const FacilityManageMent = () => {
  
  return (
    <div className="text-black  bg-white dark:bg-slate-900  h-screen w-full">
      <Suspense fallback={<Spinner />}>
        {" "}
        <FacilityHeader />
      </Suspense>

      <>
       
          <div className="text-black flex flex-col gap-4  bg-white dark:bg-slate-900  lg:px-10 p-5 w-full">
            <Suspense fallback={<Spinner />}>
              <FacilityTabs
                data={[]}
                trainingData={[]}
                loading={false}
                resourceData={[]}
              />
            </Suspense>
          </div>
   
      </>
    </div>
  );
};

export default FacilityManageMent;

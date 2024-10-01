"use client";
import DairyTable from "@/components/diary_report/DairyTable";
import Header from "@/components/diary_report/Header";
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
      <Header />

      <>
        <div className="text-black flex flex-col gap-4  bg-white dark:bg-slate-900  lg:px-10 p-5 w-full">
          <DairyTable />
        </div>
      </>
    </div>
  );
};

export default FacilityManageMent;

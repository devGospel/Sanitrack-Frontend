"use client";
import CertificationTable from "@/components/certifications/CertificationTable";
import Header from "@/components/certifications/Header";
import { useSelector } from "react-redux";




const FacilityManageMent = () => {

  return (
    <div className="text-black  bg-white dark:bg-slate-900  h-screen w-full">
      <Header />

      <>
        <div className="text-black flex flex-col gap-4  bg-white dark:bg-slate-900  lg:px-10 p-5 w-full">
          <CertificationTable />
        </div>
      </>
    </div>
  );
};

export default FacilityManageMent;

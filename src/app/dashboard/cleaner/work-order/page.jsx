"use client";
import OverviewCards from "@/components/cleaner/work-order/OverviewCards";
import Spinner from "@/components/loaders/Loader";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";

const InspectorWorkOrder = () => {
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const { isLoading, data } = useFetch(
    `cleaner/?facilityId=${selectedFacilityId}`
  );
  const newRole =
  typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";

  const facId =
  typeof window !== "undefined" ? localStorage.getItem("hasFacility") : null;
  const router = useRouter();

  useEffect(() => {
  if (!facId ) {
      if(newRole?.toLocaleLowerCase() !== 'admin'){
        router.push("/dashboard/empty");
      }
    
    }
  }, []);
  return (
    <div className="text-black  bg-white dark:bg-slate-900 h-screen w-full py-4">
      <>
        {isLoading ? (
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
          <div className="text-black flex flex-col gap-4  dark:bg-slate-900 bg-white lg:px-10 px-5 w-full">
            <OverviewCards />
            <h1 className="font-serif mb-4 text-slate-950 dark:text-white text-2xl mt-5 lg:mt-10">
              Below are the rooms for today’s tasks
            </h1>
            <Suspense fallback={<Spinner />}>
              {data?.length === 0 ? (
                <div className="flex  justify-center  w-full pt-5">
                  <p className="text-red-500 font-serif text-xl">
                    No data available
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center mb-3 gap-4 ">
                  {data?.map((task) => {
                    return (
                      <Link
                        key={task?.roomId?._id}
                        href={`/dashboard/cleaner/work-order/${task?.roomId?._id}`}
                        className="flex flex-col border w-full lg:w-[48%] px-4 py-2 gap-1 bg-base-50 dark:bg-sanBlue rounded hover:dark:bg-black shadow-lg hover:bg-sanBlue hover:dark:text-white text-black hover:text-white dark:text-slate-50"
                      >
                        <h1 className="font-semibold">
                          {task?.roomId?.roomName}
                        </h1>
                        <p className="text-sm font-extralight dark:text-slate-50">
                        
                          {`${task?.roomId?.roomPrefix}${ task?.roomId?.roomCode}`}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </Suspense>
          </div>
        )}
      </>
    </div>
  );
};

export default InspectorWorkOrder;

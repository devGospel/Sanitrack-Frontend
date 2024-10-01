"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function TopLayout({
  path,
  hideBtn,
  heading,
  paragraph,
  title,
  isManager,
  btn,
}) {
  const router = useRouter();
  const handlePathsName = () => {
    router.push(path);
  };
  return (
    <div className="flex-1 w-full px-4">
      <div className="flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center">
        <div>
          <h1 className="text-black dark:text-white lg:text-2xl font-semibold capitalize">
            {heading}
          </h1>
          <p className="text-dashText dark:text-white  text-sm">{paragraph}</p>
        </div>
        {btn && <div>{btn}</div>}
        {!isManager && (
          <div>
            {path && (
              <button
                className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
                onClick={handlePathsName}
              >
                {title}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

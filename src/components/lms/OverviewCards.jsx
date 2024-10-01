import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdDocumentScanner } from "react-icons/md";

const data = [
  {
    icon: "/frame1.svg",
    label: "NUMBER OF CREATED TRAININGS",
    count: "150",
    iconBg: "bg-green-100",
    countColor: "text-green-400",
    link: "/dashboard/lms/view-training",
  },
  {
    icon: "/frame2.svg",
    label: "NUMBER OF COMPLETED TRAININGS",
    count: "120",
    iconBg: "bg-yellow-100",
    countColor: "text-yellow-400",
    link: "/dashboard/lms/view-training",
  },
  {
    icon: "/frame3.svg",
    label: "NUMBER OF PENDING TRAININGS",
    count: "30",
    iconBg: "bg-red-100",
    countColor: "text-red-400",
    link: "/dashboard/lms/view-training",
  },
];

const OverviewCards = ({ data }) => {
  return (
    <div className="flex flex-col lg:flex-row  justify-between gap-6 mb-5">
      <Link
        href={"/dashboard/lms/view-training"}
        className=" w-full flex flex-col items-center gap-2 p-2  hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] rounded-[30px]"
      >
        <div className={`bg-green-100 text-green-400 p-2  rounded-md`}>
          <Image
            height={1000}
            width={1000}
            src={"/frame1.svg"}
            alt="uploadImage"
            className="w-[40px] h-[40px] object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm">
          NUMBER OF CREATED TRAININGS
        </div>
        <div className={`text-green-400 font-bold`}>
          {data?.createdTrainingsCount}
        </div>
      </Link>
      <Link
        href={"/dashboard/lms/view-training"}
        className=" w-full flex flex-col items-center gap-2 p-2  hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] rounded-[30px]"
      >
        <div className={`bg-yellow-100 text-yellow-400 p-2  rounded-md`}>
          <Image
            height={1000}
            width={1000}
            src={"/frame2.svg"}
            alt="uploadImage"
            className="w-[40px] h-[40px] object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm">TOTAL TEAMS ENROLLED</div>
        <div className={`text-yellow-400 font-bold`}>
          {data?.totalTeamsEnrolled}
        </div>
      </Link>
      <Link
        href={"/dashboard/lms/view-training"}
        className=" w-full flex flex-col items-center gap-2 p-2  hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] rounded-[30px]"
      >
        <div className={`bg-red-100 text-red-400 p-2  rounded-md`}>
          <Image
            height={1000}
            width={1000}
            src={"/frame3.svg"}
            alt="uploadImage"
            className="w-[40px] h-[40px] object-cover rounded-lg"
          />
        </div>
        <div className=" text-dashText uppercase text-center text-sm">
          AVEREAGE COMPLETION RATE
        </div>
        <div
          className={`text-red-400 font-bold`}
        >{`${data?.averageCompletionRate}%`}</div>
      </Link>
    </div>
  );
};

export default OverviewCards;

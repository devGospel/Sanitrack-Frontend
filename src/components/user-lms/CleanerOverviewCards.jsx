"use client"

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';


const CleanerOverviewCards = ({allUserTraining}) => {
  const data = [
    {
      icon: "/frame1.svg",
      label: "ENROLLED TRAININGS",
      count: allUserTraining?.enrolledTrainingsCount,
      iconBg: "bg-green-100",
      countColor: "text-green-400",
      status: null, // No status, shows all
    },
    {
      icon: "/frame2.svg",
      label: "COMPLETED TRAININGS",
      count: allUserTraining?.completedTrainingsCount,
      iconBg: "bg-yellow-100",
      countColor: "text-yellow-400",
      status: "completed",
    },
    {
      icon: "/frame3.svg",
      label: "PENDING TRAININGS",
      count: allUserTraining?.pendingTrainingsCount,
      iconBg: "bg-red-100",
      countColor: "text-red-400",
      status: "pending",
    },
    {
      icon: "/frame3.svg",
      label: "AVERAGE ASSESSMENT PERFORMANCE",
      count: allUserTraining?.averageCompletionRate,
      iconBg: "bg-red-100",
      countColor: "text-red-400",
      status: "average",
    },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCardClick = (status) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status) {
      newSearchParams.set('status', status);
    } else {
      newSearchParams.delete('status');
    }

    // Assuming `tab=training` is a required parameter in the URL
    if (!newSearchParams.get('tab')) {
      newSearchParams.set('tab', 'training');
    }

    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-6'>
      {data.map((item, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(item.status)}
          className="cursor-pointer w-full flex flex-col items-center gap-4 p-4 border border-gray-200 rounded-md"
        >
          <div className={`${item?.iconBg} ${item?.countColor} p-2 rounded-md`}>
            <Image
              height={1000}
              width={1000}
              src={item?.icon}
              alt='uploadImage'
              className="w-[40px] h-[40px] object-cover rounded-lg"
            />
          </div>
          <div className="text-[#595959] uppercase text-sm">{item.label}</div>
          <div className={`${item?.countColor} font-bold`}>{item.count}</div>
        </div>
      ))}
    </div>
  );
};

export default CleanerOverviewCards;

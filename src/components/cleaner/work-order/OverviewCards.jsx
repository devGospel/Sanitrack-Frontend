import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdDocumentScanner } from 'react-icons/md';

const data = [
  {
    icon: '/frame1.svg',
    label: 'NUMBER OF ACTIVE TASKS',
    count: '5',
    iconBg: 'bg-green-100',
    countColor: 'text-green-500',
    link: '/dashboard',
  },
  // {
  //   icon: '/frame2.svg',
  //   label: 'TOTAL FACILITIES CLEANED',
  //   count: '120',
  //   iconBg: 'bg-yellow-100',
  //   countColor: 'text-yellow-500',
  //   link: '/dashboard',
  // },
  {
    icon: '/frame3.svg',
    label: 'NUMBER OF PENDING TRAININGS',
    count: '30',
    iconBg: 'bg-red-100',
    countColor: 'text-red-400',
    link: '/dashboard',
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
    {data?.map((card, i) => {
     const { iconBg, icon, countColor, count, label } = card;
     return (
       <Link
       href={card?.link}
       className=" w-full flex flex-col items-center gap-2 p-2 bg-white dark:bg-black hover:bg-white shadow-[5px_5px_0px_0px_#DADFFF] dark:shadow-[5px_5px_0px_0px_#5B5BE3] rounded-[30px]"
     >
       <div className={`${iconBg} ${countColor}  p-2  rounded-md`}>
         <Image
           height={500}
           width={500}
           src={icon}
           alt="uploadImage"
           className="w-6 h-6 object-cover rounded-lg"
         />
       </div>
       <div className=" text-dashText uppercase text-center text-sm dark:text-white">
       {label}
       </div>
       <div className={`text-blue-500 font-bold`}>{`${count}%`}</div>
     </Link>
     );
   })}

   </div>
  );
};

export default OverviewCards;

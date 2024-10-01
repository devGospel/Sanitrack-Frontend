'use client'

import Link from 'next/link'
import React from 'react'

export default function TaskListHeader({ path, hideBtn, heading, paragraph, title,  }) {
    return (
        <div className='flex-1 w-full px-4'>
            <div className='flex  justify-between flex-col md:flex-row space-y-4 md:space-y-0 w-full py-2 md:items-center'>
                <div>
                    <h1 className='text-black lg:text-2xl font-semibold'>{heading}</h1>
                    <p className='text-dashText text-sm'>{paragraph}</p>
                </div>
                <div>
                    <Link href={path}     className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm"
      >{title}</Link>
                </div>
            </div>
        </div>
    )
}

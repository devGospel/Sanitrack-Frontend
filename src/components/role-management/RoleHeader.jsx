"use client"

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const RoleHeader = () => {
  const params = useSearchParams()

  const tab = params.get("tab")
console.log(tab)
  return (
    <div className=' flex justify-between items-center flex-col lg:flex-row bg-white p-10'>

        <div className=' flex flex-col gap-2'>
        <h1 className=' text-black lg:text-2xl font-semibold'>Role managements</h1>
        <span className=' text-dashText text-sm'>Administer and oversee user accounts and privileges within the platform.</span>
        </div>

        {
         ( tab=== "roles" || tab === null) && 
          <Suspense fallback={"Loading"}>
            <Link href={"/dashboard/role-management/add-user-role"}     className=" p-2 bg-[#fff] text-dashText shadow-[5px_5px_0px_0px_#DADFFF] border-2 border-gray-200 rounded-md text-sm">
            Add User Roles
            </Link>
          </Suspense>
        }

        {
          tab==="permissions" && 
          <Suspense fallback={"Loading"}>
            <Link href={"/dashboard/role-management/add-user-permission"}       >
            Add User Permissions
            </Link>
          </Suspense>
        }

    </div>
  )
}

export default RoleHeader
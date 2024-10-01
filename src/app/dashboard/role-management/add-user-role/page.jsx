import AddUserRoleForm from '@/components/role-management/user-roles/AddUserRoleForm'
import React, { Suspense } from 'react'

const AddUserRole = () => {
  return (
    <Suspense fallback={"Loading"}>
    <div className="text-black flex flex-col  bg-white  h-screen w-full">
        <AddUserRoleForm/>
    </div>
    </Suspense>
  )
}

export default AddUserRole
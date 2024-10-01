import AddUserPermissionForm from '@/components/role-management/user-permissions/AddUserPermissionForm'
import React, { Suspense } from 'react'

const AddUserPermission = () => {
  return (
    <Suspense fallback={"Loading"}>
    <div className="text-black flex flex-col  bg-white  h-screen w-full">
        <AddUserPermissionForm/>
    </div>
    </Suspense>
  )
}

export default AddUserPermission
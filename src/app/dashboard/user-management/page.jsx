
import UserManagement from '@/components/user-management/users'
import React, { Suspense } from 'react'

export default function UserPage() {

  return (
    <Suspense fallback={"Loading"}>
      <UserManagement />
    </Suspense>
  )
}

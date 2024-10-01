"use client"

import Spinner from '@/components/loaders/Loader'
import EditTask from '@/components/task-list/EditTask'
import React, { Suspense } from 'react'

const EditTaskPage = () => {
  
  return (
    <Suspense fallback={<Spinner />}>
      <EditTask  />
    </Suspense>
  )
}

export default EditTaskPage
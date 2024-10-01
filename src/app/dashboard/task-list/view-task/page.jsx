"use client"

import Spinner from '@/components/loaders/Loader'
import ViewTask from '@/components/task-list/ViewTask'
import React, { Suspense } from 'react'

const ViewTaskPage = () => {

  
  return (
    <Suspense fallback={<Spinner />}>
      <div className=' min-h-full w-full max-w-5xl mx-auto mb-8'>
        <ViewTask />
      </div>
    </Suspense>
  )
}

export default ViewTaskPage
import Spinner from '@/components/loaders/Loader'
import CreateTask from '@/components/task-list/CreateTask'
import React, { Suspense } from 'react'

const CreateTaskPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <CreateTask />
    </Suspense>
  )
}

export default CreateTaskPage
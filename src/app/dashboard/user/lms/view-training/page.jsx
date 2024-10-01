import ViewTrainingData from '@/components/user-lms/trainings/ViewTrainingData'
import React, { Suspense } from 'react'

const ViewTraining = () => {
  return (
    <Suspense fallback={"Loading"}>
    <div className="text-black flex flex-col bg-white h-screen w-full">
      <ViewTrainingData />
    </div>
    </Suspense>
  )
}

export default ViewTraining
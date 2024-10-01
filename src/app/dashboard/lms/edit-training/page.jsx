import EditTrainingForm from '@/components/lms/trainings/EditTrainingForm'
import React, { Suspense } from 'react'

const EditTraining = () => {
  return (
    <Suspense fallback={"Loading"}>
    <div className="text-black flex flex-col bg-white h-screen w-full">
        <EditTrainingForm />
    </div>
    </Suspense>

  )
}

export default EditTraining
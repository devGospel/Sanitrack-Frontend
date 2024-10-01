import CreateTrainingForm from '@/components/lms/trainings/CreateTrainingForm'
import React, { Suspense } from 'react'

const CreateTraining = () => {
  return (
   
    <div className="text-black flex flex-col  bg-white  h-screen w-full">
        <CreateTrainingForm />
    </div>
  

  )
}

export default CreateTraining
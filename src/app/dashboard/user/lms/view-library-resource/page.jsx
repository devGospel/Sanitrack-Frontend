import ViewLibraryData from '@/components/user-lms/library-resource/ViewLibraryData'
import React, { Suspense } from 'react'

const ViewTraining = () => {
  return (
    <Suspense fallback={"Loading"}>
    <div className="text-black flex flex-col bg-white h-screen w-full">
      <ViewLibraryData />
    </div>
    </Suspense>
  )
}

export default ViewTraining
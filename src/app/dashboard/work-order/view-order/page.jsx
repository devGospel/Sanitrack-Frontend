import Spinner from '@/components/loaders/Loader'
import ViewWorkOrder from '@/components/work-order/ViewWorkOrder'
import WorkOrderHeader from '@/components/work-order/WorkOrderHeader'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div className='min-h-screen h-fit bg-white w-full space-y-3 flex flex-col px-4 sm:px-6 lg:px-8 py-8'>
        <WorkOrderHeader />

        <div>
          <ViewWorkOrder />
        </div>
      </div>
    </Suspense>
  )
}

export default Page

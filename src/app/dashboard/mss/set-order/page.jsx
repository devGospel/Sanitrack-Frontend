import Spinner from '@/components/loaders/Loader'
import SetOrderHeader from '@/components/mss/SetOrderHeader'
import SetGroupOrder from '@/components/work-order/SetGroupOrder'
import WorkOrderHeader from '@/components/work-order/WorkOrderHeader'
import React, { Suspense } from 'react'

const Page = () => {
  return (
    <>
      <div className='min-h-screen h-fit bg-white dark:bg-slate-900 w-full space-y-3 flex flex-col'>
        <SetOrderHeader />

        <div className=''>
          <SetGroupOrder />
        </div>
      </div>
    </>
  )
}

export default Page

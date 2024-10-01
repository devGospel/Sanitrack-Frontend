import React, { useEffect } from 'react'
import OverviewCards from './OverviewCards'
import useStats from '@/hooks/useStats'
import OverviewCharts from './OverviewCharts'
import OverviewFacCharts from './OverviewChartsFac'


const FacilityOverview = () => {
  const {getCleanerSummary,loading,cleanerSummary,getFacilOverview,fac}=useStats()
  useEffect(()=>{
getCleanerSummary()
getFacilOverview()
  },[])
  console.log("clean",fac)
  return (
    <>
    <OverviewCards data={[]}/>
    <div className='w-full'>
    <OverviewCharts cleaningData={cleanerSummary}/>
    {/* <OverviewFacCharts cleaningData={fac}/> */}
    </div>

    </>
  )
}

export default FacilityOverview
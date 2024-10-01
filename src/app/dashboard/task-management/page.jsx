"use client"


import TaskTable from '@/components/task-management/TaskTable'
import useTask from '@/hooks/useTask'
import React, { useEffect } from 'react'

const TaskManagement = () => {
  const {allAssetTasks, getAllAssetTasks, loading} = useTask()

  useEffect(() => {
      getAllAssetTasks()
  }, [])
  return (
    <>
      <TaskTable data={allAssetTasks} loading={loading} />
    </>
  )
}

export default TaskManagement
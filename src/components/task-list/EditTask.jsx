import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TaskListHeader from './TaskListHeader';
import BackButton from '../BackButton';
import Spinner from '../loaders/Loader';
import { useSearchParams } from 'next/navigation';

const EditTask = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  const params = useSearchParams()
  const taskId = params.get("id")


  const proposedSingleTaskData =  { id: 1, name: "Mopping Stick", creator:"Admin", date:"22 - 05 - 2024", description:"To classify all brown colored chairs" }

  useEffect(() => {
    // Fetch task details to pre-fill the form
    axios.get(`/api/tasks/${taskId}`)
      .then(response => {
        const task = response.data;
        setValue('taskName', task.taskName);
        setValue('taskDescription', task.taskDescription);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
        setLoading(false);
      });
  }, [taskId, setValue]);

  const onSubmit = (data) => {
    axios.put(`/api/tasks/${taskId}`, data)
      .then(response => console.log('Task updated:', response.data))
      .catch(error => console.error('Error updating task:', error));
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='w-full flex flex-col gap-4 max-w-5xl mx-auto h-screen '>
      <div className=' w-full flex flex-col no-scrollbar px-4 sm:px-6 py-2'>
        <TaskListHeader hideBtn={true} heading={"Task List"} paragraph={"Manage, create and oversee task list management within the system."} title="Edit Task" path={"/dashboard/task-list/edit-task"} />
      </div>

      {
        loading && (
          <div className='lg:px-10 px-5 max-md:w-full w-2/3 self-center'>
            <Spinner />
          </div>
        )
      }
      <div className="flex w-full lg:w-3/5  justify-between lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">Edit Task</h2>
      </div>

      <div className='lg:px-10 px-5 max-md:w-full w-2/3 self-center'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              {...register('taskName', { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-sm p-3 outline-none ring-1 ring-gray-100"
            />
          </div>
          <div>
            <label className="block text-s font-medium text-gray-700">Description</label>
            <textarea
              {...register('taskDescription', { required: true })}
              className="mt-1 block w-full min-h-[100px] px-4 py-2 border-gray-300 rounded-sm shadow-s outline-none ring-1 ring-gray-100"
            />
          </div>
          <button type="submit" className=" bg-sanBlue text-white py-4 px-4 rounded-sm">
          Edit Items in List
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;

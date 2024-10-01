import Spinner from '@/components/loaders/Loader'
import React from 'react'

const DeleteRoomModal = ({closeModalDel, currentUserId, loading, handleDeleteRole}) => {
  return (
    <div>
        <div className='p-4 flex flex-col'>
            <h1 className='text-red-500 text-xl font-semibold'>Delete?</h1>
            <h1 className='text-sm py-2'>Are You sure u want to delete this Faclitity {currentUserId} ? This action cannot be undone</h1>
            <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                type="button"
                onClick={closeModalDel}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                disabled={loading}
                onClick={handleDeleteRole}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                {loading ? <Spinner /> : "Delete"}
              </button>
            </span>
          </div>
        </div>
    </div>
  )
}

export default DeleteRoomModal
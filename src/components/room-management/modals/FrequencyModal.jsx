import React from 'react'

const FrequencyModal = ({currentUserId}) => {
  return (
    <div>
         <form action="" className='flex flex-col gap-2 p-4'>
            <h1 className='text-blue-400 font-medium'>Add Room Frequency {currentUserId}</h1>
            <select name="frequency" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                <option className='my-2' value="">Daily 1</option>
                <option className='my-2' value="">Weekly 2</option>
                <option className='my-2' value="">Monthly 3</option>
                <option className='my-2' value="">Yearly 3</option>
            </select>
            <button className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>Submit</button>
        </form>
    </div>
  )
}

export default FrequencyModal
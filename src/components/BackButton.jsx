'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'


const BackButton = () => {
  const router = useRouter()
 
  return (
   
      <button
        className='bg-transparent p-1 hover:bg-gray-100 hover:dark:bg-black rounded-full transition-all cursor-pointer' 
        onClick={() => router.back()}
      >
          <BiArrowBack className=' text-2xl text-gray-600 hover:dark:text-white' />
     </button>
  )
}

export default BackButton
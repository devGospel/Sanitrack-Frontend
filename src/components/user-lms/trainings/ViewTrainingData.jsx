"use client"

import React, { useEffect, useState } from 'react';

import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';
import useTraining from '@/hooks/useTraining';

const ViewTrainingData = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { getSingleUserTraining, singleUserTraining, loading } = useTraining();

  useEffect(() => {
    if (id) {
      getSingleUserTraining(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }



  if (!singleUserTraining) {
    return <p>No training data available</p>;
  }

  return (
    <>
      <div className='flex w-full lg:w-3/5 justify-between mt-6 lg:mt-12 lg:px-10 px-5'>
        <BackButton />
        <h2 className="text-xl lg:text-2xl font-bold">View Training</h2>
      </div>

      <div className="text-black grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 ring-1 ring-blue-200 rounded-md bg-white lg:p-10 p-5 mt-6 lg:mt-12 lg:mx-12 mx-5">
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Name of Training</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.name || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Team Name</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.teamName || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Date</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.date || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Facility Name</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.facilityName || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Library Resources</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.libraryResources || 'N/A'}</p>
        </div>
        <div className='flex flex-col gap-3 border-b border-b-gray-400 py-2'>
          <span className='text-gray-500 text-lg'>Time</span>
          <p className='text-gray-800 text-2xl'>{singleUserTraining.time || 'N/A'}</p>
        </div>
      </div>
    </>
  );
};

export default ViewTrainingData;

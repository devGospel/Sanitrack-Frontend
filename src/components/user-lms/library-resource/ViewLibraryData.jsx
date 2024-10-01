"use client"

import React, { useEffect, useState } from 'react';

import BackButton from '@/components/BackButton';
import { useSearchParams } from 'next/navigation';
import useTraining from '@/hooks/useTraining';

const ViewLibraryData = () => {
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
      <div className='flex w-full lg:w-4/5 justify-between mt-6 lg:mt-12 lg:px-10 px-5'>
        <BackButton />
        <h2 className="text-xl lg:text-2xl font-bold">Investing in Stocks: The Complete Beginners Course</h2>
      </div>

      <div className="text-black  gap-6 lg:gap-16 ring- ring-blue-200 rounded-md bg-white lg:p-10 p-5 mt-6 lg:mt-12 lg:mx-12 mx-5">
      <div className="w-full h-auto lg:h-[600px]">
          {/* <video
            className="w-full h-full border-2 border-black rounded-lg shadow-lg"
            controls
            src="https://www.youtube.com/watch?v=pwvGxJwPuoQ"
            poster="/lib-resou-img.png"
          >
            Your browser does not support the video tag.
          </video> */}


            <iframe
            className="w-full h-full border-2 border-black rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/J3fAI3al08Q"
            // src="https://www.youtube.com/embed/pwvGxJwPuoQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
           ></iframe>
        </div>
      </div>
    </>
  );
};

export default ViewLibraryData;

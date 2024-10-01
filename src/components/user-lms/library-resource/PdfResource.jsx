import BackButton from '@/components/BackButton'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PdfResource = () => {
  return (
    <div className="text-black flex flex-col bg-white h-screen w-full">
      <div className='flex w-full lg:w-4/5 justify-between mt-6 lg:mt-12 lg:px-10 px-5'>
        <BackButton />
        <h2 className="text-xl lg:text-2xl font-bold">Investing in Stocks: The Complete Beginners Course</h2>
      </div>

      <div className="text-black flex flex-col items-center   gap-6 lg:gap-16  rounded-md bg-white lg:p-10 p-5 mt-6 lg:mt-12 lg:mx-12 mx-5">
        <Image src={"/note1.png"} height={1000} width={1000} alt='Pdf-note' className=' h-[130px] w-[130px]' />
        <Link href={"/dashboard/user/lms/pdf-resource/view-pdf"} className=' text-blue-600 font-bold text-2xl'>Download PDF</Link>
      </div>

    </div>
  )
}

export default PdfResource
import Image from 'next/image'
import React from 'react'

const data = [
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
    {img:"/lib-resou-img.png", label:"Title of Resource"},
]

const LibraryResourceTabContent = ({newData}) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {
            newData?.map((d, idx) => (
                <div key={idx} className="bg-white border-b border-b-gray-300 shadow-[3px_2px_23px_2px_#4299e1] overflow-hidden transform transition-transform hover:scale-105">
                    <Image  src={d?.thumbnailUrl} height={1000} width={1000} alt={d?.title} className="w-full h-48 object-cover  rounded-lg"/>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-[#3478F3]">{d?.title ?? d?.resourceTitle}</h3>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default LibraryResourceTabContent

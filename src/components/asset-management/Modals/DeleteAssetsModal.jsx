'use client'

import ModalComponent from '@/components/modals/Modal'
import React from 'react'

export default function DeleteAssetsModal({ isModalOpenDel, setIsModalOpenDel, closeModalDel, currentUserId }) {
    return (
        <>
            {isModalOpenDel && (
                <ModalComponent
                    isOpen={isModalOpenDel}
                    onClose={closeModalDel}
                    setIsModalOpen={setIsModalOpenDel}
                >
                    <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg text-center leading-6 font-bold text-gray-900">
                                        Delete Assets
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm leading-5 text-gray-500">
                                            Are You sure u want to delete this Assets {currentUserId} ? This action cannot be undone
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
                                    // onClick={handleDelete}
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                >
                                    Delete
                                </button>
                            </span>
                        </div>
                    </div>
                </ModalComponent>)}

        </>
    )
}

'use client'

import ModalComponent from '@/components/modals/Modal'
import React from 'react'

export default function EditAssetsInventory() {
    return (
        <>
            {InventoryModal && (
                <ModalComponent
                    isOpen={InventoryModal}
                    onClose={closeInventory}
                    setIsModalOpen={setInventoryModal}
                >
                    <div>
                        <form action="" className='flex flex-col gap-2 p-4'>
                            <h1 className='text-blue-400 font-medium'>Manage Inventory</h1>
                            <select name="inventory" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                                <option className='my-2' value="">Cleaning Tools</option>
                                <option className='my-2' value="">Weekly 2</option>
                            </select>
                            <select name="inventory" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                                <option className='my-2' value="">Chemical to use</option>
                                <option className='my-2' value="">Weekly 2</option>
                            </select>
                            <select name="inventory" className=' py-3 px-2 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                                <option className='my-2' value="">Safety Equpiment </option>
                                <option className='my-2' value="">Weekly 2</option>
                            </select>
                            <button className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>Add Inventory</button>
                        </form>
                    </div>
                </ModalComponent>)}
        </>
    )
}

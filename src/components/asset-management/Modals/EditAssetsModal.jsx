import ModalComponent from '@/components/modals/Modal'
import React from 'react'
import { useForm } from 'react-hook-form';

export default function EditAssetsModal({isModalOpenEdit, closeModalEdit, setIsModalOpenEdit}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    return (
        <>
            {isModalOpenEdit && (
                <ModalComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} setIsModalOpen={setIsModalOpenEdit}>
                    <form className='flex flex-col gap-2 p-4 bg-white w-full'>
                        <h1 className='text-blue-400 font-medium'>Edit Assets</h1>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                id='ts'
                                name="Name"
                                {...register("Name", { required: "name is required" })}
                                placeholder='Name'
                                className='p-3 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin' />
                            {errors.name && <p className='text-red-500 text-xs'>A name is required</p>}
                        </div>
                        <div>
                            <select name="facility" id="facility" {...register("facility", { required: "Please select a facility" })} className='p-3 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                                <option value='facility'>facility</option>
                                <option value='facility'>facility</option>
                                <option value='facility'>facility</option>
                            </select>
                            {errors.facility && <p className='text-red-500 text-xs'>Facility name is required</p>}
                        </div>
                        <div>
                            <select name="Room" id="Room" {...register("Room", { required: "Please select a Room" })} className='p-3 w-full my-2 rounded-md outline-none border border-gray-300 bg-white text-black font-thin'>
                                <option value='Room'>Room</option>
                                <option value='Room'>Room</option>
                                <option value='Room'>Room</option>
                            </select>
                            {errors.Room && <p className='text-red-500 text-xs'>Facility name is required</p>}
                        </div>
                        <button type="submit" className='bg-blue-500 text-center text-white p-3 rounded-md w-full my-2'>
                            Edit Assets
                        </button>

                    </form>
                </ModalComponent>
            )}
        </>
    )
}

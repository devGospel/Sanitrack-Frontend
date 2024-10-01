import React from 'react'
import ModalComponent from '../modals/Modal'

const TasksPopover = ({closeModal, open, setModalOpen}) => {
  return (
    <ModalComponent onClose={() => closeModal?.() || setModalOpen(false) || undefined} 
        isOpen={open}
        setIsModalOpen={setModalOpen}
    >
      <div className='flex flex-col gap-y-3 p-4 border-b border-sanGray rounded-lg'>
        <h2 className='text-xl font-semibold'>Assign tasks to users</h2>

        <div className='flex flex-col md:flex-row md:gap-x-5 justify-between space-y-2'>
            <div className='flex flex-col space-y-2'>
                <Select 
                    items={['Table Fan', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Table Fan'}
                />
                <Select 
                    items={['Table Fan', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Table Fan'}
                />
                <Select 
                    items={['Table Fan', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Table Fan'}
                />
                <Select 
                    items={['Table Fan', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Table Fan'}
                />
                <Select 
                    items={['Table Fan', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Table Fan'}
                />
            </div>
            <div className='flex flex-col space-y-2'>
                <Select 
                    items={['Air Conditioner', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Air Conditioner'}
                />
                <Select 
                    items={['Air Conditioner', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Air Conditioner'}
                />
                <Select 
                    items={['Air Conditioner', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Air Conditioner'}
                />
                <Select 
                    items={['Air Conditioner', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Air Conditioner'}
                />
                <Select 
                    items={['Air Conditioner', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Air Conditioner'}
                />
            </div>
            <div className='flex flex-col space-y-2'>
                <Select 
                    items={['Wall Art', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Wall Art'}
                />
                <Select 
                    items={['Wall Art', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Wall Art'}
                />
                <Select 
                    items={['Wall Art', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Wall Art'}
                />
                <Select 
                    items={['Wall Art', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Wall Art'}
                />
                <Select 
                    items={['Wall Art', 'Ayo', 'Odumesa', 'Nickel']}
                    defaultValue={'Wall Art'}
                />
            </div>
        </div>
        <button className='bg-sanBlue text-white px-6 py-3 border-none outline rounded-md focus-within:outline-none focus:outline-none min-w-[255px] max-w-[500px] my-3'>
            Save
        </button>
      </div>
    </ModalComponent>
  )
}

export default TasksPopover

const Select = ({items, label, defaultValue}) => {
    return (
        <div className='flex flex-col space-y-2'>
            {
                label && <label className='text-gray-500'>{ label }</label>
            }
            <select defaultValue={defaultValue ?? ''} className='border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400'>
                {
                    items?.map((item, index) => (
                        <option key={index} value={item} className='py-2 hover:bg-sanBlue hover:text-white'>
                            {item}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}
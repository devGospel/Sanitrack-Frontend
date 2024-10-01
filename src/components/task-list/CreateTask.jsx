"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import TaskListHeader from './TaskListHeader';
import BackButton from '../BackButton';



const DataTable = ({ title, data, selectedRooms, handleRoomSelection }) => (
  <div className='overflow-x-auto w-full  flex flex-col no-scrollbar  h-auto '>
      {/* <h1 className='font-bold'>{title}</h1> */}
      <table className="table-auto w-full leading-normal no-scrollbar overflow-scroll lg:overflow-hidden">
          <thead>
              <tr className="border-gray-200  whitespace-nowrap border-2 bg-white">
                  <th className="px-5 py-3 text-left text-sm font-bold text-black capitalize tracking-wider">
                  Room Name
                  </th>
                  <th className="px-5 py-3 text-right text-sm font-bold text-black capitalize tracking-wider">
                  Select
                  </th>
              </tr>
          </thead>
          <tbody className="[&>*:nth-child(odd)]:bg-sanLightBlue text-black [&>*:nth-child(even)]:text-black  [&>*:nth-child(even)]:bg-white shadow-lg w-full">
              {data?.map((table_data) => (
                  <tr key={table_data?._id} className="border-b border-gray-200 text-right whitespace-nowrap">
                      <td className="px-5 py-2   text-sm">
                          <div className='flex gap-2 items-center'>
                              <p>{table_data?.name}</p>
                          </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRooms.includes(table_data?.id)}
                              onChange={() => handleRoomSelection(table_data?.id)}
                              className=' h-4 w-4'
                            />
                        </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
);




const taskList = [
  { id: 1, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  { id: 2, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  { id: 3, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  { id: 4, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 5, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 6, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 7, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 8, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 9, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 10, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
  // { id: 11, name: "Noodle Production Room", creator:"Admin", date:"22 - 05 - 2024" },
 
];


const CreateTask = () => {
  const { register, handleSubmit } = useForm();
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [rooms, setRooms] = useState(taskList);
  const [showModal, setShowModal] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    // Fetch facilities
    axios.get('/api/facilities')
      .then(response => setFacilities(response.data))
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  const handleFacilityChange = (e) => {
    const facilityId = e.target.value;
    setSelectedFacility(facilityId);

    // Fetch rooms based on selected facility
    axios.get(`/api/rooms?facilityId=${facilityId}`)
      .then(response => setRooms(response.data))
      .catch(error => console.error('Error fetching rooms:', error));
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRooms(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      rooms: selectedRooms
    };

    console.log(payload)

    axios.post('/api/tasks', payload)
      .then(response => console.log('Task created:', response.data))
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div className='w-full flex flex-col gap-4 max-w-5xl mx-auto h-screen'>
      <div className='w-full flex flex-col no-scrollbar px-4 sm:px-6 py-2'>
        <TaskListHeader hideBtn={true} heading={"Task List"} paragraph={"Manage, create and oversee task list management within the system."} title="Create New List" path={"/dashboard/task-list/create-task"} />
      </div>
      <div className="flex w-full lg:w-3/5 justify-between lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">Create Task List</h2>
      </div>
      <div className='lg:px-10 px-5 max-md:w-full w-2/3 self-center'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task List Name</label>
            <input
              {...register('taskName', { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-sm p-3 outline-none ring-1 ring-gray-100 "
            />
          </div>
          <div>
            <label className="block text-s font-medium text-gray-700">Description Purpose of List</label>
            <textarea
              {...register('taskDescription', { required: true })}
              className="mt-1 block w-full min-h-[100px] px-4 py-2 border-gray-300 rounded-sm shadow-s outline-none ring-1 ring-gray-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-600 py-4 px-4 rounded-sm ring-1 ring-blue-500"
          >
            Select From Assets
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white py-4 px-4 rounded-sm"
          >
            Select From Rooms
          </button>

          {/* <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
            Save Task
          </button> */}

        </form>
      </div>

      {showModal && (
        <div className="fixed z-50 my-5 mt-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold"></h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 text-lg hover:text-gray-600">&times;</button>
              </div>
              <div className="mt-4">
                <label className="block text-lg font-medium text-gray-700">Facility</label>
                <select
                  onChange={handleFacilityChange}
                  className="mt-1 block w-full border-gray-300  py-4 px-4 outline-none ring-1 ring-gray-300 rounded-sm"
                >
                  <option value="" className=' '>Select a facility</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id} >{facility.name}</option>
                  ))}
                </select>
              </div>

              {rooms.length > 0 && (
                <div className="mt-4">
                  <DataTable 
                    data={rooms} 
                    selectedRooms={selectedRooms}
                    handleRoomSelection={handleRoomSelection}
                    />
                </div>
              )}
              <div className="mt-4 flex justify-center">
                {/* <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Close
                </button> */}
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-blue-500 w-1/2 text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;


'use client';
import LocatinModal from '@/components/clock-in/LocationsModal';
import { useLocationsState } from '@/components/context/LocationsContext';
import ModalComponent from '@/components/modals/Modal';
import useClockIn from '@/hooks/useClockIn';
import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { Flip, ToastContainer, toast } from 'react-toastify';
export default function ClockIn() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const { modal } = useLocationsState();
  const [isModalOpen, setIsModalOpen] = useState(modal);
  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { clockIn, isLoading } = useClockIn();
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      toast.error('Geolocation is not supported by this browser.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip,
      });
    }
  };

  const showPosition = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        toast.error('Permission not granted', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Flip,
        });
        break;
      case error.POSITION_UNAVAILABLE:
      case error.PERMISSION_DENIED:
        toast.error('Location Unavailable', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Flip,
        });
        break;
      case error.TIMEOUT:
      case error.PERMISSION_DENIED:
        toast.error('Timed out', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Flip,
        });
        break;
      case error.UNKNOWN_ERROR:
        break;
      default:
        break;
    }
  };

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    getLocation();
    return () => clearInterval(interval);
  }, []);
  const handleClockIn = () => {
    if (location.latitude && location.longitude) {
      
      clockIn({
        longitude: location.latitude,
        latititude: location.longitude,
      });
    } else {
      toast.error('Please turn on your geolocation', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip,
      });
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full">
      <ToastContainer />
      <main className="flex-grow flex flex-col items-center justify-center w-[90%]">
        <button className="self-start mb-4 text-black hover:underline">
          &lt; Clock In
        </button>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full border border-[#0357EE]">
          <div className="flex flex-col items-center">
            <Clock size={300} value={currentTime} />
            <div className="mt-4 text-xl font-mono">{currentTime}</div>
            <button
              onClick={() => {
                handleClockIn();
              }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 w-[50%] my-[40px]">
              {isLoading ? (
                <div className="flex gap-x-2 justify-center items-center ">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4  text-gray-200 animate-spin  fill-Hwhite"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="text-white text-xs">Loading</span>
                </div>
              ) : (
                <p>Clock In</p>
              )}
            </button>
          </div>
        </div>
      </main>

      <ModalComponent
        isOpen={modal}
        onClose={closeModal}
        setIsModalOpen={setIsModalOpen}>
        <LocatinModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
}

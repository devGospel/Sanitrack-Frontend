import { useState } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { useAuthRolesState } from '@/components/context/AuthRolesContext';
import { toast, Flip } from 'react-toastify';
import { useLocationsState } from '@/components/context/LocationsContext';
// import { subscribeUser } from 'utils/subscription';

const useClockIn = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { setModal, setToken, setId, setLocations } = useLocationsState();
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const clockIn = async ({ latititude, longitude }) => {
   
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    // 9.07234808539435
    // 7.47799329496738
    try {
      const response = await axios.post(
        `${BASE_URL}staff-attendance/clock`,
        {
          lat: latititude,
          long: longitude,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': localStorage.getItem('i18nextLng'),
            Authorization: localStorage.getItem('auth-token'),
          },
        }
      );

      if (response.data.data.length) {
        setLocations(response.data.data);
        setModal(true);
      } else {
        toast.success('Attendance Taken Successfully', {
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
      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      toast.error(error?.response?.data?.message, {
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
      
    } finally {
      setIsLoading(false);
    }
  };

  const chooseLocation = async ({ selectedLocation }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}staff-attendance/select-facility`,
        {
          selectedFacility: selectedLocation,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': localStorage.getItem('i18nextLng'),
            Authorization: localStorage.getItem('auth-token'),
          },
        }
      );
      if (response.data?.status) {
        toast.success('Attendance Taken Successfully', {
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
        setModal(false);
      }

      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      toast.error(error?.response?.data?.message, {
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
      
    } finally {
      setIsLoading(false);
    }
  };
  return { clockIn, isLoading, chooseLocation };
};

export default useClockIn;

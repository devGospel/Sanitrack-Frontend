import { useState } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { useAuthRolesState } from '@/components/context/AuthRolesContext';
import { toast, Flip } from 'react-toastify';
import { useLocationsState } from '@/components/context/LocationsContext';
// import { subscribeUser } from 'utils/subscription';

const useAttendance = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { setModal, setToken, setId, setLocations } = useLocationsState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  // const navigate = useNavigate();
  // const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const getAttendance = async () => {
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}staff-attendance/`,

        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': localStorage.getItem('i18nextLng'),
            Authorization: localStorage.getItem('auth-token'),
          },
        }
      );
      if (response.data?.data?.length) {
        setData(response.data?.data);
      } else {
        setData([]);
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

  return { getAttendance, isLoading, data };
};

export default useAttendance;

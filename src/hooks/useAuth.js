import { useState } from "react";
import axios from "axios";
import JWT from "jsonwebtoken";
import { useAuthRolesState } from "@/components/context/AuthRolesContext";
import { toast, Flip } from "react-toastify";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearStoredWorkOrderDetails } from "@/redux/features/adminId/adminSlice";
import { clearFacilityDetails } from "@/redux/features/facility/facilitySlice";
// import { subscribeUser } from 'utils/subscription';

const useAuth = () => {
  const { setModal, setToken, setId, setRoles } = useAuthRolesState();
  const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
  const router = useRouter();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const login = async (email, password, setIsLoggedIn) => {
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage.getItem("i18nextLng"),
          },
        }
      );

      // subscribeUser(response.data.data.token);

      if (response?.data?.data?.requiredRoleSelection === true) {
        toast.success("Complete your login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
        window?.localStorage.setItem(
          "assignedRoles",
          response?.data?.data?.assignedRoles
        );

        setRoles(response?.data?.data?.assignedRoles);
        localStorage.setItem("modal", "modal");

        setModal(true);
        setToken(response?.data?.data?.token);
        setId(response?.data?.data?.userId);
      } else if (response?.data?.data?.requiredRoleSelection === false) {
        toast.success("Login Successful !!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });

        const JWT_KEY = process.env.REACT_APP_JWT_KEY;
        const decodedResponse = JWT.decode(
          response?.data?.data?.token,
          JWT_KEY
        );
        const loggedInUserRole = decodedResponse.role_id.role_name;

        // setCurrentRole(loggedInUserRole);

        // Set auth details in localStorage

        setCookie("sanitrack-auth-token", response?.data?.data?.token);
        setCookie("san-role", loggedInUserRole);
        window?.localStorage.setItem(
          "sanUser",
          JSON.stringify(response?.data?.data)
        );

        window?.localStorage.setItem("isLoggedIn", "true"); // Use to maintain session state
        window?.localStorage.setItem("auth-token", response?.data?.data?.token);
        window?.localStorage.setItem("name", response?.data?.data?.username);
        window?.localStorage.setItem("id", response?.data?.data?.userId);
        window?.localStorage.setItem("hasFacility", response?.data?.data?.hasFacility);
        window?.localStorage.setItem("role", loggedInUserRole);
        window?.localStorage.setItem(
          "facilityName",
          response?.data?.data?.facilityName
        );
        window?.localStorage.setItem(
          "facilityId",
          response?.data?.data?.facility
        );
        console.log("ndfn",response?.data?.data?.facility)
      
        window.location.reload();
        // localStorage.setItem('secret', response?.data?.data?.chat_engine_payload.first_name); // First name and secret were the same for testing purposes (Chat engine)
        setIsLoggedIn(true); // Update global state via context
      } // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simplify logout function for clarity
  const logout = () => {
    // Add setIsLoggedIn as parameter
   
      // make request to login logs endpoint
      dispatch(clearFacilityDetails());
      dispatch(clearStoredWorkOrderDetails());
  
      window?.localStorage.removeItem("sanUser");
      window?.localStorage.removeItem("isLoggedIn");
      window?.localStorage.removeItem("role");
      window?.localStorage.removeItem("auth-token");
      deleteCookie("sanitrack-auth-token");
      deleteCookie("san-role");
      router.push("/");
    
  };

  return { login, logout, isLoading };
};

export default useAuth;

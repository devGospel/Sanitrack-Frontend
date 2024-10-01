"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";

const useFacilities = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const [allFacilities, setAllFacilities] = useState([]);
  const [managerFacilities, setManagerFacilities] = useState([]);
  const [manFacilities, setManFacilities] = useState([]);
  const [singleFacility, setSingleFacility] = useState([]);
  const [allLocations, setLocations] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const router = useRouter();

  const getAllFacilities = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}locations/
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setAllFacilities(response.data.data.allLocations);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getSingleFacility = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}locations/single-location?locationId=${id}
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setSingleFacility(response?.data?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getFacilitiesForManager = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}locations/manager    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          // console.log(response.data)
          // console.log(JSON.stringify(response.data?.data.managerFacility?.assignedFacilities))
          setAllFacilities(response.data?.data.managerFacility?.assignedFacilities);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };

  const getManagerFacilities = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}locations/manager/
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setAllFacilities(
            response.data.data.managerFacility.assignedFacilities
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getAssignedFacilities = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}locations/staff-facility
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setManagerFacilities(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const addFacilities = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}locations/add`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Added Successfully", {
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
          setButtonLoader(false);
          setTimeout(() => {
            window.location.reload();
            // router.push("/dashboard/role-management?tab=roles");
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setButtonLoader(false);
          const { status, data } = error.response;
          toast.error(data.message, {
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
          if (status === 400 && data && data.message) {
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setLoading(false);
        }
      });
  };
  const assignFacilities = async (url, data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}locations/${url}`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Assigned Successfully", {
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
          setButtonLoader(false);
          setTimeout(() => {
            window.location.reload();
            // router.push("/dashboard/role-management?tab=roles");
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setButtonLoader(false);
          const { status, data } = error.response;
          toast.error(data.message, {
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
          if (status === 400 && data && data.message) {
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setLoading(false);
        }
      });
  };
  const editRole = async (data) => {
    setButtonLoader(true);
    await axios
      .put(`${baseUrl}roles/edit`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          toast.success("Edited Successfully", {
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
          setButtonLoader(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        setButtonLoader(false);
        const { status, data } = error.response;
        toast.error(data.message, {
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
        // handleError(error);
      });
  };

  const deleteRole = async (roleId) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}roles/delete?roleId=${roleId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Deleted Successfully", {
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
          setButtonLoader(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setButtonLoader(false);
          const { status, data } = error.response;
          toast.error(data.message, {
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
          if (status === 400 && data && data.message) {
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setLoading(false);
        }
      });
  };

  return {
    loading,
    buttonLoader,
    addFacilities,
    deleteRole,
    getAllFacilities,
    allFacilities,
    setAllFacilities,
    editRole,
    managerFacilities,
    getAssignedFacilities,
    getManagerFacilities,
    assignFacilities,
    getFacilitiesForManager,
    getSingleFacility,
    singleFacility
  };
};

export default useFacilities;

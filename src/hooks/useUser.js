"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useUser = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter()
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const [allUsers, setAllUsers] = useState([]);
  const [allTeams, setTeam] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [allAvailableTeams, setAvailableTeam] = useState([]);
  const [allAvailableCleaners, setAvailableCleaners] = useState([]);
  const [allAvailableInspectors, setAvailableInspectors] = useState([]);
  const [allLocations, setLocations] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const [allCleaners, setCleaners] = useState([]);
  const [allInspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const [allFacilityInspectors, setFacilityInspectors] = useState([])
  const [allFacilityCleaners, setFacilityCleaners] = useState([])
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getAllUsers = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}get-all-users?page=1&documentCount=25

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllUsers(response?.data?.data?.allUsers);
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
  const getSingleUser = async (name) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}staff?userName=${name}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setSingleUser(response.data.data);
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
  const addUser = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}create-user`, data, {
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
           router.push("/dashboard/user-management")
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

  const editUser = async (data) => {
    setButtonLoader(true);
    await axios
      .put(`${baseUrl}edit-profile`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
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

  //Cleaner

  const getTeams = async (facilityId) => {
    setLoading(true);
    let fullTeamsFullUrl
    if(facilityId){ 
      fullTeamsFullUrl = `${baseUrl}team/?facilityId=${facilityId}`
    }else{
      fullTeamsFullUrl = `${baseUrl}team/`
    }
    await axios.get(
        fullTeamsFullUrl,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setTeam(response.data.data);
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
  const getAvailableTeams = async (data, facilityId) => {
    setLoading(true);
    let fullAvailableTeamsUrl
    if(facilityId){ 
      fullAvailableTeamsUrl = `${baseUrl}work-order/teams?facilityId=${facilityId}&roomId=${data.roomId}&startHour=${data.startHour}`
    }else{ 
      fullAvailableTeamsUrl = `${baseUrl}work-order/teams?roomId=${data.roomId}&startHour=${data.startHour}`
    }
    await axios
      .get(
        `${fullAvailableTeamsUrl}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log(`requested team => ${response.data}`);
          setLoading(false);
          setAvailableTeam(response.data.data);
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

  const getAvailableCleaners = async (data, facilityId) => {
    setLoading(true);
    let fullAvailableCleanersUrls
    if(facilityId){ 
      fullAvailableCleanersUrls = `${baseUrl}work-order/cleaners?facilityId=${facilityId}&roomId=${data.roomId}&startHour=${data.startHour}`
    }else{ 
      fullAvailableCleanersUrls = `${baseUrl}work-order/cleaners?roomId=${data.roomId}&startHour=${data.startHour}`
    }
    await axios
      .get(
        `${fullAvailableCleanersUrls}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          console.log(`available cleaner => ${response.data.data}`)
          setAvailableCleaners(response.data.data);
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

  const getAvailableInspectors = async (data, facilityId) => {
    setLoading(true);
    let fullAvailableInspectorUrl
    if(facilityId){ 
      fullAvailableInspectorUrl = `${baseUrl}work-order/inspectors?facilityId=${facilityId}&roomId=${data.roomId}&startHour=${data.startHour}`
    }else{ 
      fullAvailableInspectorUrl = `${baseUrl}work-order/inspectors?roomId=${data.roomId}&startHour=${data.startHour}`
    }
    await axios
      .get(
        `${fullAvailableInspectorUrl}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          // console.log(`requested team => ${response.data}`)
          setLoading(false);
          setAvailableInspectors(response.data.data);
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

  const getLocations = async () => {
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
        if (response.data) {
          setLoading(false);
          setLocations(response.data.data.allLocations);
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

  const getCleaners = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}get-all-cleaner

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setCleaners(response.data.data.allCleaners);
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
  const getManagers = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}get-all-managers

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllManagers(response.data.data.allManagers);
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
  const getInspectors = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}get-all-inspector

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setInspectors(response.data.data.allInspectors);
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

  const getFacilityInspectors = async (facilityId) => { 
    setLoading(true);
    await axios
      .get(
        `${baseUrl}manager/inspectors?facilityId=${facilityId}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          console.log(`all facility inspector => ${response.data.data}`)
          setFacilityInspectors(response.data.data);
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
  }

  const getFacilityCleaners = async (facilityId) => { 
    setLoading(true);
    await axios
      .get(
        `${baseUrl}manager/cleaners?facilityId=${facilityId}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setFacilityCleaners(response.data.data);
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
  }
  return {
    singleUser,
    setSingleUser,
    getSingleUser,
    loading,
    buttonLoader,
    addUser,
    editUser,
    allUsers,
    setAllUsers,
    getAllUsers,
    allTeams,
    setTeam,
    getTeams,
    allLocations,
    getLocations,
    getInspectors,
    getCleaners,
    allCleaners,
    allInspectors,
    allAvailableTeams,
    getAvailableTeams,
    getAvailableInspectors,

    allAvailableInspectors, 
    getAvailableCleaners, 
    allAvailableCleaners,

    getFacilityInspectors, 
    allFacilityInspectors,
    getFacilityCleaners,
    allFacilityCleaners,

    getManagers,
    allManagers,

  };
};

export default useUser;

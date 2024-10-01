"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useTraining = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const id =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("singleId"))
      : null === "true";

  const [staffDashboardStats, setStaffDashboardStats] = useState({});
  const [allStaffTraining, setAllStaffTraining] = useState([]);
  const [allUserTraining, setAllUserTraining] = useState([]);
  const [singleStaffTraining, setSingleStaffTraining] = useState([]);
  const [singleIndividualForTraining, setIndividualForTraining] = useState([]);
  const [singleUserTraining, setSingleUserTraining] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const router = useRouter();
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getAllStaffTraining = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/all

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setAllStaffTraining(response.data.data);
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
  const getAllStaffDashboardStats = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/creator/dashboard

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setStaffDashboardStats(response.data.data);
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
  const getSingleStaffTraining = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/${id}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setSingleStaffTraining(response.data.data);
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
  const getIndividualsForTraining = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/${id}/individual/all

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setIndividualForTraining(response.data.data);
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
  const addTraining = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}training/create`, data, {
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
            router.push("/dashboard/lms");
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

  const editTraining = async (data) => {
    setButtonLoader(true);
    await axios
      .patch(`${baseUrl}training/${id}/update`, data, {
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

  const getAllUserTraining = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/user/dashboard

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setAllUserTraining(response.data.data);
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
  const getSingleUserTraining = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}training/${id}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         console.log(response)
          setLoading(false);
          setSingleUserTraining(response.data.data);
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
  return {
    singleStaffTraining,
    setSingleStaffTraining,
    getSingleStaffTraining,
    loading,
    buttonLoader,
    addTraining,
    editTraining,
    allStaffTraining,
    setAllStaffTraining,
    getAllStaffTraining,
    allUserTraining,
    setAllUserTraining,
    getAllUserTraining,
    getSingleUserTraining,
    singleUserTraining,
    setSingleUserTraining,
    staffDashboardStats,
    getAllStaffDashboardStats,
    getIndividualsForTraining,
    singleIndividualForTraining,
  };
};

export default useTraining;

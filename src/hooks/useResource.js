"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useResources = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const router = useRouter();
  const id =
  typeof window !== "undefined"
    ? localStorage.getItem("singleId")
    : null === "true";
  const [allStaffResources, setAllStaffResources] = useState([]);
  const [allUserResource, setAllUserResource] = useState([]);
  const [singleCourseResource, setSingleCourseResource] = useState([]);
  const [singleUserResource, setSingleUserResource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getAllStaffResources = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}library/resources/all

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
     
          setLoading(false);
          setAllStaffResources(response.data.data);
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
  const getResourceByCourse = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}library/${id}/all-resources

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setSingleCourseResource(response.data.data.allChemicalInventory);
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
  const addResource = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}library/resource/create`, data, {
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

  const editResource = async (data) => {
    setButtonLoader(true);
    await axios
      .patch(`${baseUrl}library/resource/${id}/update`, data, {
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

  //User

  const getAllUserResource = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}library/resource

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setAllUserResource(response.data.data);
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
  const getSingleUserResource = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}library/resource/${id}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
         
          setLoading(false);
          setSingleUserResource(response.data.data.allChemicalInventory);
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
    singleCourseResource,
    setSingleCourseResource,
    getResourceByCourse,
    loading,
    buttonLoader,
    addResource,
    editResource,
    allStaffResources,
    setAllStaffResources,
    getAllStaffResources,
    allUserResource,
    setAllUserResource,
    getAllUserResource,
    getSingleUserResource,
    singleUserResource,
    setSingleUserResource,
  };
};

export default useResources;

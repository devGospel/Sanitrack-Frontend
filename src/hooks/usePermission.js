"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";


const usePermission = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    //   const access_token = localStorage.getItem("auth-token");
    const [allPermission, setAllPermission] = useState([]);
    const [allTeams, setTeam] = useState([]);
    const [allLocations, setLocations] = useState([]);
    const [singleUser, setSingleUser] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const access_token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

      const router = useRouter()



      const getAllPermission = async () => {
        setLoading(true);
        await axios
          .get(
            `${baseUrl}permissions
    
          `,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          )
          .then((response) => {
            if (response.data) {
         
              setLoading(false);
              setAllPermission(response?.data?.data?.allPermissions
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



      const addPermission = async (data) => {
        setButtonLoader(true);
        await axios
          .post(`${baseUrl}permissions/add`, data, {
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
                router.push("/dashboard/role-management?tab=permissions")
                // window.location.reload();
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
      const deletePermission = async (Id) => {
        setButtonLoader(true);
        await axios
          .post(`${baseUrl}permission/delete?id=${Id}`, {
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


      const editPermission = async (data) => {
        setButtonLoader(true);
        await axios.put(`${baseUrl}permissions/edit`, data, {
            headers: { Authorization: `Bearer ${access_token}` },
        }).then((response) => {
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
        }).catch((error) => {
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


      return {
        loading,
        buttonLoader,
        addPermission,
        deletePermission,
        getAllPermission,
        allPermission,
        setAllPermission,
        editPermission
      };
 
}

export default usePermission
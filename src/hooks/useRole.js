"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";


const useRole = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    //   const access_token = localStorage.getItem("auth-token");
    const [allRoles, setAllRoles] = useState([]);
    const [allTeams, setTeam] = useState([]);
    const [allLocations, setLocations] = useState([]);
    const [singleUser, setSingleUser] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const access_token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;


      const router = useRouter()




      const getAllRoles = async () => {
        setLoading(true);
        await axios
          .get(
            `${baseUrl}roles
    
          `,
            {
              headers: { Authorization: `Bearer ${access_token}` },
            }
          )
          .then((response) => {
            if (response?.data) {
         
              setLoading(false);
              setAllRoles(response.data.data.allRole);
              // console.log("ALLLLLRRRRRssssssss:", allRoles)
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



      const addRole = async (data) => {
        setButtonLoader(true);
        await axios
          .post(`${baseUrl}roles/add`, data, {
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
                // window.location.reload();
                router.push("/dashboard/role-management?tab=roles")
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
        await axios.put(`${baseUrl}roles/edit`, data, {
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
        addRole,
        deleteRole,
        getAllRoles,
        allRoles,
        setAllRoles,
        editRole
      };
 
}

export default useRole
"use client";
import axios from "axios";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useChemicalTracker = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const [allChemicalMix, setAllChemicalMix] = useState([]);
  const [allChemicals, setAllChemicals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getAllChemicalMix = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}chemical-mix/

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setAllChemicalMix(response.data.data);
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
  const getAllChemicals = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}chemical-inventory

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          
          setLoading(false);
          setAllChemicals(response.data.data.allChemicalInventory);
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
  const addChemicals = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}chemical-mix/add `, data, {
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

  const editChemical = async (data) => {
    setButtonLoader(true);
    await axios
      .put(`${baseUrl}chemical-mix/update/${id}`, data, {
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
  return {
    allChemicals,
    setAllChemicals,
    getAllChemicals,
    loading,
    buttonLoader,
    addChemicals,
    editChemical,
    allChemicalMix,
    setAllChemicalMix,
    getAllChemicalMix
  };
};

export default useChemicalTracker;

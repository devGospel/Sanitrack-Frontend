"use client";
import axios from "axios";
import { useState } from "react";
import { toast, Flip } from "react-toastify";
const useTask = () => {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  //getAllRooms

  const [loading, setLoading] = useState(false);

  const generateTask = async () => {
    setLoading(true);
    await axios
      .post(
        `${baseUrl}dashboard/generate`,

        {},
        { headers: {} }
      )
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Task Generated Successfully", {
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
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
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
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setLoading(false);
        }
      });
  };
  const [allTasks, setAllTasks] = useState([]);
  const [allAssetTasks, setAllAssetTasks] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const getAllTasks = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}asset-group/room
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          setAllTasks(response.data.data);
        }
        console.log(response);
        // console.log(response.data.data.allRooms)
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const getAllAssetTasks = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}task-type
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          setAllAssetTasks(response.data.data);
        }
        console.log(response);
        // console.log(response.data.data.allRooms)
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const addTasks = async (data) => {
    setButtonLoading(true);
    await axios
      .post(
        `${baseUrl}task-type`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          window.location.reload();
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
          setButtonLoading(false);
        }

        // console.log(response.json())
      })
      .catch((error) => {
        if (error.response) {
          setButtonLoading(false);
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
            console.log("An error occured", error);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log("Axios error:", error);
          }
        } else {
          setButtonLoading(false);
          console.log("Network error:", error.message);
        }
      });
  };
  return {
    generateTask,
    loading,
    allTasks,
    getAllTasks,
    getAllAssetTasks,
    allAssetTasks,
    addTasks,
    buttonLoading,
  };
};

export default useTask;

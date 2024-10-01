"use client";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";

const useRooms = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [singleRooms, setSingleRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  const role =
    typeof window !== "undefined" ? window?.localStorage.getItem("role") : null ?? "";
    const facId =useSelector(
      (state) => state.facility.selectedFacilityId
    );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? window?.localStorage.getItem("auth-token") : null;
  //getAllRooms

  const getAllRooms = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}room/${
          role?.toLowerCase() === "manager" ? `manager?facilityId=${facId}` : "get"
        }
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          if (role?.toLowerCase() === "manager") {
            setAllRooms(response?.data?.data);
          } else setAllRooms(response.data.data.allRooms);
        }

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
  const getSingleRoom = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}room/get-single?roomId=${id}
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          setSingleRooms(response.data.data);
        }

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
  //createRooms
  const createRoom = async (data) => {
    setButtonLoader(true);

    await axios
      .post(`${baseUrl}room/create-room`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        console.log(response);
        //close the modal and reload
        if (response.data) {
          toast.success("Room Created Successfully", {
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

        // console.log(response.json())
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
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log("Axios error:", error);
          }
        } else {
          setLoading(false);
          console.log("Network error:", error.message);
        }
      });
  };

  //createRooms
  const editRoom = async (data) => {
    setButtonLoader(true);

    await axios
      .put(`${baseUrl}room/update`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        console.log(response);
        //close the modal and reload
        if (response.data) {
          toast.success("Room updated Successfully", {
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

        // console.log(response.json())
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
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log("Axios error:", error);
          }
        } else {
          setLoading(false);
          console.log("Network error:", error.message);
        }
      });
  };

  return {
    getAllRooms,
    loading,
    allRooms,
    createRoom,
    editRoom,
    buttonLoader,
    getSingleRoom,
    singleRooms,
  };
};

export default useRooms;

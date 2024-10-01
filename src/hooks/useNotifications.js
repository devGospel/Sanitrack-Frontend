"use client";
import axios from "axios";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useNotifications = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [topNotifications, setTopNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getTopNotifications = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}notification/top-notifications

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setTopNotifications(response.data.data.messages);
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
  const getAllNotifications = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}notification/notifications

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setTopNotifications(response.data.data.messages);
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
  const archiveNotification = async (data) => {
   

    await axios
      .patch(`${baseUrl}notification/read`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        console.log(response);
        //close the modal and reload
        if (response.data) {
          // toast.success("Room updated Successfully", {
          //   position: "top-center",
          //   autoClose: 5000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          //   transition: Flip,
          // });
        
         getTopNotifications()
         getAllNotifications()
        }

        // console.log(response.json())
      })
      .catch((error) => {
        if (error.response) {
       
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
    allNotifications,
    topNotifications,
    getAllNotifications,
    loading,
archiveNotification,
    getTopNotifications,
  };
};

export default useNotifications;

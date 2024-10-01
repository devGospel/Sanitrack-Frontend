"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";
const useSettings = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const router = useRouter();
  const [allFrequency, setAllFrequency] = useState([]);
  const [allAssetTask, setAllAssetTask] = useState([]);
  const [allEvidenceLevel, setAllEvidenceLevel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const getAllFrequency = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}frequency
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllFrequency(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
          } else if (status === 403 && data && data.message) {
            // setResponseMessage(data.message);
          } else {
          }
        } else {
        }
      });
  };
  const addFrequency = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}frequency`, data, {
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
          // setButtonLoader(false);
        }
      });
  };
  const getAllAssetTask = async () => {
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
          setLoading(false);
          setAllAssetTask(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
          } else if (status === 403 && data && data.message) {
            // setResponseMessage(data.message);
          } else {
          }
        } else {
        }
      });
  };
  const addAssetTask = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}task-type`, data, {
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
          // setButtonLoader(false);
        }
      });
  };
  const getAllEvidenceLevel = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}evidence-level/
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllEvidenceLevel(response.data.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
          } else if (status === 403 && data && data.message) {
            // setResponseMessage(data.message);
          } else {
          }
        } else {
        }
      });
  };
  const addEvidenceLevel = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}evidence-level/create`, data, {
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
          // setButtonLoader(false);
        }
      });
  };
  return {
    allFrequency,
    setAllFrequency,
    getAllFrequency,
    loading,
    buttonLoader,
    addFrequency,
    getAllAssetTask,
    allAssetTask,
    addAssetTask,
    getAllEvidenceLevel,
    allEvidenceLevel,
    addEvidenceLevel
  };
};

export default useSettings;

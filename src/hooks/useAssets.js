"use client";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";

const useAssets = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const facId =useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [allAssets, setAllAssets] = useState([]);
  const [allAssetTasks, setAllAssetTasks] = useState([]);
  const [assets, setAssets] = useState([]);
  const [assetsByRoom, setAssetsByRoom] = useState([]);
  const [allGeneralSchedule, setAllGeneralSchedule] = useState([]);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getAssets = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}${
          role?.toLowerCase() === "manager"
            ? `assets/manager?facilityId=${facId}`
            : "assets"
        }

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          if (role?.toLowerCase() === "manager") {
            setAllAssets(response?.data?.data);
          } else setAllAssets(response?.data?.data);
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
  const getAssetsByRoom = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}assets/room?roomId=${id}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAssetsByRoom(response?.data?.data);
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
  const getAllAssets = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}assets

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAssets(response?.data?.data);
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
  const getAllAssetTasks = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}assets/asset-details?assetId=${id}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllAssetTasks(response?.data?.data);
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
  const addAssets = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}assets`, data, {
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
  const addAssetsToTask = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}assets/add-task`, data, {
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
  const getGeneralSchedule = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}${
          role?.toLowerCase() === "manager"
            ? `assets/manager/schedule?facilityId=${facId}`
            : "assets/schedule"
        }

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllGeneralSchedule(response?.data?.data);
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
    allAssets,
    getAssets,
    loading,
    buttonLoader,
    addAssets,
    getGeneralSchedule,
    allGeneralSchedule,
    assets,
    getAllAssets,
    getAllAssetTasks,
    allAssetTasks,
    addAssetsToTask,
    getAssetsByRoom,
    assetsByRoom,
  };
};

export default useAssets;

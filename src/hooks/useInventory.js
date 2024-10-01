"use client";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";

const useInventory = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const [allCleaningItems, setAllCleaningItems] = useState([]);
  const [allProtectiveItems, setAllProtectiveItems] = useState([]);
  const [allChemicals, setAllChemicals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const getCleaningItems = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}cleaning-items
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllCleaningItems(response.data.data.allItems);
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
  const getProtectiveItems = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}protective-element
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          console.log("protect", response.data);
          setAllProtectiveItems(response.data.data);
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
  const getChemicals = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}chemical-inventory/
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
  const addCleaningItems = async (data) => {
    setButtonLoading(true);
    await axios
      .post(
        `${baseUrl}cleaning-items/add`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          window.location.reload();
          toast.success("Cleaning Item Created Successfully", {
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
  const addProtectiveElements = async (data) => {
    setButtonLoading(true);
    await axios
      .post(
        `${baseUrl}protective-element`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          window.location.reload();
          toast.success("Created Successfully", {
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
  const editInventory = async (data) => {
    setButtonLoading(true);
    await axios
      .put(
        `${baseUrl}cleaning-items/edit?itemId=${idx}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          window.location.reload();
          toast.success("Cleaning Items Edited Successfully", {
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
        getInventory();
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
    allCleaningItems,
    setAllCleaningItems,
    getCleaningItems,
    loading,
    getChemicals,
    allChemicals,
    addCleaningItems,
    buttonLoading,
    getProtectiveItems,
    allProtectiveItems,
    addProtectiveElements
  };
};

export default useInventory;

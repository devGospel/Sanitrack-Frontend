"use client";
import axios from "axios";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useStaffHistory = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [staffHistory, setStaffHistory] = useState([])
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const fetchStaffHistory = async (staffId, roleId) => {
    await axios
      .get(
        `${baseUrl}staff-attendance/staff-history?staffId=${staffId}&roleId=${roleId}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("Staff", response?.data.data);
          setLoading(false);
          setStaffHistory(response?.data?.data.attendance);
       
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
    fetchStaffHistory,
    staffHistory
  };
};

export default useStaffHistory;

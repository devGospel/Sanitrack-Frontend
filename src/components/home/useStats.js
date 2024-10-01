"use client";
import { ItemsContext } from "@/components/context/items.context";
import axios from "axios";
import { useContext, useState } from "react";

const useStats = () => {
  const { offset } = useContext(ItemsContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const baseUrlx = process.env.NEXT_PUBLIC_MSS_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token =
  typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;


  const [missedCleaning, setMissedCleaning] = useState([]);
  const [topMissed, setTopMissed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dailyComp, setDailyComp] = useState([]);
  const [allMss, setAllMss] = useState([]);
  const [tally, setTally] = useState([]);
  const getMissedCleaning = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrlx}dashboard/missed-cleaning

      `,
        {
          headers: {},
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setMissedCleaning(response?.data?.data);
        }

        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
          
          } else if (status === 403 && data && data.message) {
            
            setResponseMessage(data.message);
          } else {
         
          }
        } else {
          
        }
      });
  };
  const getTopMissed = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrlx}dashboard/top-missed


      `,
        {
          headers: {},
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setTopMissed(response?.data?.data);
        }

        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
          
          } else if (status === 403 && data && data.message) {
            
            setResponseMessage(data.message);
          } else {
         
          }
        } else {
          
        }
      });
  };
  const getDailyComp = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrlx}dashboard/daily-comparison
      `,
        {
          headers: {},
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setDailyComp(response?.data?.data);
        }

        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
          
          } else if (status === 403 && data && data.message) {
            
            setResponseMessage(data.message);
          } else {
         
          }
        } else {
          
        }
      });
  };
  const getTally = async (year) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrlx}dashboard/tally?year=${year}
      `,
        {
          headers: {},
        }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setTally(response?.data);
        }

        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
          
          } else if (status === 403 && data && data.message) {
            
            setResponseMessage(data.message);
          } else {
         
          }
        } else {
          
        }
      });
  };
  const getMss = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}dashboard/mss/
      `,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
      )
      .then((response) => {
        if (response.data) {
        
          setLoading(false);
          setAllMss(response?.data?.data);
        }

        
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
          
          } else if (status === 403 && data && data.message) {
            
            setResponseMessage(data.message);
          } else {
         
          }
        } else {
          
        }
      });
  };
  return {
    missedCleaning,
    getMissedCleaning,
    loading,
    getTopMissed,
    topMissed,
    getDailyComp,
    dailyComp,
    allMss,
    getMss,
    tally,getTally
  };
};

export default useStats;

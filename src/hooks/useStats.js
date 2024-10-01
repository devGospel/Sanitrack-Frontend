"use client";
import { ItemsContext } from "@/components/context/items.context";
import axios from "axios";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

const useStats = () => {
  const { offset } = useContext(ItemsContext);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const baseUrlx = process.env.NEXT_PUBLIC_MSS_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const facilityId = useSelector((state) => state.facility.selectedFacilityId);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  const [cardStats, setCardStats] = useState([]);
  const [missedCleaning, setMissedCleaning] = useState([]);
  const [topMissed, setTopMissed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dailyComp, setDailyComp] = useState([]);
  const [allMss, setAllMss] = useState([]);
  const [allSingleMss, setAllSingleMss] = useState([]);
  const [tally, setTally] = useState([]);
  const [cleanerSummary, setCleanerSummary] = useState([]);
  const [fac, setFac] = useState([]);
  const [facilityOverallCleaning, setFacilityOverallCleaning] = useState([]);

  const [mssOverview, setMssOverview] = useState([]);
  const getMissedCleaning = async () => {
    setLoading(true);
    let fullUrl;
    if (facilityId) {
      fullUrl = `${baseUrl}dashboard/mss/manager/monthly-missed?facilityId=${facilityId}`;
    } else {
      fullUrl = `${baseUrl}dashboard/mss/monthly-missed`;
    }
    await axios
      .get(
        `${fullUrl}

      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
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
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getCardStats = async (facilityId) => {
    setLoading(true);
    let fullUrl;
    if (facilityId) {
      fullUrl = `${baseUrl}dashboard/overview?facilityId=${facilityId}`;
    } else {
      fullUrl = `${baseUrl}dashboard/overview`;
    }
    await axios
      .get(
        `${fullUrl}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setCardStats(response?.data?.data);
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
  const getTopMissed = async () => {
    setLoading(true);
    let fullUrl;
    if (facilityId) {
      fullUrl = `${baseUrl}dashboard/mss/manager/top-missed?facilityId=${facilityId}`;
    } else {
      fullUrl = `${baseUrl}dashboard/mss/top-missed`;
    }
    await axios
      .get(
        `${fullUrl}


      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
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
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getDailyComp = async (date) => {
    setLoading(true);
    let fullMssUrl;
    if (facilityId) {
      console.log(`hiiii facility id is => ${facilityId}`);
      fullMssUrl = `${baseUrl}dashboard/mss/manager/today?date=${
        date ? date : "today"
      }&facilityId=${facilityId}`;
    } else {
      fullMssUrl = `${baseUrl}dashboard/mss/today?date=${
        date ? date : "today"
      }`;
    }
    await axios
      .get(
        `${fullMssUrl}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
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
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };

  const getMssOverview = async (facilityId, filter) => {
    setLoading(true);
    let fullMssUrl;
    if (facilityId) {
      fullMssUrl = `${baseUrl}dashboard/mss/details/today?facilityId=${facilityId}`;
    } else {
      fullMssUrl = `${baseUrl}dashboard/mss/details/today`;
    }
    try {
      const response = await axios.post(
        fullMssUrl,
        { filter: filter },
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (response.data) {
        setLoading(false);
        setMssOverview(response.data.data);
        console.log("response tttuhh", response.data.data);
        console.log("we have set you so let  us see", mssOverview);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data && data.message) {
        } else if (status === 403 && data && data.message) {
        } else {
        }
      }
    }
  };
  const getSingleMss = async (id) => {
    setLoading(true);

    await axios
      .get(
        `${baseUrl}dashboard/mss/view-mss-detail?assetTaskType=${id}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllSingleMss(response?.data?.data);
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
          } else if (status === 403 && data && data.message) {
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
          } else if (status === 403 && data && data.message) {
          } else {
          }
        } else {
        }
      });
  };
  const getCleanerSummary = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}work-history/cleaner-task-summary
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          console.log("summ", response);
          setCleanerSummary(response.data.data);
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
  const getFacilOverview = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}room/comparison/
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          console.log("summdeedd", response);
          setFac(response.data.data);
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
  const getFacilityOverallCleaning = async (id) => {
    await axios
      .get(`${baseUrl}work-facility/facility-overall-cleaning`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        console.log("dang", response);

        setFacilityOverallCleaning(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            setResponseMessage(data.message);
            // navigate('/')
            // send user back to the login page!
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network errorasy:", error.message);
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
    tally,
    getTally,
    getCleanerSummary,
    cleanerSummary,
    getFacilOverview,
    fac,
    getFacilityOverallCleaning,
    facilityOverallCleaning,
    allSingleMss,
    getSingleMss,
    cardStats,
    getCardStats,
    getMssOverview,
    mssOverview,
  };
};

export default useStats;

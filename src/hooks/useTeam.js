"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
const useTeam = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const facId =useSelector(
    (state) => state.facility.selectedFacilityId
  );
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const router = useRouter();
  const [allTeams, setAllTeams] = useState([]);
  const [singleTeams, setSingleTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const getAllTeams = async (facilityId) => {
    setLoading(true);
    let fullUrl;
    if (newRole?.toLowerCase() === "manager") {
      fullUrl = `${baseUrl}team?facilityId=${facId}`;
    } else {
      fullUrl = `${baseUrl}team/`;
    }
    await axios
      .get(
        fullUrl,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllTeams(response.data.data);
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
  const getSingleTeam = async (id) => {
    setLoading(true);

    await axios
      .get(`${baseUrl}team/details?teamId=${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setSingleTeams(response.data.data);
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
  const addTeam = async (data) => {
    setButtonLoader(true);
    await axios
      .post(
        `${baseUrl}team/create${
          newRole?.toLowerCase() == "manager" &&
          `?facilityId=${facId}`
        }`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
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
            router.push("/dashboard/team-management");
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
  const addTeamMember = async (data,id) => {
    setButtonLoader(true);
    await axios
      .post(
        `${baseUrl}team/add-new?teamId=${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
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
           window.location.reload()
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
    allTeams,
    setAllTeams,
    getAllTeams,
    loading,
    buttonLoader,
    addTeam,
    getSingleTeam,
    singleTeams,addTeamMember
  };
};

export default useTeam;

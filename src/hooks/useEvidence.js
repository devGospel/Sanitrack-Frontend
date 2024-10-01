"use client";
import axios from "axios";
import { useState } from "react";

const useEvidence = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");

  const [allEvidence, setAllEvidence] = useState([]);
  const [allInspectorEvidenceTask, setAllInspectorEvidenceTask] = useState([]);
  const [allCleanerEvidenceTask, setAllCleanerEvidenceTask] = useState([]);
  const [allWorkOrderEvidence, setAllWorkOrderEvidence] = useState([]);
  const [loading, setLoading] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const getEvidence = async (facilityId) => {
    setLoading(true);
    let fullUrl
    if(facilityId){ 
      fullUrl = `${baseUrl}evidence/work-order?facilityId=${facilityId}`
    }else{
      fullUrl = `${baseUrl}evidence/work-order`
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
          setAllEvidence(response.data.data);
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
  const getEvidenceTask = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}evidence/task-evidence?workOrderTaskId=${id}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllCleanerEvidenceTask(response.data.data.cleanerEvidence);
          setAllInspectorEvidenceTask(response.data.data.inspectorEvidence);
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
  const getWorkOrderEvidence = async (id) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}evidence/task?workOrderId=${id}
      `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          setLoading(false);
          setAllWorkOrderEvidence(response.data.data);
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
    allEvidence,
    setAllEvidence,
    getEvidence,
    loading,
    getWorkOrderEvidence,
    allWorkOrderEvidence,
    getEvidenceTask,
    allInspectorEvidenceTask,
    allCleanerEvidenceTask
  };
};

export default useEvidence;

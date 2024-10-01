"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useReport = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const [allReports, setAllReports] = useState([]);
  const [allCertifications, setAllCertifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const router = useRouter();

  const getAllReports = async (params) => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}diary/${params ? params:""}
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setAllReports(response.data.data);
          // console.log("ALLLLLRRRRRssssssss:", allReports)
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

  const addReport = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}diary/create`, data, {
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
  const getAllCertifications = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}certificate/
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response?.data) {
          setLoading(false);
          setAllCertifications(response.data.data);
          // console.log("ALLLLLRRRRRssssssss:", allReports)
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

  const addCertification = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}certificate/create`, data, {
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
    const editCertifications = async (id,data) => {
      setButtonLoader(true);
      await axios.patch(`${baseUrl}certificate/update?certificateId=${id}`, data, {
          headers: { Authorization: `Bearer ${access_token}` },
      }).then((response) => {
          if (response.data) {
            toast.success("Edited Successfully", {
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
      }).catch((error) => {
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
          // handleError(error);
      });
  };

    // const deleteRole = async (roleId) => {
    //   setButtonLoader(true);
    //   await axios
    //     .post(`${baseUrl}roles/delete?roleId=${roleId}`, {
    //       headers: { Authorization: `Bearer ${access_token}` },
    //     })
    //     .then((response) => {

    //       // send user back to the task home page
    //       if (response.data) {
    //         toast.success("Deleted Successfully", {
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "colored",
    //           transition: Flip,
    //         });
    //         setButtonLoader(false);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 1500);
    //       }

    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         setButtonLoader(false);
    //         const { status, data } = error.response;
    //         toast.error(data.message, {
    //           position: "top-center",
    //           autoClose: 5000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "colored",
    //           transition: Flip,
    //         });
    //         if (status === 400 && data && data.message) {
    //           //  (data.message);

    //         } else if (status === 403 && data && data.message) {
    //           // navigate('/')
    //         } else {

    //         }
    //       } else {
    //         setLoading(false);

    //       }
    //     });
    // };

  return {
    loading,
    buttonLoader,
    addReport,

    getAllReports,
    allReports,
    getAllCertifications,
    addCertification,
    allCertifications,
    editCertifications
  };
};

export default useReport;

"use client";
import { getMssUrlForRole } from "@/utils/mssUrlByRole";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, Flip } from "react-toastify";
const useWorkOrder = () => {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  //getAllRooms
  const selectedFacilityId = useSelector(
    (state) => state.facility.selectedFacilityId
  );
  const newRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [allWorkOrders, setAllWorkOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [manageOrders, setManageOrders] = useState([]);

  const [allInspectorWorkOrder, setInspectorWorkOrder] = useState([]);
  const [allCleanerWorkOrder, setCleanerWorkOrder] = useState([]);
  const getAllWorkOrders = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}work-schedule/
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          setAllWorkOrders(response.data.data);
        }
        console.log(response);
        // console.log(response.data.data.allRooms)
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const getAllOrders = async () => {
    setLoading(true);
    await axios
      .get(
        `${baseUrl}work-order/
    
          `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          console.log("sec", response);
          setLoading(false);
          setAllOrders(response.data.data);
        }
        console.log(response);
        // console.log(response.data.data.allRooms)
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const getAllWorkOrdersForManagement = async (role, facilityId) => {
    try {
      setLoading(true);
      const fullManageMssUrl = getMssUrlForRole(role, facilityId);

      const response = await axios.get(
        `${fullManageMssUrl}
        
              `,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        setLoading(false);
        setManageOrders(response.data.data);

        return response.data.data;
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data && data.message) {
          console.log("An error occured", data.message);
        } else if (status === 403 && data && data.message) {
          console.log("An error with status 403 occured", data.message);
        } else {
          console.log("Axios error:", error);
        }
      } else {
        console.log("Network error:", error.message);
      }
    }
  };
  const generateWO = async () => {
    setGenLoading(true);
    await axios
      .post(
        `${baseUrl}${
          newRole?.toLowerCase() === "manager"
            ? `work-order/manager/generate?facilityId=${selectedFacilityId}`
            :'work-order/generate'}`,
        {},
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Generated Successfully", {
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
          setGenLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setGenLoading(false);
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
          setGenLoading(false);
        }
      });
  };
  const resetWO = async () => {
    setResetLoading(true);
    await axios
      .post(
        `${baseUrl}${
          newRole?.toLowerCase() == "manager"
            ? `work-order/manager/reset?facilityId=${selectedFacilityId}`
            : "work-order/reset"
        }`,
        {},
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.info("Reset Successfully", {
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
          setResetLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setResetLoading(false);
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
          setGenLoading(false);
        }
      });
  };
  const updateWO = async (workId, data, multipleUpload) => {
    try {
      let toastShown = false; // Flag to track if toast has been shown
      setButtonLoading(true);
      const response = await axios.patch(
        `${baseUrl}work-order/update?workOrderId=${workId}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        setButtonLoading(false);
        return response.data.data;
      }
    } catch (error) {
      setButtonLoading(false);
      const { status, data, message } = error.response;
      // Return an object instead of throwing an error
      console.log("faillllllll0", data.message);
      return {
        error: true,
        message: data.message || "An error occurred",
        workOrderId: workId,
      };
    }

    // .catch((error) => {
    //   if (error.response) {

    //   } else {
    //     setGenLoading(false);
    //   }
    // });
  };
  const createWO = async (data) => {
    setButtonLoading(true);
    await axios
      .post(`${baseUrl}work-order/create`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success(" Work Order Created Successfully", {
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
          setTimeout(() => {
            router.push("/dashboard/mss");
          }, 1500);
        }
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
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setGenLoading(false);
        }
      });
  };
  const uploadCleanerEvidence = async (data, id, close, params) => {
    setButtonLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}cleaner/upload?workOrderTaskId=${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        toast.success("Uploaded Successfully", {
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
        setSuccess(true);
        setButtonLoading(false);

        setTimeout(() => {
          // close();
          getCleanerWorkOrder(params);
          setSuccess(false);
        }, 1500);
      }
      return response?.data?.data?.evidence || [];
    } catch (error) {
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
          //  (data.message);
        } else if (status === 403 && data && data.message) {
          // navigate('/')
        } else {
        }
      } else {
        setButtonLoading(false);
      }
    }
  };

  const uploadInspectorEvidence = async (data, id, close, params) => {
    setButtonLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}inspector/upload?workOrderTaskId=${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        toast.success("Uploaded Successfully", {
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
        getInspectorWorkOrder(params);
        // setTimeout(() => {

        //   window.location.reload()
        // }, 1500);
      }
      return response?.data?.data?.evidence || [];
    } catch (error) {
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
          //  (data.message);
        } else if (status === 403 && data && data.message) {
          // navigate('/')
        } else {
        }
      } else {
        setButtonLoading(false);
      }
    }
  };
  const submitInspectorTask = async (data) => {
    setButtonLoading(true);
    await axios
      .post(`${baseUrl}inspector/approve`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Task Approved Successfully", {
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
          setTimeout(() => {
            router.push("/dashboard/inspector/work-order");
          }, 1500);
        }
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
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setButtonLoading(false);
        }
      });
  };
  const submitCleanerTask = async (data) => {
    setButtonLoading(true);
    await axios
      .post(`${baseUrl}cleaner/submit`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          toast.success("Task Submitted Successfully", {
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
          setTimeout(() => {
            router.push("/dashboard/cleaner/work-order");
          }, 1500);
        }
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
            //  (data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
          }
        } else {
          setButtonLoading(false);
        }
      });
  };
  const deleteCleanerImage = async (id, data) => {
    setButtonLoading(true);
    try {
      const response = await axios.patch(
        `${baseUrl}cleaner/delete?workOrderEvidenceId=${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        toast.success("Delete Successfully", {
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
        // setTimeout(() => {
        //   router.push("/dashboard/cleaner/success");
        // }, 1500);
      }
      return response;
    } catch (error) {
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
          //  (data.message);
        } else if (status === 403 && data && data.message) {
          // navigate('/')
        } else {
        }
      } else {
        setButtonLoading(false);
      }
    }
  };

  const deleteInspectorImage = async (id, data) => {
    // setButtonLoading(true);
    try {
      const response = await axios.patch(
        `${baseUrl}inspector/delete?workOrderEvidenceId=${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      if (response.data) {
        toast.success("Delete Successfully", {
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
        // setButtonLoading(false);
        // setTimeout(() => {
        //   router.push("/dashboard/cleaner/success");
        // }, 1500);
      }
      return response;
    } catch (error) {
      if (error.response) {
        // setButtonLoading(false);
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
        setButtonLoading(false);
      }
    }
  };

  const getInspectorWorkOrder = async (roomId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}inspector/asset/?roomId=${roomId}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (response.data) {
        setLoading(false);
        console.log(`result from inspector work order`, response.data.data);
        setInspectorWorkOrder(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data && data.message) {
          console.log("An error occured", data.message);
        } else if (status === 403 && data && data.message) {
          console.log("An error with status 403 occured", data.message);
        } else {
          console.log("Axios error:", error);
        }
      } else {
        console.log("Network error:", error.message);
      }
    }
  };

  const getCleanerWorkOrder = async (roomId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}cleaner/asset-task?roomId=${roomId}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (response.data) {
        setLoading(false);
        // console.log(`result from inspector work order`, response.data.data)
        setCleanerWorkOrder(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data && data.message) {
          console.log("An error occured", data.message);
        } else if (status === 403 && data && data.message) {
          console.log("An error with status 403 occured", data.message);
        } else {
          console.log("Axios error:", error);
        }
      } else {
        console.log("Network error:", error.message);
      }
    }
  };
  return {
    loading,
    allWorkOrders,
    getAllWorkOrders,
    getAllWorkOrdersForManagement,
    manageOrders,
    genLoading,
    generateWO,
    updateWO,
    buttonLoading,
    createWO,
    resetLoading,
    resetWO,
    getAllOrders,
    allOrders,

    uploadInspectorEvidence,
    submitInspectorTask,
    uploadCleanerEvidence,
    deleteCleanerImage,
    deleteInspectorImage,
    submitCleanerTask,
    buttonLoading,
    getInspectorWorkOrder,
    allInspectorWorkOrder,
    getCleanerWorkOrder,
    allCleanerWorkOrder,
    success,
  };
};

export default useWorkOrder;

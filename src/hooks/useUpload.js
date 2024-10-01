"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

const useUpload = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const access_token = localStorage.getItem("auth-token");
  const [cleanerRes, setCleanerRes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [downloadLoader, setDownloadLoader] = useState(false);
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

  const router = useRouter();


 
  const uploadSSOP = async (file) => {
    setButtonLoader(true);

    // Create FormData to send the PDF
    const formData = new FormData();
    formData.append('file', file);  // 'file' is the key expected by the backend

    try {
      // Post the form data to the backend
      const response = await axios.post(
        `${baseUrl}/work-order/upload-ssop/`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data' // Required for sending files
          }
        }
      );

      // Handle success
      if (response.status === 200) {
        toast.success("PDF document uploaded successfully", { transition: Flip });
        router.push('/dashboard/mss/upload-ssop');  // Redirect after success
      } else {
        throw new Error(response.data.message || 'Error uploading file');
      }
    } catch (error) {
      // Handle error
      console.error('Error uploading PDF:', error);
      toast.error(error.response?.data?.message || 'Failed to upload PDF. Please try again.', { transition: Flip });
    } finally {
      setButtonLoader(false);  // Disable loader
    }
  }

  const cleanerUpload = async (data) => {
    setButtonLoader(true);
    await axios
      .post(`${baseUrl}historical/staff-upload`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          setCleanerRes(response.data);
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
          setButtonLoader(false);
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1500);
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
  const downloadWork = async () => {
    setDownloadLoader(true);
    await axios
      .post(
        `${baseUrl}historical/generate-work-order`,
        {},
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        // send user back to the task home page
        if (response.data) {
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'WorkOrder_Sample_Data_100.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a); // Clean up the element

          // console.log(response);
          // toast.success("Downloaded Successfully", {
          //   position: "top-center",
          //   autoClose: 5000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          //   transition: Flip,
          // });
          setDownloadLoader(false);
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1500);
        }
      })
      .catch((error) => {
        if (error.response) {
          setDownloadLoader(false);
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
    loading,
    buttonLoader,
    cleanerUpload,
downloadLoader,
    cleanerRes,
    downloadWork,
  };
};

export default useUpload;

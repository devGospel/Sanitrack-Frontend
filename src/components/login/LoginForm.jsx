"use client";

import React, { useContext, useEffect, useState } from "react";
import { userLogin } from "@/redux/features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useAuthState } from "../context/AuthContext";

const Register = () => {
  const [passwordtoggle, setPasswordToggle] = useState(true);
  const { login, isLoading } = useAuth();
  const { setIsLoggedIn, isLoggedIn } = useAuthState(); // Get setIsLoggedIn from context
  // const { accessData, accessLoading, getAllAccess } = useRole();

  // useEffect(() => {
  //   getAllAccess();
  // }, []);

  // useEffect(() => {
  //   const storedData = accessData;
  //   localStorage.setItem("storedRoles", JSON.stringify(accessData));
  // }, [accessData]);

  // const { login, isLoading } = useAuth();
  const router = useRouter();
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null ?? "";



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    login(data.email, data.password, setIsLoggedIn);

    // dispatch(userLogin(newData)).then((result) => {
    //   if (
    //     result?.payload?.status === "success" &&
    //     result?.payload?.data?.user?.multiFactorAuth === false
    //   ) {
    //     window?.location.reload();

    //     toast.success("Login Successful !!!", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });

    //     router.push("/dashboard/role-management");
    //   }

    //   if (result?.payload?.data?.user?.multiFactorAuth) {
    //     router.push("/verify-multi-factor-auth");
    //   }
    // });
    // reset();
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <ToastContainer />

      <form onSubmit={handleSubmit(handleLogin)} className="w-full">
        <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
          <div className="text-black w-full flex flex-col items-start">
            <div className="relative w-full">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                name="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors && errors?.email?.type === "required" && (
              <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                {errors?.email.message}
              </span>
            )}
          </div>
          <div className={`text-black flex flex-col items-start `}>
            <div className="relative w-full">
              <input
                id="password"
                type={passwordtoggle ? "password" : "text"}
                placeholder="Input Password"
                className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
                {...register("password", { required: "Password is required" })}
                name="password"
              />

              <div className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center text-sm leading-5">
                <span
                  onClick={() => setPasswordToggle(!passwordtoggle)}
                  className="cursor-pointer"
                >
                  {!passwordtoggle ? (
                    <svg
                      className="h-6  fill-black dark:fill-white "
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="EyeOutlineIcon"
                    >
                      <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-6  fill-black dark:fill-white"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="EyeOffOutlineIcon"
                    >
                      <path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"></path>
                    </svg>
                  )}
                </span>
              </div>
            </div>
            {errors && errors?.password?.type === "required" && (
              <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                {errors?.password?.message}
              </span>
            )}
          </div>
        </div>
        {/* <Link href="/forgot-password">
          <h2 className="w-full text-[#0096C4] flex justify-end text-md">
            Forgot password?
          </h2>
        </Link> */}

        <div className="flex justify-center">
          <button
            disabled={isLoading}
            className="px-5 py-3 w-full md:w-full text-white bg-sanBlue rounded-md mt-5"
          >
            {isLoading ? (
              <div className="flex gap-x-2 justify-center items-center ">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4  text-gray-200 animate-spin  fill-Hwhite"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-white text-xs">Loading</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      {/* {error && (
        <div className="bg-red-200 p-4">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )} */}
    </div>
  );
};

export default Register;

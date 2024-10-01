"use client";
import React, { useState } from "react";

import axios from "axios";

import JWT from "jsonwebtoken";
import { Flip, ToastContainer, toast } from "react-toastify";
import { useAuthRolesState } from "../context/AuthRolesContext";
import { useCurrentRole } from "../context/UserRoleContext";
import { useAuthState } from "../context/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const RoleModal = ({ closeModal }) => {
  const { roles, token, setModal } = useAuthRolesState();
  const { currentRole, setCurrentRole } = useCurrentRole();
  const { setIsLoggedIn, isLoggedIn } = useAuthState();

  const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const roleSubmit = async (data) => {
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}select-role`, data, {
        headers: {
          // 'Content-Type': 'application/json',
          // 'Accept-Language': localStorage.getItem('i18nextLng'),
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.status === true) {
        setModal(false);
        const JWT_KEY = process.env.REACT_APP_JWT_KEY;

        const decodedResponse = JWT.decode(response.data.data.token, JWT_KEY);
        //     const loggedInUserRole = decodedResponse.role_id.role_name;

        const newRole = roles.filter(
          (role) => role?.role_id == data.selectedRoleId
        );

        setCurrentRole(newRole[0].role_name);
        // Set auth details in localStorage
        setCookie("sanitrack-auth-token", response?.data?.data?.token);
        setCookie("san-role", newRole[0].role_name);
        window?.localStorage.setItem(
          'sanUser',JSON.stringify( response?.data?.data)
         
        );
        window?.localStorage.setItem("isLoggedIn", "true"); // Use to maintain session state
        window?.localStorage.setItem("auth-token", response.data.data.token);
        window?.localStorage.setItem("name", response.data.data.username);
        window?.localStorage.setItem("id", response.data.data.userId);
        window?.localStorage.setItem("role", newRole[0].role_name);
        window?.localStorage.setItem("facilityName", response?.data?.data?.facilityName);
        window?.localStorage.setItem("facilityId", response?.data?.data?.facility);
        window.location.reload();
        setIsLoggedIn(true); // Update global state via context
      }

      // if (response?.data?.data?.requiredRoleSelection === false) {

      // }

      // else {

      //   navigate('/unauthorized');
      //   return false;
      // }
    } catch (error) {
      alert(error.message);
      toast.error(error?.response?.data?.message, {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRole = (data) => {
    roleSubmit(data);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className=" top-20">
        <div>
          <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            {/* <div className="relative">
                <div className="absolute top-3 right-5">
                  <FaWindowClose className="text-xl text-black cursor-pointer " />
                </div>
              </div> */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-2xl leading-6 text-center text-black font-semibold pb-2">
                    Select a Role
                  </h3>
                  <p className="text-gray-500 text-center">
                    {" "}
                    You have {roles?.length} roles. Select a Role
                  </p>
                </div>
              </div>
              <div>
                <form
                  className="w-full"
                  onSubmit={handleSubmit(handleSubmitRole)}
                >
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="text-black w-full flex flex-col items-start">
                      <label
                        className="ml-1 mb-2 text-md text-black "
                        htmlFor="email"
                      >
                        Select Role
                      </label>
                      <div className="relative w-full">
                        <Controller
                          name="selectedRoleId" // Name of the field in the form data
                          control={control}
                          rules={{
                            required: "Role is required",
                          }} // Validation rules if needed
                          render={({ field }) => (
                            <select
                              {...field}
                              className="text-gray-700 rounded-md w-full border-[1px] p-2 bg-transparent border-gray-400"
                            >
                              <option hidden>Select a Role</option>
                              {roles?.map((role) => {
                                return (
                                  <option
                                    key={role?.role_id}
                                    value={role?.role_id}
                                    className="capitalize"
                                  >
                                    {roles.length === 0
                                      ? "No roles available"
                                      : `${role?.role_name}`}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        />
                        {errors &&
                          errors?.selectedRoleId?.type === "required" && (
                            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                              {errors?.selectedRoleId.message}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 w-full flex justify-end">
                    <button
                      disabled={isLoading}
                      className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
                    >
                      {isLoading ? "Loading..." : "Submit"}
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    //   <>
    //     <Container

    //       sx={{
    //         p: 4,
    //         bgcolor: 'background.paper',
    //         transformOrigin: 'top'
    //       }}
    //     >
    //       <Typography variant="h3" component="h2" gutterBottom>
    //         You have {roles?.length} roles. Select a Role
    //       </Typography>
    //       <form onSubmit={handleSubmit}>
    //         <div className="form-group w-full lg:w-full">
    //           <FormControl variant="outlined" fullWidth>
    //             <InputLabel htmlFor="location"> Choose Role</InputLabel>
    //             <Select
    //               id="inspector"
    //               name="inspector"
    //               className="w-full"
    //               value={selectedRole}
    //               onChange={e => {
    //
    //                 setSelectedRole(e.target.value);
    //               }}
    //               placeholder="Select Inspector"
    //               label="Inspector"
    //               sx={{ marginBottom: 2 }}
    //             >
    //               {roles?.map(role => {
    //                 return (
    //                   <MenuItem key={role?.role_id} value={role?.role_id} className="capitalize">
    //                     {roles.length === 0 ? 'No roles available' : `${role?.role_name}`}
    //                   </MenuItem>
    //                 );
    //               })}
    //             </Select>
    //           </FormControl>
    //         </div>
    //         <div className="p-2 w-full flex justify-end">
    //           <button
    //             disabled={isLoading}
    //             className="text-white flex justify-center  gap-x-2 items-center px-4 py-2 bg-blue-700 w-full lg:h-[40px] text-base border-t-2 border-empWhite"
    //           >
    //             {isLoading ? 'Loading...' : 'Send'}
    //           </button>{' '}
    //         </div>
    //       </form>
    //     </Container>
    //   </>
  );
};

export default RoleModal;

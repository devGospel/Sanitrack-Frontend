"use client";
import React, { useEffect, useState } from "react";
import TopLayout from "./TopLayout";
import Image from "next/image";
import UploadImage from "../../../public/profile.png";
import BackButton from "../BackButton";
import { toast } from "react-toastify"; // Import toast for notifications
import useUser from "@/hooks/useUser";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useRole from "@/hooks/useRole";
import { Country, State, City } from "country-state-city";
export default function UsersForm({ title, btnText }) {
  const { addUser, buttonLoader } = useUser(); // Destructure the addUser function and buttonLoader from useUser
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch
  } = useForm();
  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("");
  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(stateCities);
    }
  }, [selectedState, selectedCountry]);

  const { getAllRoles, allRoles } = useRole();
  useEffect(() => {
    getAllRoles();
  }, []);
  console.log(allRoles)
  const handleAddUser = (data) => {
    data.state = State.getStateByCodeAndCountry(data.state, data.country).name;
    // console.log(newState.name)
    data.country = Country.getCountryByCode(data.country).name;

    const address = {
      // street: data.street,
      city: data.city,
      state: data.state,
      // zip: data.zip,
      country: data.country,
      home_address: data.home_address,
    };

    // Remove individual address fields from the data object
    // delete data.street;
    delete data.city;
    delete data.state;

    delete data.country;
    delete data.home_address;

    // Add the combined address object to the data object
    data.address = address;

    const role = allRoles.filter((role) => role._id === data?.role_id);
    // console.log(role);
    const newData = { ...data, role_name: role[0]?.role_name };
    addUser(newData);
    // console.log(newData);
  };

  // console.log(allRoles)
  return (
    <section className="w-full px-5 py-10">
      {/* <TopLayout heading={"Add users"} paragraph={"Administer and oversee user accounts and privileges within the platform."} title="Add User Roles" path={"/dashboard/user-management/add-users"} /> */}
      <div className=" px-6">
        <div className="flex items-center py-10 max-w-lg justify-between gap-10">
          <BackButton />
          <h1 className="font-bold text-lg">{title}</h1>
        </div>
        <form onSubmit={handleSubmit(handleAddUser)} className="w-full">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 w-full">
            <div className="flex flex-col  items-start space-y-3 w-full">
              {/* <div className="flex flex-col gap-2">
                <Image
                  src={UploadImage}
                  className="h-32 w-32 rounded-full"
                  alt="Profile"
                />
                <div className="flex items-center gap-3 justify-center">
                  <div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_194_10938)">
                        <path
                          d="M3.45921 12.284C3.49492 12.284 3.53064 12.2805 3.56635 12.2751L6.56992 11.7483C6.60564 11.7412 6.63957 11.7251 6.66457 11.6983L14.2342 4.12868C14.2508 4.11216 14.2639 4.09254 14.2729 4.07094C14.2818 4.04934 14.2864 4.02618 14.2864 4.00279C14.2864 3.9794 14.2818 3.95625 14.2729 3.93464C14.2639 3.91304 14.2508 3.89342 14.2342 3.8769L11.2664 0.907254C11.2324 0.873326 11.1878 0.855469 11.1396 0.855469C11.0914 0.855469 11.0467 0.873326 11.0128 0.907254L3.44314 8.4769C3.41635 8.50368 3.40028 8.53583 3.39314 8.57154L2.86635 11.5751C2.84898 11.6708 2.85519 11.7692 2.88443 11.862C2.91368 11.9547 2.96509 12.0389 3.03421 12.1073C3.15207 12.2215 3.30028 12.284 3.45921 12.284ZM4.66278 9.16975L11.1396 2.69475L12.4485 4.00368L5.97171 10.4787L4.38421 10.759L4.66278 9.16975ZM14.5717 13.784H1.42885C1.11278 13.784 0.857422 14.0394 0.857422 14.3555V14.9983C0.857422 15.0769 0.921708 15.1412 1.00028 15.1412H15.0003C15.0789 15.1412 15.1431 15.0769 15.1431 14.9983V14.3555C15.1431 14.0394 14.8878 13.784 14.5717 13.784Z"
                          fill="green"
                          fillOpacity="0.8"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_194_10938">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.28544 2.14118H4.14258C4.22115 2.14118 4.28544 2.0769 4.28544 1.99833V2.14118H9.71401V1.99833C9.71401 2.0769 9.77829 2.14118 9.85687 2.14118H9.71401V3.4269H10.9997V1.99833C10.9997 1.36797 10.4872 0.855469 9.85687 0.855469H4.14258C3.51222 0.855469 2.99972 1.36797 2.99972 1.99833V3.4269H4.28544V2.14118ZM13.2854 3.4269H0.714007C0.397935 3.4269 0.142578 3.68225 0.142578 3.99833V4.56975C0.142578 4.64833 0.206864 4.71261 0.285435 4.71261H1.36401L1.80508 14.0519C1.83365 14.6608 2.33722 15.1412 2.94615 15.1412H11.0533C11.664 15.1412 12.1658 14.6626 12.1944 14.0519L12.6354 4.71261H13.714C13.7926 4.71261 13.8569 4.64833 13.8569 4.56975V3.99833C13.8569 3.68225 13.6015 3.4269 13.2854 3.4269ZM10.9158 13.8555H3.08365L2.65151 4.71261H11.3479L10.9158 13.8555Z"
                        fill="red"
                        fillOpacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
              </div> */}

              <div className="flex flex-col space-y-3  w-full">
                <div className="flex flex-col">
                  <input
                    type="text"
                    {...register("username", {
                      required: "username is required",
                    })}
                    placeholder="Username"
                     className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs">username is required</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email Address"
                     className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">Email is required</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    placeholder="Password"
                     className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                  />
                  {errors.id && (
                    <p className="text-red-500 text-xs">Role id is required</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="tel"
                    {...register("phone_number", {
                      required: "Phone is required",
                    })}
                    inputMode="numeric"
                    placeholder="Phone Number"
                    className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs">
                      Phone Number is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3  justify-start">
              <div className="text-black w-full flex flex-col items-start">
                <Controller
                  name="role_id" // Name of the field in the form data
                  control={control}
                  rules={{
                    required: "Role is required",
                  }} // Validation rules if needed
                  render={({ field }) => (
                    <select
                      {...field}
                       className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                    >
                      <option hidden>Select a Role</option>
                      {allRoles?.map((role) => {
                        return (
                          <option
                            onClick={() => setRoleName(role.role_name)}
                            key={role?._id}
                            value={role?._id}
                            className="capitalize"
                          >
                            {role.length === 0
                              ? "No roles available"
                              : `${role?.role_name}`}
                          </option>
                        );
                      })}
                    </select>
                  )}
                />
                {errors && errors?.role_id?.type === "required" && (
                  <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                    {errors?.role_id.message}
                  </span>
                )}
              </div>

              <div className="text-black w-full flex flex-col items-start">
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            placeholder=" Select Country"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 bg-white dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                          >
                            <option disabled>Select Country</option>
                            {Country.getAllCountries().map((country) => (
                              <option
                                key={country.isoCode}
                                value={country.isoCode}
                              >
                                {country.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors && errors?.country?.type === "required" && (
                        <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                          {errors?.country.message}
                        </span>
                      )}
                    </div>

                    <div className="text-black w-full flex flex-col items-start">
                      <Controller
                        name="state" // Name of the field in the form data
                        control={control}
                        rules={{
                          required: "State is required",
                        }} // Validation rules if needed
                        render={({ field }) => (
                          <select
                            {...field}
                            placeholder=" Select State"
                            className="border w-full dark:text-white text-black h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                          >
                            <option disabled>Select State</option>

                            {states.map((state) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors && errors?.state?.type === "required" && (
                        <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                          {errors?.state.message}
                        </span>
                      )}
                    </div>
                    <div className="text-black w-full flex flex-col items-start">
                      <Controller
                        name="city" // Name of the field in the form data
                        control={control}
                        rules={{
                          required: "City is required",
                        }} // Validation rules if needed
                        render={({ field }) => (
                          <select
                            {...field}
                            placeholder=" Select City"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                          >
                            <option disabled>Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors && errors?.city?.type === "required" && (
                        <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                          {errors?.city.message}
                        </span>
                      )}
                    </div>
              <div>
                <input
                  type="text"
                  placeholder="Home Address"
                  {...register("home_address", { required: true })}
                   className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                />
                {errors.home_address && (
                  <p className="text-red-500 text-xs">Address is required</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full sm:max-w-sm mx-auto py-5">
            <button
              disabled={buttonLoader}
              className="p-3 text-center w-full text-white rounded-md bg-sanBlue"
            >
              {buttonLoader ? "Loading..." : btnText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCompassOutline } from "react-icons/io5";
import useFacilities from "@/hooks/useFacilities";

const AddFacilityModal = ({ closeModal }) => {
  const params = useSearchParams();
  const { addFacilities, buttonLoader } = useFacilities();
  const countries = Country.getAllCountries();
  const tab = params.get("tab");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm();
  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const handleCountryChange = (countryCode) => {
    const states = State.getStatesOfCountry(countryCode);
    setStates(states);
    setCities([]);
  };

  const handleStateChange = (stateCode) => {
    const cities = City.getCitiesOfState(selectedCountry, stateCode);
    setCities(cities);
  };

  const user = useSelector((state) => state.auth.user);

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

  const handleAdd = (data) => {
    // e.preventDefault();

    data.state = State.getStateByCodeAndCountry(data.state, data.country).name;
    // console.log(newState.name)
    data.country = Country.getCountryByCode(data.country).name;

    const newData = { ...data, long: 0, lat: 0 };
    console.log(newData);
    addFacilities(newData);
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white dark:bg-black z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold">
                    Add Facility
                  </h3>
                </div>
              </div>
              <div>
                <form className="w-full" onSubmit={handleSubmit(handleAdd)}>
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="facility_name"
                            type="facility_name"
                            // defaultValue={item?.category}
                            placeholder=" Name"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black "
                            name="facility_name"
                            {...register("facility_name", {
                              required: "Name is required",
                            })}
                          />
                          {errors && errors?.facility_name?.type === "required" && (
                            <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                              {errors?.facility_name.message}
                            </span>
                          )}
                        </div>
                      </div>
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
                  </div>

                  <div className=" py-3 sm:flex sm:flex-row-reverse gap-4">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // onClick={closeModal}
                        disabled={buttonLoader}
                        className="inline-flex justify-center w-full rounded-md border-2 border-sanBlue px-4 py-2 bg-white dark:bg-sanBlue dark:text-white text-base leading-6 font-medium text-sanBlue shadow-sm hover:bg-blue-800 hover:text-white focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? "Loading..." : " Add Facility"}
                      </button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFacilityModal;

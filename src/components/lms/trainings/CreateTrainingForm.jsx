"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/loaders/Loader";
import { BiArrowBack } from "react-icons/bi";
import LmsHeader from "@/components/lms/LmsHeader";
import BackButton from "@/components/BackButton";
import useResources from "@/hooks/useResource";
import Select from "react-select";
import useUser from "@/hooks/useUser";
import useTraining from "@/hooks/useTraining";
const CreateTrainingForm = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const options1 = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
const {addTraining,buttonLoader}= useTraining()
  const { getAllStaffResources, allStaffResources } = useResources();
  const {
    getAllUsers,
    allUsers,
    getTeams,
    allTeams,
    getLocations,
    allLocations,
  } = useUser();
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState([]);
  useEffect(() => {
    getAllUsers();
    getTeams();
    getLocations();
  }, []);


  const aLLUsersOptions = allUsers?.map((item) => ({
    value: item._id,
    label: item.username,
  }));
  const allTeamsOptions = allTeams?.map((item) => ({
    value: item._id,
    label: item.teamName,
  }));
  const allLocationsOptions = allLocations?.map((item) => ({
    value: item._id,
    label: item.facility_name,
  }));
  const handleTrainers = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTrainers(values);
  };
  const handleTrainees = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTrainee(values);
  };
  const handleTeams = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedTeams(values);
  };
  const handleLocations = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedLocations(values);
  };
  const createTraining = async (data) => {

    const newData = {
      ...data,
      trainerId: selectedTrainers,
      locationId: selectedLocations,
      traineeIds: selectedTrainee,
      teamIds: selectedTeams,
    };

    addTraining(newData)
    // setLoading(true);
    // try {
    //   const response = await axios.post(`${baseUrl}/create-training/`, data, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       accessKey:
    //         "U2FsdGVkX1+Reb80FLsBqS0l90d4nYdWNohfrbSME+tMkSbv2Xb5nqLSacVmuG2+eMrAhXc3PT12NmsmQddGJdfdCHuDMOrPPq4p/lBRj3WWWtvLs56RF7EHhqY/qaiD19a95VDaGGrTyj+ZsGCKEg==",
    //     },
    //   });

    //   setLoading(false);
    //   if (response.status === 200) {
    //     toast.success("Training Added Successfully !!!", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });

    //     router.push("/trainings");
    //   }

    //   return response;
    // } catch (error) {
    //   if (error?.message === "Request failed with status code 408") {
  
    //     dispatch(setIsExpiredToken(true));
    //   }
    //   toast.error("Error occurred while adding Training !!!", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
    <ToastContainer/>
      {/* <LmsHeader /> */}
      <div className="flex w-full lg:w-3/5  justify-between mt-6 lg:px-10 px-5">
        <BackButton />
        <h2 className="text-xl font-bold">Create Training</h2>
      </div>

      <div className="text-black flex flex-col items-center gap-4 bg-white lg:p-10 p-5 w-full">
        <div className=" flex flex-col gap-4 bg-white  w-full lg:w-[600px]">
          <form
            onSubmit={handleSubmit(createTraining)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-medium">
                Name of Training
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="mt-1 p-4 h-10 border focus:border-gray-100 focus:border border-gray-300 rounded w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Select Trainers:
              </label>

              <Select
                onChange={handleTrainers}
                options={aLLUsersOptions}
                isMulti
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Select Locations:
              </label>

              <Select
                onChange={handleLocations}
                options={allLocationsOptions}
                isMulti
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Select Teams:</label>

              <Select
                onChange={handleTeams}
                options={allTeamsOptions}
                isMulti
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium">
                Select Trainer
              </label>
              <select
                {...register("trainers", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              >
                <option value="" className=" text-gray-600 text-lg p-2">
                  Select Trainer
                </option>
                <option value="trainer1" className=" text-gray-600 text-lg p-2">
                  Trainer 1
                </option>
                <option value="trainer2" className=" text-gray-600 text-lg p-2">
                  Trainer 2
                </option>
              </select>
              {errors.trainers && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium">
                Select Location
              </label>
              <select
                {...register("location", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              >
                <option value="" className=" text-gray-600 text-lg p-2">
                  Select Location
                </option>

                <option
                  value="location1"
                  className=" text-gray-600 text-lg p-2"
                >
                  Location 1
                </option>
                <option
                  value="location2"
                  className=" text-gray-600 text-lg p-2"
                >
                  Location 2
                </option>
              </select>
              {errors.location && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium">Select Team</label>
              <select
                {...register("teams", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              >
                <option value="" className=" text-gray-600 text-lg p-2">
                  Select Team
                </option>
                <option value="team1" className=" text-gray-600 text-lg p-2">
                  Team 1
                </option>
                <option value="team2" className=" text-gray-600 text-lg p-2">
                  Team 2
                </option>
              </select>
              {errors.teams && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div> */}
            <div>
              <label className="block text-sm font-medium">
                Select Trainees:
              </label>

              <Select
                onChange={handleTrainees}
                options={aLLUsersOptions}
                isMulti
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium">
                Select Individual
              </label>
              <select
                {...register("individuals", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              >
                <option value="" className=" text-gray-600 text-lg p-2">
                  Select Individual
                </option>
                <option
                  value="individual1"
                  className=" text-gray-600 text-lg p-2"
                >
                  Individual 1
                </option>
                <option
                  value="individual2"
                  className=" text-gray-600 text-lg p-2"
                >
                  Individual 2
                </option>
              </select>
              {errors.individuals && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium">
                Select Training Resource
              </label>
              <select
                onClick={() => getAllStaffResources()}
                {...register("resourceId", { required: true })}
                className="mt-1 px-4 h-10 border border-gray-300 rounded w-full"
              >
                <option value="" className=" text-gray-600 text-lg p-2">
                  Select Training Resource
                </option>
                {allStaffResources?.map((item) => (
                  <option
                    key={item?._id}
                    value={item?._id}
                    className=" text-gray-600 text-lg p-2"
                  >
                    {item?.title ?? item?.resourceTitle}
                  </option>
                ))}
              </select>
              {errors.resourceId && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Set Date</label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Set Time</label>
              <input
                type="time"
                {...register("time", { required: true })}
                className="mt-1 p-4 h-10 border border-gray-300 rounded w-full"
              />
              {errors.time && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded mt-4"
                disabled={buttonLoader}
            >
              {buttonLoader ? <Spinner /> : "Add Training"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default CreateTrainingForm;

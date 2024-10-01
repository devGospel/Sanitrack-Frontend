"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/components/loaders/Loader";
import { BiArrowBack } from 'react-icons/bi';
import LmsHeader from '@/components/lms/LmsHeader';
import BackButton from '@/components/BackButton';

const EditTrainingForm = ({ trainingId, initialData }) => {
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const user = useSelector((state) => state.auth.user);
    const token = user?.token;
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (initialData) {
            for (const [key, value] of Object.entries(initialData)) {
                setValue(key, value);
            }
        }
    }, [initialData, setValue]);

    const editTraining = async (data) => {
        setLoading(true);
        try {
            const response = await axios.put(
                `${baseUrl}/trainings/${trainingId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accessKey: "U2FsdGVkX1+Reb80FLsBqS0l90d4nYdWNohfrbSME+tMkSbv2Xb5nqLSacVmuG2+eMrAhXc3PT12NmsmQddGJdfdCHuDMOrPPq4p/lBRj3WWWtvLs56RF7EHhqY/qaiD19a95VDaGGrTyj+ZsGCKEg==",
                    },
                }
            );

            setLoading(false);
            if (response.status === 200) {
                toast.success("Training Updated Successfully !!!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                router.push("/trainings");
            }

            return response;
        } catch (error) {
            if (error?.message === "Request failed with status code 408") {

                dispatch(setIsExpiredToken(true));
            }
            toast.error("Error occurred while updating Training !!!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LmsHeader />
            <div className='flex w-full lg:w-3/5  justify-between mt-6 lg:px-10 px-5'>
            <BackButton />
            <h2 className="text-xl font-bold">Edit Training</h2>
            </div>

            <div className="text-black flex flex-col items-center gap-4 bg-white lg:p-10 p-5 w-full">
                <div className="flex flex-col gap-4 bg-white w-full lg:w-[800px]">
                    <form onSubmit={handleSubmit(editTraining)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Name of Training</label>
                            <input
                                type="text"
                                {...register("trainingName", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            />
                            {errors.trainingName && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Select Trainer</label>
                            <select
                                {...register("trainers", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            >
                               
                                <option value="">Select Trainer</option>
                                <option value="trainer1">Trainer 1</option>
                                <option value="trainer2">Trainer 2</option>
                            </select>
                            {errors.trainers && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Select Location</label>
                            <select
                                {...register("location", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            >
                               
                                <option value="">Select Location</option>
                                <option value="location1">Location 1</option>
                                <option value="location2">Location 2</option>
                            </select>
                            {errors.location && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Select Team</label>
                            <select
                                {...register("teams", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            >
                               
                                <option value="">Select Team</option>
                                <option value="team1">Team 1</option>
                                <option value="team2">Team 2</option>
                            </select>
                            {errors.teams && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Select Individual</label>
                            <select
                                {...register("individuals", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            >
                               
                                <option value="">Select Individual</option>
                                <option value="individual1">Individual 1</option>
                                <option value="individual2">Individual 2</option>
                            </select>
                            {errors.individuals && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Select Training Resource</label>
                            <select
                                {...register("resources", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            >
                               
                                <option value="">Select Training Resource</option>
                                <option value="resource1">Resource 1</option>
                                <option value="resource2">Resource 2</option>
                            </select>
                            {errors.resources && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Set Date</label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            />
                            {errors.date && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Set Time</label>
                            <input
                                type="time"
                                {...register("time", { required: true })}
                                className="mt-1 p-4 border border-gray-300 rounded w-full"
                            />
                            {errors.time && <span className="text-red-500 text-sm">This field is required</span>}
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-4 rounded mt-4 col-span-full"
                            disabled={loading}
                        >
                            {loading ? <Spinner /> : "Save"}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default EditTrainingForm;













"use client";
import Spinner from "@/components/loaders/Loader";
import useChemicalTracker from "@/hooks/useChemicalTracker";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInventory from "@/hooks/useInventory";

const EditInventoryModal = ({ closeModal }) => {
  const params = useSearchParams();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem("auth-token");
  const [buttonLoading, setButtonLoading] = useState(false);
  const tab = params.get("tab");

  console.log("first tab", tab);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { addChemicals, buttonLoader, getAllChemicals, allChemicals } =
    useChemicalTracker();
  const item = useSelector((state) => state.id.storedItem);
  useEffect(() => {
    getAllChemicals();
  }, []);

  const [image, setImage] = useState(item.image);
  const [data, setData] = useState({});
  const [name, setName] = useState(item.equipment);
  const [quantity, setQuantity] = useState(item.quantity);
  const [unit, setUnit] = useState(item.unit);
  const [description, setDescription] = useState(item.description);
  const [imagePreview, setImagePreview] = useState(item.image);

  // console.log("prev",imagePreview)
  const [selectedType, setSelectedType] = useState(item.type);
  const [pairs, setPairs] = useState(item.pairs);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    // Create a temporary URL for image preview
    const previewURL = URL.createObjectURL(file);

    setImagePreview(previewURL);
    try {
      // reader.onloadend = () => {

      //   setBase64String(reader.result);
      // };

      // reader.readAsDataURL(file)
      // ;

      const base64String = await fileToBase64(file);

      let data = {
        file: base64String,
        upload_preset: "img_upload",
      };
      console.log(data);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dyh4orev5/upload`,
        data,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast.success("Image Uploaded Successfully", {
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
        setImage(response?.data?.url);

        // newData[index] = {
        //   detail_id: rooms[index].task_id,
        //   image_path: [...img],
        //   name: rooms[index].name
        // };
        // const updatedImageData = [...imageData];
        // updatedImageData[index].image_path.push(response?.data?.url);

        // setImageData(updatedImageData);
        // console.log('newt', newData);
        // setFormData(newData);
        // console.log('ressssss', response);
      }

      return true;
    } catch (error) {
      //   alert('OOPS. An ERROR occurred');
      console.error("Upload error:", error);
      toast.error("Error Occured Uploading Image", {
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

      return false;
    }
  };
  const editInventory = async data => {
    setButtonLoading(true);
    await axios
      .put(
        `${baseUrl}cleaning-items/edit?itemId=${item?._id}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);

        if (response.data) {
          window.location.reload();
          toast.success('Cleaning Items Edited Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setButtonLoading(false);
        }
        // getInventory();
        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setButtonLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
          
            console.log('An error occured', error);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setButtonLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const user = useSelector((state) => state.auth.user);
  // const item = useSelector((state) => state.id.storedItem);

  const token = user?.token;
  const id = user?.user?._id;

  const router = useRouter();
  const dispatch = useDispatch();

  let userData = {};
  let fields = Object.keys(item ?? {});
  const updateFormData = (event, id) => {
    let val = event.target.value;

    fields.forEach((fd) => {
      if (id) {
        userData[id] = val;
      }
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const newData = {
      name: name,
      quantity: quantity,
      pairs: pairs,
      image_path: image,
      type: selectedType,
      description: description,
      unit: unit,
    };
    console.log("first", newData);
    editInventory(newData);
  };
  return (
    <>
      <ToastContainer />
      <div className=" top-20">
        <div>
          <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full h-[600px] overflow-y-auto">
            {/* <div className="relative">
              <div className="absolute top-3 right-5">
                <FaWindowClose className="text-xl text-black cursor-pointer " />
              </div>
            </div> */}
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-center items-center">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3 className="text-lg leading-6 text-center text-black font-semibold">
                    Add Inventory
                  </h3>
                </div>
              </div>
              <div>
                <form
                  className="w-full"
                  // onSubmit={handleSubmit(handleAddChemical)}
                >
                  <div className="flex flex-col gap-x-2 w-full h-auto lg:pt-5 pt-5 space-y-4 ">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="name"
                            type="name"
                            // defaultValue={item?.category}
                            placeholder=" Name"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={item.equipment}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="description"
                            type="description"
                            // defaultValue={item?.category}
                            placeholder="Description"
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="description"
                            defaultValue={item.description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="quantity"
                            type="number"
                            placeholder="Quantity "
                            // defaultValue={item?.charges ? item?.charges : 0}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            onChange={(e) => setQuantity(e.target.value)}
                            name="quantity"
                            defaultValue={item.quantity}
                          />
                        </div>
                      </div>

                      <div className="text-black w-full flex flex-col items-start">
                        <select
                          value={selectedType}
                          onChange={(e) => {
                            setSelectedType(e.target.value);
                          }}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                        >
                          <option hidden>Select a Type</option>

                          <option className="capitalize" value="consumable">
                            consumable
                          </option>
                          <option className="capitalize" value="tool">
                            tool
                          </option>
                          {/* <option className="mL">mL</option> */}
                        </select>
                      </div>
                    </div>

                    <div className="text-black w-full flex flex-col lg:flex-row gap-4 items-start">
                      <div className="relative lg:w-1/2 w-full">
                        <input
                          id="unit"
                          type="text"
                          placeholder="Unit "
                          // defaultValue={item?.charges ? item?.charges : 0}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="unit"
                          defaultValue={item.unit}
                          onChange={(e) => setUnit(e.target.value)}
                        />
                      </div>
                      <div className="flex lg:w-1/2 space-x-3 ">
                        <input
                          type="checkbox"
                          className="border-gray-300 rounded h-5 w-5"
                          onChange={(e) => setPairs(e.target.checked)}
                          name="pairs"
                          defaultChecked={pairs}
                        />

                        <div className="flex flex-col">
                          <h1 className="text-gray-700 font-medium leading-none">
                            Pairs
                          </h1>
                        </div>
                      </div>
                    </div>
                    {tab === "protective" && (
                      <div className="text-black w-full flex flex-col items-start">
                        <Controller
                          name="unit" // Name of the field in the form data
                          control={control}
                          rules={{
                            required: "Pairs is required",
                          }} // Validation rules if needed
                          render={({ field }) => (
                            <select
                              {...field}
                              className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            >
                              <option hidden>Select a Pairs</option>

                              <option className="pairs">Pairs</option>
                              <option className="single">Single</option>
                              {/* <option className="mL">mL</option> */}
                            </select>
                          )}
                        />
                        {errors && errors?.unit?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.unit.message}
                          </span>
                        )}
                      </div>
                    )}

                    {/* <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <input
                          id="unit"
                          type="text"
                          placeholder="Unit"
                          // defaultValue={item?.charges ? item?.charges : 0}
                          className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                          name="unit"
                          {...register("unit", {
                            required: "Unit is required",
                          })}
                        />
                        {errors && errors?.unit?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.unit.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="minimum_concentration"
                            type="number"
                            placeholder="Min Concentration"
                            // defaultValue={item?.charges ? item?.charges : 0}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="minimum_concentration"
                            {...register("minimum_concentration", {
                              required: "Minimum concentration is required",
                            })}
                          />
                          {errors &&
                            errors?.minimum_concentration?.type ===
                              "required" && (
                              <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                                {errors?.minimum_concentration.message}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="text-black w-full flex flex-col items-start">
                        <div className="relative w-full">
                          <input
                            id="maximum_concentration"
                            type="number"
                            placeholder="Max Concentration"
                            // defaultValue={item?.charges ? item?.charges : 0}
                            className="border w-full h-10 md:h-12 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                            name="maximum_concentration"
                            {...register("maximum_concentration", {
                              required: "Maximum concentration is required",
                            })}
                          />
                          {errors &&
                            errors?.maximum_concentration?.type ===
                              "required" && (
                              <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                                {errors?.maximum_concentration.message}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="text-black w-full flex flex-col items-start">
                      <div className="relative w-full">
                        <textarea
                          id="notes"
                          type="text"
                          name="notes"
                          rows="4"
                          {...register("notes", {
                            required: "Note is required",
                          })}
                          placeholder="Notes"
                          className="border w-full py-2 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 "
                        />
                        {errors && errors?.notes?.type === "required" && (
                          <span className="text-xs text-red-500 ease-out duration-1500 transition-all">
                            {errors?.notes.message}
                          </span>
                        )}
                      </div>
                    </div> */}
                  </div>
                  {imagePreview && (
                    <div className="my-2">
                      <div className="relative">
                        <button
                          onClick={() => setImagePreview(null)}
                          className="absolute cursor-pointer top-1 rounded-full right-1 bg-[#fff] p-1.5 flex items-center justify-center"
                        >
                          <IoClose />
                        </button>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {!imagePreview && (
                    <div className="my-2">
                      <label htmlFor="profile-image-input">
                        <p className="text-sm">Image</p>
                        <div className="lg:w-full h-40 relative">
                          <input
                            className="w-full h-40 hidden     p-2 bg-lmsGray rounded-md border border-[#E1E1E1]  text-[#ACACAC] "
                            type="file"
                            id="profile-image-input"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event)}
                          />
                          <div className="cursor-pointer lg:w-full h-40 flex items-center justify-center border-dashed mt-3 border-2 rounded-lg border-lmsBlack bg-[#F8F8F8]">
                            <span className=" w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22.6582 3.65967C22.6582 3.39445 22.5528 3.1401 22.3653 2.95256C22.1778 2.76502 21.9234 2.65967 21.6582 2.65967H3.6582C3.39299 2.65967 3.13863 2.76502 2.9511 2.95256C2.76356 3.1401 2.6582 3.39445 2.6582 3.65967V21.6597C2.6582 21.9249 2.76356 22.1792 2.9511 22.3668C3.13863 22.5543 3.39299 22.6597 3.6582 22.6597H21.6582C21.9234 22.6597 22.1778 22.5543 22.3653 22.3668C22.5528 22.1792 22.6582 21.9249 22.6582 21.6597V3.65967ZM20.6582 20.6597H4.6582V18.1407L8.5842 14.9997L10.9512 17.3667C11.1387 17.5541 11.393 17.6595 11.6582 17.6595C11.9234 17.6595 12.1777 17.5541 12.3652 17.3667L16.7322 12.9997L20.6582 16.1407V20.6597ZM20.6582 13.5787L17.2832 10.8787C17.091 10.7249 16.8488 10.6474 16.6031 10.6611C16.3573 10.6747 16.1252 10.7786 15.9512 10.9527L11.6582 15.2457L9.3652 12.9527C9.19121 12.7786 8.95911 12.6747 8.71335 12.6611C8.46758 12.6474 8.22541 12.7249 8.0332 12.8787L4.6582 15.5787V4.65967H20.6582V13.5787ZM6.6582 8.65967C6.6582 8.26411 6.7755 7.87743 6.99526 7.54853C7.21503 7.21963 7.52738 6.96328 7.89284 6.81191C8.25829 6.66053 8.66042 6.62093 9.04838 6.6981C9.43635 6.77527 9.79271 6.96575 10.0724 7.24545C10.3521 7.52516 10.5426 7.88153 10.6198 8.26949C10.6969 8.65745 10.6573 9.05958 10.506 9.42503C10.3546 9.79049 10.0982 10.1028 9.76934 10.3226C9.44044 10.5424 9.05377 10.6597 8.6582 10.6597C8.12777 10.6597 7.61906 10.449 7.24399 10.0739C6.86892 9.69881 6.6582 9.1901 6.6582 8.65967Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                  <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                      <button
                        // type="button"
                        onClick={handleEdit}
                        disabled={buttonLoading && image !== ""}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoading ? "Loading..." : "  Edit Cleaning Items"}
                      </button>
                    </span>
                    {/* <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                      <button
                        disabled={buttonLoader}
                        // onClick={handleaddChemical}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-green-600 text-white leading-6 font-medium shadow-sm hover:text-slate-300 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        {buttonLoader ? <Spinner /> : "Save"}
                      </button>
                    </span> */}
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

export default EditInventoryModal;

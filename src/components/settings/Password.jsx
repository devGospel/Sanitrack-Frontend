"use client";
import Link from "next/link";
import React, { useState } from "react";

const Password = () => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordToggle1, setPasswordToggle1] = useState(false);
  return (
    <div>
      {" "}
      <section className=' w-full grid bg-white dark:bg-black'>
        <form className="card h-96 lg:h-auto  w-full  lg:px-5 lg:py-10 gap-y-4  shadow-lg flex flex-col">
          <h4 className="lg:text-2xl text-center text-xl text-black dark:text-white font-black pb-5  text-nowrap">
            New Password
          </h4>

          <div className="relative w-full">
            <input
              id="password"
              type={passwordToggle ? "password" : "text"}
              placeholder="Enter New Password"
              className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
              name="password"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center text-sm leading-5">
              <span
                onClick={() => setPasswordToggle(!passwordToggle)}
                className="cursor-pointer"
              >
                {!passwordToggle ? (
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
          <div className="relative w-full">
            <input
              id="password"
              type={passwordToggle1 ? "password" : "text"}
              placeholder="Confirm Password"
              className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
              name="password"
            />

            <div className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center text-sm leading-5">
              <span
                onClick={() => setPasswordToggle1(!passwordToggle1)}
                className="cursor-pointer"
              >
                {!passwordToggle ? (
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

          <div className="mt-4">
            <button className="btn w-full bg-sanBlue text-white" type="button">
              <Link href="/">Save</Link>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Password;

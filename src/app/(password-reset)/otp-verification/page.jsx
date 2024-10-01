"use client";

import OtpInput from "@/components/login/OtpInput";
import Link from "next/link";
import { useState } from "react";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");

  return (
    <section className='h-screen w-full grid bg-[url("/login-bg.png")] place-items-center bg-contain  lg:bg-cover bg-no-repeat'>
      <form className="card  w-full lg:w-[40%] lg:px-5 lg:py-10 gap-y-4 bg-sanLightBlue dark:bg-slate-900 shadow-lg flex flex-col">
        <div className="flex flex-col justify-center items-center  my-2 ">
          <h1 className="lg:text-2xl text-xl text-black dark:text-white font-black pb-5 ">
            Verification Number
          </h1>
          <p className="text-sm text-center text-black dark:text-white">
            A Four-Digit verification Code has been sent to your email, kindly
            enter the four digit code.
          </p>
        </div>
        <div className="items-center justify-center flex">
          <OtpInput value={otp} onChange={setOtp} length={4} />
        </div>
        <p className="text-sm text-center text-black dark:text-white">OR</p>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="text-black dark:text-white capitalize text-sm">
              enter your new email address
            </span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter  your email"
            className="border w-full h-10 md:h-10 px-5  md:text-sm rounded-md outline-none focus:border-slate-400 dark:bg-black dark:placeholder:text-gray-100 dark:text-white text-black"
          />
        </div>
        <div className="mt-4">
          <Link href="/new-password" className="btn w-full bg-sanBlue text-white">
            Submit
          </Link>
        </div>
      </form>
    </section>
  );
};
export default OtpVerification;

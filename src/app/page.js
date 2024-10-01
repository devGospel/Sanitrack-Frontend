"use client"
import { useAuthRolesState } from "@/components/context/AuthRolesContext";
import Login from "@/components/login/LoginForm";
import RoleModal from "@/components/login/RoleModal";
import ModalComponent from "@/components/modals/Modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { modal } = useAuthRolesState();
  const [isModalOpen, setIsModalOpen] = useState(modal);
  const openModal = e => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={`lg:flex items-center justify-center w-full bg-white `}>
      <div
        className={`lg:w-full bg-[url("/login-bg.png")]  w-full flex flex-col h-screen  justify-center items-center bg-contain  lg:bg-cover bg-no-repeat  `}
      >
        <div className="rounded-md h-96 lg:h-auto  w-full lg:w-[35%] lg:px-20 lg:py-10 px-5 bg-sanLightBlue dark:bg-slate-900 py-5 flex flex-col justify-center lg:justify-start items-center">
          <div className="flex flex-col justify-center items-center  my-2 ">
            <h1 className="lg:text-4xl text-3xl text-black dark:text-white font-black pb-5 lg:pb-10">
              Login
            </h1>
            <p className="text-lg text-black dark:text-white">
              Enter your email to login to this app
            </p>
          </div>
          <Login />
       
          <div className="text-center flex items-end  gap-2 mt-3 text-lg lg:mt-5">
          <div>
            <p className=" text-base text-gray-500 ">
              By clicking the
              <span  className="font-bold text-black dark:text-white px-1 ">Login</span>
              button, you <br />{" "}
              <span className="font-bold  px-1 cursor-pointer ">
                {" "}
                <Link target="_blank" className="text-black dark:text-white font-bold" href="#">
                  agree to our Terms & Conditions
                </Link>
              </span>
            </p>
           <p className='underline cursor-pointer  text-black dark:text-white px-1'>
           <Link href='verification' >forgot password ?</Link>
           </p> 
          </div>
        </div>
        </div>
        {/* <div className="text-center flex flex-col gap-2 text-lg my-2">
          <div>
            <p className=" text-md text-Hwhite">
            Sign Up
            </p>
          </div>
        </div> */}
     
      </div>
      <ModalComponent isOpen={modal} onClose={closeModal} setIsModalOpen={setIsModalOpen}>
        <RoleModal closeModal={closeModal} />
      </ModalComponent>
    </div>
  );
}

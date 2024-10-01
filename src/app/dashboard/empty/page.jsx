'use client'
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";

const EmptyPage = () => {
  const {logout}=useAuth()
  return (
    <div className="bg-white dark:bg-slate-800 h-screen w-full flex flex-col gap-y-8 justify-center items-center">
      {" "}
      <div>
        <h1 className="text-center font-black text-6xl">400</h1>
        <h3>Looks like you have not been assigned a facility</h3>
      </div>
      <div className="ghost-container">
        <div className="ghost">
          <div className="face">
            <div className="eye"></div>
            <div className="eye-right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="shadow-ghost"></div>
      </div>
      <div className="bottom">
        <p>Boo, looks like you're a ghost, Contact your manager!</p>

        <div className="flex justify-between gap-5 mt-5">
          <Link href="/dashboard/home" className="w-full bg-sanBlue p-2 rounded text-white flex justify-center">
            Home
          </Link>
          <button onClick={logout} className="w-full bg-red-500 text-white">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default EmptyPage;

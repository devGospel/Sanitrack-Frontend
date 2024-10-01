/* eslint-disable react/no-unescaped-entities */
"use client"
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();
  return (
    <section className="page_404 w-full h-screen">
      <div className="">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg h-[500px]"></div>

              <div className="contant_box_404 text-lg font-bold text-sanBlue">
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <span
                  onClick={() => router.back()}
                  className="link_404 bg-sanBlue cursor-pointer"
                >
                  Go to Back
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;

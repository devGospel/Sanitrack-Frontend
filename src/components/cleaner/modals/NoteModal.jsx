"use client";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const NoteModal = ({ closeModal, saveNote, loading, allNotes }) => {
  console.log("fucking inspector", allNotes);
  const [note, setNote] = useState("");
  console.log("note changed", note);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("I am clicking on handle save", note);

    saveNote(note);
    setNote("");
  };
  var settings = {
    dots: true,
    infinite: allNotes?.length > 3,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 5000,
    autoplay: true,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className=" top-20 relative">
      <div>
        <div className="bg-white relative dark:bg-black z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full h-autooverflow-y-auto">
          {/* <div className="relative">
          <div className="absolute top-3 right-5">
            <FaWindowClose className="text-xl text-black cursor-pointer " />
          </div>
        </div> */}
          <span
            onClick={() => closeModal()}
            className="absolute top-5 right-5 "
          >
            <IoIosCloseCircleOutline className="text-black dark:text-white  text-lg" />
          </span>

          <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center flex-col items-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold pb-5">
                  Add Note
                </h3>
            
              </div>
              {allNotes?.length > 0 && (
                  <div className="py-5 px-3 w-full">
                    <Slider {...settings} className={""}>
                      {allNotes?.map((note) => (
                        <div key={note?._id}>
                          <p className="text-center dark:text-white text-black capitalize ">
                            {note?.note}
                          </p>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
            </div>
            <form
              onSubmit={handleSave}
              method="POST"
              encType="multipart/form-data"
            >
              <input
                id="note-input"
                type="text"
                placeholder="Enter notes here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full lg:w-full lg:min-w-96 h-14 text-lg border-2 border-blue-500 p-3 dark:text-white text-black rounded outline-none focus:border-emerald-500 transition-all placeholder-blue-300"
              />
              <div className="py-3 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                  <button
                    // type="button"
                    // onClick={handleSave}
                    disabled={loading}
                    className="inline-flex justify-center w-full lg:w-full min-w-96 rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    {loading ? "Loading..." : "  Add Note"}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;

"use client";
import React, { useState } from "react";

const GeneralNoteModal = ({ setGeneralNotes, }) => {
  const [note, setNote] = useState("");
  const handleSave = (e) => {
    e.preventDefault()
    setGeneralNotes(note);

  };
  return (
    <div className=" top-20">
      <div>
        <div className="bg-white z-50 overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full h-autooverflow-y-auto">
          {/* <div className="relative">
          <div className="absolute top-3 right-5">
            <FaWindowClose className="text-xl text-black cursor-pointer " />
          </div>
        </div> */}
          <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center items-center">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                <h3 className="text-lg leading-6 text-center text-black dark:text-white font-semibold pb-5">
                  Add General Note
                </h3>
              </div>
            </div>
            <div>
              <input
                id="note-input"
                type="text"
                placeholder="Enter notes here..."
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-14 text-lg border-2 border-blue-500 p-3 rounded outline-none focus:border-emerald-500 transition-all placeholder-blue-300"
              />
              <div className="py-3 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm  sm:w-full">
                  <button
                    // type="button"
                    onClick={handleSave}

                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-sanBlue text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    {"  Add General Note"}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralNoteModal;

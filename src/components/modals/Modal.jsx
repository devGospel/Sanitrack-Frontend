/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";

const ModalComponent = ({ isOpen, onClose, children, setIsModalOpen }) => {
  const closeModal = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-[1000] overflow-y-auto top-10 w-full left-0 "
          id="modal"
        >
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div
                className="absolute inset-0 bg-gray-500 opacity-75 z-[1000]"
                onClick={closeModal}
              />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-auto">
              &#8203;
            </span>
            <div
              className="inline-block align-center  bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
        // <div className="fixed  md:w-3/4 mx-auto lg:w-1/2 bg-white rounded shadow-lg z-50 ">
        //   <div className="  p-8">
        //     <button
        //       onClick={(e) => closeModal(e)}
        //       className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
        //     >
        //       <svg
        //         className="w-6 h-6"
        //         fill="none"
        //         stroke="currentColor"
        //         viewBox="0 0 24 24"
        //       >
        //         <path
        //           strokeLinecap="round"
        //           strokeLinejoin="round"
        //           strokeWidth="2"
        //           d="M6 18L18 6M6 6l12 12"
        //         />
        //       </svg>
        //     </button>
        //     {children}
        //   </div>
        // </div>
      )}
    </>
  );
};

export default ModalComponent;

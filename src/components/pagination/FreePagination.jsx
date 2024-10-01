// Navigate.js

import React from "react";

const FreePagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  firstPage,
  lastPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center pt-5">
      <ul className="pagination flex gap-x-4 items-center">
        <li onClick={previousPage} className="cursor-pointer ">
          <button
            className={`text-white text-sm border border-gray-200 px-2 py-0.5 bg-sanBlue rounded-[30px] ${
              currentPage > 1
                ? "cursor-pointer bg-sanBlue "
                : "cursor-not-allowed bg-sanLightBlue"
            }`}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => {
              paginate(number);
            }}
            className={`border border-gray-200 px-1 rounded-md cursor-pointer ${
              currentPage === number
                ? "text-white bg-sanBlue font-bold "
                : "text-black bg-sanLightBlue"
            } text-sm`}
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage}>
          <button
            className={`text-white ${
              currentPage < pageNumbers.length
                ? "cursor-pointer bg-sanBlue "
                : "cursor-not-allowed bg-sanLightBlue"
            } text-sm border border-gray-200 px-2 py-0.5  rounded-[30px]`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FreePagination;

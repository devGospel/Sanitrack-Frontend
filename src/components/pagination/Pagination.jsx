// Navigate.js

import React from "react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  firstPage,
  lastPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full ">
    <div className="flex justify-center   pt-5 ">
      <ul className="pagination flex gap-x-4 flex-wrap  justify-center  items-center ">
      
        <li
          onClick={previousPage}
          className="cursor-pointer text-black text-lg"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.7076 25.2925C20.8005 25.3854 20.8742 25.4957 20.9244 25.6171C20.9747 25.7385 21.0006 25.8686 21.0006 26C21.0006 26.1314 20.9747 26.2615 20.9244 26.3829C20.8742 26.5043 20.8005 26.6146 20.7076 26.7075C20.6146 26.8004 20.5043 26.8741 20.383 26.9244C20.2616 26.9747 20.1314 27.0006 20.0001 27.0006C19.8687 27.0006 19.7386 26.9747 19.6172 26.9244C19.4958 26.8741 19.3855 26.8004 19.2926 26.7075L9.29255 16.7075C9.19958 16.6146 9.12582 16.5043 9.07549 16.3829C9.02517 16.2615 8.99927 16.1314 8.99927 16C8.99927 15.8686 9.02517 15.7385 9.07549 15.6171C9.12582 15.4957 9.19958 15.3854 9.29255 15.2925L19.2926 5.2925C19.4802 5.10486 19.7347 4.99944 20.0001 4.99944C20.2654 4.99944 20.5199 5.10486 20.7076 5.2925C20.8952 5.48014 21.0006 5.73464 21.0006 6C21.0006 6.26536 20.8952 6.51986 20.7076 6.7075L11.4138 16L20.7076 25.2925Z"
              fill="#0096C4"
            />
          </svg>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => {
          
              paginate(number);
            }}
            className={`cursor-pointer ${
              currentPage +1  === number ? "text-black font-bold " : "text-gray-400"
            } text-sm`}
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="cursor-pointer text-black text-lg">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2924 25.2925C11.1995 25.3854 11.1258 25.4957 11.0756 25.6171C11.0253 25.7385 10.9994 25.8686 10.9994 26C10.9994 26.1314 11.0253 26.2615 11.0756 26.3829C11.1258 26.5043 11.1995 26.6146 11.2924 26.7075C11.3854 26.8004 11.4957 26.8741 11.617 26.9244C11.7384 26.9747 11.8686 27.0006 11.9999 27.0006C12.1313 27.0006 12.2614 26.9747 12.3828 26.9244C12.5042 26.8741 12.6145 26.8004 12.7074 26.7075L22.7074 16.7075C22.8004 16.6146 22.8742 16.5043 22.9245 16.3829C22.9748 16.2615 23.0007 16.1314 23.0007 16C23.0007 15.8686 22.9748 15.7385 22.9245 15.6171C22.8742 15.4957 22.8004 15.3854 22.7074 15.2925L12.7074 5.2925C12.5198 5.10486 12.2653 4.99944 11.9999 4.99944C11.7346 4.99944 11.4801 5.10486 11.2924 5.2925C11.1048 5.48014 10.9994 5.73464 10.9994 6C10.9994 6.26536 11.1048 6.51986 11.2924 6.7075L20.5862 16L11.2924 25.2925Z"
              fill="#0096C4"
            />
          </svg>
        </li>
       
      </ul>
    </div>
    </div>
  );
};

export default Pagination;

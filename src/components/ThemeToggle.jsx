"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { resolvedTheme, setTheme } = useTheme();
  // const [isChecked, setIsChecked] = useState(resolvedTheme);

  return (
    <>
      {/* {mounted && (
        <button
          className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
          onClick={() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
          }}
        >
          Change Theme
        </button>
      )} */}
      <div className="block items-center">
        <div className="md:px-5 flex gap-1 items-center relative">
          {/* <p className="text-red-500 font-semibold text-xs">Test</p> */}
          <input
            type="checkbox"
            className="opacity-0 w-20 h-10 absolute top-1 cursor-pointer"
            checked={resolvedTheme === "dark"}
            onChange={(e) => {
              e.preventDefault();
              if (resolvedTheme === "dark") {
                setTheme("light");
              } else setTheme("dark");
              // setIsChecked(e.target.checked);
            }}
          />
          <button
            className={`"transition ease-in-out duration-300 bg-gray-200 shadow-xl w-10 rounded-full focus:outline-none relative"${
              resolvedTheme === "dark"
                ? " border border-white "
                : " border border-white"
            }`}
          >
            <div
              className={`"transition ease-in-out duration-300 border-white  rounded-full h-5 w-5 shadow flex justify-center items-center p-1 " ${
                resolvedTheme === "dark"
                  ? "transform translate-x-full bg-black border border-white "
                  : "bg-white shadow-3xl"
              }`}
            >
              {resolvedTheme === "dark" ? (
                <FaMoon className="text-xs text-white" />
              ) : (
                <FaSun className="text-xs text-yellow-500" />
              )}
            </div>
          </button>

          {/* <p className="text-green-500 font-semibold text-xs">Live</p> */}
        </div>
      </div>
    </>
  );
}

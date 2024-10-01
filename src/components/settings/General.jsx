import React from "react";

const General = () => {
  return (
    <div>
      {" "}
      <form>
        <div className="w-full bg-white dark:bg-black rounded-lg p-5 mx-auto mt-8 flex overflow-hidden rounded-b-none">
          <div className="w-1/3 bg-gray-100 dark:bg-sanLightBlue border-white border-2 p-8 hidden md:inline-block">
            <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">
              Profile Info
            </h2>
            <p className="text-xs text-gray-500">
              Update your basic profile information such as Email Address, Name,
              and Image.
            </p>
          </div>
          <div className="md:w-2/3 w-full">
            <div className="py-8 px-16">
              <label for="name" className="text-sm text-gray-600 dark:text-white">
                Name
              </label>
              <input
                className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none  dark:bg-sanLightBlue dark:placeholder:text-gray-100 dark:text-black text-black"
                type="text"
               
                name="name"
              />
            </div>
            <hr className="border-gray-200" />
            <div className="py-8 px-16">
              <label htmlFor="email" className="text-sm text-gray-600 dark:text-white">
                Email Address
              </label>
              <input
               className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none  dark:bg-sanLightBlue dark:placeholder:text-gray-100 dark:text-black text-black"
                type="email"
                name="email"
                id="email"
              
              />
            </div>
            <hr className="border-gray-200" />
            <div className="py-8 px-16 clearfix">
              <label for="photo" className="text-sm text-gray-600 w-full block dark:text-white">
                Photo
              </label>
              <img
                className="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left"
                id="photo"
                src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_400x400.jpg"
                alt="photo"
              />
              <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                <input
                  type="file"
                  name="photo"
                  onchange="loadFile(event)"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />{" "}
                Change Photo
              </div>
            </div>
          </div>
        </div>
        {/* <div className="p-16 py-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200">
          <p className="float-left text-xs text-gray-500 tracking-tight mt-2">
            Click on Save to update your Profile Info
          </p>
          <input
            type="submit"
            className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer"
            value="Save"
          />
        </div> */}
      </form>
    </div>
  );
};

export default General;

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const policeEmergencyCallCenter = () => {
  return (
    <section>
      <div className="mx-12 my-12 bg-white rounded-md px-2 py-1 border border-black">
        <h1 className="text-gray-900 font-bold px-2 rounded-md my-1 text-xl uppercase">
          ECC - EMERGENCY CALL CENTER
        </h1>
        <div className="mx-4 my-2">
          <form onSubmit={() => {}}>
            <div className="relative z-0 w-full mb-6 my-2 group text-black">
              <label>Case Id : CCNU 0519 2023 0001</label>
            </div>
            <div className="relative z-0 w-full mb-6 group text-black">
              <label>Caller Number : 0784126369</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="driving_license"
                id="driving_license"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Location
              </label>
              <label className="text-black">
                Location will be loaded from the google api
              </label>
              <br />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="driving_license"
                id="driving_license"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Cause
              </label>
              <label className="text-black">Cause will a dropdown</label>
              <br />
              <label className="text-black">
                Can chose multiple causes also
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="vehicle_number"
                id="vehicle_number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="port_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Description
              </label>
            </div>
            <div className="mx-auto">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mx-auto font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
              >
                <AiOutlineSearch />
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default policeEmergencyCallCenter;

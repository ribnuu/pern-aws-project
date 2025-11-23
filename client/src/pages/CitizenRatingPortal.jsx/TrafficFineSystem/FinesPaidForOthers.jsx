import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const FinesPaidForOthers = () => {
  return (
    // <section className="mx-12 my-12 border border-black">
    // <section className="bg-gray-50 lg:mx-12 my-12 rounded-md dark:bg-gray-900 border border-black">
    <section className="bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="">
        {/* <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-4">
          <div className="bg-white text-gray-950 rounded-lg px-8 py-4">
            <Link to="dps">DRIVER POINTS SYSTEM</Link>
          </div>
        </div> */}
        <div className="bg-white rounded-lg p-5 mt-4">
          <form onSubmit={() => {}}>
            <div className="relative z-0 w-full mb-6 group flex items-center">
              <div className="relative z-0 w-full mb-1 group mt-0">
                <label
                  htmlFor="driverLicenseNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Driver License Number
                </label>
                <input
                  type="text"
                  name="driverLicenseNo"
                  id="driverLicenseNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  //   onChange={handleChange}
                  //   value={driverLicenseNo}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default FinesPaidForOthers;

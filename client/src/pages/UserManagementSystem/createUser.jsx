import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const createUser = () => {
  return (
    <section className="">
      <div className="mx-12 my-12 bg-white">
        <div className="bg-white rounded-lg p-8 mt-4">
          <form onSubmit={() => {}}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="ip_address"
                id="ip_address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="ip_address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                onChange={() => {}}
                value=""
              >
                Username
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="password"
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
                Password
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group border-gray-950 border-2 rounded-lg">
              <select className="select w-full text-white">
                <option disabled selected>
                  Select the Department
                </option>
                <option>Police</option>
                <option>Army</option>
                <option>STF</option>
                <option>Navy</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group border-gray-950 border-2 rounded-lg">
              <select className="select w-full text-white">
                <option disabled selected>
                  Select the branch
                </option>
                <option>Police Station - Wellawatte</option>
                <option>Police Station - Dehiwala</option>
                <option>Police Station - Pettah</option>
                <option>Police Station - Mount Lavinia</option>
              </select>
            </div>

            <div className="relative z-0 lg:w-full mb-6 groupflex justify-between gap-12">
              <Link to="/ums/assign">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
                >
                  <AiOutlineUserAdd className="my-auto" />
                  Create User
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-12">
        If it is for a police officer , the badge number will act as a user name
        and they can choose their password , and if the badge number is unique.
        <br />
        <br />
        USER LOGIN
        <br />
        1 user can have only 1 login
        <br />
        1 user has only 1 device access
        <br />
        New device access is not authorized
        <br />
        Device has to be disconnected in-order to activate new device
      </div>
    </section>
  );
};

export default createUser;

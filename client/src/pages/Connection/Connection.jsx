import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

// code for connection managine engine
const Connect = () => {
  return (
    <section>
      <div className="flex flex-row-reverse my-4">
        <Link to="/dcm">
          <button className="bg-gray-800 px-2 py-4 flex mx-4 gap-4">
            <BsPlusLg />
            <span className="text-xs text-white">NEW CONNECTION</span>
          </button>
        </Link>
      </div>
      <div className="bg-white mx-12 my-12 py-3 rounded-md border border-black">
        <h1 className="text-2xl text-gray-800 mx-4 font-bold uppercase">
          CME - Connection Managing Engine
        </h1>
        <div className="grid mx-4 lg:grid-cols-3 gap-4 my-8 text-white">
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className="mx-2 text-2xl">Examination</span>
            <div className="flex flex-col gap-2 mr-2 my-1">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className=" mx-2 text-2xl">Immigration</span>
            <div className="flex flex-col gap-2 mr-2 my-1">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className=" mx-2 text-2xl">Motor Department</span>
            <div className="flex flex-col gap-2 mr-2 my-1 p-1 rounded-lg">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className=" mx-2 text-2xl">Police Department</span>
            <div className="flex flex-col gap-2 mr-2 my-1">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className=" mx-2 text-2xl">CCC - CENTRAL CYBER COMMAND</span>
            <div className="flex flex-col gap-2 mr-2 my-1">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-gray-950 rounded-md flex justify-between">
            <span className=" mx-2 text-2xl">HORTON PLAINS</span>
            <div className="flex flex-col gap-2 mr-2 my-1">
              <div className="bg-green-500 px-6 py-2 rounded-full"></div>
              <div className="bg-amber-300 px-6 py-2 rounded-full"></div>
              <div className="bg-red-400 px-6 py-2 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="text-gray-950 mx-4">
          If double clicked , the connection string of the particular departmnet
          must be shown under
        </div>
      </div>
    </section>
  );
};

export default Connect;

import React from "react";
import { GrCircleInformation } from "react-icons/gr";
import { FcRating } from "react-icons/fc";
import { CiCircleRemove } from "react-icons/ci";
import { VscCompassActive } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFillUsbPlugFill, BsPeople } from "react-icons/bs";

const sidebar = ({ children }) => {
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/home"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiFillHome />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/connection"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsFillUsbPlugFill />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Connection
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/requisition/requisition"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <VscCompassActive />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Requisition
                </span>
              </Link>
            </li>
            <li>
              {/* <Link to="/character" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                   <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                   <span className="flex-1 ml-3 whitespace-nowrap">Character</span>
                </Link> */}
            </li>
            <li>
              <Link
                to="/characterInfo"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GrCircleInformation />
                <span className="flex-1 ml-3 whitespace-nowrap">Info</span>
              </Link>
            </li>
            <li>
              <Link
                to="/characterRating"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FcRating />
                <span className="flex-1 ml-3 whitespace-nowrap">Rating</span>
              </Link>
            </li>
            <li>
              <div className="dropdown dropdown-bottom z-20">
                <label
                  tabIndex={0}
                  className=" flex gap-3 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CiCircleRemove /> Offense Portal
                </label>
                <ul
                  tabIndex={0}
                  className="border-2 border-sky-500 dropdown-content menu shadow bg-gray-800 rounded-box w-52 z-20 m-2 p-4"
                >
                  <li>
                    <Link to="/offense/issue">Issue Fine</Link>
                  </li>
                  <li>
                    <Link to="/offense/select">Select Fine</Link>
                  </li>
                  <li>
                    <Link to="/offense/payment">Pay Fine</Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown dropdown-bottom z-20">
                <label
                  tabIndex={0}
                  className=" flex gap-3 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsPeople /> Citizen Portal
                </label>
                <ul
                  tabIndex={0}
                  className="border-2 border-sky-500 dropdown-content menu shadow bg-gray-800 rounded-box w-52 z-20 m-2 p-4"
                >
                  <li>
                    <Link to="/citizen/payment">Pay Fine</Link>
                  </li>
                </ul>
              </div>
              {/* <div className="dropdown dropdown-right z-20">

               <label tabIndex={0} className=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Click</label>
               <ul tabIndex={0} className="border-2 border-sky-500 dropdown-content menu shadow bg-gray-800 rounded-box w-52 z-20 m-2 p-4">
               <li><a>Issue Fine</a></li>
               <li><a>Select Fine</a></li>
               <li><a>Pay Fine</a></li>
               </ul>
            </div> */}
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 z-10">{children}</div>
    </div>
  );
};

export default sidebar;

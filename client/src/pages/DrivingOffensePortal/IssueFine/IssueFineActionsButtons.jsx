import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const IssueFineActionButtons = ({ handleProceedToOffenseSelection }) => {
  return (
    <div className="relative z-0 lg:w-full mb-6 group flex justify-between gap-12 bg-white px-4 py-1 rounded-lg">
      <button
        onClick={handleProceedToOffenseSelection}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
      >
        <AiOutlineSearch className="my-auto" />
        Proceed to offense selection
      </button>
      <Link to="/dop/issues-without-fine">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
        >
          <AiOutlineSearch className="my-auto" />
          Proceed to issues without fine
        </button>
      </Link>
    </div>
  );
};

export default IssueFineActionButtons;

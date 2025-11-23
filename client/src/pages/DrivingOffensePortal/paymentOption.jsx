import React from "react";
import { Link, useNavigate } from "react-router-dom";

const paymentOption = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-5">
      {/* <div className='mx-12 my-12 bg-white'> */}
      {/* <div className='bg-white rounded-lg p-8 mt-4'> */}
      {/* <div className='space-y-6 justify-center'> */}
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <button
          onClick={(e) => {
            navigate("/dop/payment");
          }}
        >
          {/* <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase text-blue-500"> */}
          <div
            className={`bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase`}
          >
            Police Officer Portal
          </div>
        </button>
        <button
          onClick={(e) => {
            navigate("/cgp/payment");
          }}
        >
          {/* <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase text-blue-500"> */}
          <div
            className={`bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase`}
          >
            Citizen Application Portal
          </div>
        </button>
        <button
          onClick={(e) => {
            navigate("/ccs");
          }}
        >
          {/* <div className="bg-white border border-gray-900 rounded-md px-4 py-2 uppercase text-blue-500"> */}
          <div
            className={`bg-white text-blue-500 border border-gray-900 rounded-md px-4 py-2 uppercase`}
          >
            Court Case System
          </div>
        </button>
        {/* <div className='text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-10 py-2.5 text-center text-5xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2'>
                        <Link to='/dop/payment'>
                            Police Officer Portal
                        </Link>
                    </div>
                    <div className='text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-10 py-2.5 text-center text-5xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2'>
                        <Link to='/cgp/payment'>
                            Citizen Application Portal
                        </Link>
                    </div>
                    <div className='text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-10 py-2.5 text-center text-5xl dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2'>
                        <Link to='/ccs'>
                            Court Case System
                        </Link>
                    </div> */}
      </div>
      {/* </div>
        </div> */}
    </section>
  );
};

export default paymentOption;

import React from "react";

const departmentUniqueDashboard = () => {
  return (
    <section className="py-4 border border-black rounded-md">
      <div className="mx-14 my-12 bg-white p-4 rounded-md   ">
        <h1 className="text-gray-900 font-bold mx-auto  my-1 text-xl uppercase">
          DUD - DEPARTMENTAL UNIQUE DASHBOARD
        </h1>
      </div>
      <div className="mx-12 my-12 rounded-md ">
        <div className="h-full text-gray-950 rounded-md  md:grid gap-4 md:grid-cols-3 z-0 px-2 py-2">
          <div className="bg-white p-2 flex flex-col gap-2 rounded-md ">
            <div className="">
              <p className="text-xl font-extrabold border-2 border-gray-950 rounded-md  bg-white m-1 px-4 py-1 my-2">
                Police Department
              </p>
            </div>
            <div
              className="bg-white h-48 rounded-md  home-scroll border-2 border-gray-950 px-2 py-2 
            z-10 flex flex-col gap-2"
            >
              <p className="bg-gray-300 border-2 border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                Wellawatta Police <br />
                7476376376V
              </p>
              <p className="bg-gray-300 border-2 border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                Dehiwala Police <br />
                8976376376V
              </p>
              <p className="bg-gray-300 border-2 border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                Bambalapitiya Police <br />
                2003376376V
              </p>
              <p className="bg-gray-300 border-2 border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                Pettah Police <br />
                9976376554X
              </p>
              <p className="bg-gray-300 border-2 border-gray-300 rounded-md  px-2 hover:bg-gray-850 hover:text-green-500">
                Pettah Police <br />
                9976376554X
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        This is to show which police station or unit is requesting information
        about which individual. This dashboard is given to all the departments
        that are giving data to the CCC. Ideally , each department knows which
        information they are giving to whom.
      </div>
    </section>
  );
};

export default departmentUniqueDashboard;

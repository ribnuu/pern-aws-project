import React from "react";

const crimeSummaryScreen = () => {
  return (
    <section className="mx-12 my-12 bg-white p-4 rounded-md  border border-black">
      <h1 className="text-gray-900 font-bold mx-auto my-1 text-xl uppercase">
        CSS - CRIME SUMMARY SCREEN
      </h1>
      <div className="grid grid-cols-4 gap-2">
        <div className="relative z-0 w-full justify-center group flex text-black">
          <div>
            <label>Select Province </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select province --{" "}
              </option>
              <option value="Top">Western</option>
              <option value="Low">Southern</option>
            </select>
          </div>
        </div>
        <div className="relative z-0 w-full justify-center group flex text-black">
          <div>
            <label>Select District </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select district --{" "}
              </option>
              <option value="Top">Colombo</option>
              <option value="Low">Kandy</option>
            </select>
          </div>
        </div>
        <div className="relative z-0 w-full justify-center group flex text-black">
          <div>
            <label>Select Division </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select Division --{" "}
              </option>
              <option value="Top">Dehiwala</option>
              <option value="Low">Wellawatte</option>
            </select>
          </div>
        </div>
        <div className="relative z-0 w-full justify-center group flex text-black">
          <div>
            <label>Select Crime </label>
            <select
              name="province"
              id="province"
              form="province"
              className="bg-white px-2"
            >
              <option disabled selected value>
                {" "}
                -- select crime --{" "}
              </option>
              <option value="Top">Murder</option>
              <option value="Low">Theft</option>
            </select>
          </div>
        </div>
        <div className="relative z-0 w-full justify-center group flex text-black">
          <label>Start Date : </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="text-white"
          />
        </div>
        <div className="relative z-0 w-full justify-center group flex text-black">
          <label>End Date : </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default crimeSummaryScreen;

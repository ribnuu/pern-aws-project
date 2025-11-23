import React from "react";
import { Link } from "react-router-dom";

const dutyAllocationSystem = () => {
  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/das/allocate">Allocate Duty</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/das/past-duties">Past Duties Records</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/das/report">Report Duty</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/das/location-confirmation">Location Confirmation</Link>
        </div>
      </div>
      <div>
        13. when a officer is assigned to do a duty at a point the OIC doesn’t
        have to go on the jeep and find whether the guy is on the duty.
        Sometimes they put the duty this guys goes for shopping so it doesn’t
        have to happen while visiting. They don’t have to waste a driver,
        vehicle and the petrol all can be seen online via the portal whether the
        guys Is there at the right point.
        <br />
        This page will also show a live map of the police officers on duty on
        all the locations
      </div>
    </section>
  );
};

export default dutyAllocationSystem;

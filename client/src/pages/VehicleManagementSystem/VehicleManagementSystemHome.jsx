import React from "react";
import { Link } from "react-router-dom";

const VehicleManagementSystemHome = () => {
  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-md border border-black px-8 py-4">
          <Link to="/vms/allocate">Vehicles Allocation</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md border border-black px-8 py-4">
          <Link to="/vms/repair">Repair Vehicles</Link>
        </div>
      </div>
    </section>
  );
};

export default VehicleManagementSystemHome;

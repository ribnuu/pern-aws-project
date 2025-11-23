import React from "react";
import { Link } from "react-router-dom";

const departmentOfArchaeology = () => {
  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/doa/load">Load Location</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/doa/load">Set Location</Link>
        </div>
      </div>

      <div>
        There will be a map shown here for the archareological department staff
        to tag the protected places that are identified as the archeaological
        locations.
        <br />
        This map is also shared to the police and stf in order to protect the
        locations from treasure hunters that are entering without proper
        permissions Load location , set Location ,
      </div>
    </section>
  );
};

export default departmentOfArchaeology;

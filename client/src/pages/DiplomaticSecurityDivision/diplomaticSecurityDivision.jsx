import React from "react";
import { Link } from "react-router-dom";

const diplomaticSecurityDivision = () => {
  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dsd/load">Load Location</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dsd/set">Set Locations</Link>
        </div>
      </div>
      <div>
        This page will show a list of diplomatic security assingments where
        security is deployed to diplomatic locations. It will also show a live
        map of diplomatic locations and in charge officer who is reponsible for
        the security
        <br />
      </div>
    </section>
  );
};

export default diplomaticSecurityDivision;

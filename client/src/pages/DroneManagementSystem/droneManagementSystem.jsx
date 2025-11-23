import React from "react";
import { Link } from "react-router-dom";

// code for the drone monitoring system page
const droneManagementSystem = () => {
  return (
    <section className="mx-12 my-12">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-3 gap-4 text-sm font-black py-12">
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dms/register">Drone Register</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dms/repair">Drone Live Monitor</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dms/repair">Drone Media Channels</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-md  border border-black px-8 py-4">
          <Link to="/dms/repair">Drone Rules and Regulations</Link>
        </div>
      </div>
      <div className="mx-4 my-4 text-black">
        This system handles drone monitoring and drone dispatching.
        <br />
        Drone flies and on the screen it will run the registration plate and
        ownership
        <br />
        <br />
      </div>
    </section>
  );
};
export default droneManagementSystem;

import { Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const DriverMenu = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/cgp/mdr/registration">House Driver Registration</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/cgp/mdr/view">View My House Driver</Link>
        </div>
      </div>
    </section>
  );
};

export default DriverMenu;

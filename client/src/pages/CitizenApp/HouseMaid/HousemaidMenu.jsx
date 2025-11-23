import { Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;

const HousemaidMenu = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/cgp/hmr/registration">House Maid Registration</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/cgp/hmr/view">View My House Maid</Link>
        </div>
      </div>
    </section>
  );
};

export default HousemaidMenu;

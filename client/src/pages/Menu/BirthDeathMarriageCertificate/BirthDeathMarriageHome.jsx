import { Link, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from "react";
const server_port = import.meta.env.VITE_NODE_SERVER_ENDPOINT;
import axios from "axios";

const nullHome = () => {
  const component_id = "1004000000000006";
  const [HomeMenuQuery] = useOutletContext();
  const [UserButtonList, setUserButtonList] = useState("");
  const [ArrayList, setArrayList] = useState([]);
  const [unchangedArrayList, setunchangedArrayList] = useState([]);

  return (
    <section className="">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/dmd/birth">Birth Certificate</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/dmd/death">Death Certificate</Link>
        </div>
        <div className="bg-white text-gray-950 rounded-lg px-8 py-2 border border-black">
          <Link to="/dmd/marriage">Marriage Certificate</Link>
        </div>
      </div>
    </section>
  );
};

export default nullHome;

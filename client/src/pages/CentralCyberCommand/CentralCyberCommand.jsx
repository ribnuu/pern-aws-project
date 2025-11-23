import React from "react";
import { useNavigate } from "react-router-dom";

const CentralCyberCommand = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-5">
      <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <button
          onClick={(e) => navigate("find-person-or-vehicle")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Find Person or Vehicle
        </button>
        <button
          onClick={(e) => navigate("remote-termination")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Connect to terminals
        </button>
        <button
          onClick={(e) => navigate("remote-termination")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Remote termination
        </button>
        <button
          onClick={(e) => navigate("connection-status")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Connection Status
        </button>
        <button
          onClick={(e) => navigate("/variable-settings")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Variable Settings
        </button>
        <button
          onClick={(e) => navigate("/links")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Test Server Connection
        </button>
        <button
          onClick={(e) => navigate("/val")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Validation
        </button>
        <button
          onClick={(e) => navigate("/todo")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          To do
        </button>
        <button
          onClick={(e) => navigate("/workstation-settings")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          SETTINGS - WORKSTATION TERMINAL
        </button>
        <button
          onClick={(e) => navigate("audio-controls")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          SETTINGS - AUDIO CONTROLS
        </button>
        <button
          onClick={(e) => navigate("widget-manager")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Widget Manager
        </button>
        <button
          onClick={(e) => navigate("auditing")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Auditing
        </button>
        <button
          onClick={(e) => navigate("ip-address-settings")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          Ip Address Settings
        </button>
        <button
          onClick={(e) => navigate("wlr")}
          className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left uppercase"
        >
          SETTINGS - WHITELIST ROUTES
        </button>
      </div>
    </section>
  );
};

export default CentralCyberCommand;

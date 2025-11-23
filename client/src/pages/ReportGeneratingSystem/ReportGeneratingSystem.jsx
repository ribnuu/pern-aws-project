import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ReportGeneratingSystem = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-5">
      <div className=" grid grid-cols-1 lg:grid lg:grid-cols-4 gap-2 text-sm font-black">
        <button onClick={(e) => navigate("css")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            CSS - CRIME SUMMARY SCREEN
          </div>
        </button>
        <button onClick={(e) => navigate("dss")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            DSS - DAILY SUMMARY SCREEN
          </div>
        </button>
        <button onClick={(e) => navigate("pfu")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            PFU - POLICE FORCE UPDATE
          </div>
        </button>
        <button onClick={(e) => navigate("bcr")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            BEST COP REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("orr")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            OFFENSE REDUCTION REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("tor")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            TRAFFIC OFFENSE REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("moc")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            MOST OFFENCE COP
          </div>
        </button>
        <button onClick={(e) => navigate("loc")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            LEAST OFFENCE COP
          </div>
        </button>
        <button onClick={(e) => navigate("dbs")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            DISTRICT BEST STATION
          </div>
        </button>
        <button onClick={(e) => navigate("pbs")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            PROVINCE BEST STATION
          </div>
        </button>
        <button onClick={(e) => navigate("cbs")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            COUNTRY BEST STATION
          </div>
        </button>
        <button onClick={(e) => navigate("nsc")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            NO SICKNESS COP
          </div>
        </button>
        <button onClick={(e) => navigate("wac")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            WORST ATTENDANCE COP
          </div>
        </button>
        <button onClick={(e) => navigate("holiday-update-report")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            HOLIDAY UPDATE REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("hospitalized-cop-report")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            HOSPITALISED COP REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("leave-update-report")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            LEAVE UPDATE REPORT
          </div>
        </button>
        <button onClick={(e) => navigate("travel-route-report")}>
          <div className="bg-white border border-gray-900 rounded-md px-4 py-2 text-blue-500 text-left">
            TRAVEL ROUTE REPORT
          </div>
        </button>
      </div>
    </section>
  );
};

export default ReportGeneratingSystem;

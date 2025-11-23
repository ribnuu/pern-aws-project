import React, { useState } from "react";
import LicenseIssueReport from "./LicenseIssueReport/LicenseIssueReport";
import InsightsView from "./InsightsView/InsightsView";

const TrafficOffensesReport = () => {
  const [state, setState] = useState({
    insights: true,
    offensesToday: false,
    topStationsToday: false,
    topOfficersToday: false,
    licenseIssueReport: false,
  });

  const handleToggle = (key) => {
    setState((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, k) => ({ ...acc, [k]: k === key ? !prev[k] : false }),
        {}
      ),
    }));
  };

  return (
    <>
      <div className="mx-5 grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
        <button
          className={`${
            state.insights
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("insights")}
        >
          Insights
        </button>
        <button
          className={`${
            state.offensesToday
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("offensesToday")}
        >
          Offenses Today
        </button>
        <button
          className={`${
            state.topStationsToday
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("topStationsToday")}
        >
          Top stations today
        </button>
        <button
          className={`${
            state.topOfficersToday
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("topOfficersToday")}
        >
          Top officers today
        </button>
        <button
          className={`${
            state.licenseIssueReport
              ? "bg-green-500 text-white"
              : "bg-white text-blue-500"
          } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
          onClick={() => handleToggle("licenseIssueReport")}
        >
          License Issue Report
        </button>
      </div>

      <div>{state.licenseIssueReport && <LicenseIssueReport />}</div>
      <div>{state.insights && <InsightsView />}</div>
    </>
  );
};

export default TrafficOffensesReport;

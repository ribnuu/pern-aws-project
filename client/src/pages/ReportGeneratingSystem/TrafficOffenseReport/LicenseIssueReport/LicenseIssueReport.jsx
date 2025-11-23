import React from "react";
// import useAppFilters from "../../../../hooks/useAppFilters";
import TrafficOffenseReportFilters from "../Filters/Filters";

const LicenseIssueReport = () => {
  // const { updateFilter } = useAppFilters({ filterType: "LicenseIssueReport" });

  return (
    <section className="mx-5 mt-8 text-black">
      <TrafficOffenseReportFilters filterType={"LicenseIssueReport"} />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="px-4 py-2">License In Hand</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicenseIssueReport;

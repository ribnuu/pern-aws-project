import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import InsightsDataView from "./InsightsDataView";
import InsightsFilters from "../InsightsFilters/InsightsFilters";
import { useSelector } from "react-redux";

const InsightsView = () => {
  const defaultFilters = useMemo(
    () => ({
      fromDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0], // Format to YYYY-MM-DD
      toDate: new Date().toISOString().split("T")[0],
      filterBy: "PROVINCE",
      dispatchedStatus: "ALL",
      chartType: "COLUMN",
      dataFor: "TRAFFIC_OFFENSE",
      // fromDate: new Date().toISOString().split("T")[0], // Format to YYYY-MM-DD
      // toDate: new Date(new Date().setDate(new Date().getDate() + 1))
      //   .toISOString()
      //   .split("T")[0], // 10 days from today
    }),
    []
  );

  const appFilters = useSelector((state) => state.appFiltersReducer.filters);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (appFilters?.dataFor === "TRAFFIC_OFFENSE") {
      setTitle("Traffic Offense");
    }
    if (appFilters?.dataFor === "REVENUE") {
      setTitle("Revenue");
    }
  }, [appFilters?.dataFor]);

  return (
    <section className="mx-5 mt-8 text-black">
      <InsightsFilters
        filterType={"InsightsView"}
        defaultFilters={defaultFilters}
      />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* {loading && <LinearProgress color="primary" />} */}
            <h1 className="text-2xl font-bold mb-6">{title} Insights</h1>
            <InsightsDataView />
            {/* <LicenseTable licenseData={licenseInHand} loading={loading} /> */}
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default InsightsView;

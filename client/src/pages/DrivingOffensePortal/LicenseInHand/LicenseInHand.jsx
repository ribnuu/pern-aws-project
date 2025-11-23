import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLicenseInHandApi } from "../../../apis/TrafficOffenseReportApiService";
import { LinearProgress } from "@mui/material";
import LicenseTable from "./LicenseTable";
import { Toaster } from "react-hot-toast";
import TrafficOffenseReportFilters from "../Filters/Filters";

const LicenseInHand = () => {
  const appFilters = useSelector((state) => state.appFiltersReducer.filters);
  const [originalLicenseData, setOriginalLicenseData] = useState([]); // Original data
  const [licenseInHand, setLicenseInHand] = useState([]); // Filtered data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getLicenseInHandApi(appFilters);
        if (response.success) {
          setOriginalLicenseData(response.data); // Store fetched data as original data
          setLicenseInHand(response.data); // Set initial view to all data
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appFilters?.userId, appFilters?.fromDate, appFilters?.toDate]);

  useEffect(() => {
    if (appFilters?.dispatchedStatus) {
      setLoading(true);

      // Apply the dispatched status filter
      switch (appFilters.dispatchedStatus) {
        case "DISPATCHED":
          setLicenseInHand(
            originalLicenseData.filter(
              (item) =>
                item.licenseDispatches && item.licenseDispatches.length > 0
            )
          );
          break;

        case "IN_HAND":
          setLicenseInHand(
            originalLicenseData.filter(
              (item) =>
                !item.licenseDispatches || item.licenseDispatches.length === 0
            )
          );
          break;

        case "ALL":
        default:
          setLicenseInHand(originalLicenseData);
          break;
      }

      setLoading(false);
    }
  }, [appFilters?.dispatchedStatus]);

  useEffect(() => {
    if (appFilters?.province_id) {
      setLicenseInHand(
        originalLicenseData.filter(
          (item) =>
            item.policeStation &&
            item.policeStation.province_id === appFilters?.province_id
        )
      );
    }

    if (appFilters?.district_id) {
      setLicenseInHand(
        originalLicenseData.filter(
          (item) =>
            item.policeStation &&
            item.policeStation.district_id === appFilters?.district_id
        )
      );
    }

    if (appFilters?.police_division_id) {
      setLicenseInHand(
        originalLicenseData.filter(
          (item) =>
            item?.policeStation?.policeDivision &&
            item?.policeStation?.policeDivision?.id ===
              appFilters?.police_division_id
        )
      );
    }
  }, [
    appFilters?.province_id,
    appFilters?.district_id,
    appFilters?.police_division_id,
  ]);

  return (
    <section className="mx-5 mt-8 text-black">
      <TrafficOffenseReportFilters filterType={"LicenseInHand"} />
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 w-full xl:p-0 dark:bg-gray-800 border border-black">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* {loading && <LinearProgress color="primary" />} */}
            <h1 className="text-2xl font-bold mb-6">License in hand</h1>
            <LicenseTable licenseData={licenseInHand} loading={loading} />
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default LicenseInHand;

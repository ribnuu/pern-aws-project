import React, { useEffect, useState } from "react";
import { getLicenseInHandInsightsDataByFiltersApi } from "../../../../apis/CccPoliceTrafficOffenseInsightsApiService";
import LISpinnerWithTextTwo from "../../.././../components/LoadingIndicators/LISpinnerWithTextTwo";
import { useSelector } from "react-redux";
import BarcharTest from "./BarcharTEst";
import PieChartTest from "./PieChartTest";
import DonutChartTest from "./DonutChartTest";
import BarChartWithCustomLabelsTest from "./BarChartWithCustomLabelsTest";

const InsightsDataView = () => {
  const appFilters = useSelector((state) => state.appFiltersReducer.filters);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (appFilters.filterBy === "OFFICER" && !appFilters?.officerId) {
          return;
        }
        setLoading(true);
        const data = await getLicenseInHandInsightsDataByFiltersApi(appFilters);
        if (data?.success) {
          setData(data.data.data);
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    appFilters?.dataFor,
    appFilters?.filterBy,
    appFilters?.fromDate,
    appFilters.toDate,
    appFilters?.provinceId,
    appFilters?.dispatchedStatus,
    appFilters?.officerId,
  ]);
  return (
    <>
      {loading && <LISpinnerWithTextTwo label="Loading Bills..." />}

      {!loading && (
        <>
          {appFilters?.chartType === "COLUMN" && (
            <BarcharTest data={data} categories={categories} />
          )}
          {appFilters?.chartType === "PIE" && (
            <PieChartTest series={data} labels={categories} />
          )}
          {appFilters?.chartType === "DONUT" && (
            <DonutChartTest series={data} labels={categories} />
          )}
          {appFilters?.chartType === "BAR" && (
            <BarChartWithCustomLabelsTest
              seriesData={data}
              categories={categories}
              title={""}
              subtitle={""}
            />
          )}
        </>
      )}
    </>
  );
};

export default InsightsDataView;

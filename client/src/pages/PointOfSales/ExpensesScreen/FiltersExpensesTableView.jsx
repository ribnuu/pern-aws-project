import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
// import useAppFilters from "../../../hooks/useAppFilters";

const FiltersExpensesTableView = ({ updateFilter }) => {
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);

  // Handle date changes
  const handleDateTimeChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateFilter(name, value);
    },
    [updateFilter]
  ); // Include updateFilter in the dependency array

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        {/* Box 1 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="fromDate"
            type="date"
            value={appFilters?.fromDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="Start Date"
          />
        </div>

        {/* Box 2 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="toDate"
            type="date"
            value={appFilters?.toDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersExpensesTableView;

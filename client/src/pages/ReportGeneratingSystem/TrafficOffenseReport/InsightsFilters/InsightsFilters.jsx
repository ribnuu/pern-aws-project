import React, { useCallback, useState } from "react";
import ProvinceSearch from "../../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../../components/CCC/DistrictSearch/DistrictSearch";
import useAppFilters from "../../../../hooks/useAppFilters";
import { useSelector } from "react-redux";
import PoliceDivisionSearch from "../../../../components/CCC/PoliceDivisionSearch/PoliceDivisionSearch";
import CccUserSearchByUserIdGroupIdAndSearchTerm from "../../../../components/CCC/CccUserSearchByUserIdGroupIdAndSearchTerm/CccUserSearchByUserIdGroupIdAndSearchTerm";

const InsightsFilters = ({ filterType, defaultFilters = {} }) => {
  const { updateFilter } = useAppFilters({
    filterType: filterType,
    defaultFilters,
  });
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);

  // const { updateFilter } = useAppFilters({ filterType }); // Use the passed filterType prop

  // Province Search
  const [loadingP, setLoadingP] = useState(false);
  const [searchTermP, setSearchTermP] = useState("");

  // District Search
  const [loadingD, setLoadingD] = useState(false);
  const [searchTermD, setSearchTermD] = useState("");

  // City Search
  const [loadingPoliceDivision, setLoadingPoliceDivision] = useState(false);
  const [searchTermPoliceDivision, setSearchTermPoliceDivision] = useState("");

  // Ccc User Search
  const [loadingCccUser, setLoadingCccUser] = useState(false);
  const [searchTermCccUser, setSearchTermCccUser] = useState("");

  const handleDateTimeChange = useCallback((e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  });

  return (
    <div className="bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        <div className="w-full md:w-2/12 space-y-1">
          <label>Data For</label>
          <select
            value={appFilters?.dataFor}
            defaultValue={appFilters?.dataFor || "Traffic Offense"}
            onChange={(e) => {
              e.preventDefault();
              if (appFilters?.dataFor !== "OFFICER") {
                setSearchTermCccUser("");
                updateFilter("officerId", null);
              }
              updateFilter("dataFor", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="TRAFFIC_OFFENSE">Traffic Offense</option>
            <option value="REVENUE">Revenue</option>
          </select>
        </div>

        <div className="w-full md:w-2/12 space-y-1">
          <label>Filter By</label>
          <select
            value={appFilters?.filterBy}
            defaultValue={appFilters?.filterBy || "PROVINCE"}
            onChange={(e) => {
              e.preventDefault();
              updateFilter("filterBy", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="PROVINCE">Province</option>
            <option value="DISTRICT">District</option>
            <option value="DIVISION">Division</option>
            <option value="OFFENSE">Offense</option>
            <option value="STATION">Station</option>
            <option value="OFFICER">Officer</option>
          </select>
        </div>
        {appFilters?.filterBy === "OFFICER" && (
          <div className="w-full md:w-2/12 space-y-1">
            <label>Filter By</label>
            <CccUserSearchByUserIdGroupIdAndSearchTerm
              onSelectUser={(user) => {
                updateFilter("officerId", user.user_id);
                // updateFilter("userId", user.user_id); // Assuming user object has a username\
              }}
              setLoading={setLoadingCccUser}
              loading={loadingCccUser}
              setSearchTerm={setSearchTermCccUser}
              searchTerm={searchTermCccUser}
              hideLabel={true}
              loadOnMount={false}
              groupId={9}
              roleId={null}
            />
          </div>
        )}

        <div className="w-full md:w-2/12 space-y-1">
          <label>Dispatched Status</label>
          <select
            value={appFilters?.dispatchedStatus}
            defaultValue={appFilters?.dispatchedStatus}
            onChange={(e) => {
              e.preventDefault();
              updateFilter("dispatchedStatus", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="ALL">All</option>
            <option value="DISPATCHED">Dispatched</option>
            <option value="IN_HAND">In Hand</option>
          </select>
        </div>

        {/* Box 3 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <label>From</label>
          <input
            name="fromDate"
            type="date"
            value={appFilters.fromDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="Start Date"
            style={{ height: "40px" }}
          />
        </div>

        {/* Box 4 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <label>To</label>
          <input
            name="toDate"
            type="date"
            value={appFilters.toDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="End Date"
            style={{ height: "40px" }}
          />
        </div>

        <div className="w-full md:w-2/12 space-y-1">
          <label>Chart Type</label>
          <select
            value={appFilters?.chartType}
            defaultValue={appFilters?.chartType || "COLUMN"}
            onChange={(e) => {
              e.preventDefault();
              updateFilter("chartType", e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="COLUMN">Column Chart</option>
            <option value="PIE">Pie Chart</option>
            <option value="DONUT">Donut Chart</option>
            <option value="BAR">Bar</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InsightsFilters;

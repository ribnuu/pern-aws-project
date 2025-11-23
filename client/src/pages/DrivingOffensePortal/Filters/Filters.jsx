import React, { useCallback, useMemo, useState } from "react";
import ProvinceSearch from "../../../components/CCC/ProvinceSearch/ProvinceSearch";
import DistrictSearch from "../../../components/CCC/DistrictSearch/DistrictSearch";
import CccUserSearchByUserIdGroupIdAndSearchTerm from "../../../components/CCC/CccUserSearchByUserIdGroupIdAndSearchTerm/CccUserSearchByUserIdGroupIdAndSearchTerm";
import useAppFilters from "../../../hooks/useAppFilters";
import { useSelector } from "react-redux";
import PoliceDivisionSearch from "../../../components/CCC/PoliceDivisionSearch/PoliceDivisionSearch";

const TrafficOffenseReportFilters = ({ filterType }) => {
  const defaultFilters = useMemo(
    () => ({
      fromDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0], // Format to YYYY-MM-DD
      toDate: new Date().toISOString().split("T")[0],
      // fromDate: new Date().toISOString().split("T")[0], // Format to YYYY-MM-DD
      // toDate: new Date(new Date().setDate(new Date().getDate() + 1))
      //   .toISOString()
      //   .split("T")[0], // 10 days from today
    }),
    []
  );
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
        <CccUserSearchByUserIdGroupIdAndSearchTerm
          onSelectUser={(user) => {
            updateFilter("userId", user.user_id); // Assuming user object has a username\
          }}
          setLoading={setLoadingCccUser}
          loading={loadingCccUser}
          setSearchTerm={setSearchTermCccUser}
          searchTerm={searchTermCccUser}
          hideLabel={false}
          loadOnMount={false}
          groupId={9}
          // roleId={4}
        />

        <ProvinceSearch
          onSelectProvince={(data) => {
            updateFilter("province", data.province_name);
            updateFilter("province_id", data.province_id);
          }}
          setLoading={setLoadingP}
          loading={loadingP}
          setSearchTerm={setSearchTermP}
          hideLabel={false}
          loadOnMount={false}
          searchTerm={searchTermP}
        />

        <DistrictSearch
          onSelectDistrict={(data) => {
            updateFilter("district", data.district_name);
            updateFilter("district_id", data.district_id);
          }}
          setLoading={setLoadingD}
          loading={loadingD}
          setSearchTerm={setSearchTermD}
          hideLabel={false}
          loadOnMount={false}
          searchTerm={searchTermD}
        />

        <PoliceDivisionSearch
          onSelectPoliceDivision={(data) => {
            updateFilter("police_division", data.name);
            updateFilter("police_division_id", data.id);
          }}
          setLoading={setLoadingPoliceDivision}
          loading={loadingPoliceDivision}
          setSearchTerm={setSearchTermPoliceDivision}
          hideLabel={false}
          loadOnMount={false}
          searchTerm={searchTermPoliceDivision}
        />

        {/* <CitySearch
          onSelectCity={(data) => {
            updateFilter("city", data.city_name);
            updateFilter("city_id", data.city_id);
          }}
          setLoading={setLoadingC}
          loading={loadingC}
          searchTerm={searchTermC}
          setSearchTerm={setSearchTermC}
          hideLabel={false}
          loadOnMount={false}
        /> */}

        <div className="w-full md:w-1/12 space-y-1">
          <label>Status</label>
          <select
            // value={filters.paidStatus}
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
      </div>
    </div>
  );
};

export default TrafficOffenseReportFilters;

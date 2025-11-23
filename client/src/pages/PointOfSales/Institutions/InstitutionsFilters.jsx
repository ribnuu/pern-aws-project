import React, { useMemo } from "react";
import useAppFilters from "../../../hooks/useAppFilters";
import { useSelector } from "react-redux";
import { FaMobileAlt, FaStoreAlt } from "react-icons/fa";
import { useWindowSize } from "../../../hooks/useWindowSize";

const InstitutionsFilters = () => {
  const { isMobile } = useWindowSize(); // Custom hook to get window size

  const defaultFilters = useMemo(
    () => ({
      groupInstitutionsBy: "CITY",
      searchName: "",
      searchMobile: "",
    }),
    []
  ); // Add dependencies if necessary

  const { updateFilter } = useAppFilters({
    filterType: "POSInstitutionsScreenFilters",
    defaultFilters,
  });
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);

  const handleChange = (e) => {
    updateFilter(e.target.name, e.target.value);
  };

  return (
    <div
      className={`bg-gray-50 mb-6 rounded-md dark:bg-gray-900 border border-black `} // Add margin top when mobile
    >
      <div className="flex flex-col md:flex-row md:space-x-4 m-2">
        <div className="w-full md:w-4/12 space-y-1">
          {!isMobile && <label>Search by name</label>}
          <div className="relative">
            <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="searchName"
              type="text"
              placeholder="Search by Name"
              value={appFilters.searchName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
            />
          </div>
        </div>

        <div className="w-full md:w-4/12 space-y-1">
          {!isMobile ? (
            <label>Search by mobile</label>
          ) : (
            <span className="mt-2 block" /> // Add margin using block-level span
          )}
          <div className="relative">
            <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              name="searchMobile"
              type="text"
              placeholder="Search by Mobile Number"
              value={appFilters.searchMobile}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
            />
          </div>
        </div>

        <div className="w-full md:w-4/12 space-y-1">
          {!isMobile ? (
            <label>Group By</label>
          ) : (
            <span className="mt-2 block" /> // Add margin using block-level span
          )}
          <div className="relative">
            <select
              name="groupInstitutionsBy"
              value={appFilters.groupInstitutionsBy}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
            >
              <option value="CITY">City</option>
              <option value="DISTRICT">District</option>
              <option value="PROVINCE">Province</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionsFilters;

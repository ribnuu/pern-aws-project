import React, { useMemo } from "react";
import useAppFilters from "../../hooks/useAppFilters";
import { useSelector } from "react-redux";
import { FaStoreAlt } from "react-icons/fa";

const HouseFilters = () => {
  //   const { isMobile } = useWindowSize(); // Custom hook to get window size

  const defaultFilters = useMemo(
    () => ({
      groupHousesBy: "CITY",
      searchNIC: "",
      searchDOB: "",
      searchNationality: "",
      searchGender: "",
      searchMaritalStatus: "",
    }),
    []
  ); // Add dependencies if necessary

  const { updateFilter } = useAppFilters({
    filterType: "CccHousesScreenFilters",
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
        <div className="w-full md:w-6/12 space-y-1">
          <div className="">
            <div className="flex-1">
              <label>Search by NIC/PASSPORT</label>
              <div className="relative">
                <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="searchNIC"
                  type="text"
                  placeholder="Search by nic/passport"
                  value={appFilters.searchNIC}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                />
              </div>
            </div>
            <div className="flex-1">
              <label>Search by Nationality</label>
              <div className="relative">
                <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="searchNationality"
                  type="text"
                  placeholder="Search by Nationality"
                  value={appFilters.searchNationality}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <label>Search by DOB</label>
              <div className="relative">
                <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="searchDOB"
                  type="text"
                  placeholder="Search by DOB"
                  value={appFilters.searchDOB}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                />
              </div>
            </div>
            <div className="">
              <label>Search by Gender</label>
              <div className="relative">
                <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="searchGender"
                  value={appFilters.searchGender}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                >
                  <option value="">-- Select Gender --</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="">
              <label>Search by Marital Status</label>
              <div className="relative">
                <FaStoreAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  name="searchMaritalStatus"
                  value={appFilters.searchMaritalStatus}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
                >
                  <option value="">-- Select Marital Status --</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full md:w-4/12 space-y-1">
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
        </div> */}

        <div className="w-full md:w-6/12 space-y-1">
          <label>Group By</label>
          <div className="relative">
            <select
              name="groupHousesBy"
              value={appFilters.groupHousesBy}
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

export default HouseFilters;

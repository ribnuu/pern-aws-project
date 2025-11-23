import React, { useState, useCallback, useMemo } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";
import StockInstituteRepSearch from "../StockInstituteRepSearch/StockInstituteRepSearch";
import useAppFilters from "../../../hooks/useAppFilters";
import { posRepsCommissionGeneratePdfApi } from "../../../apis/POSRepsCommission";

const RepCommissionsPayScreenFilters = () => {
  const defaultFilters = useMemo(
    () => ({
      fromDate: new Date().toISOString().split("T")[0], // Format to YYYY-MM-DD
      toDate: new Date().toISOString().split("T")[0],
      loadCustomerBills: false,
    }),
    []
  ); // Add dependencies if necessary

  const { updateFilter } = useAppFilters({
    filterType: "RepsCommissionsPayScreenFilters",
    defaultFilters,
  });
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);

  const { buttonsObj, buttonFunctionNamesList } = useSelector(
    (state) => state.appRightsReducer
  );

  const [loading, setLoading] = useState(false);
  const [institutionSearchTerm, setInstitutionSearchTerm] = useState("");
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(false);
  const [
    institutionRepresentativeSearchTerm,
    setInstitutionRepresentativeSearchTerm,
  ] = useState("");
  const [
    isLoadingInstitutionRepresentatives,
    setIsLoadingInstitutionRepresentatives,
  ] = useState(false);

  const handleDateTimeChange = useCallback((e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  });

  // Handle status changes
  const handleStatusChange = (e) => {
    updateFilter("comPaidStatus", e.target.value);
  };

  const handleToggle = (e) => {
    updateFilter("loadCustomerBills", !appFilters.loadCustomerBills);
  };

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5 space-y-4 md:space-y-0">
        {/* Box 1 */}
        <div className="w-full md:w-3/12 space-y-1">
          <StockCustomerInstitutionSearch
            hideLabel
            onSelectStockCustomerInstitution={(data) => {
              updateFilter("institutionId", data.id);
            }}
            setLoading={setIsLoadingInstitutions}
            loading={isLoadingInstitutions}
            searchTerm={institutionSearchTerm}
            setSearchTerm={setInstitutionSearchTerm}
          />
        </div>

        {/* Conditional Box 2 - only rendered if condition is met */}
        {buttonFunctionNamesList.includes("representativeSearchDropDown") && (
          <div className="w-full md:w-3/12 space-y-1">
            <StockInstituteRepSearch
              hideLabel
              onSelectStockInstitutionRepresentative={(data) => {
                updateFilter("representativeStockCustomerPersonId", data.id);
              }}
              setLoading={setIsLoadingInstitutionRepresentatives}
              loading={isLoadingInstitutionRepresentatives}
              searchTerm={institutionRepresentativeSearchTerm}
              setSearchTerm={setInstitutionRepresentativeSearchTerm}
            />
          </div>
        )}

        {/* Box 3 - From Date Filter */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="fromDate"
            type="date"
            value={appFilters?.fromDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
            placeholder="Start Date"
          />
        </div>

        {/* Box 4 - To Date Filter */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="toDate"
            type="date"
            value={appFilters?.toDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
            placeholder="End Date"
          />
        </div>

        <div className="w-full md:w-2/12 space-y-1">
          <select
            value={appFilters?.comPaidStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="ALL">All</option>
            <option value="PAID">Paid</option>
            {/* <option value="PARTIALLY_PAID">Partially Paid</option> */}
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {/* Download Button */}
        <div className="w-full md:w-1/12 space-y-1">
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800 w-full"
            onClick={
              loading
                ? null
                : async (e) => {
                    try {
                      setLoading(true);
                      await posRepsCommissionGeneratePdfApi({
                        filters: appFilters,
                      });
                    } catch (error) {
                    } finally {
                      setLoading(false);
                    }
                  }
            }
          >
            {loading ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            )}
            Download
          </a>
        </div>

        {/* Toggle Button */}
        {/* Toggle Button */}
        {/* Toggle Button */}
        <div className="w-full md:w-1/12 space-y-1">
          <button
            onClick={handleToggle}
            className={`h-10 py-2 px-3 inline-flex justify-center items-center rounded-lg border font-medium shadow-sm transition-all text-sm ${
              appFilters?.loadCustomerBills
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            } hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600`}
          >
            {appFilters.loadCustomerBills
              ? "Hide Customer Bills"
              : "Show Customer Bills"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepCommissionsPayScreenFilters;

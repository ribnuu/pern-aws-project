import React, { useState, useCallback } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";
import { UpdateTransactionsSliceFilter } from "../../../store/point-of-sales/TransactionsSlice";
import StockInstituteRepSearch from "../StockInstituteRepSearch/StockInstituteRepSearch";

const TransactionFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.transactionsReducer);
  const { buttonsObj } = useSelector((state) => state.appRightsReducer);

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

  // Handle date changes
  const handleDateTimeChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(UpdateTransactionsSliceFilter({ filterKey: name, value }));
    },
    [dispatch]
  );

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        {/* Box 1 */}
        <div className="w-full md:w-4/12 space-y-1">
          <StockCustomerInstitutionSearch
            hideLabel
            onSelectStockCustomerInstitution={(data) => {
              dispatch(
                UpdateTransactionsSliceFilter({
                  filterKey: "institutionId",
                  value: data.id,
                })
              );
            }}
            setLoading={setIsLoadingInstitutions}
            loading={isLoadingInstitutions}
            searchTerm={institutionSearchTerm}
            setSearchTerm={setInstitutionSearchTerm}
          />
        </div>

        {/* Conditional Box 2 - only rendered if condition is met */}
        {buttonsObj?.["1006000000000102"] && (
          <div className="w-full md:w-4/12 space-y-1">
            <StockInstituteRepSearch
              hideLabel
              onSelectStockInstitutionRepresentative={(data) => {
                dispatch(
                  UpdateTransactionsSliceFilter({
                    filterKey: "representativeId",
                    value: data.id,
                  })
                );
                // setSelectedInstitutionRepresentativeId(data.id);
              }}
              setLoading={setIsLoadingInstitutionRepresentatives}
              loading={isLoadingInstitutionRepresentatives}
              searchTerm={institutionRepresentativeSearchTerm}
              setSearchTerm={setInstitutionRepresentativeSearchTerm}
            />
          </div>
        )}

        {/* Box 3 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="fromDate"
            type="date"
            value={filters.fromDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="Start Date"
          />
        </div>

        {/* Box 4 - Date Filters */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="toDate"
            type="date"
            value={filters.toDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;

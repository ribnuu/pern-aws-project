import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";
import { UpdateManageBillsSliceFilter } from "../../../store/point-of-sales/BillManagementSlice";
import StockInstituteRepSearch from "../StockInstituteRepSearch/StockInstituteRepSearch";
import ToggleButtonComponent from "./ToggleButtonComponent";

const ManageBillsFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.billManagementReducer);

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
      dispatch(UpdateManageBillsSliceFilter({ filterKey: name, value }));
    },
    [dispatch]
  );

  // Handle status changes
  const handleStatusChange = (e) => {
    dispatch(
      UpdateManageBillsSliceFilter({
        filterKey: "paidStatus",
        value: e.target.value,
      })
    );
  };

  // Handle isDeleted change
  const handleIsDeletedChange = (e) => {
    dispatch(
      UpdateManageBillsSliceFilter({
        filterKey: "deletedStatus",
        value: e.target.value, // Set boolean true/false
      })
    );
  };

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        {/* Status Dropdown */}
        <div className="w-full md:w-2/12 space-y-1">
          <select
            value={filters.paidStatus}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="ALL">All</option>
            <option value="PAID">Paid</option>
            {/* <option value="PARTIALLY_PAID">Partially Paid</option> */}
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {/* Stock Customer Institution Search */}
        <div className="w-full md:w-4/12 space-y-1">
          <StockCustomerInstitutionSearch
            hideLabel
            onSelectStockCustomerInstitution={(data) => {
              dispatch(
                UpdateManageBillsSliceFilter({
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

        {/* Stock Institution Representative Search */}
        <div className="w-full md:w-4/12 space-y-1">
          <StockInstituteRepSearch
            hideLabel
            onSelectStockInstitutionRepresentative={(data) => {
              dispatch(
                UpdateManageBillsSliceFilter({
                  filterKey: "representativeId",
                  value: data.id,
                })
              );
            }}
            setLoading={setIsLoadingInstitutionRepresentatives}
            loading={isLoadingInstitutionRepresentatives}
            searchTerm={institutionRepresentativeSearchTerm}
            setSearchTerm={setInstitutionRepresentativeSearchTerm}
          />
        </div>

        {/* From Date Filter */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="fromDate"
            type="date"
            value={filters.fromDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
            placeholder="Start Date"
          />
        </div>

        {/* To Date Filter */}
        <div className="w-full md:w-2/12 space-y-1">
          <input
            name="toDate"
            type="date"
            value={filters.toDate || ""}
            onChange={handleDateTimeChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
            placeholder="End Date"
          />
        </div>

        {/* isDeleted Filter */}
        <div className="w-full md:w-2/12 space-y-1">
          <select
            value={filters.deletedStatus}
            onChange={handleIsDeletedChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
          >
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="DELETED">Deleted</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        <div className="">
          <ToggleButtonComponent />
        </div>
      </div>
    </div>
  );
};

export default ManageBillsFilters;

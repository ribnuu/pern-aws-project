import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { UpdateInstitutionStockActivityCheckSliceFilter } from "../../../store/point-of-sales/InstitutionStockActivityCheckSlice";
import { toPascalCase } from "../../../utils/caseUtil";
const InstitutionStockActivityCheckFilters = () => {
  const dispatch = useDispatch();
  const { filters, groupBySubList } = useSelector(
    (state) => state.institutionStockActivityCheckReducer
  );

  const handleStatusChange = (e) => {
    dispatch(
      UpdateInstitutionStockActivityCheckSliceFilter({
        filterKey: "loadInstitutionsBy",
        value: e.target.value,
      })
    );
  };

  const handleGroupByChange = (e) => {
    dispatch(
      UpdateInstitutionStockActivityCheckSliceFilter({
        filterKey: "groupInstitutionsBy",
        value: e.target.value,
      })
    );
  };

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        <div className="w-full md:w-4/12 space-y-1">
          <label>Filter</label>
          <select
            value={filters.loadInstitutionsBy}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
          >
            <option value="NO_PENDING_BILLS">No pending bills</option>
            <option value="HAVE_PENDING_BILLS">Have pending bills</option>
            <option value="NO_TRANSACTIONS_WITHIN_LAST_30_DAYS">
              No transactions within last 30 days
            </option>
            <option value="NO_TRANSACTIONS_WITHIN_LAST_21_DAYS">
              No transactions within last 21 days
            </option>
            <option value="MORE_THAN_1_PENDING_BILLS">
              More than 1 pending bills
            </option>
          </select>
        </div>
        {/* Group By */}
        <div className="w-full md:w-4/12 space-y-1">
          <label>Group By</label>
          <select
            value={filters.groupInstitutionsBy}
            onChange={handleGroupByChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
          >
            <option value="CITY">City</option>
            <option value="DISTRICT">District</option>
            <option value="PROVINCE">Province</option>
            <option value="REPRESENTATIVE">Representative</option>
          </select>
        </div>

        {groupBySubList?.length > 0 && (
          <div className="w-full md:w-4/12 space-y-1">
            <label>Select {toPascalCase(filters?.groupInstitutionsBy)}</label>
            <select
              value={filters.selectedGroupBySub || ""}
              onChange={(e) =>
                dispatch(
                  UpdateInstitutionStockActivityCheckSliceFilter({
                    filterKey: "selectedGroupBySub",
                    value: e.target.value,
                  })
                )
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
            >
              <option value="" disabled>
                Select {toPascalCase(filters?.groupInstitutionsBy)}
              </option>
              {groupBySubList.map((rep) => (
                <option key={rep.name} value={rep.name}>
                  {rep.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionStockActivityCheckFilters;

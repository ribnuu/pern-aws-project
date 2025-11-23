import React, { useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StockInstituteRepSearch from "../StockInstituteRepSearch/StockInstituteRepSearch";
import { UpdateRepSalesVisitSliceFilter } from "../../../store/point-of-sales/RepSalesVisitSlice";

const RepSalesVisitFilters = () => {
  const dispatch = useDispatch();
  const { buttonsObj } = useSelector((state) => state.appRightsReducer);

  const [
    institutionRepresentativeSearchTerm,
    setInstitutionRepresentativeSearchTerm,
  ] = useState("");
  const [
    isLoadingInstitutionRepresentatives,
    setIsLoadingInstitutionRepresentatives,
  ] = useState(false);

  return Object.keys(buttonsObj).length > 0 ? (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="flex flex-col md:flex-row md:space-x-4 m-5">
        {buttonsObj["1006000000000108"] && (
          <div className="w-full md:w-12/12 space-y-1">
            <StockInstituteRepSearch
              hideLabel
              onSelectStockInstitutionRepresentative={(data) => {
                dispatch(
                  UpdateRepSalesVisitSliceFilter({
                    filterKey: "representativeId",
                    value: data.ccc_user_id,
                  })
                );
              }}
              setLoading={setIsLoadingInstitutionRepresentatives}
              loading={isLoadingInstitutionRepresentatives}
              searchTerm={institutionRepresentativeSearchTerm}
              setSearchTerm={setInstitutionRepresentativeSearchTerm}
            />
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default RepSalesVisitFilters;

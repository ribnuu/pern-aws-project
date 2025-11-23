import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import StockCustomerInstitutionSearch from "../StockCustomerInstitutionSearch/StockCustomerInstitutionSearch";
import { UpdateBillPaymentSliceFilter } from "../../../store/point-of-sales/BillPaymentSlice";
import PendingBillPaymentsSection from "./PendingBillPaymentsSection";
import PaymentForm from "./PaymentForm";
import StockInstituteRepSearch from "../StockInstituteRepSearch/StockInstituteRepSearch";
import { useLocation } from "react-router-dom";
import useFetchButtons from "../../../hooks/useFetchButtons";
import ToggleButtonComponent from "./ToggleButtonComponent";

const BillPaymentScreen = ({}) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.posBillPaymentReducer);
  const location = useLocation();
  const { buttonsObj } = useSelector((state) => state.appRightsReducer);

  const buttonId = location.state?.buttonId;
  useFetchButtons(buttonId);

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

  const handleStatusChange = (e) => {
    dispatch(
      UpdateBillPaymentSliceFilter({
        filterKey: "loadBillsBy",
        value: e.target.value,
      })
    );
  };

  return (
    <>
      <div>
        <PaymentForm />
      </div>
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
        {/* Drop down to search stock customer institution */}
        <div className="mx-5 my-5">
          <div className="mx-5 my-5">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {/* Box 1 */}
              <div
                className={`w-full ${
                  buttonsObj?.["1006000000000107"] ? "md:w-5/12" : "md:w-full"
                } space-y-4`}
              >
                <StockCustomerInstitutionSearch
                  hideLabel={true}
                  onSelectStockCustomerInstitution={(data) => {
                    dispatch(
                      UpdateBillPaymentSliceFilter({
                        filterKey: "stockCustomerInstitutionId",
                        value: data.id,
                      })
                    );
                    dispatch(
                      UpdateBillPaymentSliceFilter({
                        filterKey: "stockCustomerInstitution",
                        value: data,
                      })
                    );
                  }}
                  setLoading={setIsLoadingInstitutions}
                  loading={isLoadingInstitutions}
                  searchTerm={institutionSearchTerm}
                  setSearchTerm={setInstitutionSearchTerm}
                />
              </div>

              {buttonsObj?.["1006000000000107"] && (
                <div
                  className={`w-full md:w-5/12 ${
                    buttonsObj?.["1006000000000107"] ? "space-y-4" : ""
                  }`}
                >
                  <StockInstituteRepSearch
                    hideLabel
                    onSelectStockInstitutionRepresentative={(data) => {
                      dispatch(
                        UpdateBillPaymentSliceFilter({
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

              {/* Box 2 */}
              <div
                className={`w-full ${
                  buttonsObj?.["1006000000000107"] ? "md:w-2/12" : "md:w-full"
                } space-y-4`}
              >
                <select
                  value={filters.loadBillsBy}
                  onChange={handleStatusChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-10"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Return">Return</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {buttonsObj?.["1006000000000122"] && <ToggleButtonComponent />}
            </div>
          </div>

          <PendingBillPaymentsSection />
        </div>
        {/* </div> */}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default BillPaymentScreen;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  RemoveBillFromPendingBillsList,
  selectGrandTotalFromBillPaymentSlice,
  selectPayingTotalFromBillPaymentSlice,
  selectPaidAmountTotalFromBillPaymentSlice,
  selectPendingAmountTotalFromBillPaymentSlice,
  SetBillTransactionsSliceField,
  UpdateFieldInPendingBills,
  SortPendingBillsByInstitution,
  SortPendingBillsByLatestStockBillPayDetail,
  selectTotalQuantityForPendingBills,
  selectTotalQuantityForPaidBills,
  selectPaymentReceivedTotalForSelectedDateSlice,
} from "../../../store/point-of-sales/TransactionsSlice";
import {
  getAllPaymentsReceivedByFiltersApi,
  getAllTransactionsByDateAndOtherFiltersApi,
} from "../../../apis/POSTransactionsApiService";
const vite_react_host_address = import.meta.env.VITE_REACT_HOST_ADDRESS;
const vite_environment = import.meta.env.VITE_ENVIRONMENT;

const TransactionsPaymentReceived = ({ selectedStockCustomerInstitution }) => {
  const dispatch = useDispatch();
  const { pendingBillsList, paymentsReceivedBillsList, filters } = useSelector(
    (state) => state.transactionsReducer
  );
  // const totalQuantity = useSelector(selectTotalQuantityFromBillPaymentSlice);
  const grandTotal = useSelector(selectGrandTotalFromBillPaymentSlice);
  const payingTotal = useSelector(selectPayingTotalFromBillPaymentSlice);
  const pendingBilsCount = useSelector(selectTotalQuantityForPendingBills);
  const paidBillsCount = useSelector(selectTotalQuantityForPaidBills);
  const paidAmountTotal = useSelector(
    selectPaidAmountTotalFromBillPaymentSlice
  );
  const pendingAmountotal = useSelector(
    selectPendingAmountTotalFromBillPaymentSlice
  );

  const paymentsReceivedTotal = useSelector(
    selectPaymentReceivedTotalForSelectedDateSlice
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPaymentsReceivedByFiltersApi(filters);
        if (response.success) {
          dispatch(
            SetBillTransactionsSliceField({
              field: "paymentsReceivedBillsList",
              value: response.data,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [
    filters.loadBillsBy,
    filters.fromDate,
    filters.toDate,
    filters.institutionId,
    filters.representativeId,
  ]);

  return (
    <div className="">
      <h1 className="mb-2">Payments received in the the selected date range</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-blue-100">
            <tr>
              <th className=" py-3 text-xs font-medium text-gray-500 uppercase ">
                Bill Number
              </th>
              <th
                className=" py-3 text-xs font-medium text-gray-500 uppercase  cursor-pointer"
                onClick={(e) => {
                  dispatch(SortPendingBillsByInstitution());
                }}
              >
                Institution
              </th>
              <th className=" py-3 text-xs font-medium text-gray-500 uppercase ">
                Customer Name
              </th>
              <th className=" py-3 text-xs font-medium text-gray-500 uppercase ">
                Customer Number
              </th>

              <th
                className=" py-3 text-xs font-medium text-gray-500 uppercase "
                onClick={(e) => {
                  dispatch(SortPendingBillsByLatestStockBillPayDetail());
                }}
              >
                Payment Date
              </th>
              <th className=" text-xs font-medium text-gray-500 uppercase ">
                Paid Status
              </th>
              <th className="   text-xs font-medium text-gray-500 uppercase   text-right">
                Grand Total
              </th>
              <th className="  text-xs font-medium text-gray-500 uppercase  text-right">
                Payment Received
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentsReceivedBillsList &&
              paymentsReceivedBillsList.length > 0 &&
              paymentsReceivedBillsList.map((pendingBill) => (
                <tr key={pendingBill.id}>
                  <td className=" py-2.5 whitespace-nowrap text-sm text-gray-900 cursor-pointer">
                    {pendingBill.id}
                  </td>

                  <td>
                    {pendingBill &&
                      pendingBill?.details[0]?.billPayDetail
                        ?.customerInstitution?.name}
                  </td>
                  <td>
                    {pendingBill &&
                      pendingBill?.details[0]?.billPayDetail?.customer_name}
                  </td>
                  <td>
                    {pendingBill &&
                      pendingBill?.details[0]?.billPayDetail?.customer_number}
                  </td>
                  <td>{pendingBill && pendingBill?.created_at}</td>
                  <td
                    className={`px-6 py-2.5 whitespace-nowrap text-sm font-bold ${
                      pendingBill &&
                      pendingBill?.details[0]?.billPayDetail?.paid_status
                        ? "text-green-600" // Color for Paid
                        : pendingBill?.details[0]?.billPayDetail?.paid_amount >
                          0
                        ? "text-yellow-600" // Color for Partial
                        : "text-red-600" // Color for Pending
                    }`}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    {pendingBill &&
                    pendingBill?.details[0]?.billPayDetail?.paid_status
                      ? "PAID"
                      : pendingBill?.details[0]?.billPayDetail?.paid_amount > 0
                      ? "PARTIAL"
                      : "PENDING"}
                  </td>
                  <td className="text-right">
                    {pendingBill &&
                      pendingBill?.details[0]?.billPayDetail?.grand_total}
                  </td>
                  <td className="text-right">
                    {pendingBill && pendingBill?.details[0]?.paid_amount}
                  </td>
                </tr>
              ))}

            {/*  */}
            <tr className="bg-blue-100 ">
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className=" py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                Total
              </td>
              {/* <td className=" py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {paymentsReceivedTotal}
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {paymentsReceivedTotal?.toLocaleString()}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPaymentReceived;

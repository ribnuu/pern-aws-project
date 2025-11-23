import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  RemoveBillFromPendingBillsList,
  selectGrandTotalFromBillPaymentSlice,
  selectPayingTotalFromBillPaymentSlice,
  selectPaidAmountTotalFromBillPaymentSlice,
  selectPendingAmountTotalFromBillPaymentSlice,
  SetBillPaymentSliceField,
  UpdateFieldInPendingBills,
  SortPendingBillsByInstitution,
  SortPendingBillsByLatestStockBillPayDetail,
  UpdateBillPaymentSliceFilter,
} from "../../../store/point-of-sales/BillPaymentSlice";
import { getAllPendingBillHeadersIntheCompanyApi } from "../../../apis/POSBillPaymentApiService";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
const vite_react_host_address = import.meta.env.VITE_REACT_HOST_ADDRESS;
const vite_environment = import.meta.env.VITE_ENVIRONMENT;

const PendingBillPaymentsSection = () => {
  const dispatch = useDispatch();
  const { pendingBillsList, filters, isBillPaid } = useSelector(
    (state) => state.posBillPaymentReducer
  );
  const grandTotal = useSelector(selectGrandTotalFromBillPaymentSlice);
  const payingTotal = useSelector(selectPayingTotalFromBillPaymentSlice);
  const paidAmountTotal = useSelector(
    selectPaidAmountTotalFromBillPaymentSlice
  );
  const pendingAmountotal = useSelector(
    selectPendingAmountTotalFromBillPaymentSlice
  );

  const [amounts, setAmounts] = useState({});
  const [changedAmounts, setChangedAmounts] = useState({});
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPendingBillHeadersIntheCompanyApi(filters);
        if (response.success) {
          dispatch(
            SetBillPaymentSliceField({
              field: "pendingBillsList",
              value: response.data,
            })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    filters.loadBillsBy,
    filters.stockCustomerInstitutionId,
    filters.representativeId,
    filters.loadCustomerBills,
  ]);

  useEffect(() => {
    // Write the code here to load the bills after making a payment for a selected institute
    const fetchData = async () => {
      try {
        const response = await getAllPendingBillHeadersIntheCompanyApi(filters);
        if (response.success) {
          dispatch(
            SetBillPaymentSliceField({
              field: "pendingBillsList",
              value: response.data,
            })
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(
          SetBillPaymentSliceField({
            field: "isBillPaid",
            value: false,
          })
        );
        dispatch(
          UpdateBillPaymentSliceFilter({
            filterKey: "loadBillsBy",
            value: "All",
          })
        );
      }
    };
    if (isBillPaid) {
      fetchData();
    }
  }, [isBillPaid]);

  // Initialize amounts state with grand total values
  useEffect(() => {
    if (pendingBillsList && pendingBillsList.length > 0) {
      const initialAmounts = pendingBillsList.reduce((acc, bill) => {
        acc[bill.bill_number] = bill.grand_total;
        return acc;
      }, {});
      setAmounts(initialAmounts);
    }
  }, [pendingBillsList]);

  const handleAmountChange = (billNumber, newAmount) => {
    setAmounts({
      ...amounts,
      [billNumber]: newAmount,
    });

    setChangedAmounts({
      ...changedAmounts,
      [billNumber]: true,
    });

    // dispatch(UpdateFieldInPendingBills({ label, newAmount }));
    dispatch(
      UpdateFieldInPendingBills({
        billNumber, // The identifier of the bill to update
        field: "paying_amount", // The field you want to update
        value: newAmount, // The new value for the field
      })
    );
  };

  const handleRowClick = (billNumber) => {
    setSelectedBill(billNumber === selectedBill ? null : billNumber);
  };

  const handleDelete = () => {
    if (selectedBill) {
      dispatch(RemoveBillFromPendingBillsList(selectedBill));
      setSelectedBill(null); // Deselect the row after deletion
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Delete" && selectedBill !== null) {
        handleDelete(selectedBill);
      }
    },
    [selectedBill, handleDelete]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="">
      {loading ? (
        <LISpinnerWithTextTwo label="Loading Bills..." />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className=" bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bill Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Representative
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={(e) => {
                    dispatch(SortPendingBillsByInstitution());
                  }}
                >
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={(e) => {
                    dispatch(SortPendingBillsByLatestStockBillPayDetail());
                  }}
                >
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grand Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {filters.stockCustomerInstitutionId
                    ? "New Amount"
                    : "Pending Amount"}
                </th>
                {selectedBill && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingBillsList &&
                pendingBillsList.length > 0 &&
                pendingBillsList.map((pendingBill) => (
                  <tr
                    key={pendingBill.bill_number}
                    onClick={() => handleRowClick(pendingBill.bill_number)}
                    className={`${
                      selectedBill === pendingBill.bill_number
                        ? "bg-red-100" // Specific color for selected row
                        : changedAmounts[pendingBill.bill_number]
                        ? "bg-yellow-100"
                        : ""
                    } cursor-pointer`}
                  >
                    <td
                      className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                      onClick={(e) => {
                        let baseUrl = `http://${vite_react_host_address}/pos/bln`;

                        if (vite_environment === "PRODUCTION") {
                          baseUrl = `https://${vite_react_host_address}/pos/bln`;
                        }

                        const url = `${baseUrl}/${pendingBill.bill_number}`;

                        window.open(url, "_blank");
                      }}
                    >
                      {pendingBill.bill_number}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {
                        pendingBill?.stock_customer_institution
                          ?.representatives[0]?.customerPerson?.name
                      }
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {filters.stockCustomerInstitution
                        ? filters?.stockCustomerInstitution?.name
                        : pendingBill?.stock_customer_institution?.name}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill.customer_name}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill.customer_number}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {dayjs(pendingBill.created_at).format("MMMM D, YYYY")}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill?.latest_stock_billpay_detail?.created_at
                        ? dayjs(
                            pendingBill?.latest_stock_billpay_detail?.created_at
                          ).format("MMMM D, YYYY")
                        : ""}
                    </td>

                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill.paid_status ? "Paid" : "Pending"}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill.grand_total}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {pendingBill.paid_amount}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {/* {!selectedStockCustomerInstitution?.id ? ( */}
                      {!filters.stockCustomerInstitutionId ? (
                        <div className="text-right">
                          {pendingBill.grand_total - pendingBill.paid_amount}
                        </div>
                      ) : (
                        <input
                          disabled={pendingBill.paid_status}
                          onClick={(e) => e.stopPropagation()}
                          type="number"
                          className="w-full p-2 border border-gray-300 rounded-md text-right"
                          placeholder="Enter new amount"
                          onChange={(e) =>
                            handleAmountChange(
                              pendingBill.bill_number,
                              e.target.value
                            )
                          }
                          defaultValue={
                            pendingBill.grand_total - pendingBill.paid_amount
                          }
                        />
                      )}
                    </td>
                    {selectedBill &&
                      selectedBill === pendingBill.bill_number && (
                        <th>
                          <button
                            onClick={handleDelete}
                            className=" px-4 py-2 bg-red-600 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </th>
                      )}
                  </tr>
                ))}
              <tr className="bg-blue-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pendingBillsList?.length} Bills
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {grandTotal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {!filters.stockCustomerInstitutionId
                    ? paidAmountTotal
                    : paidAmountTotal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {!filters.stockCustomerInstitutionId
                    ? pendingAmountotal
                    : payingTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingBillPaymentsSection;

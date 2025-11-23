import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllRepsCommissionsDataApi } from "../../../apis/POSRepsCommission";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import dayjs from "dayjs";
import { createRepsPaidComissionItemWiseApi } from "../../../apis/POSTransactionsApiService";
import toast from "react-hot-toast";

const vite_react_host_address = import.meta.env.VITE_REACT_HOST_ADDRESS;
const vite_environment = import.meta.env.VITE_ENVIRONMENT;

const RepsCommissionPayTable = () => {
  const appFilters = useSelector((state) => state?.appFiltersReducer?.filters);

  const [loading, setLoading] = useState(false);
  const [repsComData, setRepsComData] = useState([]);
  const [finalGrandTotal, setFinalGrandTotal] = useState(0);
  const [finalQtyTotal, setFinalQtyTotal] = useState(0);
  const [finalCommissionTotal, setFinalCommissionTotal] = useState(0);
  const [pendingCommissionTotal, setPendingCommissionTotal] = useState(0);
  const [paidCommisionsBillDetailIds, setPaidCommissionBillDetailIds] =
    useState([]);
  const [filteredRepsComData, setFilteredRepsComData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setRepsComData([]);
        const response = await getAllRepsCommissionsDataApi({
          filters: appFilters,
        });
        if (response.success && response.data) {
          setRepsComData(response.data.data);
          setFinalGrandTotal(response.data.finalGrandTotal);
          setFinalQtyTotal(response.data.finalQtyTotal);
          setFinalCommissionTotal(response.data.finalCommissionTotal);
          setPendingCommissionTotal(response.data.pendingCommissionTotal);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (
      appFilters?.fromDate ||
      appFilters?.toDate ||
      appFilters?.representativeStockCustomerPersonId ||
      appFilters?.institutionId ||
      appFilters?.loadCustomerBills
    ) {
      fetchData();
    }
  }, [
    appFilters?.fromDate,
    appFilters?.toDate,
    appFilters?.representativeStockCustomerPersonId,
    appFilters?.institutionId,
    appFilters?.loadCustomerBills,
  ]);

  // useEffect(() => {
  //   // // comPaidStatus
  //   // if (appFilters?.comPaidStatus ==='PENDING'&& !billDetail.isCommissionPaid) {
  //   // }
  //   // !billDetail.isCommissionPaid

  //   if (appFilters?.comPaidStatus === "ALL") {
  //     setFilteredRepsComData(repsComData);
  //   }

  //   if (appFilters?.comPaidStatus === "PENDING") {
  //     const ff = repsComData.filter((item) => item.isCommissionPaid === false);
  //     setFilteredRepsComData(ff);
  //   }

  //   if (appFilters?.comPaidStatus === "PAID") {
  //     const ff = repsComData.filter((item) => item.isCommissionPaid === true);
  //     setFilteredRepsComData(ff);
  //   }
  // }, [appFilters?.comPaidStatus]);

  useEffect(() => {
    const { comPaidStatus } = appFilters || {};

    // Filter based on comPaidStatus
    switch (comPaidStatus) {
      case "PAID":
        setFilteredRepsComData(
          repsComData.filter((item) => item.isCommissionPaid)
        );
        break;

      case "PENDING":
        setFilteredRepsComData(
          repsComData.filter((item) => !item.isCommissionPaid)
        );
        break;

      case "ALL":
      default:
        setFilteredRepsComData(repsComData);
        break;
    }
  }, [appFilters?.comPaidStatus, repsComData]);

  const handleCommissionReceived = async (billDetail, billHeader) => {
    if (billDetail.id) {
      try {
        const data = await createRepsPaidComissionItemWiseApi({
          bill: billHeader,
          billDetail,
        });
        if (data && data.success) {
          toast.success("Successfully updated payment");
          setPaidCommissionBillDetailIds((prevItems) => [
            ...prevItems,
            billDetail.id,
          ]); // Spread the previous items and add the new one
        }
      } catch (error) {
        toast.error("Failed to update payment");
      }
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bill Number
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={(e) => {
                  dispatch(SortPendingBillsByInstitution());
                }}
              >
                Institution
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rep
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Grand Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Paid Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                QNTY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Total Com
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Com Paid On
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="15" className="px-6 py-4 text-center">
                  {/* Loading... */}
                  <LISpinnerWithTextTwo label="Loading..." />
                </td>
              </tr>
            ) : (
              filteredRepsComData &&
              filteredRepsComData.map((billDetail) => {
                // try {
                //   console.log(billDetail?.header?.billPayDetail[0].created_at);
                // } catch (error) {
                //   debugger;
                //   return;
                // }
                return (
                  <tr
                    key={billDetail.bill_number}
                    className={`${
                      !billDetail?.header?.customerInstitution?.is_active &&
                      "bg-red-300"
                    }`}
                  >
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "175px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm cursor-pointer"
                      onClick={(e) => {
                        let baseUrl = `http://${vite_react_host_address}/pos/bln`;

                        if (vite_environment === "PRODUCTION") {
                          baseUrl = `https://${vite_react_host_address}/pos/bln`;
                        }

                        const url = `${baseUrl}/${billDetail.bill_number}`;

                        window.open(url, "_blank");
                      }}
                    >
                      {billDetail.bill_number}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "310px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.header?.customerInstitution?.name}
                    </td>
                    {/* <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.header?.customer_name}
                    </td> */}
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.header?.customerInstitution
                        ?.representatives &&
                        billDetail?.header?.customerInstitution
                          ?.representatives[0]?.customerPerson?.name}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm "
                    >
                      {dayjs(billDetail?.header?.created_at).format(
                        "MMMM D, YYYY"
                      )}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm "
                    >
                      {/* {dayjs(
                        billDetail?.header?.billPayDetail[0].created_at
                      ).format("MMMM D, YYYY")} */}
                      {dayjs(billDetail?.header?.paid_date_time).format(
                        "MMMM D, YYYY"
                      )}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className={`px-6 py-2 whitespace-nowrap text-sm font-bold ${
                        billDetail?.header?.paid_status
                          ? "text-green-600" // Color for Paid
                          : billDetail?.header?.paid_amount > 0
                          ? "text-yellow-600" // Color for Partial
                          : "text-red-600" // Color for Pending
                      }`}
                    >
                      {billDetail?.header?.paid_status
                        ? "PAID"
                        : billDetail?.header?.paid_amount > 0
                        ? "PARTIAL"
                        : "PENDING"}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm "
                    >
                      {billDetail?.header?.grand_total}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm "
                    >
                      {billDetail?.header?.paid_amount}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "275px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.itemHeader?.item_name}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.item_code}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "20px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.commission}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "20px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.quantity}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "20px" }}
                      className="px-6 py-2 whitespace-nowrap text-sm"
                    >
                      {billDetail?.totalCommission}
                    </td>
                    {/* TODO */}
                    <td
                      style={{ fontFamily: "sans-serif", maxWidth: "120px" }}
                      className="px-6 py-1.5 whitespace-nowrap text-sm"
                    >
                      {billDetail?.commisPaidOn}
                    </td>
                    <th style={{ fontFamily: "sans-serif" }}>
                      {!billDetail.header.is_bill_to_company ? (
                        <span
                          style={{ fontFamily: "sans-serif" }}
                          class="text-green-500 font-bold text-sm uppercase"
                        >
                          CUSTOMER BILL
                        </span>
                      ) : billDetail?.isComAvailable ? (
                        <button
                          disabled={
                            billDetail.isCommissionPaid ||
                            !billDetail.allowSubmit
                          }
                          onClick={async (e) => {
                            e.preventDefault();
                            await handleCommissionReceived(
                              billDetail,
                              billDetail.header
                            );
                          }}
                          className={`rounded-md text-sm ${
                            !billDetail.isCommissionPaid &&
                            billDetail.allowSubmit &&
                            !paidCommisionsBillDetailIds.includes(billDetail.id)
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-gray-400 text-white cursor-not-allowed"
                          }`}
                          style={{ width: "100px", height: "30px" }}
                        >
                          RECEIVED
                        </button>
                      ) : (
                        <span class="text-red-500 font-bold text-sm uppercase">
                          NO COM
                        </span>
                      )}
                    </th>
                  </tr>
                );
              })
            )}

            {/*  */}
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
                {filteredRepsComData?.length} Bills
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {finalGrandTotal.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {finalQtyTotal?.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {finalCommissionTotal?.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Pending Commission: {pendingCommissionTotal?.toLocaleString()}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RepsCommissionPayTable;

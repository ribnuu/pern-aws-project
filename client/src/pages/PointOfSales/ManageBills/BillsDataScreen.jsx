import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBills,
  UpdateBillManagementSliceField,
} from "../../../store/point-of-sales/BillManagementSlice";
import BillsTable from "./BillsTable";
import DeleteAlert from "./DeleteAlert";
import { markBillAsDeletedByBillNumberApi } from "../../../apis/POSManageBillsApiService";

const BillsDataScreen = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    currentPage,
    pageSize,
    filters,
    toDeleteBillNumber,
  } = useSelector((state) => state.billManagementReducer);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(
      fetchBills({ filters: filters, page: currentPage, pageSize: pageSize })
    );
  }, [
    dispatch,
    currentPage,
    pageSize,
    filters.paidStatus,
    filters.institutionId,
    filters.representativeId,
    filters.fromDate,
    filters.toDate,
    filters.deletedStatus,
    filters.loadCustomerBills,
  ]);

  useEffect(() => {
    if (toDeleteBillNumber) {
      setShowDeleteModal(true);
    } else {
      setShowDeleteModal(false);
    }
  }, [toDeleteBillNumber]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* <ul>
        {bills?.map((bill) => (
          <li key={bill.id}>{bill.bill_number}</li>
        ))}
      </ul> */}
      {/* Add pagination controls here */}
      <BillsTable />
      {showDeleteModal && (
        <DeleteAlert
          onDismiss={() => {
            dispatch(
              UpdateBillManagementSliceField({
                field: "toDeleteBillNumber",
                value: null,
              })
            );
          }}
          onAccept={async () => {
            const response = await markBillAsDeletedByBillNumberApi(
              toDeleteBillNumber
            ).then((data) => {
              UpdateBillManagementSliceField({
                field: "toDeleteBillNumber",
                value: null,
              });
              setShowDeleteModal(false);
            });
          }}
        />
      )}
    </div>
  );
};

export default BillsDataScreen;

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import TransactionsSection from "./TransactionsSection";
import TransactionFilters from "./TransactionFilters";
import BillsBilledForSelectedDate from "./BillsBilledForSelectedDate";
import StockGivenAndBalanceCheckSection from "./StockGivenAndBalanceCheckSection";
import { useLocation } from "react-router-dom";
import useFetchButtons from "../../../hooks/useFetchButtons";
import TransactionsPaymentReceived from "./TransactionsPaymentReceived";

const TransactionsScreen = ({}) => {
  // Access current location state using useLocation hook from react-router-dom
  const location = useLocation();
  const buttonId = location.state?.buttonId;
  useFetchButtons(buttonId);

  // State to manage the selected button for navigation
  const [
    selectedStockCustomerInstitution,
    setSelectedStockCustomerInstitution,
  ] = useState(null);

  return (
    <>
      <TransactionFilters />
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="mx-5 my-5">
          <TransactionsPaymentReceived
            selectedStockCustomerInstitution={selectedStockCustomerInstitution}
          />
        </div>
      </div>

      {/* Fully and Partially paid bills in the selected date range */}
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="mx-5 my-5">
          <TransactionsSection
            selectedStockCustomerInstitution={selectedStockCustomerInstitution}
          />
        </div>
      </div>

      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="mx-5 my-5">
          <BillsBilledForSelectedDate
            selectedStockCustomerInstitution={selectedStockCustomerInstitution}
          />
        </div>
      </div>

      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="mx-5 my-5">
          <StockGivenAndBalanceCheckSection
            selectedStockCustomerInstitution={selectedStockCustomerInstitution}
          />
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default TransactionsScreen;

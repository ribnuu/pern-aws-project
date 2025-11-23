import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  ResetState,
  SetPointOfSalesSliceField,
} from "../../../store/point-of-sales/PointOfSalesSlice";
import { LinearProgress } from "@mui/material";
import StockNotMaintainedBillingItems from "./StockNotMaintainedBillingItems";
import StockMaintainedBillingItems from "./StockMaintainedBillingItems";
import StockMaintainedAddedToBillItems from "./StockMaintainedAddedToBillItems";
import StockNotMaintainedAddedToBillItems from "./StockNotMaintainedAddedToBillItems";
import BillingScreenCustomerInfoInput from "./billingScreenCustomerInfoInput";
import PaymentTypeSelection from "../paymentTypeSelection";

const POSBillingScreenUpdate = () => {
  const dispatch = useDispatch();

  const { billingSuccess, isLoadItemsFromStockItemHeader, products } =
    useSelector((state) => state.pointOfSalesReducer);

  const items = useSelector((state) => state.pointOfSalesReducer.products);

  const [isLoadingData, setIsLoadingData] = useState(false);

  //cashier session state
  const [cashierSession, setCashierSession] = useState(false);

  useEffect(() => {
    if (billingSuccess) {
      toast.success("Billing successful!");
      // dispatch(ResetState());
    }
  }, [billingSuccess]);

  //add event listener for the Esc key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        console.log("esc key pressed. Resetting state...");
        dispatch(ResetState());
        toast.success("State reset to initial values");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]); //dispatch is added to dependency array

  console.log(products);

  return (
    <>
      <BillingScreenCustomerInfoInput />
      <section className="mx-5 border bg-gray-50 my-4 rounded-md dark:bg-gray-900 ">
        <div className="">
          {isLoadingData && (
            <div className="mx-1 my-1">
              <LinearProgress />
            </div>
          )}

          {/*Cashier Session start and end*/}
          <button
            className={`border rounded-md px-3 py-1 ml-3 mt-2 ${
              cashierSession
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {cashierSession ? "End Session" : "Start Session"}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[2fr_3fr] text-sm gap-2 font-black mt-4 mb-8 ">
            <div className="">
              {!isLoadItemsFromStockItemHeader && (
                <StockMaintainedBillingItems />
              )}

              {isLoadItemsFromStockItemHeader && (
                <StockNotMaintainedBillingItems />
              )}
            </div>
            <div className=" overflow-scroll  max-h-[620px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {items && items.length > 0 && (
                <div className="mt-2 flex flex-col flex-grow">
                  {!isLoadItemsFromStockItemHeader && (
                    <div>
                      <StockMaintainedAddedToBillItems />
                    </div>
                  )}
                  {isLoadItemsFromStockItemHeader && (
                    <div className="flex flex-col flex-grow">
                      <div className="overflow-y-auto flex-grow max-h-[500px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <StockNotMaintainedAddedToBillItems context="bill" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </section>
    </>
  );
};

export default POSBillingScreenUpdate;

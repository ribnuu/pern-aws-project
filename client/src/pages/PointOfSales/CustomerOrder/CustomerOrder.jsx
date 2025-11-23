import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import StockMaintainedBillingItems from "../BillingScreen/StockMaintainedBillingItems";
import StockNotMaintainedBillingItems from "../BillingScreen/StockNotMaintainedBillingItems";
import StockMaintainedAddedToBillItems from "../BillingScreen/StockMaintainedAddedToBillItems";
import StockNotMaintainedAddedToBillItems from "../BillingScreen/StockNotMaintainedAddedToBillItems";
import CustomerOrderCustomerInfoInput from "./customerOrderCustomerInput";
import {
  getStockCustomerOrderDetailApi,
  updateStockCustomerOrderHeader,
} from "../../../apis/PointOfSalesApiService";
import { fetchCustomerOrderAsync } from "../../../store/point-of-sales/PointOfSalesSlice";

const CustomerOrder = () => {
  const {
    isLoadItemsFromStockItemHeader,
    customerName,
    orderNumber,
    tenderAmount,
    dateTime,
    deleteStatus,
    deliveryDate,
    products,
  } = useSelector((state) => state.pointOfSalesReducer);

  const items = useSelector((state) => state.pointOfSalesReducer.products);

  const dispatch = useDispatch();

  const [customerOrders, setCustomerOrders] = useState([]);

  const ORDER_BILLED = "billed";

  console.log("customer name:", customerName);
  console.log("customer name:", orderNumber);
  console.log("customer tenderAmount:", tenderAmount);
  console.log("customer dateTime:", dateTime);
  console.log("customer products:", products);
  console.log("customer deliveryDate:", deliveryDate);

  const addcustomerOrderHandle = (orderNumber) => {
    if (!orderNumber.trim()) {
      console.warn("Empty order number,request aborated");
      return;
    }
    console.log("Fetching customer order details for:", orderNumber);
    try {
      dispatch(fetchCustomerOrderAsync(orderNumber));
    } catch (error) {
      console.error("Error fetching customer order details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStockCustomerOrderDetailApi();
        // Filter out billed orders
        const unbilledOrders = response.data.filter(
          (order) => order.order_billed !== ORDER_BILLED
        );
        setCustomerOrders(unbilledOrders);
      } catch (error) {
        toast.error("Failed to fetch customer order details");
      }
    };

    fetchData();
  }, []);

  const handleDone = async (orderNumber, orderBilled) => {
    try {
      await updateStockCustomerOrderHeader(orderNumber, orderBilled);
      toast.success("Order billed successfully");

      setCustomerOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderNumber !== orderNumber)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to bill order");
      console.log("error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top section */}
      <div className="">
        <CustomerOrderCustomerInfoInput />
      </div>

      {/* Bottom section */}
      <div className="">
        <div className="min-h-screen flex">
          {/*Left column  */}
          <div className="w-5/6 border">
            {/* Customer Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2  text-sm gap-2 font-black mt-4 mb-8 ">
              <div className="lg:col-span-1">
                {isLoadItemsFromStockItemHeader ? (
                  <StockNotMaintainedBillingItems />
                ) : (
                  <StockMaintainedBillingItems />
                )}
              </div>
              <div className="lg:col-span-1 overflow-scroll  max-h-[620px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
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
                          <StockNotMaintainedAddedToBillItems context="customerOrder" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Proceed Button  */}
            <div className="relative">
              <div className="absolute right-10">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition">
                  Proceed To Bill
                </button>
              </div>
            </div>
          </div>
          {/* Right column */}
          <div className="w-1/6 border">
            <h1 className="text-center font-bold my-2">
              List of custom orders
            </h1>

            {/* customer order list */}
            <div className="px-3 space-y-3 max-h-[550px] overflow-y-auto overflow-hidden ">
              {customerOrders.map((order) => (
                <button
                  key={order.id}
                  className="w-full text-left bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 shadow-md transition duration-200 ease-in-out "
                  onClick={() => addcustomerOrderHandle(order.orderNumber)}
                >
                  <h2 className="text-sm font-semibold">
                    {order.stockCustomerInstitution}
                  </h2>

                  <p className="text-sm">ON:{order.orderNumber}</p>
                  <p className="text-sm">{order.delivery_date}</p>
                  <p className="text-sm">{order.remark}</p>
                  <button
                    className="rounded-md bg-green-500 text-white text-sm font-semibold px-1 my-1 hover:bg-green-700"
                    onClick={() => handleDone(order.orderNumber, ORDER_BILLED)}
                  >
                    Done
                  </button>
                </button>
              ))}
            </div>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default CustomerOrder;

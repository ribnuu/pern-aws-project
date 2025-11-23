import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseProductCountByIdForStockNotMaintainedProduct,
  IncreaseProductCountByIdForStockNotMaintainedProduct,
  RemoveProductByIdForStockNotMaintainedProduct,
  SetPointOfSalesSliceField,
  createBillRecordAsync,
  UpdateProductQuantityForStockNotMaintainedProduct,
  UpdateItemDiscountPercentage,
  UpdateItemDiscountAmount,
  DistributeTotalDiscount,
  DistributeTotalDiscountByPercentage,
  UpdateProductReturnQuantityForStockNotMaintainedProduct,
  DecreaseReturnProductCountByIdForStockNotMaintainedProduct,
  IncreaseReturnProductCountByIdForStockNotMaintainedProduct,
  createReturnBillRecordAsync,
} from "../../../store/point-of-sales/PointOfSalesSlice";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import PaymentTypeSelection from "../paymentTypeSelection";
import { FaDeleteLeft } from "react-icons/fa6";

const ReturnStockNotMaintainedAddedToBillItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pointOfSalesReducer.products);
  const data = useSelector((state) => state.pointOfSalesReducer);

  const {
    loading,
    isGrnEnabled,
    isBillToCompany,
    stockCustomerInstitutionData,
    typeOfPayment,
    customerNumber,
    tenderAmount,
  } = useSelector((state) => state.pointOfSalesReducer);

  const bill = useSelector((state) => state.pointOfSalesReducer);

  const [billDate, setBillDate] = useState(dayjs());
  const [localDiscounts, setLocalDiscounts] = useState({});

  const handleProceedToBilling = async () => {
    console.log("Proceeding to billing...");

    try {
      const result = await dispatch(createReturnBillRecordAsync()).unwrap();
      console.log("Return Bill record created successfully:", result);
      toast.success("Return Bill created successfully");
    } catch (error) {
      console.error("Error creating Return bill record:", error);
      toast.error("Failed to create Return Bill");
    }
  };

  // Add event listener for the Enter key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        console.log("Enter key pressed. Proceeding to billing...");
        handleProceedToBilling(); // Call the proceed to billing function
      }
    };

    // Add the keydown event listener to the window object
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className=" min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table header */}
        <thead className="text-xs font-bold text-gray-00 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-1 font-semibold text-white dark:text-black"
            >
              img
            </th>
            <th scope="col" className="px-6 py-1 text-black font-bold">
              Solid Qty
            </th>
            <th scope="col" className="px-6 py-1 text-black font-bold">
              Return Qty
            </th>
            <th scope="col" className="px-6 py-1 text-black font-semibold">
              Price
            </th>
            <th scope="col" className="px-6 py-1 text-black font-semibold">
              Amount
            </th>
            <th scope="col" className="px-6 py-1 text-black font-semibold">
              Discount(%)
            </th>
            <th scope="col" className="px-6 py-1 text-black font-semibold">
              Discount
            </th>
            <th scope="col" className="px-6 py-1">
              {/* Action */}
            </th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="bg-white">
                {/* Image cell spanning both rows */}
                <td rowSpan={2} colSpan={1} className="p-4 align-middle ">
                  <img
                    src="https://avatar.iran.liara.run/public/55"
                    className="w-20 h-auto object-cover"
                    alt={item.item_name}
                  />
                </td>
                {/* Item name row */}
                <td
                  colSpan={6}
                  className="w-full  px-6 py-[2px] text-[12px]  text-gray-900 dark:text-white"
                >
                  {item.item_name}
                </td>
              </tr>
              {/* Details row */}
              <tr
                key={item.item_code}
                className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className=" md:px-2 lg:px-6 py-1 font-[12px]  text-gray-900 dark:text-white">
                  <span> {item.quantity}</span>
                </td>
                <td className="px-6 py-1">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (item.returnQuantity < 1) return; // Ensure quantity doesn't go below 1
                        dispatch(
                          DecreaseReturnProductCountByIdForStockNotMaintainedProduct(
                            {
                              productId: item.item_code,
                              count: item.returnQuantity - 1,
                            }
                          )
                        );
                      }}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      disabled={item.returnQuantity <= 1}
                    >
                      <span className="sr-only">Decrease Quantity</span>
                      <svg
                        className="w-2 h-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            UpdateProductReturnQuantityForStockNotMaintainedProduct(
                              {
                                productId: item.item_code,
                                count: "",
                              }
                            )
                          );
                        }}
                        onChange={(e) => {
                          dispatch(
                            UpdateProductReturnQuantityForStockNotMaintainedProduct(
                              {
                                productId: item.item_code,
                                count: parseInt(e.target.value) || 0,
                              }
                            )
                          );
                        }}
                        type="number"
                        value={item.returnQuantity ?? ""}
                        className="bg-gray-50 w-[70px] border border-gray-300 text-gray-900 text-[11px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Return Qty"
                        min="0"
                        required
                      />
                    </div>
                    <button
                      onClick={() => {
                        dispatch(
                          IncreaseReturnProductCountByIdForStockNotMaintainedProduct(
                            {
                              productId: item.item_code,
                              count: item.returnQuantity + 1,
                            }
                          )
                        );
                      }}
                      className="inline-flex items-center justify-center h-5 w-5 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Increase Quantity</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className=" md:px-2 lg:px-6 py-1 font-[12px]  text-gray-900 dark:text-white">
                  <span>LKR</span>
                  <span> {item.details[0].mrp}</span>
                </td>
                <td className=" md:px-2 lg:px-6 py-1  font-[12px] text-gray-900 dark:text-white">
                  <span>LKR</span>
                  <span> {item.details[0].mrp * item.quantity}</span>
                </td>
                <td className="md:px-2 lg:px-6 py-1 font-[12px] text-gray-900 dark:text-white ">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={
                        item.discountPercentage !== undefined &&
                        item.discountPercentage !== null
                          ? item.discountPercentage
                          : ""
                      }
                      onChange={(e) => {
                        dispatch(
                          UpdateItemDiscountPercentage({
                            productId: item.item_code,
                            percentage: parseFloat(e.target.value) || 0,
                          })
                        );
                      }}
                      className="w-[65px] px-2 py-1 rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-[12px]"
                      placeholder="%"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span className="text-[12px] text-gray-700 dark:text-gray-200">
                      %
                    </span>
                  </div>
                </td>

                <td className="md:px-2 lg:px-6 py-1 font-[12px] text-gray-900 dark:text-white">
                  <input
                    type="number"
                    value={
                      item.discountAmount !== undefined &&
                      item.discountAmount !== null
                        ? item.discountAmount
                        : ""
                    }
                    onChange={(e) => {
                      dispatch(
                        UpdateItemDiscountAmount({
                          productId: item.item_code,
                          amount: parseFloat(e.target.value) || 0,
                        })
                      );
                    }}
                    className="w-[70px] px-1 py-[2px] text-[12px] rounded-sm border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="LKR"
                    min={0}
                    step="any"
                  />
                </td>
                <td className="px-6 py-1">
                  {/* <button
                    onClick={() => handleRemoveItem(item.item_code)}
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    REMOVE
                  </button> */}
                  <FaDeleteLeft
                    size={18}
                    color="red"
                    onClick={() => handleRemoveItem(item.item_code)}
                  />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="m-2 flex justify-end">
        <button
          disabled={loading}
          onClick={handleProceedToBilling}
          type="button"
          className="justify-end text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default ReturnStockNotMaintainedAddedToBillItems;

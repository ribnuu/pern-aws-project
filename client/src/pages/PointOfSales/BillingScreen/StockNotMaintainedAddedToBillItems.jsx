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
} from "../../../store/point-of-sales/PointOfSalesSlice";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import PaymentTypeSelection from "../paymentTypeSelection";
import { FaDeleteLeft } from "react-icons/fa6";

const StockNotMaintainedAddedToBillItems = ({ context }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pointOfSalesReducer.products);

  const {
    loading,
    isGrnEnabled,
    isBillToCompany,
    stockCustomerInstitutionData,
    typeOfPayment,
    customerNumber,
    tenderAmount,
  } = useSelector((state) => state.pointOfSalesReducer);

  const [billDate, setBillDate] = useState(dayjs());
  const [localDiscounts, setLocalDiscounts] = useState({});

  //Ref for tenderAmount input
  const tenderAmountRef = useRef(null);
  // total discount
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountPercentage, setTotalDiscountPercentage] = useState(0);

  const handleRemoveItem = (id) => {
    dispatch(RemoveProductByIdForStockNotMaintainedProduct(id));
  };

  // Calculate subtotal amount
  const subtotal = items.reduce((acc, item) => {
    const mrp = item?.details[0].mrp || 0;
    return acc + mrp * item.quantity;
  }, 0);

  //update total discount in useEffect when items change
  useEffect(() => {
    const discountSum = items.reduce((acc, item) => {
      const discount = item?.discountAmount || 0;
      return acc + discount;
    }, 0);

    setTotalDiscount(parseFloat(discountSum.toFixed(2)));
    setTotalDiscountPercentage(
      parseFloat(((discountSum / subtotal) * 100).toFixed(2))
    );
  }, [items]);

  //Calculate balance amount
  const balance = subtotal - tenderAmount - totalDiscount;

  // Example function for changing amount
  const handleChangeAmount = () => {
    // Implement logic for changing amount if needed
    alert("Implement logic for changing amount here!");

    useEffect(() => {
      const discountMap = {};
      items.forEach((item) => {
        discountMap[item.item_code] = item.discountPercentage ?? "";
      });
      setLocalDiscounts(discountMap);
    }, [items]);
  };

  const handleProceedToBilling = async () => {
    // Handle proceed to billing logic
    console.log("Proceeding to billing...");
    // Add logic to navigate to billing page or trigger billing process
    // if (typeOfPayment === "cash" && tenderAmount < subtotal) {
    //   toast.error("Please check the tender amount with the sub total");
    // } else

    if (!typeOfPayment || typeOfPayment === "") {
      toast.error("Please select a payment method");
      return;
    }
    if (customerNumber === "") {
      toast.error("Please Enter Customer number");
      return;
    }

    // if (typeOfPayment === "cash") {
    //   if (tenderAmount <= 0) {
    //     toast.error("Please Enter Tender Amount");
    //     return;
    //   }
    // }

    //tender amount validation for all payment method
    if (typeOfPayment === "cash" && tenderAmount <= 0) {
      toast.error("Please Enter Tender Amount");
      return;
    }

    dispatch(
      createBillRecordAsync({
        billDateTime: billDate,
        context: context,
      })
    )
      .unwrap()
      .then((result) => {
        if (context === "bill") {
          console.log("Bill record created successfully:");
          toast.success("Bill record created successfully:", result);
        }
        {
          console.log("Customer Order record created successfully:");
          toast.success("Customer Order record created successfully:", result);
        }

        //Refreshing page after 5 seconds
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
      })
      .catch((error) => {
        console.error("Error creating bill record:", error);
        toast.error("Error creating bill record:");
      });

    // if (isBillToCompany && !stockCustomerInstitutionData) {
    //   toast.error("No company is associated with the selected user");
    // } else if (items && items.length > 0) {
    //   dispatch(createBillRecordAsync({ billDateTime: billDate }));
    // }
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

  //Focus on tenderAmount when typeofPayment is 'cash'
  useEffect(() => {
    if (typeOfPayment === "cash" && tenderAmountRef.current) {
      tenderAmountRef.current.focus();
    }
  }, [typeOfPayment]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Top Part */}
      {/* <div className="p-4 bg-gray-100 dark:bg-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Order Summary
        </h2>
      </div> */}

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
              Qty
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
                <td className="px-6 py-1">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (item.quantity < 1) return; // Ensure quantity doesn't go below 1
                        dispatch(
                          DecreaseProductCountByIdForStockNotMaintainedProduct({
                            productId: item.item_code,
                            count: item.quantity - 1,
                          })
                        );
                      }}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-5 w-5 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      disabled={item.quantity <= 1}
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
                            UpdateProductQuantityForStockNotMaintainedProduct({
                              productId: item.item_code,
                              count: "",
                            })
                          );
                        }}
                        onChange={(e) => {
                          dispatch(
                            UpdateProductQuantityForStockNotMaintainedProduct({
                              productId: item.item_code,
                              count: e.target.value,
                            })
                          );
                        }}
                        type="number"
                        value={item.quantity}
                        className="bg-gray-50 w-[70px] border border-gray-300 text-gray-900 text-[11px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block px-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Quantity"
                        min="1"
                        required
                      />
                    </div>
                    <button
                      onClick={() => {
                        dispatch(
                          IncreaseProductCountByIdForStockNotMaintainedProduct({
                            productId: item.item_code,
                            count: item.quantity + 1,
                          })
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

      <div className=" grid grid-cols-2 lg:grid-cols-3 mt-8 mx-1">
        <div className="bg-gray-200 p-1 rounded-md lg:col-span-2">
          {
            <div className="w-auto h-auto  px-1 py-1  flex-col  items-end relative">
              {/* payment methods */}
              <div className="">
                {items && items.length > 0 && <PaymentTypeSelection />}
              </div>
            </div>
          }
        </div>
        <div className="">
          <div className="flex flex-col gap-2 mt-4 mb-2">
            {/* sub total */}
            <div className="flex justify-end items-center ">
              <span className="font-semibold min-w-[110px] text-gray-900 dark:text-white">
                Subtotal
              </span>
              <span>:</span>
              <span className="w-auto min-w-[65px] ml-2 text-gray-900 dark:text-white">
                ${subtotal}
              </span>
            </div>
            {/* Discount */}
            <div className="flex justify-end items-center ">
              <span className="font-semibold min-w-[110px] text-gray-900 dark:text-white">
                Discount
              </span>
              <span>:</span>
              <input
                type="number"
                value={totalDiscount}
                className="w-auto max-w-[65px] px-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={(e) => {
                  const totalDiscount = e.target.value;
                  setTotalDiscount(totalDiscount);
                  dispatch(
                    DistributeTotalDiscount(
                      Number(parseFloat(totalDiscount).toFixed(2))
                    )
                  );
                }}
              />
            </div>
            {/* Discount percentage */}
            <div className="flex justify-end items-center ">
              <span className="font-semibold min-w-[110px] text-gray-900 dark:text-white">
                Discount(%)
              </span>
              <span>:</span>
              <input
                type="number"
                value={totalDiscountPercentage}
                className="w-auto max-w-[65px] px-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={(e) => {
                  const totalDiscountPercentage = e.target.value;
                  setTotalDiscountPercentage(totalDiscountPercentage);
                  dispatch(
                    DistributeTotalDiscountByPercentage(
                      Number(parseFloat(totalDiscountPercentage).toFixed(2))
                    )
                  );
                }}
              />
            </div>

            {/* Tender Amount (Input Field) */}
            {typeOfPayment === "cash" && (
              <div className=" flex justify-end items-center ">
                <span className="min-w-[110px] font-semibold">
                  Tender Amount
                </span>
                <span>:</span>
                <input
                  ref={tenderAmountRef}
                  type="number"
                  className="w-auto max-w-[65px] px-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  // value={tenderAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(
                      SetPointOfSalesSliceField({
                        field: "tenderAmount",
                        value,
                      })
                    );
                  }}
                  placeholder="0.00"
                />
              </div>
            )}

            {/* Balance Amount */}
            <div className="flex justify-end mb-2 items-center ">
              <span className="font-semibold min-w-[110px] text-gray-900 dark:text-white">
                Balance
              </span>
              <span>:</span>
              <span className="w-auto min-w-[65px] ml-2 text-gray-900 dark:text-white">
                {balance ? balance : 0.0}
              </span>
            </div>
          </div>

          {/* Proceed to Billing section */}
          <div className="flex justify-end  mb-4 items-center">
            {/* Temporary field */}
            {/* <CustomDatePicker
            labelText="Bill Date"
            onDateChange={setBillDate}
            // currentDate={dayjs()}
          /> */}
            {/* {billDate?.toString()} */}
            <span className="mr-2" />

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
      </div>
    </div>
  );
};

export default StockNotMaintainedAddedToBillItems;

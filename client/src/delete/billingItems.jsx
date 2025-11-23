import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseProductCountById,
  IncreaseProductCountById,
  RemoveProductById,
  SetPointOfSalesSliceField,
  UpdateProductQuantity,
  createBillRecordAsync,
} from "../../store/point-of-sales/PointOfSalesSlice";
import toast from "react-hot-toast";
import CustomDatePicker from "../../components/customDatePicker";
import dayjs from "dayjs";

const BillingItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.pointOfSalesReducer.products);

  const {
    loading,
    isGrnEnabled,
    isBillToCompany,
    stockCustomerInstitutionData,
  } = useSelector((state) => state.pointOfSalesReducer);

  const [billDate, setBillDate] = useState(dayjs());

  const handleToggle = () => {
    dispatch(
      SetPointOfSalesSliceField({
        field: "isGrnEnabled",
        value: !isGrnEnabled, // Toggle the value
      })
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(RemoveProductById(id));
  };

  // Calculate subtotal amount
  const subtotal = items.reduce((acc, item) => {
    return acc + item.stock_balance_update.item_mrp * item.quantity;
  }, 0);

  // Example function for changing amount
  const handleChangeAmount = () => {
    // Implement logic for changing amount if needed
    alert("Implement logic for changing amount here!");
  };

  const handleProceedToBilling = async () => {
    // Handle proceed to billing logic
    console.log("Proceeding to billing...");
    // Add logic to navigate to billing page or trigger billing process
    // if (typeOfPayment === "cash" && tenderAmount < subtotal) {
    //   toast.error("Please check the tender amount with the sub total");
    // } else

    if (isBillToCompany && !stockCustomerInstitutionData) {
      toast.error("No company is associated with the selected user");
    } else if (items && items.length > 0) {
      dispatch(createBillRecordAsync({ billDateTime: billDate }));
    }
  };

  return (
    <div className="mx-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.stock_balance_update.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src="https://avatar.iran.liara.run/public/55"
                  // src={`/docs/images/products/${item.name
                  //   .toLowerCase()
                  //   .replace(/\s/g, "-")}.png`}
                  className="w-16 md:w22" // Adjust width classes as needed
                  alt={item.stock_item_header.item_name}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.stock_item_header.item_name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      if (item.quantity < 1) return; // Ensure quantity doesn't go below 1
                      dispatch(
                        DecreaseProductCountById({
                          productId: item.stock_balance_update.id,
                          count: item.quantity - 1,
                        })
                      );
                    }}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    disabled={item.quantity <= 1}
                  >
                    <span className="sr-only">Decrease Quantity</span>
                    <svg
                      className="w-3 h-3"
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
                      onChange={(e) => {
                        console.log(e.target.value);
                        dispatch(
                          UpdateProductQuantity({
                            productId: item.stock_balance_update.id,
                            count: e.target.value,
                          })
                        );
                      }}
                      // disabled
                      type="number"
                      value={item.quantity}
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                      min="1"
                      required
                    />
                  </div>
                  <button
                    onClick={() => {
                      dispatch(
                        IncreaseProductCountById({
                          productId: item.stock_balance_update.id,
                          count: item.quantity + 1,
                        })
                      );
                    }}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                LKR {item.stock_balance_update.item_mrp}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                LKR {item.stock_balance_update.item_mrp * item.quantity}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleRemoveItem(item.stock_balance_update.id)}
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 mx-5">
        <div className="flex justify-end mb-4 items-center">
          <span className="font-semibold text-gray-900 dark:text-white">
            Subtotal:
          </span>
          <span className="ml-2 text-gray-900 dark:text-white">
            ${subtotal}
          </span>
        </div>
        {/* Change Amount section */}
        {/* <div className="flex justify-end mb-4 items-center">
          <span className="font-semibold text-gray-900 dark:text-white">
            Change Amount:
          </span>
          <button
            onClick={handleChangeAmount}
            type="button"
            className="ml-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
          >
            Change
          </button>
        </div> */}
        {/* Proceed to Billing section */}
        <div className="flex justify-end mb-4 items-center">
          {/* Temporary field */}
          <CustomDatePicker
            labelText="Bill Date"
            onDateChange={setBillDate}
            currentDate={dayjs()}
          />
          {/* {billDate?.toString()} */}
          <span className="mr-2" />

          <button
            disabled={loading}
            onClick={handleProceedToBilling}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
  );
};

export default BillingItems;

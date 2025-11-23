import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import { createGRNRecordAPi } from "../../../apis/PointOfSalesApiService";
import SignatureCapture from "../../../components/SignatureCapture/SignatureCapture";
import CustomDatePicker from "../../../components/customDatePicker";
import dayjs from "dayjs";
import GRNHeader from "./GRNHeader";

const GRNEditTable = ({
  data = [],
  billHeaderData,
  stockGrnHeader,
  stockGrnDetail = [],
  savedSignatureImage = null,
  isAuthorized = false,
  stockCustomerInstitution = {},
}) => {
  const [toEditItem, setToEditItem] = useState(null);
  const [items, setItems] = useState(data);
  const initilState = {
    name: "",
    nic: "",
    // signature: "",
    userId: localStorage.getItem("user_id"),
  };
  const [formData, setFormData] = useState(initilState);
  const [isSavingGRN, setIsSavingGRN] = useState(false);
  const [isEditable, setIsEditable] = useState(isAuthorized);
  const [signatureImage, setSignatureImage] = useState(null);

  const handleSignatureChange = (imageData) => {
    setSignatureImage(imageData);
  };

  useEffect(() => {
    if (data.length > 0 && items.length <= 0) {
      setItems(data);
    }
  }, [data]);

  useEffect(() => {
    if (stockGrnDetail && stockGrnDetail.length > 0) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }, [stockGrnDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (itemId, newValue) => {
    // Convert newValue to number or default to zero if empty
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);

    if (numericValue < 0) {
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.stock_bill_detail.id === itemId) {
        if (numericValue > item.stock_bill_detail.quantity) {
          return item;
        }

        return {
          ...item,
          edited_values: {
            ...item.edited_values, // Preserve existing edited_values
            quantity: numericValue,
          },
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleConsumerMRPChange = (itemId, newValue) => {
    const numericValue = newValue === "" ? "0" : newValue.replace(/^0+/, "");
    if (numericValue < 0) {
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.stock_bill_detail.id === itemId) {
        return {
          ...item,
          edited_values: {
            ...item.edited_values, // Preserve existing edited_values
            item_mrp: numericValue,
          },
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleExpiryDateChange = (itemId, newValue) => {
    const updatedItems = items.map((item) => {
      if (item.stock_bill_detail.id === itemId) {
        return {
          ...item,
          edited_values: {
            ...item.edited_values, // Preserve existing edited_values
            expiry_date: newValue,
          },
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSavingGRN(true);
    try {
      const response = await createGRNRecordAPi({
        items,
        formData,
        billHeaderData,
        signatureImage,
      });
      setIsEditable(false);
      if (response && response.success) {
        toast.success("Successfuly udated grn record");
      } else if (response.message) {
        toast.error(response.message);
      } else {
        toast.error("Failed to update grn record");
      }
      setIsSavingGRN(false);
    } catch (error) {
      setIsSavingGRN(false);
      toast.error("Failed to save");
    } finally {
      setIsSavingGRN(false);
      window.location.reload();
    }
  };

  const getQty = (data) => {
    try {
      return data.stock_bill_detail.quantity;
    } catch (error) {
      return "sfsf";
    }
  };

  const getExpiryDate = (isEditable = false, item = {}) => {
    if (isEditable) {
      if (item?.edited_values?.expiry_date) {
        return item.edited_values.expiry_date;
      } else {
        return item.stock_item_detail.expiry_date;
      }
    } else {
      return null;
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
      <div className="sm:p-10 rounded-md dark:bg-gray-900 border border-black">
        <GRNHeader
          grnHeaderData={stockGrnHeader}
          billHeaderData={billHeaderData}
          stockCustomerInstitution={stockCustomerInstitution}
        />
        <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    Item Name
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    Cost
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    MRP
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    Exp Date
                  </th>
                  {isEditable && (
                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              {!stockGrnDetail || stockGrnDetail.length <= 0 ? (
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.stock_bill_detail.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-4 py-4 sm:px-6 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.stock_item_header.item_name}
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        {toEditItem === item.stock_bill_detail.id ? (
                          <input
                            type="number"
                            className="border border-gray-300 px-2 py-1 rounded-md w-full"
                            value={
                              item?.edited_values &&
                              item.edited_values.quantity !== undefined
                                ? item.edited_values.quantity
                                : item.stock_bill_detail.quantity
                            }
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              handleQuantityChange(
                                item.stock_bill_detail.id,
                                inputValue
                              );
                            }}
                          />
                        ) : (
                          <span>
                            {isEditable
                              ? item?.edited_values?.quantity
                                ? item.edited_values.quantity
                                : item.stock_bill_detail.quantity
                              : getQty(item)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        {item.stock_bill_detail.mrp}
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        {toEditItem === item.stock_bill_detail.id ? (
                          <input
                            type="number"
                            className="border border-gray-300 px-2 py-1 rounded-md w-full"
                            value={
                              item?.edited_values?.item_mrp
                                ? item.edited_values.item_mrp
                                : item.stock_item_header.is_stock_maintained
                                ? item?.stock_balance_update?.item_mrp
                                : item.stock_bill_detail.mrp
                            }
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              handleConsumerMRPChange(
                                item.stock_bill_detail.id,
                                inputValue
                              );
                            }}
                          />
                        ) : (
                          <span>
                            {item?.edited_values?.item_mrp
                              ? item.edited_values.item_mrp
                              : item.stock_item_header.is_stock_maintained
                              ? item?.stock_balance_update?.item_mrp
                              : item.stock_bill_detail.mrp}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        {toEditItem === item.stock_bill_detail.id ? (
                          <>
                            {isEditable ? (
                              <CustomDatePicker
                                onDateChange={(value) => {
                                  console.log(value);
                                  handleExpiryDateChange(
                                    item.stock_bill_detail.id,
                                    formatDate(value)
                                  );
                                }}
                              />
                            ) : (
                              <span>
                                {item?.edited_values
                                  ? item.edited_values.item_mrp
                                  : item.stock_item_header.is_stock_maintained
                                  ? item.stock_balance_update.expiry_date
                                  : item.stock_item_detail.expiry_date}
                              </span>
                            )}
                          </>
                        ) : (
                          <span>{getExpiryDate(isEditable, item)}</span>
                        )}
                      </td>
                      {isEditable && (
                        <td className="px-4 py-4 sm:px-6 sm:py-3">
                          <button
                            onClick={() => {
                              if (toEditItem === item.stock_bill_detail.id) {
                                setToEditItem(null);
                              } else {
                                setToEditItem(item.stock_bill_detail.id);
                              }
                            }}
                            className={`${
                              toEditItem === item.stock_bill_detail.id
                                ? "text-red-600"
                                : "text-blue-600"
                            } font-medium dark:text-blue-500 hover:underline`}
                          >
                            {toEditItem === item.stock_bill_detail.id
                              ? "Cancel"
                              : "Edit"}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {stockGrnDetail.map((item) => (
                    <tr
                      key={item.stock_grn_detail.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-xs"
                    >
                      <th
                        scope="row"
                        className="px-4 py-4 sm:px-6 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.item_name}
                      </th>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        <span>{item.stock_grn_detail.item_qty}</span>
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        {item.stock_grn_detail.cost}
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        <span>{item.stock_grn_detail.mrp}</span>
                      </td>
                      <td className="px-4 py-4 sm:px-6 sm:py-3">
                        <span>{item.stock_grn_detail.expiry_date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="mt-4 mx-4 sm:mx-5">
          <form onSubmit={handleSave} className="space-y-4">
            {stockGrnDetail.length <= 0 && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={
                      isEditable
                        ? formData.name
                        : stockGrnHeader?.received_by_name
                    }
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label
                    htmlFor="nic"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    NIC
                  </label>
                  <input
                    type="text"
                    name="nic"
                    id="nic"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={
                      isEditable
                        ? formData.nic
                        : stockGrnHeader?.received_by_nic
                    }
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="signature"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Signature
              </label>
              <SignatureCapture
                onChange={handleSignatureChange}
                savedSignatureImage={savedSignatureImage}
                isEditable={isEditable}
              />
            </div>

            <div className="flex justify-end">
              {isEditable && (
                <button
                  disabled={isSavingGRN || !isEditable}
                  type="submit"
                  className="px-6 py-2 mb-4 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg w-full sm:w-auto"
                >
                  {isSavingGRN && <CircularLoadingSvgOne />}
                  {isSavingGRN ? "Updating..." : "Update"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default GRNEditTable;

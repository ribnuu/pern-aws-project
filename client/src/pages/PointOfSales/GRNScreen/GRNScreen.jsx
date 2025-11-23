import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import {
  createGRNRecordAPi,
  searchProductsFromStockItemHeaderApi,
} from "../../../apis/PointOfSalesApiService";
import SignatureCapture from "../../../components/SignatureCapture/SignatureCapture";
import CustomDatePicker from "../../../components/customDatePicker";
import dayjs from "dayjs";
import _ from "lodash";

const GRNScreen = ({
  data = [],
  billHeaderData,
  stockGrnHeader,
  stockGrnDetail = [],
  savedSignatureImage = null,
}) => {
  const inputRef = useRef(null);

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
  const [isEditable, setIsEditable] = useState(false);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F1") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(items);

  // For Search functionality
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleAllUsersSearch = (event) => {
    const getAllUsersSearch = event.target.value.toLowerCase(); // Ensure search is case insensitive
    if (getAllUsersSearch.length > 0) {
      const searchData = unChangedUsers.filter(
        (item) =>
          (item.username &&
            item.username.toLowerCase().includes(getAllUsersSearch)) ||
          (item.mobile_number &&
            item.mobile_number.includes(getAllUsersSearch)) ||
          (item.nic_number && item.nic_number.includes(getAllUsersSearch))
      );
      setAllUsers(searchData);
      if (searchData.length <= 0) {
        setSearchTerm(getAllUsersSearch);
      }
    } else {
      setAllUsers(unChangedUsers);
    }
    // setAllUsersQuery(getAllUsersSearch);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        // const response = await searchUsersApi(searchTerm);
        // setAllUsers(response.data);
        const response = await searchProductsFromStockItemHeaderApi(searchTerm);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        // setLoading(false);
      }
    }, 500),
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchResultsDropdownRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelect(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectSearchResultItem = (item) => {
    // Check if the item_code is already in the selected items
    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.item_code === item.item_code
    );

    if (!itemExists) {
      // Add the item to selected items if it doesn't exist
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }

    // Clear search results and input
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      debouncedSearch(searchTerm.trim());
    }
  }, [searchTerm, debouncedSearch]);

  //   ------------ End -------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleQuantityChange = (itemId, newValue) => {
    // Convert newValue to number or default to zero if empty
    const numericValue = newValue === "" ? "0" : newValue.replace(/^0+/, "");
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

  const getMrp = (data) => {
    const match = stockGrnDetail.filter(
      (i) => i.stock_grn_detail.item_code === data.stock_bill_detail.item_code
    );
    if (match && match.length > 0) {
      return match[0].stock_grn_detail.mrp;
    }
  };

  const getQty = (data) => {
    const match = stockGrnDetail.filter(
      (i) => i.stock_grn_detail.item_code === data.stock_bill_detail.item_code
    );
    if (match && match.length > 0) {
      return match[0].stock_grn_detail.item_qty;
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  return (
    <>
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="mx-5 my-5">
            <div className="relative">
              <input
                type="text"
                name="allUsers"
                className="bg-white text-black rounded-md py-2 px-4 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                placeholder="Search Users ..."
                onChange={handleAllUsersSearch}
                onKeyDown={handleKeyDown}
                ref={inputRef}
              />

              {searchResults.length > 0 && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={result.item_code}
                      className={`py-2 px-4 cursor-pointer ${
                        selectedIndex === index ? "bg-blue-100" : ""
                      }`}
                      // onMouseDown={() => handleSelect(result)} // Use onMouseDown for better UX
                      onClick={() => handleSelectSearchResultItem(result)}
                    >
                      {result.item_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <tbody>
              {selectedItems.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-4 py-4 sm:px-6 sm:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.item_name}
                  </th>
                  <td className="px-4 py-4 sm:px-6 sm:py-3">
                    {toEditItem === item?.id ? (
                      <input
                        type="number"
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                        // value={
                        //   item?.edited_values &&
                        //   item.edited_values.quantity !== undefined
                        //     ? item.edited_values.quantity
                        //     : item.stock_bill_detail.quantity
                        // }
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // if (/^\d+$/.test(inputValue)) {
                          handleQuantityChange(
                            item.stock_bill_detail.id,
                            inputValue
                          );
                          // }
                        }}
                      />
                    ) : (
                      <span>
                        0
                        {/* {isEditable
                          ? item?.edited_values && item.edited_values.quantity
                            ? item.edited_values.quantity
                            : item.stock_bill_detail.quantity
                          : getQty(item)} */}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 sm:px-6 sm:py-3">
                    {/* {item.stock_bill_detail.amount} */}0
                  </td>
                  <td className="px-4 py-4 sm:px-6 sm:py-3">
                    {toEditItem === item.id ? (
                      <input
                        type="number"
                        className="border border-gray-300 px-2 py-1 rounded-md w-full"
                        // value={
                        //   item?.edited_values && item.edited_values.item_mrp
                        //     ? item.edited_values.item_mrp
                        //     : item.stock_balance_update.item_mrp
                        // }
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
                        0
                        {/* {isEditable
                          ? item?.edited_values && item.edited_values.item_mrp
                            ? item.edited_values.item_mrp
                            : item.stock_balance_update.item_mrp
                          : getMrp(item)} */}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 sm:px-6 sm:py-3">
                    {toEditItem === item.id ? (
                      <>
                        {isEditable ? (
                          <CustomDatePicker
                            onDateChange={(value) => {
                              console.log(value);
                              handleExpiryDateChange(
                                item.id,
                                formatDate(value)
                              );
                            }}
                          />
                        ) : (
                          <span>
                            {item?.edited_values && item.edited_values.item_mrp}
                          </span>
                        )}
                      </>
                    ) : (
                      <span>
                        123
                        {/* {isEditable
                          ? item?.edited_values &&
                            item.edited_values.expiry_date
                            ? item.edited_values.expiry_date
                            : item.stock_balance_update.expiry_date
                          : item?.stock_balance_update?.expiry_date} */}
                      </span>
                    )}
                  </td>
                  {isEditable && (
                    <td className="px-4 py-4 sm:px-6 sm:py-3">
                      <button
                        onClick={() => {
                          if (toEditItem === item.item_code) {
                            setToEditItem(null);
                          } else {
                            setToEditItem(item.item_code);
                          }
                        }}
                        className={`${
                          toEditItem === item.item_code
                            ? "text-red-600"
                            : "text-blue-600"
                        } font-medium dark:text-blue-500 hover:underline`}
                      >
                        {toEditItem === item.item_code ? "Cancel" : "Edit"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 mx-4 sm:mx-5">
            <form onSubmit={handleSave} className="space-y-4">
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
                    isEditable ? formData.nic : stockGrnHeader?.received_by_nic
                  }
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
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
        <h1>
          This is exactly same as other GRN screen with one major difference.
          This GRN screen will update transaction table in our own database
          while other grn screen will update the transaction table on the
          external database.{" "}
        </h1>
      </div>
    </>
  );
};

export default GRNScreen;

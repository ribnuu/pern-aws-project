import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularLoadingSvgOne from "../../components/Svgs/CircularLoadingSvgOne";
// import {
//   createGRNRecordAPi,
//   searchProductsFromStockItemHeaderApi,
// } from "../../../apis/PointOfSalesApiService";
import CustomDatePicker from "../../components/customDatePicker";
import dayjs from "dayjs";
import _, { every, result } from "lodash";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import SignatureCapture from "../../components/SignatureCapture/SignatureCapture";
import {
  getPoSupplierApi,
  searchPoNumberApi,
  searchStockSupplierApi,
} from "../../apis/posStockSupplierApiService";
import { searchItemApi } from "../../apis/posItemApiService";
import { FiSearch } from "react-icons/fi";
import { searchGrnByNumberOrDateApi } from "../../apis/POSGRNApiService";

const GRNScreen = ({
  data = [],
  //   billHeaderData,
  stockGrnHeader,
  stockGrnDetail = [],
  savedSignatureImage = null,
}) => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const [toEditItem, setToEditItem] = useState(null);
  const [items, setItems] = useState(data);
  const initilState = {
    name: "",
    nic: "",
    // signature: "",
    userId: localStorage.getItem("user_id") || "",
    supplierId: "",
    ItemId: "",
    PoNumber: "",
    data: [],
  };
  const [formData, setFormData] = useState(initilState);
  const [isSavingGRN, setIsSavingGRN] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [signatureImage, setSignatureImage] = useState(null);
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const [selectSupplier, setSelectSupplier] = useState(null);
  const [poNumberSearchTerm, setPoNumberSearchTerm] = useState("");
  const [PoNumber, setPoNumber] = useState([]);
  const [selectPoNumber, setSelectPoNumber] = useState(null);
  const [supplierId, setSupplierId] = useState("");

  const [grnSearchTerm, setGenSearchTerm] = useState("");
  const [grnList, setGrnList] = useState([]);

  //table item state
  const [tableItems, setTableItems] = useState([
    { itemName: "", quantity: "", cost: "", mrp: "", expDate: "" },
  ]);

  // Handle input changes
  const handleInputChange = (index, updates) => {
    const updateTableItem = tableItems.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    setTableItems(updateTableItem);
  };

  //add new row to table
  const addNewRow = () => {
    setTableItems((prev) => [
      ...prev,
      { itemName: "", quantity: "", cost: "", mrp: "", expDate: "" },
    ]);
  };

  const handleSignatureChange = (imageData) => {
    setSignatureImage(imageData);
  };

  //Handle Search for supplier
  // const handleSupplierSearch = async (event) => {
  //   const { value } = event.target;

  //   setSupplierSearchTerm(value);

  //   if (value.length >= 1) {
  //     try {
  //       const result = await searchStockSupplierApi(value);
  //       setSupplier(result?.data || []);
  //     } catch (error) {
  //       console.log("Failed to search supplier:", error);
  //     }
  //   } else {
  //     setSupplier([]);
  //   }
  // };

  //select supplier
  // const handleSelectSupplier = (supplier) => {
  //   setFormData((prev) => ({ ...prev, supplierId: supplier.supplier_code }));
  //   setSelectSupplier(supplier);
  //   setSupplierSearchTerm(supplier.supplier_name);
  //   setSupplier([]);
  // };

  //Hadle search po number
  const handlePONumberSearch = async (event) => {
    const { value } = event.target;

    setPoNumberSearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchPoNumberApi(value);
        setPoNumber(result?.data || []);
      } catch (error) {
        console.log("Failed to search supplier:", error);
      }
    } else {
      setPoNumber([]);
    }
  };

  //select po number
  const handleSelectPoNumber = (PoNumber) => {
    setFormData((prev) => ({ ...prev, PoNumber: PoNumber.po_number }));
    setSelectPoNumber(PoNumber.po_number);
    setPoNumberSearchTerm(PoNumber.po_number);
    setPoNumber([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPoSupplierApi(selectPoNumber);
        setSupplierId(result.data[0].supplier_id);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    if (selectPoNumber) {
      fetchData();
    }
  }, [selectPoNumber]);

  //Handle search for items
  const hanleItemSearch = async (event) => {
    const { value } = event.target;

    setItemSearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchItemApi(value);
        setSelectItem(result?.data || []);
      } catch (error) {
        console.log("Failed to search Items:", error);
      }
    } else {
      setSelectItem([]);
    }
  };

  //Select search items
  // const handleSelectItem = (item) => {
  //   setFormData((prev) => ({ ...prev, ItemId: item.item_code }));
  //   setSelectItem(item);
  //   setItemSearchTerm(item.item_name);
  //   setSelectItem([]);
  // };

  const handleSelectItem = (item, index) => {
    handleInputChange(index, {
      itemName: item.item_name,
      itemCode: item.item_code,
    });
    setSelectItem([]);
  };

  //   useEffect(() => {
  //     if (data.length > 0 && items.length <= 0) {
  //       setItems(data);
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     if (stockGrnDetail && stockGrnDetail.length > 0) {
  //       setIsEditable(false);
  //     } else {
  //       setIsEditable(true);
  //     }
  //   }, [stockGrnDetail]);

  //   useEffect(() => {
  //     const handleKeyDown = (event) => {
  //       if (event.key === "F1") {
  //         event.preventDefault();
  //         inputRef.current.focus();
  //       }
  //     };

  //     document.addEventListener("keydown", handleKeyDown);

  //     return () => {
  //       document.removeEventListener("keydown", handleKeyDown);
  //     };
  //   }, []);

  // For Search functionality
  const [unChangedUsers, setUnchangedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  //   const handleAllUsersSearch = (event) => {
  //     const getAllUsersSearch = event.target.value.toLowerCase(); // Ensure search is case insensitive
  //     if (getAllUsersSearch.length > 0) {
  //       const searchData = unChangedUsers.filter(
  //         (item) =>
  //           (item.username &&
  //             item.username.toLowerCase().includes(getAllUsersSearch)) ||
  //           (item.mobile_number &&
  //             item.mobile_number.includes(getAllUsersSearch)) ||
  //           (item.nic_number && item.nic_number.includes(getAllUsersSearch))
  //       );
  //       setAllUsers(searchData);
  //       if (searchData.length <= 0) {
  //         setSearchTerm(getAllUsersSearch);
  //       }
  //     } else {
  //       setAllUsers(unChangedUsers);
  //     }
  //     // setAllUsersQuery(getAllUsersSearch);
  //   };

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

  //   const handleQuantityChange = (itemId, newValue) => {
  //     // Convert newValue to number or default to zero if empty
  //     const numericValue = newValue === "" ? "0" : newValue.replace(/^0+/, "");
  //     if (numericValue < 0) {
  //       return;
  //     }

  //     const updatedItems = items.map((item) => {
  //       if (item.stock_bill_detail.id === itemId) {
  //         if (numericValue > item.stock_bill_detail.quantity) {
  //           return item;
  //         }

  //         return {
  //           ...item,
  //           edited_values: {
  //             ...item.edited_values, // Preserve existing edited_values
  //             quantity: numericValue,
  //           },
  //         };
  //       }
  //       return item;
  //     });

  //     setItems(updatedItems);
  //   };

  //   const handleConsumerMRPChange = (itemId, newValue) => {
  //     const numericValue = newValue === "" ? "0" : newValue.replace(/^0+/, "");
  //     if (numericValue < 0) {
  //       return;
  //     }

  //     const updatedItems = items.map((item) => {
  //       if (item.stock_bill_detail.id === itemId) {
  //         return {
  //           ...item,
  //           edited_values: {
  //             ...item.edited_values, // Preserve existing edited_values
  //             item_mrp: numericValue,
  //           },
  //         };
  //       }
  //       return item;
  //     });

  //     setItems(updatedItems);
  //   };

  //   const handleExpiryDateChange = (itemId, newValue) => {
  //     const updatedItems = items.map((item) => {
  //       if (item.stock_bill_detail.id === itemId) {
  //         return {
  //           ...item,
  //           edited_values: {
  //             ...item.edited_values, // Preserve existing edited_values
  //             expiry_date: newValue,
  //           },
  //         };
  //       }
  //       return item;
  //     });

  //     setItems(updatedItems);
  //   };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSavingGRN(true);

    setFormData((prev) => ({ ...prev, data: tableItems }));

    // try {
    //   const response = await createGRNRecordAPi({
    //     items,
    //     formData,
    //     billHeaderData,
    //     signatureImage,
    //   });
    //   setIsEditable(false);
    //   if (response && response.success) {
    //     toast.success("Successfuly udated grn record");
    //   } else if (response.message) {
    //     toast.error(response.message);
    //   } else {
    //     toast.error("Failed to update grn record");
    //   }
    //   setIsSavingGRN(false);
    // } catch (error) {
    //   setIsSavingGRN(false);
    //   toast.error("Failed to save");
    // } finally {
    //   setIsSavingGRN(false);
    //   window.location.reload();
    // }

    // console.log(tableItems);
    console.log(formData);
  };

  //   const getMrp = (data) => {
  //     const match = stockGrnDetail.filter(
  //       (i) => i.stock_grn_detail.item_code === data.stock_bill_detail.item_code
  //     );
  //     if (match && match.length > 0) {
  //       return match[0].stock_grn_detail.mrp;
  //     }
  //   };

  //   const getQty = (data) => {
  //     const match = stockGrnDetail.filter(
  //       (i) => i.stock_grn_detail.item_code === data.stock_bill_detail.item_code
  //     );
  //     if (match && match.length > 0) {
  //       return match[0].stock_grn_detail.item_qty;
  //     }
  //   };

  //   const formatDate = (date) => {
  //     return dayjs(date).format("YYYY-MM-DD");
  //   };

  //handle search GRN by number or data
  const handleGRNSearch = async (event) => {
    const { value } = event.target;

    setGenSearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchGrnByNumberOrDateApi(value);
        setGrnList(result?.data || []);
      } catch (error) {
        console.log("Failed to search grn", error);
      }
    } else {
      setGrnList({});
    }
  };

  return (
    <div className="min-h-screen flex space-x-2">
      {/* Left */}
      <div className="w-1/4">
        <div className="ml-5 h-[845px] overflow-y-auto bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
          {/* search box  : SEARCH BY GRN NUMBER AND DATE*/}

          <div className="mt-5 px-3 w-full max-w-md mx-auto">
            <div className="flex items-center gap-3  dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FiSearch
                className="text-gray-500 dark:text-gray-300"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                ref={inputRef}
                value={grnSearchTerm}
                onChange={handleGRNSearch}
              />
            </div>

            {/* GRN List */}
            {grnList.length > 0 && (
              <div className="space-y-3 my-10 max-h-[650px] overflow-y-auto ">
                {grnList.map((grn, index) => (
                  <div
                    className="flex items-center justify-between gap-4 border px-4 py-2 rounded-md bg-white dark:bg-gray-800"
                    key={index}
                  >
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      {new Date(grn.created_at).toISOString().slice(0, 10)}
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {grn.grn_number}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      {grn.supplier_id}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-3/4">
        <div className="mr-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="mx-5 my-5">
              {/* Search Users */}
              <div className="relative">
                <input
                  type="text"
                  name="allUsers"
                  className="bg-white text-black rounded-md py-2 px-4 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  placeholder="Search Users ..."
                  // onChange={handleAllUsersSearch}
                  // onKeyDown={handleKeyDown}
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
              <div className="flex">
                <div className="flex-1 my-4 flex flex-col gap-2">
                  <label htmlFor="supplier" className="text-sm font-medium">
                    PO Number
                  </label>
                  <input
                    type="text"
                    name="stockSupplier"
                    className="w-[30%] border p-1"
                    placeholder="Search and select supplier by id or name"
                    ref={inputRef}
                    value={poNumberSearchTerm}
                    onChange={handlePONumberSearch}
                  />
                  {PoNumber.length > 0 && (
                    <div
                      ref={resultsRef}
                      className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
                    >
                      {PoNumber.map((poNumber, index) => (
                        <div
                          key={poNumber.po_number}
                          className={`py-2 px-4 cursor-pointer ${
                            selectedIndex === index ? "bg-blue-100" : ""
                          }`}
                          onClick={() => handleSelectPoNumber(poNumber)}
                        >
                          {poNumber.po_number}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Search supplier  */}
                <div className="flex-1 my-4 flex flex-col gap-2">
                  <label htmlFor="supplier" className="text-sm font-medium">
                    PO Supplier
                  </label>
                  <input
                    type="text"
                    name="stockSupplier"
                    className="w-[30%] border p-1"
                    placeholder="Search and select supplier by id or name"
                    ref={inputRef}
                    value={supplierId}
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* Item Table */}
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
                  <th className=" px-2 ">
                    <button
                      onClick={addNewRow}
                      className="rounded hover:bg-gray-200"
                    >
                      <IoIosAdd color="red" size={18} />
                    </button>
                  </th>
                  {/* {isEditable && (
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">
                    Action
                  </th>
                )} */}
                </tr>
              </thead>
              <tbody>
                {tableItems.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white  dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className=" p-2">
                      <input
                        type="text"
                        name="stockSupplier"
                        className="w-full border p-1"
                        placeholder="Search and select item"
                        ref={inputRef}
                        value={tableItems[index].itemName}
                        onChange={hanleItemSearch}
                      />
                      {selectItem.length > 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto">
                          {selectItem.map((result, i) => (
                            <div
                              key={result.item_code}
                              className={`py-2 px-4 cursor-pointer ${
                                selectedIndex === i ? "bg-blue-100" : ""
                              }`}
                              // onMouseDown={() => handleSelect(result)} // Use onMouseDown for better UX
                              onClick={() => handleSelectItem(result, index)}
                            >
                              {result.item_name}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className=" p-2">
                      <input
                        type="number"
                        className="border w-full p-1 rounded"
                        value={item.quantity}
                        onChange={(e) =>
                          handleInputChange(index, { quantity: e.target.value })
                        }
                      />
                    </td>
                    <td className=" p-2">
                      <input
                        type="number"
                        className="border w-full p-1 rounded"
                        value={item.cost}
                        onChange={(e) =>
                          handleInputChange(index, { cost: e.target.value })
                        }
                      />
                    </td>
                    <td className=" p-2">
                      <input
                        type="number"
                        className="border w-full p-1 rounded"
                        value={item.mrp}
                        onChange={(e) =>
                          handleInputChange(index, { mrp: e.target.value })
                        }
                      />
                    </td>
                    <td className=" p-2">
                      <input
                        type="date"
                        className="border w-full p-1 rounded"
                        value={item.expDate}
                        onChange={(e) =>
                          handleInputChange(index, { expDate: e.target.value })
                        }
                      />
                    </td>
                    <td className=" p-2 text-center">
                      <button
                        onClick={() =>
                          setTableItems((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="px-2 py-1 rounded text-sm hover:bg-gray-200"
                      >
                        <MdDelete color="red" size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 mx-4 sm:mx-5">
              <form className="space-y-4">
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
            <div className="flex gap-4 my-4 justify-start px-2">
              <button
                onClick={handleSave}
                className="bg-green-500 text-[14px] text-white px-2 py-1 rounded"
              >
                Save Data
              </button>
            </div>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};

export default GRNScreen;

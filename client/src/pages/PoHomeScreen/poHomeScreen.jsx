import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularLoadingSvgOne from "../../components/Svgs/CircularLoadingSvgOne";
import CustomDatePicker from "../../components/customDatePicker";
import dayjs from "dayjs";
import _, { every, result } from "lodash";
import { IoIosAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import SignatureCapture from "../../components/SignatureCapture/SignatureCapture";
import { searchStockSupplierApi } from "../../apis/posStockSupplierApiService";
import { searchItemApi } from "../../apis/posItemApiService";
import { v4 as uuidv4 } from "uuid";
import {
  createPoApi,
  searchPoByNumberOrDateApi,
} from "../../apis/POSPOApiService";
import { FiSearch } from "react-icons/fi";

const PoHomeScreen = ({ data = [], savedSignatureImage = null }) => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const [toEditItem, setToEditItem] = useState(null);
  const [items, setItems] = useState(data);
  const initilState = {
    po_number: uuidv4(),
    name: "",
    nic: "",
    signature: "",
    userId: localStorage.getItem("user_id") || "",
    supplierId: "",
    grandTotal: "",
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
  const [nic, setNic] = useState("");
  const [username, setUserName] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);

  const [poSearchTerm, setPoSerachTerm] = useState("");
  const [po, SetPo] = useState([]);

  //table item state
  const [tableItems, setTableItems] = useState([
    {
      id: uuidv4(),
      itemName: "",
      quantity: "",
      cost: "",
      mrp: "",
      expDate: "",
      grandTotal: "",
    },
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
      {
        id: uuidv4(),
        itemName: "",
        quantity: "",
        cost: "",
        mrp: "",
        expDate: "",
      },
    ]);
  };
  const handleSignatureChange = (imageData) => {
    setSignatureImage(imageData);
  };

  //Handle Search for supplier
  const handleSupplierSearch = async (event) => {
    const { value } = event.target;

    setSupplierSearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchStockSupplierApi(value);
        setSupplier(result?.data || []);
      } catch (error) {
        console.log("Failed to search supplier:", error);
      }
    } else {
      setSupplier([]);
    }
  };

  //select supplier
  const handleSelectSupplier = (supplier) => {
    setFormData((prev) => ({ ...prev, supplierId: supplier.supplier_code }));
    setSelectSupplier(supplier);
    setSupplierSearchTerm(supplier.supplier_name);
    setSupplier([]);
  };

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

  const handleSelectItem = (item, index) => {
    handleInputChange(index, {
      itemName: item.item_name,
      itemCode: item.item_code,
    });
    setSelectItem([]);
  };

  // For Search functionality

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const calculateGrandTotal = () => {
    const total = tableItems.reduce((acc, item) => {
      return acc + (item.quantity * item.cost || 0); // Handle empty or invalid values
    }, 0);
    setGrandTotal(total);
  };
  const handleSaveItems = () => {
    setFormData((prev) => ({ ...prev, data: tableItems }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // setIsSavingGRN(true);

    const grandTotal = calculateGrandTotal();
    setFormData((prev) => ({ ...prev, grandTotal: grandTotal }));

    console.log(JSON.stringify(formData, null, 2));
    try {
      const result = await createPoApi(formData);
      console.log("PO created successfully:", result);
    } catch (error) {
      console.error("Failed to create PO:", error);
    }
  };

  //handle serach po by number or data
  const handlePOSearch = async (event) => {
    const { value } = event.target;

    setPoSerachTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchPoByNumberOrDateApi(value);
        SetPo(result?.data || []);
      } catch (error) {
        console.log("Failed to search po", error);
      }
    } else {
      SetPo([]);
    }
  };

  //select po
  // const handleSelectSupplier = (supplier) => {
  //   setFormData((prev) => ({ ...prev, supplierId: supplier.supplier_code }));
  //   setSelectSupplier(supplier);
  //   setSupplierSearchTerm(supplier.supplier_name);
  //   setSupplier([]);
  // };

  const handleSelectPO = (po) => {};

  return (
    <div className="min-h-screen flex space-x-2">
      {/* Left */}
      <div className="w-1/4">
        <div className="ml-5 h-[870px] overflow-y-auto bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
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
                value={poSearchTerm}
                onChange={handlePOSearch}
              />
            </div>

            {/* PO list */}
            {po.length > 0 && (
              <div className="space-y-3 my-10 max-h-[650px] overflow-y-auto">
                {po.map((po, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border px-4 py-2 rounded-md bg-white dark:bg-gray-800"
                  >
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      {new Date(po.created_at).toISOString().slice(0, 10)}
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {po.po_number}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200">
                      {po.supplier_id}
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
              {/* Search supplier  */}
              <div className="my-4 flex flex-col gap-2">
                <label htmlFor="supplier" className="text-sm font-medium">
                  Supplier
                </label>
                <input
                  type="text"
                  name="stockSupplier"
                  className="w-[30%] border p-1"
                  placeholder="Search and select supplier by id or name"
                  ref={inputRef}
                  value={supplierSearchTerm}
                  onChange={handleSupplierSearch}
                />
                {supplier.length > 0 && (
                  <div
                    ref={resultsRef}
                    className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
                  >
                    {supplier.map((supplier, index) => (
                      <div
                        key={supplier.supplier_code}
                        className={`py-2 px-4 cursor-pointer ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleSelectSupplier(supplier)}
                      >
                        {supplier.supplier_name}
                      </div>
                    ))}
                  </div>
                )}
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
            <div className="flex gap-4 my-4 justify-start px-2">
              <button
                onClick={handleSaveItems}
                className="bg-blue-500 text-[14px] text-white px-2 py-1 rounded"
              >
                Save items
              </button>
            </div>
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
                    value={username}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    //   disabled={!isEditable}
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
                    value={nic}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, nic: e.target.value }));
                      setNic(e.target.value);
                    }}
                    //   disabled={!isEditable}
                  />
                </div>
                <div className="my-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
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

export default PoHomeScreen;

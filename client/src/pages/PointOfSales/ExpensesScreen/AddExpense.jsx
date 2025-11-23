import React, { useEffect, useState } from "react";
import _, { result } from "lodash";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import toast from "react-hot-toast";
import ExpensesCategorySearch from "../ExpensesCategorySearch/ExpensesCategorySearch";
import ExpensesSubCategorySearch from "../ExpensesSubCategorySearch/ExpensesSubCategorySearch";
import {
  creaseExpenseRecordApi,
  searchUnitAndPriceByNote,
} from "../../../apis/POSExpensesCategorySubCategoryApiService";
import UsersInThePOSCompanySearch from "../UsersInThePOSCompanySearch/UsersInThePOSCompanySearch";
import { getAllExpensesCashSourceHeaders } from "../../../apis/POSExpensesCashSourceApiService";
// Redux hooks and slice
import { useDispatch, useSelector } from "react-redux";
import {
  resetExpenseDetails,
  resetExpensesSlice,
  setExpensesSliceField,
} from "../../../store/point-of-sales/ExpensesSlice";
import ExpensesNoteSearch from "../ExpensesNoteSearch/ExpensesNoteSearch";
import MeasurementsUnitsSearch from "../MeasurementsUnitsSearch/MeasurementsUnitsSearch";
import { creataCustomSupplierApi } from "../../../apis/posStockSupplierApiService";

const AddExpense = () => {
  // Redux store state and dispatch
  const expenses = useSelector((state) => state.posExpensesReducer);
  const dispatch = useDispatch();

  // Local state
  const [isLoadingCategorySearchResults, setIsLoadingCategorySearchResults] =
    useState(false);
  const [isLoadingCategoryNoteResults, setIsLoadingCategoryNoteResults] =
    useState(false);
  const [isloadingUnitAndPriceResult, setIsloadingUnitAndPriceResult] =
    useState(false);
  const [
    isLoadingSubCategorySearchResults,
    setIsLoadingSubCategorySearchResults,
  ] = useState(false);
  const [
    isLoadingAllUsersInThePosCompany,
    setIsLoadingAllUsersInThePosCompany,
  ] = useState(false);
  const [expensesCashSourceData, setExpensesCashSourceData] = useState([]);
  const [cashSourceHeaderTypes, setCashSourceHeaderTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [customSuppliers, setCustomSuppliers] = useState([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState("");
  const [noteSearchTerm, SetNoteSearchTerm] = useState("");
  const [usersInThePosCompanySearchTerm, setUsersInThePosCopmanySearchTerm] =
    useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [iscustomSuppliers, SetIsCustomSuppliers] = useState(false);

  // Update redux state when inputs change
  const handleInputChange = (field, value) => {
    dispatch(setExpensesSliceField({ field, value }));
  };

  //Fetch units & price when user select note
  const debounceSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setIsloadingUnitAndPriceResult(true);
      try {
        const response = await searchUnitAndPriceByNote(searchTerm);
        handleUnitAndPrice(response.data);
      } catch (error) {
        console.error("Error searching units & price by note");
      } finally {
        setIsloadingUnitAndPriceResult(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    console.log("Expense", expenses);
    console.log("Expense details", expenseDetails);
  }, [expenses, expenseDetails]);

  useEffect(() => {
    if (noteSearchTerm?.trim()) {
      debounceSearch(noteSearchTerm);
    }
  }, [noteSearchTerm]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  // Add an expense detail row to the list
  const addExpenseDetail = () => {
    if (
      expenses.categoryId &&
      expenses.subCategoryId &&
      parseFloat(expenses.amount)
    ) {
      const detailData = {
        category_id: expenses.categoryId,
        category_name: expenses.categoryName,
        sub_category_id: expenses.subCategoryId,
        sub_category_name: expenses.subCategoryName,
        amount: expenses.amount,
        received_by: expenses.receivedBy,
        received_by_name: expenses.receivedByName,
        received_by_type: expenses.receivedByType,
        note: expenses.note,
        fixed_asset: expenses.fixedAsset,
        process_grn: expenses.processGrn,
        recepient_type: expenses.recepientType,
        unit_price: expenses.unitPrice,
        quantity: expenses.quantity,
        measurement_unit: expenses.measurement_units,
      };
      setExpenseDetails([...expenseDetails, detailData]);
      setCategorySearchTerm("");
      setSubCategorySearchTerm("");
      setUsersInThePosCopmanySearchTerm("");
      SetNoteSearchTerm("");
      dispatch(resetExpenseDetails());
    } else {
      toast.error("Please fill out all expense detail fields");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseDetails || expenseDetails.length === 0) {
      console.error("Please add at least one expense detail.");
      toast.error("Please add at least one expense detail.");
      return;
    }

    // Validate required header fields
    const {
      paymentType,
      expensesCashSourceHeaderId,
      expensesDate,
      totalAmount,
    } = expenses;

    if (!expensesDate?.trim()) {
      console.log("true");
    }

    if (!paymentType || !expensesCashSourceHeaderId || !expensesDate) {
      console.error("Please fill out all header fields.");
      toast.error("Please fill out all header fields.");
      return;
    }

    setIsSaving(true);

    try {
      const headerData = {
        paid_from: paymentType,
        total_amount: totalAmount,
        type: paymentType,
        expensesCashSourceHeaderId,
        expenses_date: expensesDate,
      };

      const response = await creaseExpenseRecordApi(headerData, expenseDetails);
      console.log("response:", response);

      toast.success("Expense(s) added successfully");
      // Reset expensesDetails
      setExpenseDetails([]);
      //Reset expenses state
      dispatch(resetExpensesSlice());
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    } finally {
      setIsSaving(false);
    }

    if (iscustomSuppliers && customSuppliers.length > 0) {
      const user_id = localStorage.getItem("user_id");
      for (const name of customSuppliers) {
        const data = { supplierName: name, createdBy: user_id };
        try {
          const response = await creataCustomSupplierApi(data);
          console.log(response);
        } catch (error) {
          console.error("Error adding new suppllier:", error);
          toast.error("Error adding new suppllier:", error);
        }
      }
    }
  };

  // Fetch all available cash source headers from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllExpensesCashSourceHeaders();

        let types = [];
        if (response && response.data) {
          setExpensesCashSourceData(response.data);
          response.data.map((item) => {
            if (!types.includes(item.type)) {
              types.push(item.type);
            }
          });
          setCashSourceHeaderTypes(types);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Filter cash source header list based on selected payment type
  useEffect(() => {
    if (expenses.paymentType) {
      const filtered = expensesCashSourceData.filter(
        (item) => item.type === expenses.paymentType
      );
      setFilteredData(filtered);
    }
  }, [expenses.paymentType]);

  const subtotal = expenseDetails.reduce((tot, item) => {
    return tot + (parseFloat(item.amount) || 0);
  }, 0);

  //calculate toatle
  const calculateTotal = () => {
    return expenses.unitPrice * expenses.quantity;
  };

  useEffect(() => {
    const amount = calculateTotal();
    handleInputChange("amount", amount);
  }, [expenses.unitPrice, expenses.quantity]);

  useEffect(() => {
    console.log("Expenses:", expenses);
    console.log("ExD:", expenseDetails);
    console.log("Sup:", customSuppliers);
    console.log(iscustomSuppliers);
  }, [expenses]);

  return (
    <div className="max-h-[50vh] min-h-[50vh] mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black overflow-auto">
      <div className="m-5">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <select
                name="paymentType"
                className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                value={expenses.paymentType}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              >
                <option value="" disabled>
                  Select payment type
                </option>
                {cashSourceHeaderTypes.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex-1">
              <select
                name="expensesCashSourceHeaderId"
                className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                value={expenses?.expensesCashSourceHeaderId || ""}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleInputChange(name, value);
                }}
              >
                <option value="" disabled>
                  Select institute
                </option>
                {filteredData?.length > 0 ? (
                  filteredData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.institute} - {item.description}
                    </option>
                  ))
                ) : (
                  <option disabled>No data available</option>
                )}
              </select>
            </div>

            <div className="flex-1">
              <input
                name="expensesDate"
                type="datetime-local"
                value={expenses.expensesDate}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-blue-400 h-12"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold">Expense Details</h4>
            <div className="">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Subcategory</th>
                    <th className="border border-gray-300 p-2">Recepient</th>
                    <th className="border border-gray-300 p-2">Received By</th>
                    <th className="border border-gray-300 p-2">Note</th>
                    <th className="border border-gray-300 p-2">Price & unit</th>
                    <th className="border border-gray-300 p-2">Amount</th>
                    <th className="border border-gray-300 p-2">Fixed Asset</th>
                    <th className="border border-gray-300 p-2">Process GRN</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <ExpensesCategorySearch
                        hideLabel={true}
                        onSelectExpenseCategory={(data) => {
                          setSelectedCategory(data);

                          handleInputChange("categoryId", data.category_code);
                          handleInputChange("categoryName", data.category_name);
                        }}
                        setLoading={setIsLoadingCategorySearchResults}
                        loading={isLoadingCategorySearchResults}
                        searchTerm={categorySearchTerm}
                        setSearchTerm={setCategorySearchTerm}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <ExpensesSubCategorySearch
                        hideLabel={true}
                        onSelectExpenseSubcategory={(data) => {
                          handleInputChange(
                            "subCategoryId",
                            data.sub_category_code
                          );
                          handleInputChange(
                            "subCategoryName",
                            data.sub_category_name
                          );
                        }}
                        setLoading={setIsLoadingSubCategorySearchResults}
                        loading={isLoadingSubCategorySearchResults}
                        searchTerm={subCategorySearchTerm}
                        setSearchTerm={setSubCategorySearchTerm}
                        categoryId={selectedCategory?.category_code}
                      />
                    </td>
                    {/* For recepient */}
                    <td className="border border-gray-300 p-2">
                      <div className="w-full">
                        <select
                          name="recepientType"
                          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                          value={expenses.recepientType}
                          defaultValue={expenses.recepientType}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select recipient type
                          </option>
                          <option value="Customer">Customer</option>
                          <option value="Supplier">Supplier</option>
                          <option value="Institution">Institution</option>
                          <option value="Employee">Employees</option>
                          {/* Add more options if needed */}
                        </select>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex space-x-4">
                        <div className="w-2/3">
                          <UsersInThePOSCompanySearch
                            hideLabel={true}
                            onSelectUsersInThePosCompany={(data) => {
                              handleInputChange("receivedBy", data.id);
                              handleInputChange("receivedByName", data.name);
                            }}
                            setLoading={setIsLoadingAllUsersInThePosCompany}
                            loading={isLoadingAllUsersInThePosCompany}
                            searchTerm={usersInThePosCompanySearchTerm}
                            setSearchTerm={setUsersInThePosCopmanySearchTerm}
                            searchIn={expenses.recepientType}
                            CustomInputSupplier={(data) => {
                              handleInputChange("receivedByName", data);
                            }}
                            SetIsCustomSuppliers={SetIsCustomSuppliers}
                            setCustomSuppliers={setCustomSuppliers}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="border border-gray-300 p-2">
                      <ExpensesNoteSearch
                        hideLabel={true}
                        onSelectExpenseNote={(result) => {
                          handleInputChange("note", result.note);
                        }}
                        setLoading={setIsLoadingCategoryNoteResults}
                        loading={isLoadingCategoryNoteResults}
                        searchTerm={noteSearchTerm}
                        setSearchTerm={SetNoteSearchTerm}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex space-x-1">
                        <input
                          name="unitPrice"
                          type="number"
                          placeholder="Unit Price"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={expenses.unitPrice}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                        <input
                          name="quantity"
                          type="number"
                          placeholder="Quantity"
                          className="w-full p-2 border border-gray-300 rounded-lg"
                          value={expenses.quantity}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />

                        <div className="w-full  border border-gray-300 rounded-lg">
                          <MeasurementsUnitsSearch
                            onSelectExpenseMeasurementUnit={(result) => {
                              handleInputChange("measurement_units", result);
                            }}
                            setLoading={setIsLoadingAllUsersInThePosCompany}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={expenses.amount}
                        disabled
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        name="fixedAsset"
                        checked={expenses.fixedAsset} // If detailData.note is truthy, the checkbox will be ticked
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        className="mt-2 w-full h-5 p-3 border border-gray-300 rounded-lg resize-none"
                      />
                    </td>

                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        name="processGrn"
                        checked={expenses.processGrn} // If detailData.note is truthy, the checkbox will be ticked
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        className="mt-2 w-full h-5 p-3 border border-gray-300 rounded-lg resize-none"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        onClick={addExpenseDetail}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                      >
                        Add Detail
                      </button>
                    </td>
                  </tr>

                  {expenseDetails.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 p-2">
                        {item.category_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.sub_category_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.recepient_type || "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.received_by_name || "-"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.note || "-"}
                      </td>
                      <td className="border border-gray-300 p-2 space-x-4">
                        <div className="w-full justify-between flex space-x-4 items-center">
                          <span className="font-medium">{item.unit_price}</span>
                          <span className="text-gray-500">×</span>
                          <span>{item.quantity}</span>
                          <span className="text-gray-600 italic">
                            {item.measurement_unit}
                          </span>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.amount}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.fixed_asset ? "✓" : "✗"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {item.process_grn ? "✓" : "✗"}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {/* Add any edit/delete icons if needed */}
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() =>
                            setExpenseDetails((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
            disabled={isSaving}
          >
            {isSaving ? <CircularLoadingSvgOne /> : "Save Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

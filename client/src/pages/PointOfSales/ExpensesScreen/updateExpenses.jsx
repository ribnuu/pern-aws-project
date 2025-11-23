import React, { useCallback, useEffect, useState } from "react";
import _, { result, values } from "lodash";
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
  setExpenseDetails,
  setExpensesSliceField,
  updateExpenseDetail,
} from "../../../store/point-of-sales/ExpensesSlice";
import ExpensesNoteSearch from "../ExpensesNoteSearch/ExpensesNoteSearch";
import MeasurementsUnitsSearch from "../MeasurementsUnitsSearch/MeasurementsUnitsSearch";
import { creataCustomSupplierApi } from "../../../apis/posStockSupplierApiService";
import { getExpenseByNumberApi } from "../../../apis/POSExpensesApi";

const UpdateExpenses = () => {
  // Redux store state and dispatch
  const expenses = useSelector((state) => state.posExpensesReducer);
  const dispatch = useDispatch();

  // Local state
  const [expenseNumber, setExpenseNumber] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [cashSourceHeaderTypes, setCashSourceHeaderTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoadingCategorySearchResults, setIsLoadingCategorySearchResults] =
    useState(false);
  const [
    isLoadingSubCategorySearchResults,
    setIsLoadingSubCategorySearchResults,
  ] = useState(false);
  const [isLoadingCategoryNoteResults, setIsLoadingCategoryNoteResults] =
    useState(false);
  const [
    isLoadingAllUsersInThePosCompany,
    setIsLoadingAllUsersInThePosCompany,
  ] = useState(false);
  const [usersInThePosCompanySearchTerm, setUsersInThePosCopmanySearchTerm] =
    useState("");
  const [iscustomSuppliers, SetIsCustomSuppliers] = useState(false);

  // const [isLoadingCategorySearchResults, setIsLoadingCategorySearchResults] =
  //   useState(false);
  // const [isLoadingCategoryNoteResults, setIsLoadingCategoryNoteResults] =
  //   useState(false);
  // const [isloadingUnitAndPriceResult, setIsloadingUnitAndPriceResult] =
  //   useState(false);
  // const [
  //   isLoadingSubCategorySearchResults,
  //   setIsLoadingSubCategorySearchResults,
  // ] = useState(false);
  // const [
  //   isLoadingAllUsersInThePosCompany,
  //   setIsLoadingAllUsersInThePosCompany,
  // ] = useState(false);
  // const [expensesCashSourceData, setExpensesCashSourceData] = useState([]);
  // const [cashSourceHeaderTypes, setCashSourceHeaderTypes] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [expenseDetails, setExpenseDetails] = useState([]);
  // const [customSuppliers, setCustomSuppliers] = useState([]);
  // const [categorySearchTerm, setCategorySearchTerm] = useState([]);
  // const [subCategorySearchTerm, setSubCategorySearchTerm] = useState([]);
  // const [noteSearchTerm, SetNoteSearchTerm] = useState("");
  // const [usersInThePosCompanySearchTerm, setUsersInThePosCopmanySearchTerm] =
  //   useState("");
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [isSaving, setIsSaving] = useState(false);
  // const [iscustomSuppliers, SetIsCustomSuppliers] = useState(false);
  // const [expenseNumber, setExpenseNumber] = useState("");

  useEffect(() => {
    console.log("Expenses details", expenses.expenseDetails);
    console.log("Expenses", expenses);
    console.log("Expensesqwqw", expenses?.expensesCashSourceHeaderId);
    console.log("expenses paymentType:", expenses.paymentType);
    console.log("expenses cashSources:", expenses.cashSources);
    console.log("expenses cashSourceTypes:", expenses.cashSourceTypes);
  }, [expenses]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllExpensesCashSourceHeaders();
        if (response?.data) {
          const types = [...new Set(response.data.map((item) => item.type))];
          dispatch(
            setExpensesSliceField({
              field: "cashSources",
              value: response.data,
            })
          );
          dispatch(
            setExpensesSliceField({ field: "cashSourceTypes", value: types })
          );
          setCashSourceHeaderTypes(types);
        }
      } catch (error) {
        console.error("Error fetching cash sources", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      expenses.paymentType &&
      Array.isArray(expenses.cashSources) &&
      expenses.cashSources.length > 0
    ) {
      const filtered = expenses.cashSources.filter(
        (item) => item.code === expenses.paymentType
      );
      setFilteredData(filtered);
    }
  }, [expenses.paymentType, expenses.cashSources]);

  const debouncedFetchExpenseByNumber = useCallback(
    _.debounce(async (number) => {
      try {
        const response = await getExpenseByNumberApi(number);
        if (response.success) {
          const { header, details } = response.data;
          dispatch(
            setExpensesSliceField({
              field: "expensesCashSourceHeaderId",
              value: header.expenses_cash_source_header_id,
            })
          );
          dispatch(
            setExpensesSliceField({
              field: "expensesDate",
              value: header.expenses_date,
            })
          );
          dispatch(
            setExpensesSliceField({
              field: "paymentType",
              value: header.paid_from,
            })
          );
          dispatch(
            setExpensesSliceField({
              field: "totalAmount",
              value: header.total_amount,
            })
          );

          const mappedDetails = details.map((d) => ({
            categoryId: d.category_code,
            categoryName: d.category_name,
            subCategoryId: d.sub_category_code,
            subCategoryName: d.sub_category_name,
            amount: d.amount,
            receivedBy: d.received_by_id,
            receivedByName: d.received_by_name,
            receivedByType: d.received_by_type,
            note: d.note,
            fixedAsset: d.fixed_asset,
            processGrn: d.process_grn,
            recepientType: d.recepient_type,
            unitPrice: d.unit_price,
            quantity: d.quantity,
            measurement_units: d.measurement_unit,
          }));
          dispatch(setExpenseDetails(mappedDetails));
        }
      } catch (error) {
        toast.error("Expense not found.");
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (expenseNumber?.trim()) {
      debouncedFetchExpenseByNumber(expenseNumber);
    }
  }, [expenseNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expenses.expenseDetails.length) {
      toast.error("Add at least one expenses detail.");
      return;
    }
    if (
      !expenses.paymentType ||
      !expenses.expensesCashSourceHeaderId ||
      !expenses.expensesDate
    ) {
      toast.error("Fill all header fields.");
      return;
    }

    setIsSaving(true);
    // Perform update logic here
    setIsSaving(false);
  };

  const formatDateForInput = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date)) return "";
    return date.toISOString().slice(0, 16);
  };

  //////////////////////////////////////////////////////////////////////////////////////////

  // Update redux state when inputs change
  // const handleInputChange = (field, value) => {
  //   dispatch(setExpensesSliceField({ field, value }));
  // };

  //Fetch units & price when user select note
  // const debounceSearch = React.useCallback(
  //   _.debounce(async (searchTerm) => {
  //     setIsloadingUnitAndPriceResult(true);
  //     try {
  //       const response = await searchUnitAndPriceByNote(searchTerm);
  //       handleUnitAndPrice(response.data);
  //     } catch (error) {
  //       console.error("Error searching units & price by note");
  //     } finally {
  //       setIsloadingUnitAndPriceResult(false);
  //     }
  //   }, 500),
  //   []
  // );

  // useEffect(() => {
  //   if (noteSearchTerm?.trim()) {
  //     debounceSearch(noteSearchTerm);
  //   }
  // }, [noteSearchTerm]);

  // useEffect(() => {
  //   return () => {
  //     debounceSearch.cancel();
  //   };
  // }, [debounceSearch]);

  // const handleUnitAndPrice = ({ measurementunit, quantity, unitprice }) => {
  //   handleInputChange("unitPrice", unitprice);
  //   handleInputChange("quantity", quantity);
  //   handleInputChange("measurement_units", measurementunit);
  // };

  // const debouncedFetchExpenseByNumber = React.useCallback(
  //   _.debounce(async (number) => {
  //     try {
  //       const response = await getExpenseByNumberApi(number);
  //       if (response.success) {
  //         const { header, details } = response.data;

  //         dispatch(
  //           setExpensesSliceField({
  //             field: "expensesCashSourceHeaderId",
  //             value: header.expenses_cash_source_header_id,
  //           })
  //         );
  //         dispatch(
  //           setExpensesSliceField({
  //             field: "expensesDate",
  //             value: header.expenses_date,
  //           })
  //         );
  //         dispatch(
  //           setExpensesSliceField({
  //             field: "paymentType",
  //             value: header.paid_from,
  //           })
  //         );
  //         dispatch(
  //           setExpensesSliceField({
  //             field: "totalAmount",
  //             value: header.total_amount,
  //           })
  //         );

  //         dispatch(resetExpenseDetails());

  //         const mappedDetails = details.map((detail) => ({
  //           categoryId: detail.category_code,
  //           category_name: detail.category_name,
  //           subCategoryId: detail.sub_category_code,
  //           sub_category_name: detail.sub_category_name,
  //           amount: detail.amount,
  //           receivedBy: detail.received_by,
  //           received_by_name: detail.received_by_name,
  //           recepient_type: detail.received_by_type,
  //           note: detail.note,
  //           fixedAsset: detail.fixed_asset,
  //           processGrn: detail.process_grn,
  //           recepientType: detail.recepient_type,
  //           unit_price: detail.unit_price,
  //           quantity: detail.quantity,
  //           measurement_unit: detail.measurement_unit,
  //         }));

  //         setExpenseDetails(mappedDetails);
  //       }
  //     } catch (error) {
  //       toast.error("expenses not found.");
  //       console.error("Error Fetching Expenses:", error);
  //     }
  //   }, 500),
  //   []
  // );

  // useEffect(() => {
  //   if (expenseNumber?.trim()) {
  //     debouncedFetchExpenseByNumber(expenseNumber);
  //   }
  // }, [expenseNumber]);

  // useEffect(() => {
  //   return () => {
  //     debouncedFetchExpenseByNumber.cancel();
  //   };
  // }, [debouncedFetchExpenseByNumber]);

  // useEffect(() => {
  //   setCategorySearchTerm(
  //     expenseDetails.map((item) => item.category_name || "")
  //   );

  //   setSubCategorySearchTerm(
  //     expenseDetails.map((item) => item.sub_category_name || "")
  //   );

  //   console.log(categorySearchTerm);
  //   console.log(subCategorySearchTerm);
  // }, [expenseDetails]);

  // const updateCategorySearchTerm = (index, value) => {
  //   setCategorySearchTerm((prev) => {
  //     const updated = [...prev];
  //     updated[index] = value;
  //     return updated;
  //   });
  // };

  // const updateSubCategorySearchTerm = (index, value) => {
  //   setSubCategorySearchTerm((prev) => {
  //     const update = [...prev];
  //     update[index] = value;
  //     return update;
  //   });
  // };

  // Add an expense detail row to the list
  // const addExpenseDetail = () => {
  //   if (
  //     expenses.categoryId &&
  //     expenses.subCategoryId &&
  //     parseFloat(expenses.amount)
  //   ) {
  //     const detailData = {
  //       category_id: expenses.categoryId,
  //       category_name: expenses.categoryName,
  //       sub_category_id: expenses.subCategoryId,
  //       sub_category_name: expenses.subCategoryName,
  //       amount: expenses.amount,
  //       received_by: expenses.receivedBy,
  //       received_by_name: expenses.receivedByName,
  //       received_by_type: expenses.receivedByType,
  //       note: expenses.note,
  //       fixed_asset: expenses.fixedAsset,
  //       process_grn: expenses.processGrn,
  //       recepient_type: expenses.recepientType,
  //       unit_price: expenses.unitPrice,
  //       quantity: expenses.quantity,
  //       measurement_unit: expenses.measurement_units,
  //     };
  //     setExpenseDetails([...expenseDetails, detailData]);
  //     setCategorySearchTerm("");
  //     setSubCategorySearchTerm("");
  //     setUsersInThePosCopmanySearchTerm("");
  //     SetNoteSearchTerm("");
  //     dispatch(resetExpenseDetails());
  //   } else {
  //     toast.error("Please fill out all expense detail fields");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!expenseDetails.length) {
  //     toast.error("Add at least one expense detail.");
  //     return;
  //   }

  //   const {
  //     paymentType,
  //     expensesCashSourceHeaderId,
  //     expensesDate,
  //     totalAmount,
  //   } = expenses;

  //   if (!paymentType || !expensesCashSourceHeaderId || !expensesDate) {
  //     toast.error("Fill all header fields.");
  //     return;
  //   }

  //   setIsSaving(true);
  // };

  // Fetch all available cash source headers from backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllExpensesCashSourceHeaders();

  //       let types = [];
  //       if (response && response.data) {
  //         setExpensesCashSourceData(response.data);
  //         response.data.map((item) => {
  //           if (!types.includes(item.type)) {
  //             types.push(item.type);
  //           }
  //         });
  //         setCashSourceHeaderTypes(types);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Filter cash source header list based on selected payment type
  // useEffect(() => {
  //   if (expenses.paymentType) {
  //     const filtered = expensesCashSourceData.filter(
  //       (item) => item.type === expenses.paymentType
  //     );
  //     setFilteredData(filtered);
  //   }
  // }, [expenses.paymentType]);

  // const subtotal = expenseDetails.reduce((tot, item) => {
  //   return tot + (parseFloat(item.amount) || 0);
  // }, 0);

  //calculate toatle
  // const calculateTotal = () => {
  //   return expenses.unitPrice * expenses.quantity;
  // };

  // const formatDateForInput = (value) => {
  //   if (!value) return "";
  //   const date = new Date(value);
  //   if (isNaN(date)) return "";
  //   return date.toISOString().slice(0, 16);
  // };

  // useEffect(() => {
  //   const amount = calculateTotal();
  //   handleInputChange("amount", amount);
  // }, [expenses.unitPrice, expenses.quantity]);

  return (
    <div className="max-h-[50vh] min-h-[50vh] mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black overflow-auto">
      <div className="m-5">
        <div className="flex flex-col space-y-4">
          {/* Search box */}
          <div className="w-full max-w-sm p-2">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm bg-white">
              <input
                type="text"
                value={expenseNumber}
                onChange={(e) => setExpenseNumber(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                placeholder="Search expense number..."
              />
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <select
                name="paymentType"
                className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                value={expenses.paymentType}
                onChange={(e) =>
                  dispatch(
                    setExpensesSliceField({
                      field: "paymentType",
                      value: e.target.value,
                    })
                  )
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
                onChange={(e) =>
                  dispatch(
                    setExpensesSliceField({
                      field: "expensesCashSourceHeaderId",
                      value: e.target.value,
                    })
                  )
                }
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
                value={formatDateForInput(expenses.expensesDate)}
                onChange={(e) =>
                  dispatch(
                    setExpensesSliceField({
                      field: "expensesDate",
                      value: e.target.value,
                    })
                  )
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
                  {expenses.expenseDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">
                        <ExpensesCategorySearch
                          hideLabel={true}
                          searchTerm={item.categoryName || ""}
                          setSearchTerm={(val) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "categoryName",
                                value: val,
                              })
                            )
                          }
                          onSelectExpenseCategory={(data) => {
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "categoryId",
                                value: data.category_code,
                              })
                            );
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "categoryName",
                                value: data.category_name,
                              })
                            );
                          }}
                          setLoading={setIsLoadingCategorySearchResults}
                          loading={isLoadingCategorySearchResults}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <ExpensesSubCategorySearch
                          hideLabel={true}
                          onSelectExpenseSubcategory={(data) => {
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "subCategoryId",
                                value: data.sub_category_code,
                              })
                            );
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "subCategoryName",
                                value: data.sub_category_name,
                              })
                            );
                          }}
                          setLoading={setIsLoadingSubCategorySearchResults}
                          loading={isLoadingSubCategorySearchResults}
                          searchTerm={item.subCategoryName || ""}
                          setSearchTerm={(val) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "subCategoryName",
                                value: val,
                              })
                            )
                          }
                          categoryId={item.categoryId}
                        />
                      </td>
                      {/* For recepient */}
                      <td className="border border-gray-300 p-2">
                        <div className="w-full">
                          <select
                            name="recepientType"
                            className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                            value={item.recepient_type || "-"}
                            defaultValue={item.recepient_type}
                            onChange={(e) =>
                              dispatch(
                                updateExpenseDetail({
                                  index,
                                  field: "recepientType",
                                  value: e.target.value,
                                })
                              )
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
                                dispatch(
                                  updateExpenseDetail({
                                    index,
                                    field: "receivedBy",
                                    value: data.id,
                                  })
                                );
                                dispatch(
                                  updateExpenseDetail({
                                    index,
                                    field: "receivedByName",
                                    value: data.name,
                                  })
                                );
                              }}
                              setLoading={setIsLoadingAllUsersInThePosCompany}
                              loading={isLoadingAllUsersInThePosCompany}
                              searchTerm={item.receivedByName || ""}
                              setSearchTerm={(val) => {
                                dispatch(
                                  updateExpenseDetail({
                                    index,
                                    field: "receivedByName",
                                    value: val,
                                  })
                                );
                              }}
                              searchIn={item.recepientType || "Customer"}
                              CustomInputSupplier={(val) => {
                                dispatch(
                                  updateExpenseDetail({
                                    index,
                                    field: "receivedByName",
                                    value: val,
                                  })
                                );
                              }}
                              defaultValue={
                                item.receivedBy && item.receivedByName
                                  ? {
                                      id: item.receivedBy,
                                      name: item.receivedByName,
                                    }
                                  : null
                              }
                              // SetIsCustomSuppliers={SetIsCustomSuppliers}
                              // setCustomSuppliers={setCustomSuppliers}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="border border-gray-300 p-2">
                        {/* <ExpensesNoteSearch
                          hideLabel={true}
                          onSelectExpenseNote={(result) => {
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "note",
                                value: result.note,
                              })
                            );
                          }}
                          setLoading={setIsLoadingCategoryNoteResults}
                          loading={isLoadingCategoryNoteResults}
                          searchTerm={item.note || ""}
                          setSearchTerm={(val) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "note",
                                value: val,
                              })
                            )
                          }
                        /> */}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <div className="flex space-x-1">
                          <input
                            name="unitPrice"
                            type="number"
                            placeholder="Unit Price"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={item.unitPrice}
                            onChange={(e) =>
                              dispatch(
                                updateExpenseDetail({
                                  index,
                                  field: "unitPrice",
                                  value: e.target.value,
                                })
                              )
                            }
                          />
                          <input
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={item.quantity}
                            onChange={(e) =>
                              dispatch(
                                updateExpenseDetail({
                                  index,
                                  field: "quantity",
                                  value: e.target.value,
                                })
                              )
                            }
                          />

                          <div className="w-full  border border-gray-300 rounded-lg">
                            <MeasurementsUnitsSearch
                              onSelectExpenseMeasurementUnit={(result) => {
                                dispatch(
                                  updateExpenseDetail({
                                    index,
                                    field: "measurement_units",
                                    value: result.measurement_units,
                                  })
                                );
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
                          value={item.amount}
                          disabled
                          onChange={(e) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "amount",
                                value: e.target.value,
                              })
                            )
                          }
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="checkbox"
                          name="fixedAsset"
                          checked={item.fixedAsset}
                          onChange={(e) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "fixedAsset",
                                valueL: e.target.value,
                              })
                            )
                          }
                          className="mt-2 w-full h-5 p-3 border border-gray-300 rounded-lg resize-none"
                        />
                      </td>

                      <td className="border border-gray-300 p-2">
                        <input
                          type="checkbox"
                          name="processGrn"
                          checked={item.processGrn} // If detailData.note is truthy, the checkbox will be ticked
                          onChange={(e) =>
                            dispatch(
                              updateExpenseDetail({
                                index,
                                field: "processGrn",
                                valueL: e.target.value,
                              })
                            )
                          }
                          className="mt-2 w-full h-5 p-3 border border-gray-300 rounded-lg resize-none"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          type="button"
                          // onClick={addExpenseDetail}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          Add Detail
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
            {isSaving ? <CircularLoadingSvgOne /> : "Update Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpenses;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetBillTransactionsSliceField } from "../../../store/point-of-sales/TransactionsSlice";
import { getAllBillingInformationAndRepsStockDispatchDataByFiltersApi } from "../../../apis/POSTransactionsApiService";
import toast from "react-hot-toast";
import StockItemHeaderSearch from "../StockItemHeaderSearch/StockItemHeaderSearch";
import {
  createRepsStockDispatchRecordApi,
  updateMultipleRepsStocksDispatchApi,
} from "../../../apis/POSRepsStocksDispatchApiService";

const StockGivenAndBalanceCheckSection = ({
  selectedStockCustomerInstitution,
}) => {
  const dispatch = useDispatch();
  const { stockGivenAndBalanceCheckRecords, filters } = useSelector(
    (state) => state.transactionsReducer
  );

  const [dispatchesData, setDispatchesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dispatchesData) {
          const response =
            await getAllBillingInformationAndRepsStockDispatchDataByFiltersApi(
              filters
            );
          if (response.success) {
            dispatch(
              SetBillTransactionsSliceField({
                field: "stockGivenAndBalanceCheckRecords",
                value: response.data,
              })
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [
    filters.loadBillsBy,
    filters.fromDate,
    filters.toDate,
    filters.institutionId,
  ]);

  //   Stock CustomerInstitution Search Fields And States
  const initialState = { item_code: null, stock_quantity_given: 0 };
  const [stockItemSearchTerm, setStockItemSearchTerm] = useState("");
  const [isLoadingStockItems, setIsLoadingStockItems] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    toast.promise(
      createRepsStockDispatchRecordApi(formData)
        .then((data) => {
          if (data && data.success) {
            setFormData(initialState);
            setStockItemSearchTerm("");
          } else {
          }
        })
        .catch((error) => {
          throw err;
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        loading: "Savng...",
        success: <b>Successfully created record</b>,
        error: <b>Failed to ceate record</b>,
      }
    );
  };

  return (
    <div className="">
      <h1 className="mb-2">Stock given and balance check section</h1>
      <div className="mb-4">
        <StockItemHeaderSearch
          hideLabel={false}
          onSelectStockItemHeader={(data) => {
            setStockItemSearchTerm(data.item_name);
            setSelectedStockItem(data);
            setFormData((prevFormData) => ({
              ...prevFormData,
              item_code: data.item_code,
            }));
          }}
          setLoading={setIsLoadingStockItems}
          loading={isLoadingStockItems}
          searchTerm={stockItemSearchTerm}
          setSearchTerm={setStockItemSearchTerm}
          defaultValue={null}
        />
        <div className="relative z-0 w-full mb-4 group mt-4">
          <label
            htmlFor="stock_quantity_given"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Received Quantity
          </label>
          <input
            type="number"
            name="stock_quantity_given"
            id="stock_quantity_given"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
            placeholder="Stock Quantity Given"
            onChange={handleChange}
            value={formData.stock_quantity_given}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={isLoading}
            type="button"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full" // Remove px-4
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                Given
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                Billed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                Returned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                Settled
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(stockGivenAndBalanceCheckRecords).length > 0 &&
              stockGivenAndBalanceCheckRecords &&
              Object.entries(stockGivenAndBalanceCheckRecords).map(
                ([key, value]) => (
                  <tr key={key}>
                    {/* Assuming key is used as an identifier or label */}
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {key}
                    </td>
                    {/* Display properties of the `value` object */}
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900">
                      {value.item_name}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 text-right">
                      {value.given}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 text-right">
                      {value.billed}
                    </td>
                    <td className="px-6 py-2.5 whitespace-nowrap text-sm text-gray-900 text-right">
                      {value.balance}
                    </td>
                    <td className="text-right">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          await updateMultipleRepsStocksDispatchApi({
                            ...value,
                            item_code: key,
                            fromDate: filters.fromDate,
                            toDate: filters.toDate,
                          });
                        }}
                        disabled={value?.isSettled}
                        className={`rounded-md text-sm ${
                          value?.isSettled > 0
                            ? "bg-gray-400 text-white cursor-not-allowed" // Disabled state
                            : "bg-green-600 text-white hover:bg-green-700" // Enabled state with hover effect
                        }`}
                        style={{ width: "100px", height: "30px" }} // Set custom width and height
                      >
                        SET OFF
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockGivenAndBalanceCheckSection;

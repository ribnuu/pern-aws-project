import React, { useEffect, useMemo, useState } from "react";
import FiltersExpensesTableView from "./FiltersExpensesTableView";
import { FaSearch } from "react-icons/fa";
import { getAllExpensesCategroiesAndSubCategoriesAsTreeViewDataApi } from "../../../apis/POSExpensesCategorySubCategoryApiService";
import TestTreeView from "./TestTreeView";
import PaymentTypeView from "./paymentTypeView";
import LISpinnerWithTextTwo from "../../../components/LoadingIndicators/LISpinnerWithTextTwo";
import ExpensesTable from "./ExpensesTable";
import useAppFilters from "../../../hooks/useAppFilters";
import { getAllExpensesCashSourceHeaders } from "../../../apis/POSExpensesCashSourceApiService";
import FixedAssetFilter from "./FixedAssetFilter";

const ViewExpensesScreen = () => {
  const defaultFilters = useMemo(
    () => ({
      fromDate: new Date().toISOString().split("T")[0], // Format to YYYY-MM-DD
      toDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0], // 10 days from today
    }),
    []
  );
  const { updateFilter } = useAppFilters({
    filterType: "FiltersExpensesTableView",
    defaultFilters,
  });
  const [treeViewData, setTreeViewData] = useState(null);
  const [paymentTreeViewData, setPaymentTreeViewData] = useState(null);
  const [loadingCatAndSubCat, setLoadingCatAndSubCat] = useState(false);
  const [isCheckFixedAssets, setIsCheckFixedAssets] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCatAndSubCat(true);
        const [treeRes, paymentRes] = await Promise.all([
          getAllExpensesCategroiesAndSubCategoriesAsTreeViewDataApi(),
          getAllExpensesCashSourceHeaders(),
        ]);

        if (treeRes.success) setTreeViewData(treeRes.data);
        if (paymentRes.success && Array.isArray(paymentRes.data)) {
          // Group by payment type
          const grouped = paymentRes.data.reduce((acc, curr) => {
            const group = acc[curr.type] || [];
            group.push({
              id: curr.id,
              name: curr.institute,
              code: curr.code,
              ...curr,
            });
            acc[curr.type] = group;
            return acc;
          }, {});

          // Convert to tree format
          const formattedTree = {
            id: "0",
            name: "",
            children: Object.entries(grouped).map(([type, entries]) => ({
              id: type,
              name: type,
              children: entries,
            })),
          };

          setPaymentTreeViewData(formattedTree);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCatAndSubCat(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-h-[60vh] overflow-auto my-5 ">
      <div className="flex md:flex-row justify-between mx-5 bg-gray-50 my-6 rounded-md dark:bg-gray-900 border border-black">
        <div className="w-full border flex- border-black">
          <FiltersExpensesTableView updateFilter={updateFilter} />
        </div>
        {/* <div className="mx-5 w-full flex-1/4 justify-center border border-black">
            <button
               onClick={() => setShowFilters((prev) => !prev)}
               className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
             >
            {showFilters ? "Hide Filters" : "Show Filters"}
         </button>
      </div> */}
      </div>

      <div className="mx-5 mt-5 flex flex-col md:flex-row md:justify-between items-start gap-4">
        {/* First box for search and institution list */}
        <div
          className="w-full md:w-1/6 bg-white dark:bg-gray-800 p-5 rounded-md border border-black flex flex-col flex-grow"
          style={{ maxHeight: "75vh", minHeight: "75vh" }}
        >
          {/* Search Component */}
          <div className="relative w-full mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search institution"
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loadingCatAndSubCat ? (
            <LISpinnerWithTextTwo label="Loading data..." />
          ) : (
            <div className="space-y-2">
              <FixedAssetFilter
                isCheckFixedAssets={isCheckFixedAssets}
                setIsCheckFixedAssets={setIsCheckFixedAssets}
              />

              {paymentTreeViewData && (
                <PaymentTypeView
                  data={paymentTreeViewData}
                  updateFilter={updateFilter}
                />
              )}

              {treeViewData && (
                <TestTreeView
                  data={treeViewData}
                  updateFilter={updateFilter}
                  // isCheckFixedAssets={isCheckFixedAssets}
                  // setIsCheckFixedAssets={setIsCheckFixedAssets}
                />
              )}
            </div>
          )}
        </div>

        {/* Second box for Expenses Display */}
        {treeViewData && (
          <ExpensesTable isCheckFixedAssets={isCheckFixedAssets} />
        )}
      </div>
    </div>
  );
};

export default ViewExpensesScreen;

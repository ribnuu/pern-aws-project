import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchPosExpensesCategoryApi } from "../../../apis/POSExpensesCategorySubCategoryApiService";

const ExpensesCategorySearch = ({
  onSelectExpenseCategory,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
}) => {
  const initialData = {
    expenseCategoryId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleExpensesCategorySearch = async (event) => {
    if (formData.expenseCategoryId !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchPosExpensesCategoryApi(searchTerm);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching expense categories:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelectSearchResultItem(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectSearchResultItem = (item) => {
    setFormData({
      ...formData,
      expenseCategoryId: item.id,
    });

    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.item_code === item.item_code
    );

    if (!itemExists) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }

    setSearchResults([]);
  };

  const handleSelectExpenseCategory = (expenseCategory) => {
    setFormData({
      ...formData,
      expenseCategoryId: expenseCategory.id,
    });
    setSearchTerm(expenseCategory.category_name); // Update input value to show selected expenseCategory
    setSearchResults([]); // Clear search results after selecting
    onSelectExpenseCategory(expenseCategory);
  };

  useEffect(() => {
    if (searchTerm?.trim().length > 0 && formData.expenseCategoryId === null) {
      debouncedSearch(searchTerm?.trim());
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    console.log(formData.expenseCategoryId);
  }, [formData]);

  return (
    <>
      <div className="relative flex-1">
        {!hideLabel && (
          <label
            htmlFor="itemName2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expense Category
          </label>
        )}
        <input
          type="text"
          name="expenseCategoryId"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Search expense category"
          onChange={handleExpensesCategorySearch}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={searchTerm}
        />

        {searchResults.length > 0 && (
          <div
            ref={resultsRef} // Attach the ref to the search results div
            className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
            style={{ position: "absolute", zIndex: 9999 }} // Inline styles to ensure high z-index and positioning
          >
            {searchResults.map((result, index) => (
              <div
                key={result.category_code}
                className={`py-2 px-4 cursor-pointer ${
                  selectedIndex === index ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectExpenseCategory(result)}
              >
                {result.category_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExpensesCategorySearch;

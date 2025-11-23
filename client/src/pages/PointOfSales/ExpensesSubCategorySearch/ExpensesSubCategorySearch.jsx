import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchexpensesSubCategoriesByCategoryCodeAndSearchTerm } from "../../../apis/POSExpensesCategorySubCategoryApiService";

const ExpensesSubCategorySearch = ({
  onSelectExpenseSubcategory,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  categoryId, // Expect categoryId to be passed as a prop
  hideLabel = false,
}) => {
  const initialData = {
    expenseSubCategoryId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleExpensesSubCategorySearch = async (event) => {
    if (formData.expenseSubCategoryId !== null) {
      setFormData(initialData);
    }
    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      if (categoryId) {
        setLoading(true);
        try {
          const { data } =
            await searchexpensesSubCategoriesByCategoryCodeAndSearchTerm(
              categoryId,
              searchTerm
            );
          // Filter results based on the searchTerm
          const filteredResults = data.filter((item) =>
            item.sub_category_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredResults);
        } catch (error) {
          console.error("Error searching subcategories:", error);
        } finally {
          setLoading(false);
        }
      }
    }, 500),
    [categoryId, searchTerm, setLoading]
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
      expenseSubCategoryId: item.sub_category_id,
    });
    setSearchTerm(item.sub_category_name); // Update input value to show selected subcategory
    setSearchResults([]); // Clear search results after selecting
    onSelectExpenseSubcategory(item);
  };

  const handleInputFocus = () => {
    if (formData.expenseSubCategoryId === null) {
      setSearchTerm(""); // Reset if it's null
    } else {
      // Force showing search results again even if a subcategory was selected previously
      setFormData(initialData);
      setSearchTerm(""); // Clear input
      debouncedSearch(""); // Force fresh search
    }
  };

  useEffect(() => {
    if (
      // searchTerm?.trim().length > 0 &&
      formData.expenseSubCategoryId === null
    ) {
      debouncedSearch(searchTerm?.trim());
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <>
      <div className="relative flex-1">
        {!hideLabel && (
          <label
            htmlFor="subCategoryName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Expense Subcategory
          </label>
        )}
        <input
          type="text"
          name="expenseSubCategoryId"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder="Search expense subcategory"
          onChange={handleExpensesSubCategorySearch}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={searchTerm}
          onFocus={handleInputFocus}
        />

        {searchResults.length > 0 && (
          <div
            ref={resultsRef} // Attach the ref to the search results div
            className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
            style={{ position: "absolute", zIndex: 9999 }} // Inline styles to ensure high z-index and positioning
          >
            {searchResults.map((result, index) => (
              <div
                key={result.sub_category_id}
                className={`py-2 px-4 cursor-pointer ${
                  selectedIndex === index ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectSearchResultItem(result)}
              >
                {result.sub_category_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ExpensesSubCategorySearch;

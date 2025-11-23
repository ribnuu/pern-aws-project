import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchStockItemHeadersInTheCompanyApi } from "../../../apis/POSStockItemApiService";

const StockItemHeaderSearch = ({
  onSelectStockItemHeader,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
  defaultValue = null,
  loadOnMount = false,
  disabled = false,
}) => {
  const initialData = {
    itemCode: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const containerRef = useRef(null); // Ref for the container div
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handleStockItemHeaderSearch = async (event) => {
    if (formData.itemCode !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchStockItemHeadersInTheCompanyApi(
          searchTerm
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching stock item:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [loadOnMount]
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
    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.item_code === item.item_code
    );

    if (!itemExists) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }

    setSearchResults([]);
  };

  const handleSelectStockItemHeader = (stockItem) => {
    setFormData({
      ...formData,
      itemCode: stockItem.id,
    });
    setSearchTerm(stockItem.name); // Update input value to show selected stockItem
    setSearchResults([]); // Clear search results after selecting
    onSelectStockItemHeader(stockItem);
  };

  useEffect(() => {
    if (searchTerm?.trim().length > 0 && formData.itemCode === null) {
      debouncedSearch(searchTerm?.trim());
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (loadOnMount && searchTerm === "") {
      debouncedSearch(searchTerm?.trim());
    }
  }, [loadOnMount, searchTerm, debouncedSearch]);

  // useEffect(() => {
  //   if (defaultValue) {
  //     setFormData({
  //       ...formData,
  //       itemCode: defaultValue.id,
  //     });
  //     setSearchTerm(defaultValue.stock_customer_institution.name);
  //   }
  // }, [defaultValue]);

  useEffect(() => {
    // Handle click outside the component
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex-1 mb-4">
      {!hideLabel && (
        <label
          htmlFor="itemName2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Stock Item
        </label>
      )}
      <input
        type="text"
        name="itemCode"
        className="w-full h-12 p-3 border border-gray-300 rounded-lg"
        placeholder="Search stock item"
        onChange={handleStockItemHeaderSearch}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={searchTerm}
        onClickCapture={() => {
          setIsClickedOnInput(true);
        }}
        autoComplete="off" // Disable autofill suggestions
        disabled={disabled}
      />

      {searchResults.length > 0 && isClickedOnInput && (
        <div
          ref={resultsRef} // Attach the ref to the search results div
          className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
        >
          {searchResults.map((result, index) => (
            <div
              key={result.item_code}
              className={`py-2 px-4 cursor-pointer ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectStockItemHeader(result)}
            >
              <span className="text-blue-600 font-medium">
                {result.item_name}
              </span>{" "}
              |{" "}
              <span className="text-green-600 font-semibold">
                {result.item_code}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockItemHeaderSearch;

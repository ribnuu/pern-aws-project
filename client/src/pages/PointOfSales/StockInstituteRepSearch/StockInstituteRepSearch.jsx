import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchStockInstitutionRepresentativesApi } from "../../../apis/POSStockCustomerInstitutionApiService";

const StockInstituteRepSearch = ({
  onSelectStockInstitutionRepresentative,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
  defaultValue = null,
  loadOnMount = false,
  disabled = false,
  loadRepresentative = false,
}) => {
  const initialData = {
    stockInstitutionRepId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const containerRef = useRef(null); // Ref for the container div
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handleStockInstituteRepSearch = async (event) => {
    if (formData.stockInstitutionRepId !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchStockInstitutionRepresentativesApi({
          searchTerm,
        });

        setSearchResults(response.data);
      } catch (error) {
        console.error(
          "Error searching stock institution representative:",
          error
        );
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

  const handleSelectStockInstitutionRepresentative = (stockCusInst) => {
    setFormData({
      ...formData,
      stockInstitutionRepId: stockCusInst.id,
    });
    setSearchTerm(stockCusInst.name); // Update input value to show selected stockCusInst
    setSearchResults([]); // Clear search results after selecting
    onSelectStockInstitutionRepresentative(stockCusInst);
  };

  useEffect(() => {
    if (
      searchTerm?.trim().length > 0 &&
      formData.stockInstitutionRepId === null
    ) {
      debouncedSearch(searchTerm?.trim());
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    if (loadOnMount && searchTerm === "") {
      debouncedSearch(searchTerm?.trim());
    }
  }, [loadOnMount, searchTerm, debouncedSearch]);

  useEffect(() => {
    if (defaultValue) {
      setFormData({
        ...formData,
        stockInstitutionRepId: defaultValue.id,
      });
      setSearchTerm(defaultValue.stock_customer_institution.name);
    }
  }, [defaultValue]);

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
    <div ref={containerRef} className="relative flex-1 mb-6">
      {!hideLabel && (
        <label
          htmlFor="itemName2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Institution Representative
        </label>
      )}
      <input
        type="text"
        name="stockInstitutionRepId"
        className="w-full h-10 p-3 border border-gray-300 rounded-lg"
        placeholder="Search institution representative"
        onChange={handleStockInstituteRepSearch}
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
              onClick={() => handleSelectStockInstitutionRepresentative(result)}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockInstituteRepSearch;

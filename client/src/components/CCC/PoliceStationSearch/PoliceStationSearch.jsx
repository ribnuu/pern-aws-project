import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchPoliceStationApi } from "../../../apis/PoliceStationApiService";

const PoliceStationSearch = ({
  onSelectPoliceStation,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
  defaultValue = null,
  loadOnMount = false,
  disabled = false,
  required = false,
}) => {
  const initialData = {
    stockCustomerInstitutionId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const containerRef = useRef(null); // Ref for the container div
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handlePoliceStationSearch = async (event) => {
    if (formData.stockCustomerInstitutionId !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchPoliceStationApi({
          searchTerm,
          loadOnMount,
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching stock customer institution:", error);
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

  const handleSelectStockCustomerInstitution = (stockCusInst) => {
    setFormData({
      ...formData,
      stockCustomerInstitutionId: stockCusInst.id,
    });
    setSearchTerm(stockCusInst.police_station_name); // Update input value to show selected stockCusInst
    setSearchResults([]); // Clear search results after selecting
    onSelectPoliceStation(stockCusInst);
  };

  useEffect(() => {
    if (
      searchTerm?.trim().length > 0 &&
      formData.stockCustomerInstitutionId === null
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
        stockCustomerInstitutionId: defaultValue.id,
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
          Police Station
          {required && (
            <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
          )}
        </label>
      )}
      <input
        type="text"
        name="stockCustomerInstitutionId"
        className="w-full h-10 p-3 border border-gray-300 rounded-lg"
        placeholder="Search police station"
        onChange={handlePoliceStationSearch}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={searchTerm}
        onClickCapture={() => {
          setIsClickedOnInput(true);
        }}
        autoComplete="off" // Disable autofill suggestions
        disabled={disabled}
      />

      {/* Loading indicator */}
      {/* {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50">
          <span className="text-gray-700 dark:text-gray-300">Loading...</span>
        </div>
      )} */}

      {/* Display search results */}
      {searchResults.length > 0 && isClickedOnInput && !loading && (
        <div
          ref={resultsRef} // Attach the ref to the search results div
          className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
        >
          {searchResults.map((result, index) => (
            <div
              key={result.id}
              className={`py-2 px-4 cursor-pointer ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectStockCustomerInstitution(result)}
            >
              {result.police_station_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PoliceStationSearch;

import _, { result } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { searchExpensesMeasurementUnits } from "../../../apis/POSExpensesCategorySubCategoryApiService";
import { useSelector } from "react-redux";

const MeasurementsUnitsSearch = ({
  setLoading,
  onSelectExpenseMeasurementUnit,
}) => {
  //Redux Store State
  const measurement = useSelector(
    (store) => store.posExpensesReducer.measurement_units
  );

  //Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const { data } = await searchExpensesMeasurementUnits();

        const filteredData = data.filter(
          (item) =>
            item.unit_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.unit_symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredData);
      } catch (error) {
        console.log("Error searching measurement units:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [searchTerm]
  );

  //auto loaded
  useEffect(() => {
    if (measurement !== null && measurement !== "") {
      setSearchTerm(measurement);
    }
  }, [measurement]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleSelect = (unit, index) => {
    setSelectedUnit(unit.unit_symbol);
    onSelectExpenseMeasurementUnit?.(unit.unit_symbol);
    setSelectedIndex(index);
    setSearchTerm(unit.unit_symbol); // update input field with selected value
    setSearchResults([]); // hide dropdown
  };

  const handleInputFocus = () => {
    setSearchTerm("");
    debouncedSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleSelect(searchResults[selectedIndex], selectedIndex);
      }
    }
  };

  // when click the input and select nothing drop down should be invisible
  const handleClearUnits = () => {
    if (!selectedUnit) {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search unit"
        className="w-full p-2 mb-2 rounded-lg  focus:outline-none focus:border-transparent"
        ref={inputRef}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setTimeout(() => {
            handleClearUnits();
          }, 200);
        }}
      />

      {searchResults.length > 0 && (
        <div
          className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
          ref={inputRef}
        >
          {searchResults.map((result, index) => (
            <div
              key={index}
              className={`py-2 px-4 cursor-pointer 
               `}
              onClick={() => handleSelect(result, index)}
            >
              {result.unit_symbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeasurementsUnitsSearch;

import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchCitiesApi } from "../../../apis/CccAdressApiService";
import { FormattedMessage } from "react-intl";

const CitySearch = ({
  onSelectCity,
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
    cityId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const containerRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handleCitySearch = async (event) => {
    if (formData.cityId !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchCitiesApi(searchTerm);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching cities:", error);
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
      cityId: item.city_id,
    });
    setSearchTerm(item.city_name); // Update input value
    setSearchResults([]); // Clear search results
    onSelectCity(item);
  };

  useEffect(() => {
    if (
      searchTerm &&
      searchTerm?.trim().length > 0 &&
      formData.cityId === null
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
        cityId: defaultValue.id,
      });
      setSearchTerm(defaultValue.city_name);
    }
  }, [defaultValue]);

  useEffect(() => {
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
    <div ref={containerRef} className="relative flex-1 mb-2">
      {!hideLabel && (
        <label
          htmlFor="cityName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <FormattedMessage
            id="app.general.address.form_fields.city"
            defaultMessage="City"
          />
          {required && (
            <span className="text-red-500 ml-1 font-semibold">*</span> // Red asterisk for required fields
          )}
        </label>
      )}
      <input
        type="text"
        name="cityId"
        className="w-full h-10 p-3 border border-gray-300 rounded-lg"
        placeholder="Search city"
        onChange={handleCitySearch}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={searchTerm}
        onClickCapture={() => {
          setIsClickedOnInput(true);
        }}
        autoComplete="off"
        disabled={disabled}
      />

      {searchResults.length > 0 && isClickedOnInput && (
        <div
          ref={resultsRef}
          className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
        >
          {searchResults.map((result, index) => (
            <div
              key={result.city_id}
              className={`py-2 px-4 cursor-pointer ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectSearchResultItem(result)}
            >
              {result.city_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;

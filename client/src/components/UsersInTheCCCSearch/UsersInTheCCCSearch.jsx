import React, { useEffect, useRef, useState } from "react";
import { searchUsersApi } from "../../apis/UserApiService";
import _ from "lodash";

const UsersInTheCCCSearch = ({
  //
  onSelectUsersInTheCCC,
  //
  hideLabel = false,
  labelText = "Search",
  disabled = false,
  placeholder = "Search",
  // State
  searchTerm,
  setSearchTerm,
  setLoading,
  loading,
  //
  loadOnMount = false,
}) => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const initialData = {
    selectedUserId: null,
  };

  const [formData, setFormData] = useState(initialData);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handleUsersInTheCCCSearch = async (event) => {
    if (formData.selectedUserId !== null) {
      setFormData(initialData);
    }
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        handleSelectUsersInTheCCC(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectUsersInTheCCC = (user) => {
    setFormData({
      ...formData,
      selectedUserId: user.id,
    });
    setSearchTerm(user.name); // Update input value
    setSearchResults([]); // Clear search results
    onSelectUsersInTheCCC(user);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchUsersApi(searchTerm);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching stock customer institution:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [loadOnMount]
  );

  useEffect(() => {
    if (searchTerm?.trim().length > 0 && formData.selectedUserId === null) {
      debouncedSearch(searchTerm?.trim());
    }
  }, [searchTerm, debouncedSearch]);

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
    <>
      <div className="relative flex-1">
        {!hideLabel && (
          <label
            htmlFor="itemName2"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {labelText}
          </label>
        )}
        <input
          disabled={disabled}
          type="text"
          name="selectedUserId"
          className="w-full h-12 p-3 border border-gray-300 rounded-lg"
          placeholder={placeholder}
          onChange={handleUsersInTheCCCSearch}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={searchTerm}
          onClickCapture={(e) => {
            setIsClickedOnInput(true);
          }}
          autoComplete="off" // Disable autofill suggestions
        />

        {searchResults.length > 0 && isClickedOnInput && (
          <div
            ref={resultsRef}
            className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
            style={{ position: "absolute", zIndex: 9999 }}
          >
            {searchResults.map((result, index) => (
              <div
                key={result.id}
                className={`py-2 px-4 cursor-pointer ${
                  selectedIndex === index ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectUsersInTheCCC(result)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UsersInTheCCCSearch;

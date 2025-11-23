import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchUserInCccByUserIdGroupIdAndSearchTerm } from "../../../apis/CccSearchApiService";

const CccUserSearchByUserIdGroupIdAndSearchTerm = ({
  onSelectUser,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
  defaultValue = null,
  loadOnMount = false,
  disabled = false,
  groupId = null,
  roleId = null,
  labelText = "CCC User",
}) => {
  const initialData = {
    userId: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const containerRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);

  const handleUserSearch = async (event) => {
    if (formData.userId !== null) {
      setFormData(initialData);
    }

    const { value } = event.target;
    setSearchTerm(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        // if (!groupId || !roleId) {
        //   return;
        // }
        const response = await searchUserInCccByUserIdGroupIdAndSearchTerm(
          groupId,
          roleId,
          searchTerm
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching users:", error);
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
      userId: item.user_id,
    });
    setSearchTerm(item.username); // Update input value
    setSearchResults([]); // Clear search results
    onSelectUser(item);
  };

  useEffect(() => {
    if (searchTerm?.trim().length > 0 && formData.userId === null) {
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
        userId: defaultValue.id,
      });
      setSearchTerm(defaultValue.username);
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
          htmlFor="userName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {labelText}
        </label>
      )}
      <input
        type="text"
        name="userId"
        className="w-full h-10 p-3 border border-gray-300 rounded-lg"
        placeholder="Search police officer"
        onChange={handleUserSearch}
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
              key={result.user_id}
              className={`py-2 px-4 cursor-pointer ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSelectSearchResultItem(result)}
            >
              {result.username}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CccUserSearchByUserIdGroupIdAndSearchTerm;

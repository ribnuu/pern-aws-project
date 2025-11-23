import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { searchUsersInThePOSCompanyByEntityTypeApi } from "../../../apis/POSExpensesCategorySubCategoryApiService";
import { creataCustomSupplierApi } from "../../../apis/posStockSupplierApiService";

const UsersInThePOSCompanySearch = ({
  onSelectUsersInThePosCompany,
  CustomInputSupplier,
  SetIsCustomSuppliers,
  setCustomSuppliers,
  setLoading,
  loading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
  labelText = "Users in the company",
  searchIn = "Customer",
  institutionId = null, // if the institution id is provided, then it will search only in the given institution
  defaultValue = null,
  loadOnMount = false,
  disabled = false,
}) => {
  const initialData = {
    selectedUserId: null,
  };
  const [formData, setFormData] = useState(initialData);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isClickedOnInput, setIsClickedOnInput] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const enterPressedRef = useRef(false);
  const selectionMadeRef = useRef(false);

  const handleUsersInThePosCompanySearch = async (event) => {
    // if (formData.selectedUserId !== null) {
    //   setFormData(initialData);
    // }
    const { value } = event.target;
    setSearchTerm(value);
    setShowDropdown(true);
    // Notify parent immediately of updated value
    onSelectUsersInThePosCompany({ id: null, name: value });
  };

  // useEffect(() => {
  //   if (defaultValue) {
  //     setFormData({
  //       ...formData,
  //       selectedUserId: defaultValue.id,
  //     });
  //     setSearchTerm(defaultValue.name);
  //   }
  // }, [defaultValue]);

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm, searchIn) => {
      setLoading(true);
      try {
        const response = await searchUsersInThePOSCompanyByEntityTypeApi(
          searchTerm,
          searchIn,
          institutionId,
          loadOnMount
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching users in the POS company:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [institutionId, searchIn, setLoading]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        enterPressedRef.current = true;
        handleSelectUsersInThePosCompany(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectUsersInThePosCompany = (user) => {
    selectionMadeRef.current = true;
    setFormData({
      ...formData,
      selectedUserId: user.id,
    });
    setSearchTerm(user.name); // Update input value
    // setSearchResults([]); // Clear search results
    setShowDropdown(false);
    onSelectUsersInThePosCompany(user);
  };

  const handleClickOutside = (event) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target) &&
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (searchTerm?.trim().length > 0 && formData.selectedUserId === null) {
      debouncedSearch(searchTerm?.trim(), searchIn);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, debouncedSearch, searchIn]);

  useEffect(() => {
    if (loadOnMount && searchTerm === "") {
      debouncedSearch(searchTerm?.trim(), searchIn);
    }
  }, [loadOnMount, searchTerm, debouncedSearch]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setFormData({
        ...formData,
        selectedUserId: defaultValue.id,
      });
      setSearchTerm(defaultValue.stock_customer_institution.name);
    }
  }, [defaultValue]);

  useEffect(() => {
    // When the 'searchIn' prop changes (like switching to "Supplier")
    // and there’s an existing search term, trigger the search again
    if (searchTerm?.trim() !== "" || loadOnMount) {
      debouncedSearch(searchTerm.trim(), searchIn);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchIn]);

  useEffect(() => {
    setFormData(initialData); // Clear selected user
    setSearchTerm(""); // Optionally clear search input
  }, [searchIn]);

  const handleCustomSupplier = async () => {
    if (searchIn === "Supplier" && searchTerm.trim() !== "") {
      const trimmed = searchTerm.trim().toLowerCase();
      const isNotCustomInput = searchResults.some(
        (item) => item.name.toLowerCase() === trimmed
      );

      if (!isNotCustomInput) {
        CustomInputSupplier(searchTerm);
        SetIsCustomSuppliers(true);
        setCustomSuppliers((prev) => [searchTerm]);
        setShowDropdown(false);
      }
    }
  };

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
          className="w-full min-w-[260px] text-sm px-4 py-2 border border-gray-300 rounded-lg"
          placeholder={`Search in ${searchIn}`}
          onChange={handleUsersInThePosCompanySearch}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={searchTerm}
          onFocus={() => {
            setShowDropdown(true);
            setIsClickedOnInput(true);

            // Trigger search again when focused
            if (searchTerm.trim() && formData.selectedUserId === null) {
              debouncedSearch(searchTerm.trim(), searchIn);
            }
          }}
          autoComplete="off" // Disable autofill suggestions
          onBlur={() => {
            setTimeout(() => {
              if (selectionMadeRef.current) {
                // Skip dropdown logic on recent selection
                selectionMadeRef.current = false;
                return;
              }

              if (!enterPressedRef.current) {
                handleCustomSupplier();
              }

              enterPressedRef.current = false;
            }, 200);
          }}
        />

        {showDropdown && searchResults.length > 0 && isClickedOnInput && (
          <div
            ref={resultsRef}
            className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 min-w-full max-h-60 overflow-auto"
            style={{ position: "absolute", zIndex: 9999 }}
          >
            <div role="listbox">
              {searchResults.map((result, index) => (
                <div
                  key={result.id}
                  className={`py-2 px-4 cursor-pointer ${
                    selectedIndex === index ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSelectUsersInThePosCompany(result)}
                >
                  {result.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersInThePOSCompanySearch;

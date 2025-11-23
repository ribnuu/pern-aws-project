import _, { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { searchExpensesNote } from "../../../apis/POSExpensesCategorySubCategoryApiService";

const ExpensesNoteSearch = ({
  onSelectExpenseNote,
  setLoading,
  searchTerm,
  setSearchTerm,
  hideLabel = false,
}) => {
  const initialData = {
    note: null,
  };

  //Local state
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const [formData, setFormData] = useState(initialData);
  const [showDropdown, setShowDropdown] = useState(false);
  const enterPressedRef = useRef(false);

  //State for handle key down
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleExpensesNoteSearch = async (event) => {
    const { value } = event.target;

    console.log(value);

    setSearchTerm(value); // always do this first

    // 👇 Always update formData.note with current input
    setFormData((prev) => ({
      ...prev,
      note: value,
    }));

    setShowDropdown(true);
    debouncedSearch(value);
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchExpensesNote(searchTerm);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching expense note:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [setLoading]
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
      e.preventDefault();
      if (selectedIndex >= 0) {
        e.preventDefault();
        handleSelectSearchResultItem(searchResults[selectedIndex]);
      }
    }
  };

  const handleSelectSearchResultItem = (result) => {
    enterPressedRef.current = true;
    console.log(result);

    setFormData({
      ...formData,
      note: result.note,
    });

    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.id === result.id
    );

    if (!itemExists) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, result]);
    }

    setSearchTerm(result.note); // update input
    onSelectExpenseNote(result); // propagate selection
    setShowDropdown(false); // hide suggestions
  };

  const handleCustomNoteSubmit = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const match = searchResults.find(
      (item) => item.note.toLowerCase() === trimmed.toLowerCase()
    );

    if (!match) {
      const customNote = {
        id: null,
        note: trimmed,
        isCustom: true,
      };

      setFormData({ ...formData, note: trimmed });
      onSelectExpenseNote(customNote);
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    if (searchTerm?.trim() && !enterPressedRef.current) {
      onSelectExpenseNote({
        id: null,
        note: searchTerm.trim(),
        isCustom: true,
      });
    }
  }, [searchTerm, onSelectExpenseNote]);

  return (
    <div className="relative flex-1">
      {!hideLabel && (
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Note
        </label>
      )}
      <input
        type="text"
        name="note"
        className="w-full h-12 p-3 border border-gray-300 rounded-lg"
        placeholder="note ..."
        onChange={handleExpensesNoteSearch}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={searchTerm}
        onBlur={() => {
          setTimeout(() => {
            if (!enterPressedRef.current) {
              handleCustomNoteSubmit(); // ✅ only if Enter was not used
            }
            setShowDropdown(false);
            enterPressedRef.current = false;
          }, 100);
        }}
      />
      {showDropdown && searchResults.length > 0 && (
        <div
          role="listbox"
          ref={resultsRef} // Attach the ref to the search results div
          className="absolute top-full z-50 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
        >
          {searchResults.map((result, index) => (
            <div
              key={index}
              className={`py-2 px-4 cursor-pointer ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onMouseDown={() => handleSelectSearchResultItem(result)}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: result.note.replace(
                    new RegExp(`(${searchTerm})`, "gi"),
                    (match) => `<mark class="bg-yellow-200">${match}</mark>`
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpensesNoteSearch;

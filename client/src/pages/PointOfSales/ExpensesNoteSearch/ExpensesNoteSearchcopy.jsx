import _ from "lodash";
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

  //State for handle key down
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExpensesNoteSearch = async (event) => {
    // if (formData.note !== null) {
    //   setFormData(initialData);
    // }

    const { value } = event.target;
    setShowDropdown(true);
    setSearchTerm(value);
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
    } else setSearchResults([]);

    // const finalValue = result?.note || searchTerm;

    setSearchTerm(result.note); // update input
    // setSearchResults([]); // hide suggestions
    onSelectExpenseNote(result); // propagate selection
    setShowDropdown(false); // hide suggestions
  };

  const handleSelectExpenseNote = (result) => {
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
    } else setSearchResults([]);

    setSearchTerm(result.note);
    // setSearchResults([]);
    setShowDropdown(false);
    console.log(result.note);

    onSelectExpenseNote(result);
  };

  const handleCustomNoteSubmit = () => {
    const trimmed = searchTerm.trim(); //remove white space

    console.log("custom render");

    if (!trimmed) return;

    const match = searchResults.find(
      (item) => item.note.toLowerCase() === trimmed.toLowerCase()
    );

    if (!match) {
      console.log("custom render in side");
      const customNote = {
        id: null,
        note: trimmed,
        isCustom: true,
      };
      setFormData({ ...formData, note: trimmed });
      setSearchResults([]);
      onSelectExpenseNote(customNote);
    }
  };

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
        // onBlur={() => {
        //   setTimeout(() => {
        //     handleCustomNoteSubmit();
        //   }, 200);
        // }}
        onBlur={() => {
          setTimeout(() => {
            handleCustomNoteSubmit(); // ✅ call this to save custom input
            setShowDropdown(false); // ✅ then hide dropdown
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
              onClick={() => handleSelectExpenseNote(result)}
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

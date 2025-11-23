import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import {
  createPosSubCategoryApi,
  searchPosItemCategoryApi,
} from "../../../apis/POSItemCategorySubCategoryApiService";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetItemCategoryAndSubCategorySliceField } from "../../../store/point-of-sales/ItemCategorySubCategorySlice";

const AddSubCategory = () => {
  const dispatch = useDispatch();
  const initialData = {
    categoryId: null,
    subCategory: null,
  };
  const [formData, setFormData] = useState(initialData);

  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [isSaving, setIsSaving] = useState(false);

  const handleCategoriesSearch = async (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Perform search when search term is at least 2 characters long
    if (value.length >= 2) {
      try {
        const results = await searchItemCategoryQuery(value);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching item categories:", error);
      }
    } else {
      setSearchResults([]); // Clear search results if search term is empty
    }
  };

  const debouncedSearch = React.useCallback(
    _.debounce(async (searchTerm) => {
      setLoading(true);
      try {
        const response = await searchPosItemCategoryApi(searchTerm);

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
    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.item_code === item.item_code
    );

    if (!itemExists) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }

    setSearchResults([]);
  };

  const handleSelectCategory = (category) => {
    dispatch(
      SetItemCategoryAndSubCategorySliceField({
        field: "selectedCategory",
        value: category.category_code,
      })
    );
    setFormData({ ...formData, categoryId: category.category_code });
    setSelectedCategory(category);
    setSearchTerm(category.category_name); // Update input value to show selected category
    setSearchResults([]); // Clear search results after selecting
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      debouncedSearch(searchTerm.trim());
    }
  }, [searchTerm, debouncedSearch]);

  // Handle click outside of the search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.categoryId) {
      toast.error("Please select a valid category");
      return;
    }

    if (!formData.subCategory?.trim()) {
      toast.error("Please enter a valid sub category name");
      return;
    }

    setIsSaving(true);
    try {
      const response = await createPosSubCategoryApi(formData);
      console.log("Sub Category added successfully:", response);
      toast.success("Sub Category added successfully");
      setFormData(initialData); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding sub category:", error);
      toast.error("Failed to add new sub category");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="m-5">
      <h3 className="text-xl font-semibold mb-4">Add New Subcategory</h3>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            name="itemCategorySearch"
            className="w-full h-12 p-3 border border-gray-300 rounded-lg"
            placeholder="Select category"
            onChange={handleCategoriesSearch}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={searchTerm}
          />

          {searchResults.length > 0 && (
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
                  //   onClick={() => handleSelectSearchResultItem(result)}
                  onClick={() => handleSelectCategory(result)}
                >
                  {result.category_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <input
            name="subCategory"
            type="text"
            placeholder="Subcategory Name"
            className="w-full h-12 p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.subCategory}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isSaving}
          className={`h-12 min-w-[200px] bg-blue-600 text-white rounded-lg ${
            isSaving ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSaving && <CircularLoadingSvgOne />}
          {isSaving ? "Adding..." : "Add Sub Category"}
        </button>
      </div>
    </div>
  );
};

export default AddSubCategory;

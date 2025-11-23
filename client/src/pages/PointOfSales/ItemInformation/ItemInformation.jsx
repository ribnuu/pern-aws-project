import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import _ from "lodash";
import {
  getAllSubCategoriesByCategoryCode,
  searchPosItemCategoryApi,
  searchPosItemSupplierApi,
  searchPosSubItemCategoryApi,
} from "../../../apis/POSItemCategorySubCategoryApiService";
import { v4 as uuidv4 } from "uuid";
import { createItemInformationApi } from "../../../apis/PosItemInformationApiService";
const ItemInformation = () => {
  //initial form state
  const initialData = {
    item_name: "",
    item_category: "",
    item_sub_category: "",
    supplier: "",
    created_by: 1,
    mrp: 0.0,
    cost: 0.0,
    maintain_stock: false,
    maintain_batch: false,
  };

  const [formData, setFormData] = useState(initialData);
  const inputRef = useRef(null);
  const resultsRef = useRef(null); // Ref for the search results div
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [subCategorySearchTerm, setSubCategorySearchTerm] = useState("");
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedSubCAtegory, setSelectedSubCategory] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // const [formData, setFormData] = useState(initialData);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [subCategories, setSubCategories] = useState([]);
  // const [selectedSubCAtegory, setSelectedSubCategory] = useState(null);
  // const [supplierSearch, setSupplierSearch] = useState("");
  // const [supplierResults, setSupplierResults] = useState([]);
  // const [selectedSupplier, setSelectedSupplier] = useState(null);

  //handel input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //handle toggle button changes
  const handleToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle between true and false
    }));
  };

  // Handle search for item categories
  const handleCategoriesSearch = async (event) => {
    event.preventDefault();

    const { value } = event.target;

    setCategorySearchTerm(value);

    if (value.length >= 1) {
      try {
        const results = await searchPosItemCategoryApi(value);
        setSearchResults(results.data);
      } catch (error) {
        console.error("Error searching categories", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Select category
  const handleSelectCategory = (category) => {
    setFormData((prev) => ({ ...prev, item_category: category.category_code }));
    setSelectedCategory(category);
    setCategorySearchTerm(category.category_name); // Update input value to show selected category
    setSearchResults([]); // Clear search results after selecting
  };

  // Handle search for item subcategories
  const handleSubCAtegorySearch = async (event) => {
    const { value } = event.target;

    setSubCategorySearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchPosSubItemCategoryApi(value);
        setSubCategories(result?.subCategories || []);
      } catch (error) {
        console.error("Failed to search item subcategory:", error);
      }
    } else {
      setSubCategories([]);
    }
  };

  //select sub categories
  const handleSelectSubCategory = (subCategory) => {
    setFormData((prev) => ({
      ...prev,
      item_sub_category: subCategory.sub_category_code,
    }));
    setSelectedSubCategory(subCategory);
    setSubCategorySearchTerm(subCategory.sub_category_name);
    setSubCategories([]); //clear search result after selecting
  };

  //Handle Search for supplier
  const handleSupplierSearch = async (event) => {
    const { value } = event.target;

    setSupplierSearchTerm(value);

    if (value.length >= 1) {
      try {
        const result = await searchPosItemSupplierApi(value);
        setSupplier(result?.itemSupplier || []);
      } catch (error) {
        console.error("Failed to search suppliers:", error);
      }
    } else {
      setSupplier([]);
    }
  };

  //Select supplier
  const handleSelectSupplier = (supplier) => {
    setFormData((prev) => ({ ...prev, supplier: supplier.supplier_code }));
    setSelectedSupplier(supplier);
    setSupplierSearchTerm(supplier.supplier_name);
    setSupplier([]);
  };

  //Create Item Information
  const handleCreateItemInfo = async (event) => {
    if (
      !formData.item_category ||
      !formData.item_sub_category ||
      !formData.supplier
    ) {
      toast.error("Please select a category, sub-category, and supplier.");
      return;
    }

    setIsSaving(true); // Show loading state

    const created_by = localStorage.getItem("user_id");

    const data = {
      item_det_id: uuidv4(),
      ...formData,
    };

    try {
      const response = await createItemInformationApi(data);
      if (response.status === 201) {
        toast.success("Item created successfully!");
        setFormData(initialData);
        setCategorySearchTerm("");
        setSubCategorySearchTerm("");
        setSupplierSearchTerm("");
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // const handleCategoriesSearch = async (event) => {
  //   const { value } = event.target;
  //   setSearchTerm(value);

  //   // Perform search when search term is at least 2 characters long
  //   if (value.length >= 1) {
  //     try {
  //       const results = await searchItemCategoryQuery(value);
  //       setSearchResults(results);
  //     } catch (error) {
  //       console.error("Error searching item categories:", error);
  //     }
  //   } else {
  //     setSearchResults([]); // Clear search results if search term is empty
  //   }
  // };

  // const debouncedSearch = React.useCallback(
  //   _.debounce(async (searchTerm) => {
  //     setLoading(true);
  //     try {
  //       const response = await searchPosItemCategoryApi(searchTerm);

  //       setSearchResults(response.data);
  //     } catch (error) {
  //       console.error("Error searching users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 500),
  //   []
  // );

  const handleKeyDown = (e) => {
    if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, searchResults.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelectSearchResultItem(searchResults[selectedIndex]);
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

  // useEffect(() => {
  //   if (searchTerm.trim().length > 0) {
  //     debouncedSearch(searchTerm.trim());
  //   }
  // }, [searchTerm, debouncedSearch]);

  return (
    <section className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
      <div className="">
        <div className="bg-white rounded-lg p-5 mt-4">
          <form>
            <div className="relative z-0 w-full mb-6 group">
              {/* Item Name */}
              <div className="relative z-0 w-full mb-6 group mt-0">
                <label
                  htmlFor="item_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  name="item_name"
                  value={formData.item_name}
                  id="item_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
              {/* <div className="relative z-0 w-full mb-6 group mt-0">
                <label
                  htmlFor="itemName2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Category
                </label>
                <input
                  type="text"
                  name="itemName2"
                  id="itemName2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div> */}

              {/* Item Category Search & Select */}
              <div className="relative flex-1 mb-6">
                <label
                  htmlFor="itemName2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Category
                </label>
                <input
                  type="text"
                  name="itemCategorySearch"
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                  placeholder="Select category"
                  onChange={handleCategoriesSearch}
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  value={categorySearchTerm}
                />

                {searchResults.length > 0 && (
                  <div
                    ref={resultsRef} // Attach the ref to the search results div
                    className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
                  >
                    {searchResults.map((result, index) => (
                      <div
                        key={result.category_code}
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
              {/* Item Sub Category Search and Select*/}
              <div className="relative flex-1 mb-6">
                <label
                  htmlFor="itemName2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Sub Category
                </label>
                <input
                  type="text"
                  name="itemSubCategorySearch"
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                  placeholder="Select sub category"
                  onChange={handleSubCAtegorySearch}
                  // onKeyDown={handleKeyDown}
                  ref={inputRef}
                  value={subCategorySearchTerm}
                />
                {subCategories.length > 0 && (
                  <div
                    ref={resultsRef}
                    className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
                  >
                    {subCategories.map((subCategory, index) => (
                      <div
                        key={subCategory.sub_category_code}
                        className={`py-2 px-4 cursor-pointer ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleSelectSubCategory(subCategory)}
                      >
                        {subCategory.sub_category_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/*Item supplier search and select  */}
              <div className="relative flex-1 mb-6">
                <label
                  htmlFor="itemName2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Item Supplier
                </label>
                <input
                  type="text"
                  name="itemSupplierSearch"
                  className="w-full h-12 p-3 border border-gray-300 rounded-lg"
                  placeholder="Select sub category"
                  onChange={handleSupplierSearch}
                  // onKeyDown={handleKeyDown}
                  ref={inputRef}
                  value={supplierSearchTerm}
                />
                {supplier.length > 0 && (
                  <div
                    ref={resultsRef}
                    className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto"
                  >
                    {supplier.map((supplier, index) => (
                      <div
                        key={supplier.supplier_code}
                        className={`py-2 px-4 cursor-pointer ${
                          selectedIndex === index ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleSelectSupplier(supplier)}
                      >
                        {supplier.supplier_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group mt-0">
                <label
                  htmlFor="mrp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MRP
                </label>
                <input
                  type="text"
                  name="mrp"
                  id="mrp"
                  value={formData.mrp}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group mt-0">
                <label
                  htmlFor="itemName2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cost
                </label>
                <input
                  type="text"
                  name="cost"
                  id="cost"
                  value={formData.cost}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  onChange={handleInputChange}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
              </div>
            </div>

            {/* Maintain Stock Toggle */}
            <div className="">
              <label className="flex items-center  cursor-pointer mb-4">
                <span className="text-[18px] font-medium text-gray-700 dark:text-gray-300">
                  Maintain Stock?
                </span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.maintain_stock}
                  onChange={() => handleToggle("maintain_stock")}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:border-white"></div>
              </label>
            </div>
            {/* Maintain Batch Toggle */}
            <div className="mb-2">
              <label className="flex items-center cursor-pointer">
                <span className="text-[18px] font-medium text-gray-700 dark:text-gray-300">
                  Maintain Batch?
                </span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.maintain_batch}
                  onChange={() => handleToggle("maintain_batch")}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:border-white"></div>
              </label>
            </div>

            {/*Submit Button */}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSaving}
              onClick={handleCreateItemInfo}
            >
              Submit
            </button>
          </form>
        </div>

        {/* <div className="relative z-0 lg:w-full mb-6 group flex justify-between gap-12 bg-white px-4 py-1 rounded-lg">
          <button
            onClick={handleProceedToOffenseSelection}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
          >
            <AiOutlineSearch className="my-auto" />
            Proceed to offense selection
          </button>
          <Link to="/dop/issues-without-fine">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2"
            >
              <AiOutlineSearch className="my-auto" />
              Proceed to issues without fine
            </button>
          </Link>
        </div> */}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default ItemInformation;

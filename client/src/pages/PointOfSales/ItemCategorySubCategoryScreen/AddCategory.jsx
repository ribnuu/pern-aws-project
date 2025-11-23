import React, { useState } from "react";
import { createPosMainCategoryApi } from "../../../apis/POSItemCategorySubCategoryApiService";
import CircularLoadingSvgOne from "../../../components/Svgs/CircularLoadingSvgOne";
import toast from "react-hot-toast";

const AddCategory = () => {
  const initialData = {
    category: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.category.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createPosMainCategoryApi(formData);
      console.log("Category added successfully:", response);
      toast.success("Category added successfully");
      setFormData(initialData); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add new category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="m-5">
        <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full h-12 p-3 border border-gray-300 rounded-lg"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`h-12 min-w-[200px] bg-blue-600 text-white rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isLoading && <CircularLoadingSvgOne />}
              {isLoading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;

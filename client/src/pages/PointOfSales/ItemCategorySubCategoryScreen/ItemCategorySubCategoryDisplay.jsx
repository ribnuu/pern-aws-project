import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllSubCategoriesByCategoryCode,
  updateMultipleStockItemSubCategoriesApi,
} from "../../../apis/POSItemCategorySubCategoryApiService";

const ItemCategorySubCategoryDisplay = ({ onUpdate }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editableData, setEditableData] = useState([]);

  const { selectedCategory } = useSelector(
    (state) => state.itemCategoryAndSubCategoryReducer
  );

  const handleChange = (index, event) => {
    const updatedData = editableData.map((item, idx) =>
      idx === index
        ? { ...item, sub_category_name: event.target.value, is_edited: true }
        : item
    );
    setEditableData(updatedData);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleDeleteClick = (index) => {
    const updatedData = editableData.map((item, idx) =>
      idx === index
        ? { ...item, is_deleted: !item.is_deleted, is_edited: true }
        : item
    );
    setEditableData(updatedData);
  };

  const handleSave = async () => {
    const itemsToUpdate = editableData.filter((item) => item.is_edited);
    if (itemsToUpdate.length > 0) {
      await updateMultipleStockItemSubCategoriesApi(itemsToUpdate);
    }
    setEditIndex(null); // Reset edit index after saving
  };

  // Check if there are any items to save
  const hasChanges = editableData.some((item) => item.is_edited);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory) {
          const response = await getAllSubCategoriesByCategoryCode(
            selectedCategory
          );
          if (response && response.success) {
            const dataWithFlags = response.data.map((item) => ({
              ...item,
              is_edited: false, // Initialize with no edits
              // is_deleted: false, // Initialize as not deleted
            }));
            setEditableData(dataWithFlags);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  return (
    <div className="p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {editableData.map((item, index) => (
            <tr key={item.sub_category_code}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.sub_category_code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={item.sub_category_name}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                ) : (
                  <span
                    onClick={() => handleEditClick(index)}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    {item.sub_category_name}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  onClick={() => handleDeleteClick(index)}
                  className={`px-2 py-1 rounded ${
                    item.is_deleted
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {item.is_deleted ? "Undo Delete" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(editIndex !== null || hasChanges) && (
        <button
          onClick={handleSave}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ItemCategorySubCategoryDisplay;

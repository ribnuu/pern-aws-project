import React from "react";
import { Toaster } from "react-hot-toast";
import _ from "lodash";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import ItemCategorySubCategoryDisplay from "./ItemCategorySubCategoryDisplay";

const ItemCategorySubCategoryScreen = ({}) => {
  return (
    <>
      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <AddCategory />
      </div>

      <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black">
        <AddSubCategory />

        <ItemCategorySubCategoryDisplay />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default ItemCategorySubCategoryScreen;

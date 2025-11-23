import React, { useState } from "react";
import _ from "lodash";
import AddExpense from "./AddExpense";
import { useLocation } from "react-router-dom";
// import AddCategory from "./AddCategory";
// import AddSubCategory from "./AddSubCategory";
// import ExpensesCategorySubCategoryDisplay from "./ExpensesCategorySubCategoryDisplay";
import useFetchButtons from "../../../hooks/useFetchButtons";
import { useSelector } from "react-redux";
import ViewExpensesScreen from "./ViewExpensesScreen";
import UpdateExpenses from "./updateExpenses";

const ExpensesScreen = ({}) => {
  const location = useLocation();
  const buttonId = location.state?.buttonId;
  useFetchButtons(buttonId);

  const [selectedButton, setSelectedButton] = useState(null);
  // const [selectedBtnFuncName, setSelectedBtnFuncName] = useState(null)

  const { buttonsObj } = useSelector((state) => state.appRightsReducer);

  return (
    <div className="h-full flex flex-col">
      <div className="mx-5 grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2 font-black mt-12">
        {buttonsObj &&
          Object.entries(buttonsObj).map(([key, value]) => (
            <button
              className={`${
                key === selectedButton?.ccc_master_buttons_id
                  ? "bg-green-500 text-white"
                  : "bg-white text-blue-500"
              } border border-gray-900 rounded-md px-4 py-2 uppercase text-left`}
              // onClick={() => handleToggle("createButtons")}
              onClick={(e) => {
                e.preventDefault();
                setSelectedButton(value);
              }}
            >
              {value?.button_display_name}
            </button>
          ))}
      </div>

      {selectedButton && (
        <>
          {selectedButton?.button_function_name === "addExpenses" && (
            <AddExpense />
          )}

          {selectedButton?.button_function_name === "viewExpenses" && (
            <ViewExpensesScreen />
          )}

          {selectedButton?.button_function_name === "updateExpenses" && (
            <UpdateExpenses />
          )}
        </>
      )}
    </div>
  );
};

export default ExpensesScreen;

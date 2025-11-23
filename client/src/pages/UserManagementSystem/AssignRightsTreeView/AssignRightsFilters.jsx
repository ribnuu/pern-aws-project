import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAssignRightsSliceField } from "../../../store/super-admin/AssignRightsSlice";

const AssignRightsFilters = () => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state.assignRightsReducer.selectedOption
  );
  return (
    <>
      <div className="grid grid-cols-3 gap-2 m-5">
        {["Users", "Roles", "Groups", "Roles New", "Groups New"].map((item) => (
          <div
            key={item}
            className={`text-center rounded-md py-2 cursor-pointer transition-all duration-300 
        ${
          selectedOption === item
            ? "bg-blue-900 text-white"
            : "bg-blue-500 text-gray-100 hover:bg-blue-700"
        }`}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                SetAssignRightsSliceField({
                  field: "selectedOption",
                  value: item,
                })
              );
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default AssignRightsFilters;

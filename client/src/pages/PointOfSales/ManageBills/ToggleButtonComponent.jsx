import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateManageBillsSliceFilter } from "../../../store/point-of-sales/BillManagementSlice";

const ToggleButtonComponent = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.billManagementReducer);

  const handleToggle = () => {
    dispatch(
      UpdateManageBillsSliceFilter({
        filterKey: "loadCustomerBills",
        value: !filters.loadCustomerBills,
      })
    );
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`px-4 rounded text-white ${
          filters.loadCustomerBills ? "bg-green-500" : "bg-blue-500"
        }`}
      >
        {filters.loadCustomerBills
          ? "Hide Customer Bills"
          : "Show Customer Bills"}
      </button>
    </div>
  );
};

export default ToggleButtonComponent;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBillPaymentSliceFilter } from "../../../store/point-of-sales/BillPaymentSlice";

const ToggleButtonComponent = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.posBillPaymentReducer);

  const handleToggle = () => {
    dispatch(
      UpdateBillPaymentSliceFilter({
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

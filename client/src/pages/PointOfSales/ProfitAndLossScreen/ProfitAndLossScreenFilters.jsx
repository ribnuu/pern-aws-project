import React from "react";
import CustomDatePicker from "../../../components/customDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { SetProfitAndLossSliceField } from "../../../store/point-of-sales/ProfitAndLossSlice";

const ProfitAndLossScreenFilters = () => {
  const dispatch = useDispatch();
  const { fromDate, toDate } = useSelector(
    (state) => state.profitAndLossReducer
  );

  const handleDateChange = (fieldName) => (date) => {
    const formattedDate = date ? new Date(date).toISOString() : null; // Convert date to ISO string

    dispatch(
      SetProfitAndLossSliceField({ field: fieldName, value: formattedDate }) // Use 'value' instead of 'date'
    );
  };

  return (
    <div className="mx-5 bg-gray-50 my-12 rounded-md dark:bg-gray-900 border border-black p-6">
      <h1 className="text-2xl font-bold mb-6">Profit and Loss Statement</h1>
      <div className="mb-2" style={{ display: "flex", gap: "10px" }}>
        <CustomDatePicker
          labelText=""
          onDateChange={handleDateChange("fromDate")}
          currentDate={fromDate} // Use the current 'from' date
        />
        <CustomDatePicker
          labelText="-"
          onDateChange={handleDateChange("toDate")}
          currentDate={toDate} // Use the current 'from' date
          minDate={fromDate}
        />
      </div>
    </div>
  );
};

export default ProfitAndLossScreenFilters;

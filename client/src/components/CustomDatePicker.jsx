import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDatePicker = ({
  currentDate,
  minDate,
  maxDate,
  onDateChange,
  labelText,
  disabled = false,
}) => {
  // Convert date strings to Dayjs objects
  const parseDateString = (dateString) => {
    return dateString ? dayjs(dateString) : null;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {labelText && <label style={{ marginRight: "10px" }}>{labelText}</label>}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          disabled={disabled}
          minDate={parseDateString(minDate)}
          maxDate={parseDateString(maxDate)}
          value={currentDate ? dayjs(currentDate) : null} // Ensure currentDate is a Dayjs object
          onChange={(value) => {
            if (value) {
              onDateChange(value.toDate()); // Convert Day.js object to Date object
            } else {
              onDateChange(null); // Handle case where no date is selected
            }
          }}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;

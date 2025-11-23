import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  driverLicenseNo: "",
  vehicleNumber: "",
  confirmDriverLicenseNo: "",
  latitude: 0.0,
  longitude: 0.0,
  mobileNumber: null,
  confirmMobileNumber: null,
  selectedOffenseId: null,
  selectedOffense: null,
};

// Create slice
export const IssueFineSlice = createSlice({
  name: "issueFine",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetState: (state) => initialState,
  },
});

// Export actions
export const { setField, resetState } = IssueFineSlice.actions;

// Asynchronous action creator
export const setIssueFineData = (field, value) => (dispatch) => {
  dispatch(setField({ field, value }));
};

// Export reducer
export default IssueFineSlice.reducer;

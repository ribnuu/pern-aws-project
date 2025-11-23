import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  referenceNumber: null,
};

// Create slice
export const PayTrafficFineUsingReferenceSlice = createSlice({
  name: "payTrafficFineusingReference",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetState: (state) => initialState,
    SetReferenceNumber: (state, action) => {
      state.referenceNumber = action.payload;
    },
  },
});

// Export actions
export const { setField, resetState, SetReferenceNumber } =
  PayTrafficFineUsingReferenceSlice.actions;

// Export reducer
export default PayTrafficFineUsingReferenceSlice.reducer;

// reducers/billPaymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  fromDate: null,
  toDate: null,
};

// Create the pointOfSales slice
const posProfitAndLossSlice = createSlice({
  name: "posProfitAndLoss",
  initialState,
  reducers: {
    SetProfitAndLossSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        // Convert date to ISO string for serializable state
        state[field] = value instanceof Date ? value.toISOString() : value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    ResetState: () => initialState,
  },
});

// Export actions
export const { SetProfitAndLossSliceField, ResetState } =
  posProfitAndLossSlice.actions;

// Export reducer
export default posProfitAndLossSlice.reducer;

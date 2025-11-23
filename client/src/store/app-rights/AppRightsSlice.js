// reducers/billPaymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  selectedCategory: null,
  buttonsObj: {},
  buttonFunctionNamesList: [],
};

// Create the pointOfSales slice
const appRightsSlice = createSlice({
  name: "appRights",
  initialState,
  reducers: {
    SetAppRightsSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    ResetState: () => initialState,
  },
});

// Export actions
export const { SetAppRightsSliceField, ResetState } = appRightsSlice.actions;

// Export reducer
export default appRightsSlice.reducer;

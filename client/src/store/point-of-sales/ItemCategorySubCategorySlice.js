// reducers/billPaymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  selectedCategory: null,
};

// Create the pointOfSales slice
const itemCategoryAndSubCategorySlice = createSlice({
  name: "itemCategoryAndSubCategory",
  initialState,
  reducers: {
    SetItemCategoryAndSubCategorySliceField: (state, action) => {
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
export const { SetItemCategoryAndSubCategorySliceField, ResetState } =
  itemCategoryAndSubCategorySlice.actions;

// Export reducer
export default itemCategoryAndSubCategorySlice.reducer;

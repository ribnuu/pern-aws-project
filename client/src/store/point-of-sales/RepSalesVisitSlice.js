// reducers/billPaymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  filters: { representativeId: null },
};

// Create the pointOfSales slice
const repSalesVisitSlice = createSlice({
  name: "repSalesVisit",
  initialState,
  reducers: {
    SetRepSalesVisitSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        // Convert date to ISO string for serializable state
        state[field] = value instanceof Date ? value.toISOString() : value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    UpdateRepSalesVisitSliceFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (state.filters.hasOwnProperty(filterKey)) {
        state.filters[filterKey] =
          value instanceof Date ? value.toISOString() : value;
      } else {
        console.warn(`Filter key ${filterKey} does not exist in filters.`);
      }
    },
    ResetState: () => initialState,
  },
});

// Export actions
export const {
  SetRepSalesVisitSliceField,
  UpdateRepSalesVisitSliceFilter,
  ResetState,
} = repSalesVisitSlice.actions;

// Export reducer
export default repSalesVisitSlice.reducer;

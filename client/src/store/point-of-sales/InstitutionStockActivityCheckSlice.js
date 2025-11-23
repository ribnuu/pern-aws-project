// reducers/billPaymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  loading: false,
  institutions: [],
  representativesList: [],
  groupBySubList: [],
  filters: {
    loadInstitutionsBy: "NO_TRANSACTIONS_WITHIN_LAST_30_DAYS", // NO_PENDING_BILLS, NO_TRANSACTIONS_WITHIN_LAST_30_DAYS,
    groupInstitutionsBy: "CITY",
    selectedRepresentative: "",
    selectedGroupBySub: "",
  },
};

// Create the pointOfSales slice
const institutionStockActivityCheckSlice = createSlice({
  name: "institutionStockActivityCheck",
  initialState,
  reducers: {
    SetInstitutionStockActivityCheckSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        // Convert date to ISO string for serializable state
        state[field] = value instanceof Date ? value.toISOString() : value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    UpdateInstitutionStockActivityCheckSliceFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (state.filters.hasOwnProperty(filterKey)) {
        state.filters[filterKey] = value;
      } else {
        console.warn(`Filter key ${filterKey} does not exist in filters.`);
      }
    },
    ResetFilters: (state) => {
      state.filters = initialState.filters;
    },
    ResetState: () => initialState,
  },
});

// Export actions
export const {
  SetInstitutionStockActivityCheckSliceField,
  ResetState,
  UpdateInstitutionStockActivityCheckSliceFilter,
  ResetFilters,
} = institutionStockActivityCheckSlice.actions;

// Export reducer
export default institutionStockActivityCheckSlice.reducer;

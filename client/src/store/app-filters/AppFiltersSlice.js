import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterType: null,
  filters: {
    fromDate: null,
    toDate: null,
    selectedCatSubCatCode: null,
    selectedCashSourceIds: [], // ✅ Updated for multi-source filtering
  },
};

const appFiltersSlice = createSlice({
  name: "appFilters",
  initialState,
  reducers: {
    HandleChangeAppFilters: (state, action) => {
      const { key, value } = action.payload;

      if (key === "batchUpdate") {
        Object.keys(value).forEach((filterKey) => {
          state.filters[filterKey] =
            value[filterKey] instanceof Date
              ? value[filterKey].toISOString()
              : value[filterKey];
        });
      } else {
        state.filters[key] =
          value instanceof Date ? value.toISOString() : value;
      }
    },

    HandleChangeAppFiltersState: (state, action) => {
      const { key, value } = action.payload;

      if (key === "batchUpdate") {
        Object.keys(value).forEach((formKey) => {
          state.formData[formKey] =
            value[formKey] instanceof Date
              ? value[formKey].toISOString()
              : value[formKey];
        });
      } else {
        state.formData[key] =
          value instanceof Date ? value.toISOString() : value;
      }
    },

    ResetAppFilters: () => initialState,
  },
});

export const {
  HandleChangeAppFilters,
  HandleChangeAppFiltersState,
  ResetAppFilters,
} = appFiltersSlice.actions;

export default appFiltersSlice.reducer;

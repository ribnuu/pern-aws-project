import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBillsInTheCompanyByFiltersForManageBillsApi } from "../../apis/POSManageBillsApiService";

const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD

// Initial state for the pointOfSales slice
const initialState = {
  selectedCategory: null,
  bills: [], // Array to store fetched bills
  currentPage: 1, // Current page number
  pageSize: 500, // Number of items per page
  totalBills: 0, // Total number of bills for pagination
  loading: false, // Loading state
  error: null, // Error state
  filters: {
    paidStatus: "ALL", // ALL, PAID, PARTIALLY_PAID, PENDING
    institutionId: null,
    representativeId: null,
    fromDate: today,
    toDate: today,
    deletedStatus: "ALL",
    loadCustomerBills: false,
  },
  // Delete
  toDeleteBillNumber: null,
};

// Create the pointOfSales slice
const billManagementSlice = createSlice({
  name: "billManagement",
  initialState,
  reducers: {
    UpdateBillManagementSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    ResetState: () => initialState,
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
    SetError: (state, action) => {
      state.error = action.payload;
    },
    SetBills: (state, action) => {
      const { bills, total } = action.payload;
      state.bills = bills;
      state.totalBills = total;
    },
    UpdateManageBillsSliceFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (state.filters.hasOwnProperty(filterKey)) {
        state.filters[filterKey] =
          value instanceof Date ? value.toISOString() : value;
      } else {
        console.warn(`Filter key ${filterKey} does not exist in filters.`);
      }
    },
    ResetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

// Thunk to fetch bills with pagination
export const fetchBills = createAsyncThunk(
  "billManagement/fetchBills",
  async ({ filters, page, pageSize }, { dispatch }) => {
    dispatch(SetLoading(true));
    try {
      const data = await getAllBillsInTheCompanyByFiltersForManageBillsApi(
        filters,
        page,
        pageSize
      );
      dispatch(SetBills({ bills: data.data, total: data.total }));
    } catch (error) {
      dispatch(SetError(error.message));
    } finally {
      dispatch(SetLoading(false));
    }
  }
);

// Export actions
export const {
  UpdateBillManagementSliceField,
  ResetState,
  SetLoading,
  SetError,
  SetBills,
  UpdateManageBillsSliceFilter,
  ResetFilters,
} = billManagementSlice.actions;

// Export reducer
export default billManagementSlice.reducer;

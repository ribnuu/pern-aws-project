// reducers/billPaymentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeBillPaymenApi } from "../../apis/POSBillPaymentApiService";

// Initial state for the pointOfSales slice
const initialState = {
  pendingBillsList: [],
  loading: false,
  message: "",
  error: "",
  messageShown: false, // Flag to track if the message has been shown
  filters: {
    loadBillsBy: "Pending", // All, Pending, Paid
    stockCustomerInstitutionId: null,
    representativeId: null,
    stockCustomerInstitution: null,
    loadCustomerBills: false,
  },
  isBillPaid: false, // used to detect if a bill is paid or not
};

// Create the pointOfSales slice
const billPaymentSlice = createSlice({
  name: "pointOfSales",
  initialState,
  reducers: {
    SetBillPaymentSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    RemoveBillFromPendingBillsList: (state, action) => {
      const billNumber = action.payload;
      state.pendingBillsList = state.pendingBillsList.filter(
        (b) => b.bill_number !== billNumber
      );
    },
    UpdateFieldInPendingBills: (state, action) => {
      const { billNumber, field, value } = action.payload;
      state.pendingBillsList = state.pendingBillsList.map((bill) => {
        if (bill.bill_number === billNumber) {
          return { ...bill, [field]: value };
        }
        return bill;
      });
    },
    ResetState: () => initialState,
    clearMessage: (state) => {
      state.message = "";
      state.error = "";
      state.messageShown = false;
    },
    ResetFilters: (state) => {
      state.filters = initialState.filters;
    },
    UpdateBillPaymentSliceFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (state.filters.hasOwnProperty(filterKey)) {
        state.filters[filterKey] = value;
      } else {
        console.warn(`Filter key ${filterKey} does not exist in filters.`);
      }
    },
    SortPendingBillsByInstitution: (state) => {
      state.pendingBillsList.sort((a, b) => {
        const nameA = a.stock_customer_institution?.name.toLowerCase() || "";
        const nameB = b.stock_customer_institution?.name.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      });
    },
    SortPendingBillsByLatestStockBillPayDetail: (state) => {
      state.pendingBillsList.sort((a, b) => {
        const dateA = new Date(b.latest_stock_billpay_detail?.created_at || 0);
        const dateB = new Date(a.latest_stock_billpay_detail?.created_at || 0);

        // Handle sorting by date, ensuring null or undefined dates are treated as the oldest
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        // If dates are equal or both are null/undefined, sort by stock_customer_institution name
        const nameA = a.stock_customer_institution?.name.toLowerCase() || "";
        const nameB = b.stock_customer_institution?.name.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeBillPaymentAsyc.pending, (state) => {
        state.message = "";
        state.loading = true;
        state.error = "";
      })
      .addCase(makeBillPaymentAsyc.fulfilled, (state) => {
        state.loading = false;
        state.pendingBillsList = [];
        state.message = "Bill payment successful";
        state.messageShown = false; // Reset the flag on successful payment
      })
      .addCase(makeBillPaymentAsyc.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to make bill payment";
        state.messageShown = false; // Reset the flag on error
      });
  },
});

// Selector to calculate the grand total
export const selectGrandTotalFromBillPaymentSlice = (state) => {
  return state.posBillPaymentReducer.pendingBillsList.reduce((total, bill) => {
    return total + (parseFloat(bill.grand_total) || 0);
  }, 0);
};

export const selectPaidAmountTotalFromBillPaymentSlice = (state) => {
  return state.posBillPaymentReducer.pendingBillsList.reduce((total, bill) => {
    return total + (parseFloat(bill.paid_amount) || 0);
  }, 0);
};
export const selectPendingAmountTotalFromBillPaymentSlice = (state) => {
  return state.posBillPaymentReducer.pendingBillsList.reduce((total, bill) => {
    // Safely parse values, defaulting to 0 if they are invalid or undefined
    const grandTotal = parseFloat(bill.grand_total) || 0;
    const paidAmount = parseFloat(bill.paid_amount) || 0;

    // Calculate the pending amount and add it to the total
    return total + (grandTotal - paidAmount);
  }, 0);
};

export const selectPayingTotalFromBillPaymentSlice = (state) => {
  return state.posBillPaymentReducer.pendingBillsList.reduce((total, bill) => {
    return (
      total +
      (parseFloat(bill?.paying_amount) || bill.grand_total - bill.paid_amount)
    );
  }, 0);
};

export const makeBillPaymentAsyc = createAsyncThunk(
  "posBillPayment/createBillPayment",
  async (data, { getState, rejectWithValue }) => {
    const { paymentDetails } = data;
    try {
      const { pendingBillsList } = getState().posBillPaymentReducer;
      // Example: Using a service function to create the bill record
      const response = await makeBillPaymenApi({
        pendingBillsList,
        paymentDetails,
      });

      return response; // Assuming the API returns data related to the newly created bill record
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Export actions
export const {
  ResetState,
  SetBillPaymentSliceField,
  RemoveBillFromPendingBillsList,
  UpdateFieldInPendingBills,
  clearMessage,
  ResetFilters,
  UpdateBillPaymentSliceFilter,
  SortPendingBillsByInstitution,
  SortPendingBillsByLatestStockBillPayDetail,
} = billPaymentSlice.actions;

// Export reducer
export default billPaymentSlice.reducer;

// reducers/billPaymentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeBillPaymenApi } from "../../apis/POSBillPaymentApiService";

const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD

// Initial state for the pointOfSales slice
const initialState = {
  paymentsReceivedBillsList: [],
  pendingBillsList: [],
  billsBilledToSelectedDateRange: [],
  fullyPaidBills: [],
  stockGivenAndBalanceCheckRecords: [],
  loading: false,
  commissionPaidBillDetailsIdsList: [],
  message: "",
  error: "",
  messageShown: false, // Flag to track if the message has been shown
  filters: {
    filterDateIn: "sbd",
    loadBillsBy: "FullAndPartiallyPaid", // All, Pending, Paid, FullAndPartiallyPaid
    fromDate: today,
    toDate: today,
    institutionId: null,
    representativeId: null,
  },
};

// Create the pointOfSales slice
const billPaymentSlice = createSlice({
  name: "pointOfSales",
  initialState,
  reducers: {
    SetBillTransactionsSliceField: (state, action) => {
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
    UpdateTransactionsSliceFilter: (state, action) => {
      const { filterKey, value } = action.payload;
      if (state.filters.hasOwnProperty(filterKey)) {
        state.filters[filterKey] =
          value instanceof Date ? value.toISOString() : value;
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
    ToggleComissionPaidBillDetailId: (state, action) => {
      const id = action.payload;
      const index = state.commissionPaidBillDetailsIdsList.indexOf(id);

      if (index > -1) {
        // If ID exists in the list, remove it
        state.commissionPaidBillDetailsIdsList.splice(index, 1);
      } else {
        // If ID does not exist, add it to the list
        state.commissionPaidBillDetailsIdsList.push(id);
      }
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

// Trnsactions fully paid bills
export const selectQuantityTotalForFullyPaidBills = (state) => {
  if (state.transactionsReducer?.fullyPaidBills?.length > 0) {
    return state.transactionsReducer.fullyPaidBills.reduce((total, bill) => {
      const billTotal = bill?.billDetails?.reduce((tot, billDetail) => {
        return tot + (parseFloat(billDetail?.quantity) || 0);
      }, 0);

      return total + billTotal;
    }, 0);
  } else {
    return 0;
  }
};

export const selectPaymentReceivedTotalForSelectedDateSlice = (state) => {
  if (state.transactionsReducer?.paymentsReceivedBillsList?.length > 0) {
    return state.transactionsReducer.paymentsReceivedBillsList.reduce(
      (total, bill) => {
        const billTotal = bill?.details?.reduce((tot, billDetail) => {
          return tot + (parseFloat(billDetail?.paid_amount) || 0);
        }, 0);

        return total + billTotal;
      },
      0
    );
  } else {
    return 0;
  }
};

export const selectCommissionTotalForFullyPaidBills = (state) => {
  if (state.transactionsReducer?.fullyPaidBills?.length > 0) {
    return state.transactionsReducer.fullyPaidBills.reduce((total, bill) => {
      const billTotal = bill?.billDetails?.reduce((tot, billDetail) => {
        return (
          tot +
          (parseFloat(
            billDetail?.itemHeader?.repsCommissions?.[0].commission
          ) || 0) *
            parseFloat(billDetail.quantity)
        );
      }, 0);

      return total + billTotal;
    }, 0);
  } else {
    return 0;
  }
};

// Selector to calculate the grand total
export const selectFullyPaidBillsCommissionPendingTotal = (state) => {
  return state.transactionsReducer.fullyPaidBills?.reduce((total, paidBill) => {
    // paidBill.repsPaidDetails?.length
    // if (paidBill.repsPaidDetails?.length > 0) {
    if (paidBill.repsPaidDetails?.length <= 0 || !paidBill?.repsPaidDetails) {
      return (
        total +
        paidBill?.billDetails?.reduce((detailTotal, billDetail) => {
          const commission =
            billDetail?.itemHeader?.repsCommissions?.[0]?.commission || 0;
          const quantity = billDetail?.quantity || 0;
          return detailTotal + commission * quantity;
        }, 0)
      );
    } else {
      return total + 0;
    }
  }, 0);
};

// Selector to calculate the grand total
export const selectGrandTotalFromBillPaymentSlice = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    return total + (parseFloat(bill.grand_total) || 0);
  }, 0);
};

// Selector to calculate the total quantity
export const selectTotalQuantityFromBillPaymentSlice = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    return total + (parseFloat(bill.total_quantity) || 0);
  }, 0);
};

// Selector to calculate the total quantity of items in pending bills
export const selectTotalQuantityForPendingBills = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    if (bill.paid_status === false) {
      // assuming 'false' indicates pending status
      return total + 1;
    }
    return total;
  }, 0);
};

// Selector to calculate the total quantity of items in paid bills
export const selectTotalQuantityForPaidBills = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    if (bill.paid_status === true) {
      // assuming 'true' indicates paid status
      return total + 1;
    }
    return total;
  }, 0);
};

export const selectPaidAmountTotalFromBillPaymentSlice = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    return total + (parseFloat(bill.paid_amount) || 0);
  }, 0);
};

export const selectPendingAmountTotalFromBillPaymentSlice = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
    // Safely parse values, defaulting to 0 if they are invalid or undefined
    const grandTotal = parseFloat(bill.grand_total) || 0;
    const paidAmount = parseFloat(bill.paid_amount) || 0;

    // Calculate the pending amount and add it to the total
    return total + (grandTotal - paidAmount);
  }, 0);
};

export const selectPayingTotalFromBillPaymentSlice = (state) => {
  return state.transactionsReducer.pendingBillsList.reduce((total, bill) => {
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
      const { pendingBillsList } = getState().transactionsReducer;
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
  SetBillTransactionsSliceField,
  RemoveBillFromPendingBillsList,
  UpdateFieldInPendingBills,
  clearMessage,
  ResetFilters,
  UpdateTransactionsSliceFilter,
  SortPendingBillsByInstitution,
  SortPendingBillsByLatestStockBillPayDetail,
  ToggleComissionPaidBillDetailId,
} = billPaymentSlice.actions;

// Export reducer
export default billPaymentSlice.reducer;

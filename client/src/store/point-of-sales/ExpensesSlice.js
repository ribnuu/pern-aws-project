import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllExpensesCashSourceHeaders } from "../../apis/POSExpensesCashSourceApiService";

import {
  creaseExpenseRecordApi,
  searchExpensesNote,
} from "../../apis/POSExpensesCategorySubCategoryApiService";

//Initial state for the expenses
const initialState = {
  paidFrom: "",
  entered_by: "",
  totalAmount: "",
  sub_category_code: "",
  amount: "",
  unitPrice: "",
  quantity: "",
  measurement_units: "",
  note: "",
  expensesDate: new Date().toISOString().slice(0, 16),
  receivedBy: "",
  receivedByName: "",
  receivedById: "",
  receivedByType: "",
  recepientType: "",
  categoryId: "",
  categoryCode: "",
  categoryName: "",
  categoryNameLower: "",
  subCategoryId: "",
  subCategoryName: "",
  paymentType: "",
  institute: "", //BANKS
  description: "",
  expenseDetails: [],
  cashSources: [],
  cashSourceTypes: [],
  loading: false,
  error: null,
  fixedAsset: false,
  processGrn: false,
  expensesCashSourceHeaderId: null,
  expensesCashSourceDetailId: null,
};

//Async thunk
export const fetchCashSources = createAsyncThunk(
  "posExpenses/fetchCashSources",
  async (_, thunkAPI) => {
    try {
      const response = await getAllExpensesCashSourceHeaders();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cash sources"
      );
    }
  }
);

export const submitExpenseRecord = createAsyncThunk(
  "posExpenses/submitExpenseRecord",
  async ({ header, details }, thunkAPI) => {
    try {
      const response = await creaseExpenseRecordApi(header, details);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cash sources"
      );
    }
  }
);

export const fetchExpenseNoteSuggestions = createAsyncThunk(
  "posExpenses/fetchExpenseNoteSuggestions",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await searchExpensesNote(searchTerm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch note suggestions"
      );
    }
  }
);

//create the POS slice
const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpensesSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state`);
      }
    },
    addExpenseDetail: (state, action) => {
      state.expenseDetails.push(action.payload);
    },
    updateExpenseDetail: (state, action) => {
      const { index, field, value } = action.payload;
      if (state.expenseDetails[index]) {
        state.expenseDetails[index] = {
          ...state.expenseDetails[index],
          [field]: value,
        };
      }
    },
    removeExpenseDetail: (state, action) => {
      const index = action.payload;
      state.expenseDetails.splice(index, 1);
    },
    setExpenseDetails: (state, action) => {
      state.expenseDetails = action.payload;
    },
    resetExpenseDetails: (state) => {
      state.amount = "";
      state.categoryId = "";
      state.categoryName = "";
      state.fixedAsset = "";
      state.note = "";
      state.processGrn = "";
      state.receivedBy = "";
      state.receivedByType = "";
      state.receivedById = "";
      state.recepientType = "";
      state.subCategoryId = "";
      state.subCategoryName = "";
      state.unitPrice = "";
      state.quantity = "";
      state.unitScale = "";
      state.expenseDetails = [];
    },
    resetExpensesSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCashSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCashSources.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.error = null;
        state.cashSources = data;
        state.cashSourceTypes = [...new Set(data.map((item) => item.type))];
      })
      .addCase(fetchCashSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitExpenseRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitExpenseRecord.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitExpenseRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExpenseNoteSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenseNoteSuggestions.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchExpenseNoteSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

//Export action
export const {
  setExpensesSliceField,
  addExpenseDetail,
  resetExpenseDetails,
  resetExpensesSlice,
  updateExpenseDetail,
  removeExpenseDetail,
  setExpenseDetails,
} = expensesSlice.actions;

//Export reducer
export default expensesSlice.reducer;

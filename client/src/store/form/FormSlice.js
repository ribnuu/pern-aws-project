import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for creating a record via an API call
export const createRecord = createAsyncThunk(
  "form/createRecord",
  async ({ apiFunction, reqBody }, { rejectWithValue }) => {
    try {
      // Call the provided API function with reqBody
      const response = await apiFunction(reqBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loadData = createAsyncThunk(
  "form/loadData",
  async (
    { apiFunction, attributes = null, reqBody = {} },
    { rejectWithValue }
  ) => {
    try {
      let response;
      if (attributes) {
        response = await apiFunction(attributes);
      } else if (reqBody) {
        response = await apiFunction(reqBody);
      }
      // Call the provided API function with reqBody
      // const response = await apiFunction(reqBody);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  formData: {}, // Stores the current form data
  changedFormData: {}, // Stores the changed key-value pairs
  records: [],
  results: [],
  searchTerm: null,
  selectedItemId: null,
  loading: false,
  error: null,
};

// Create the form slice
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    HandleChangeFormData: (state, action) => {
      const { key, value } = action.payload;

      // Check if it's a batch update
      if (key === "batchUpdate") {
        // Batch multiple form data updates
        Object.keys(value).forEach((formKey) => {
          // Update formData
          state.formData[formKey] =
            value[formKey] instanceof Date
              ? value[formKey].toISOString()
              : value[formKey];

          // Update changedFormData for tracking changes
          state.changedFormData[formKey] =
            value[formKey] instanceof Date
              ? value[formKey].toISOString()
              : value[formKey];
        });
      } else {
        // Single key update
        state.formData[key] =
          value instanceof Date ? value.toISOString() : value;

        // Track the changed value
        state.changedFormData[key] =
          value instanceof Date ? value.toISOString() : value;
      }
    },
    // Clear changed data when necessary
    clearChangedFormData: (state) => {
      state.changedFormData = {}; // Reset changedFormData
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
    updateRecord: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.records.findIndex((record) => record.id === id);
      if (index !== -1) {
        state.records[index] = { ...state.records[index], ...updatedData };
      }
    },
    // Update the search term
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    // Clear the search term
    clearSearchTerm: (state) => {
      state.searchTerm = null;
    },
    updateFormSliceField: (state, action) => {
      const { field, value } = action.payload; // Destructure the field name and value
      if (field in state) {
        state[field] = value; // Update the specified field with the provided value
      } else {
        console.warn(`Field "${field}" does not exist in the state.`);
      }
    },
    // Generic clear for a field
    clearFormSliceField: (state, action) => {
      const { field } = action.payload; // Destructure the field name
      if (field in state) {
        state[field] = null; // Set the specified field to null
      } else {
        console.warn(`Field "${field}" does not exist in the state.`);
      }
    },
    setFormSliceFormData: (state, action) => {
      state.formData = { ...action.payload }; // Replace formData with the provided object
    },
    // Clear the formData
    clearFormSliceFormData: (state) => {
      state.formData = {}; // Reset formData to an empty object
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle createRecord async thunk
    builder
      .addCase(createRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle loadData async thunk
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload; // Set the loaded data to state.results
      })
      .addCase(loadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  HandleChangeFormData,
  clearChangedFormData, // To clear the changedFormData
  deleteRecord,
  updateRecord,
  resetState,
  updateSearchTerm,
  clearSearchTerm,
  updateFormSliceField, // dispatch(updateFormSliceField({ field: "searchTerm", value: "new search term" }));
  clearFormSliceField, // dispatch(clearFormSliceField({ field: "searchTerm" }));
  setFormSliceFormData, // dispatch(setFormSliceFormData({ key1: "value1", key2: "value2" }));
  clearFormSliceFormData, // dispatch(clearFormSliceFormData());
} = formSlice.actions;

// Export reducer
export default formSlice.reducer;

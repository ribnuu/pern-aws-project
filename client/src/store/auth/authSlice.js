import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  userId: "",
  userName: "",
  mobileNumber: "",
  sessionToken: "",
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to set a specific field
    setField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    // Reducer to reset the state to initial state
    resetState: () => initialState,
  },
});

// Export actions
export const { setField, resetState } = authSlice.actions;

// Action to set a single field in the auth state
export const setAuthData = (field, value) => (dispatch) => {
  dispatch(setField({ field, value }));
};

// Action to set multiple fields in the auth state from a map
export const setAuthDataFromMap = (dataMap) => (dispatch) => {
  Object.keys(dataMap).forEach((key) => {
    dispatch(setField({ field: key, value: dataMap[key] }));
  });
};

// Export reducer
export default authSlice.reducer;

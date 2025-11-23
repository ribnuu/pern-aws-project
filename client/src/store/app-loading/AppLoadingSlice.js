import { createSlice } from "@reduxjs/toolkit";

// Initial state for the app loading slice
const initialState = {
  loading: false, // Indicates whether the global loading spinner is visible
};

// Create the app loading slice
const appLoadingSlice = createSlice({
  name: "appLoading",
  initialState,
  reducers: {
    // Reducer to set the loading state
    setLoading: (state, action) => {
      state.loading = action.payload; // payload should be a boolean
    },
    // Reducer to reset the state to the initial state
    resetLoadingState: () => initialState,
  },
});

// Export actions
export const { setLoading, resetLoadingState } = appLoadingSlice.actions;

// Thunk action to show loading
export const showAppLoading = () => (dispatch) => {
  dispatch(setLoading(true));
};

// Thunk action to hide loading
export const hideAppLoading = () => (dispatch) => {
  dispatch(setLoading(false));
};

// Export reducer
export default appLoadingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Initial state for the navigation slice
const initialState = {
  redirectUrl: null, // Stores the URL to redirect to
};

// Create the navigation slice
const NavigationSlice = createSlice({
  name: "navigation", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to set the redirect URL
    SetRedirectUrl: (state, action) => {
      state.redirectUrl = action.payload; // Update redirectUrl with the provided value
    },
    // Reducer to clear the redirect URL
    ClearRedirectUrl: (state) => {
      state.redirectUrl = null; // Reset redirectUrl to null
    },
    // Reducer to reset the state to its initial state
    ResetNavigationState: () => initialState, // Reset state to initial values
  },
});

// Export actions for use in components and thunks
export const { SetRedirectUrl, ClearRedirectUrl, ResetNavigationState } =
  NavigationSlice.actions;

// Export the reducer to be used in the store
export default NavigationSlice.reducer;

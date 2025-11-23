import { createSlice } from "@reduxjs/toolkit";

// Initial state for language
const initialState = {
  selectedLanguage: localStorage.getItem("selectedLanguage") || "en", // Default language
};

// Create language slice
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // Action to change the language
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      localStorage.setItem("selectedLanguage", action.payload); // Store in localStorage
    },
  },
});

// Export actions
export const { setLanguage } = languageSlice.actions;

// Export reducer
export default languageSlice.reducer;

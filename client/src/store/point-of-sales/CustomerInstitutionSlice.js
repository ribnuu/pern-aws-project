// reducers/customerInstitutionSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the pointOfSales slice
const initialState = {
  pendingBillsList: [],
  loading: false,
  message: "",
  error: "",
  messageShown: false, // Flag to track if the message has been shown
  users: [],
  representatives: [],
  //
  institutionId: null,
  institutions: [],
  searchTermForInstitutions: "",
};

const customerInstitutionSlice = createSlice({
  name: "customerInstitution",
  initialState,
  reducers: {
    SetCustomerInstitutionSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },
    // Representatives
    AddRepresentativesToList: (state, action) => {
      const newRep = action.payload;
      const repExist = state.representatives.some(
        (rep) => rep.id === newRep.id
      );
      if (!repExist) {
        state.representatives = [...state.representatives, newRep];
      }
    },
    UpdateRepInTheRepresentativesList: (state, action) => {
      const { id, field, value } = action.payload;
      state.representatives = state.representatives.map((rep) => {
        if (rep.id === id) {
          return { ...rep, [field]: value, isEdited: true };
        }
        return rep;
      });
    },
    RemoveRepFromThRepsList: (state, action) => {
      const id = action.payload;
      state.representatives = state.representatives.filter(
        (rep) => rep.id !== id
      );
    },
    // Workers
    AddUserToList: (state, action) => {
      const newUser = action.payload;
      // Check if the new user already exists
      const userExists = state.users.some((user) => user.id === newUser.id);
      if (!userExists) {
        state.users = [...state.users, newUser];
      }
    },
    UpdateUserInTheUsersList: (state, action) => {
      const { id, field, value } = action.payload;
      state.users = state.users.map((user) => {
        if (user.id === id) {
          return { ...user, [field]: value, isEdited: true };
        }
        return user;
      });
    },
    RemoveUSerFromTheUSersList: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    ResetState: () => initialState,
    clearMessage: (state) => {
      state.message = "";
      state.error = "";
      state.messageShown = false;
    },
  },
});

// Export actions
export const {
  SetCustomerInstitutionSliceField,
  AddUserToList,
  ResetState,
  clearMessage,
  UpdateUserInTheUsersList,
  RemoveUSerFromTheUSersList,
  // Representatives
  AddRepresentativesToList,
  UpdateRepInTheRepresentativesList,
  RemoveRepFromThRepsList,
} = customerInstitutionSlice.actions;

// Export reducer
export default customerInstitutionSlice.reducer;

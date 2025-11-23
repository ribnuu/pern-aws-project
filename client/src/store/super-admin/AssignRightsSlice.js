import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // selectedOption: "Users",
  selectedOption: "Groups New",
  // search string or queries
  queryForGroup: "",
  queryForUser: "",
  queryForGroupNew: "",
  queryForRoleNew: "",
  //
  groupsList: [],
  rolesList: [],
  usersList: [],
  groupsNewList: [],
  rolesNewList: [],
  //
  selectedGroup: "",
  selectedRole: "",
  selectedUser: "",
  selectedGroupNew: "",
  selectedRoleNew: "",
};

const AssignRightsSlice = createSlice({
  name: "assignRights",
  initialState,
  reducers: {
    SetAssignRightsSliceField: (state, action) => {
      const { field, value } = action.payload;
      if (state.hasOwnProperty(field)) {
        state[field] = value;
      } else {
        console.warn(`Field ${field} does not exist in the state.`);
      }
    },

    ResetAssignRightsState: () => initialState,
  },
});

export const { SetAssignRightsSliceField, ResetAssignRightsState } =
  AssignRightsSlice.actions;

export default AssignRightsSlice.reducer;

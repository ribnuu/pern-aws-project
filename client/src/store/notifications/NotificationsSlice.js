import { createSlice } from "@reduxjs/toolkit";
import {
  getAllNotificationsByUserIdAndMobileNumberApi,
  markNotificationAsReadApi,
} from "../../apis/NotificationsApiService";

// Initial state
const initialState = {
  isNotificationsAvailable: false,
  notifications: [],
};

// Create slice
export const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetState: (state) => initialState,
    setIsNotificationsAvailable: (state, action) => {
      state.isNotificationsAvailable = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

// Export actions
export const {
  setField,
  resetState,
  setIsNotificationsAvailable,
  setNotifications,
  removeNotification,
} = NotificationsSlice.actions;

// Asynchronous action creator
export const setIssueFineData = (field, value) => (dispatch) => {
  dispatch(setField({ field, value }));
};

export const checkNotificationsAvailable =
  (userId, mobileNumber) => async (dispatch) => {
    try {
      // Make API request to check if notifications are available
      const response = await getAllNotificationsByUserIdAndMobileNumberApi(
        userId,
        mobileNumber
      );

      if (response.data.success) {
        dispatch(setNotifications(response.data.notifications));
      } else {
        console.log("Failed to load notifications");
      }
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  try {
    const data = await markNotificationAsReadApi(notificationId);
    if (data.success) {
      dispatch(removeNotification(notificationId));
    }
  } catch (error) {
    console.log(error);
  }
};

// Export reducer
export default NotificationsSlice.reducer;

import API_ENDPOINT from "./httpInterceptor";
import {
  GET_ALL_NOTIFICATIONS_BY_USER_ID_AND_MOBILE_NUMBER,
  MARK_NOTIFICATION_AS_READ,
} from "./endpoints";

export const getAllNotificationsByUserIdAndMobileNumberApi = async (
  userId,
  mobileNumber
) => {
  try {
    const response = await API_ENDPOINT.post(
      GET_ALL_NOTIFICATIONS_BY_USER_ID_AND_MOBILE_NUMBER,
      {
        userId: userId,
        mobileNumber: mobileNumber,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsReadApi = async (notificationId) => {
  try {
    const response = await API_ENDPOINT.post(MARK_NOTIFICATION_AS_READ, {
      notificationId: notificationId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

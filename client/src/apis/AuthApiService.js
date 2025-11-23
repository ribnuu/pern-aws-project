import API_ENDPOINT from "./httpInterceptor";
import {
  LOGIN,
  LOGIN_OTP_CONFIRMATION,
  LOGIN_WITH_MOBILE_NUMBER,
  LOGOUT,
  REGISTER,
  REGISTER_ADVANCED,
  REGISTER_ADVANCED_CONFIRM_OTP,
  REGISTER_WITH_MOBILE_NUMBER,
  REGISTER_WITH_MOBILE_NUMBER_CONFIRM_OTP,
  RETRIEVE_LAST_ADDED_USER,
} from "./endpoints";

export const loginWithMobileNumberApi = async ({ mobileNumber, language }) => {
  try {
    const response = await API_ENDPOINT.post(LOGIN_WITH_MOBILE_NUMBER, {
      mobileNumber,
      language,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async ({
  formData,
  loginLatitude,
  loginLongitude,
  language,
}) => {
  try {
    const response = await API_ENDPOINT.post(LOGIN, {
      formData,
      loginLatitude,
      loginLongitude,
      language,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginOtpConfirmationApi = async ({
  otp,
  mobileNumber,
  latitude,
  longitude,
}) => {
  try {
    const response = await API_ENDPOINT.post(LOGIN_OTP_CONFIRMATION, {
      otp,
      mobileNumber,
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerApi = async ({ formData, NewUserId }) => {
  try {
    const response = await API_ENDPOINT.post(REGISTER, { formData, NewUserId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retrieveLastAddedUserApi = async () => {
  try {
    const response = await API_ENDPOINT.post(RETRIEVE_LAST_ADDED_USER);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdvancedApi = async ({ formData }) => {
  try {
    const response = await API_ENDPOINT.post(REGISTER_ADVANCED, { formData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerAdvancedConfirmOTPApi = async () => {
  try {
    const response = await API_ENDPOINT.post(REGISTER_ADVANCED_CONFIRM_OTP, {
      otp,
      mobileNumber,
      loginLatitude,
      loginLongitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerWithMobileNumberApi = async ({
  mobileNumber,
  language,
}) => {
  try {
    const response = await API_ENDPOINT.post(REGISTER_WITH_MOBILE_NUMBER, {
      mobileNumber,
      language,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerWithMobileNumberConfirmOtpApi = async ({
  otp,
  mobileNumber,
  latitude,
  longitude,
}) => {
  try {
    const response = await API_ENDPOINT.post(
      REGISTER_WITH_MOBILE_NUMBER_CONFIRM_OTP,
      {
        otp,
        mobileNumber,
        latitude,
        longitude,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async ({
  sessiontoken,
  logoutLatitude,
  logoutLongitude,
}) => {
  try {
    const response = await API_ENDPOINT.post(LOGOUT, {
      sessiontoken,
      logoutLatitude,
      logoutLongitude,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

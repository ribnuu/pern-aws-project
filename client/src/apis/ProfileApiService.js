import API_ENDPOINT from "./httpInterceptor";
import {
  GET_USER_PROFILE_DATA_BY_USER_ID,
  UPDATE_LANGUAGE_IN_PROFILE,
  UPDATE_USER_PROFILE,
} from "./endpoints";

export const getUserProfileDataByUserIdApi = async (userId) => {
  try {
    const response = API_ENDPOINT.get(
      GET_USER_PROFILE_DATA_BY_USER_ID.replace(":userId", userId)
    );
    return response.data;
  } catch {
    throw error;
  }
};

export const updateUserProfileApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(UPDATE_USER_PROFILE, reqBody);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLanguageInProfileApi = async ({ language, userId }) => {
  try {
    const response = await API_ENDPOINT.post(UPDATE_LANGUAGE_IN_PROFILE, {
      language,
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

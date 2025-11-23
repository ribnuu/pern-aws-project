import API_ENDPOINT from "./httpInterceptor";
import { GET_N_USERS_BY_CREATED_AT_DATE, SEARCH_USERS } from "./endpoints";

export const getNUsersByCreatedAtDateApi = async (count) => {
  try {
    const response = await API_ENDPOINT.post(GET_N_USERS_BY_CREATED_AT_DATE, {
      count,
    });

    return response.data;
  } catch {
    throw error;
  }
};

export const searchUsersApi = async (searchString) => {
  try {
    const response = await API_ENDPOINT.post(SEARCH_USERS, { searchString });

    return response.data;
  } catch (error) {
    throw error;
  }
};

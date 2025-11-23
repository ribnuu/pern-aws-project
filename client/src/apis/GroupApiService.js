import API_ENDPOINT from "./httpInterceptor";
import { GET_ALL_GROUPS } from "./endpoints";

export const getAllGroupsApi = async () => {
  try {
    const response = await API_ENDPOINT.get(GET_ALL_GROUPS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

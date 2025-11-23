import API_ENDPOINT from "./httpInterceptor";
import { GET_PAGES_BY_GROUP_ID } from "./endpoints";

export const getPagesByGroupIdApi = async (groupId) => {
  try {
    const response = await API_ENDPOINT.get(
      GET_PAGES_BY_GROUP_ID.replace(":groupId", groupId)
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

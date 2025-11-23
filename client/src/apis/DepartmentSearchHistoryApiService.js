import API_ENDPOINT from "./httpInterceptor";
import { DEPARTMENT_SEARCH_HISTORY_CREATE } from "./endpoints";

export const createDepartmentSearchHistoryApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(
      DEPARTMENT_SEARCH_HISTORY_CREATE,
      reqBody
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

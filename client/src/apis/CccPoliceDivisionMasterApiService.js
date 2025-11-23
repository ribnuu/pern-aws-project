import API_ENDPOINT from "./httpInterceptor";
import { CCC_POLICE_DIVISION_SEARCH } from "./endpoints";

export const searchPoliceDivisionApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${CCC_POLICE_DIVISION_SEARCH}?searchTerm=${encodeURIComponent(
        searchTerm
      )}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

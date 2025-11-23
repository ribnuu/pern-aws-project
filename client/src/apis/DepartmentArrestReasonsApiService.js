import API_ENDPOINT from "./httpInterceptor";
import { DEPARTMENT_ARREST_REASONS_SEARCH } from "./endpoints";

/**
 * Function to search cities based on the search term.
 * @param {string} searchTerm - The term to search for cities.
 * @returns {Promise<Object>} - The response data containing cities.
 */
export const searchDepartmentArrestReasonsApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${DEPARTMENT_ARREST_REASONS_SEARCH}?searchTerm=${encodeURIComponent(
        searchTerm
      )}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

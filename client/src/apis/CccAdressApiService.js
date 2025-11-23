import API_ENDPOINT from "./httpInterceptor";
import {
  CCC_ADDRESS_SEARCH_CITY,
  CCC_ADDRESS_SEARCH_PROVINCE,
  CCC_ADDRESS_SEARCH_DISTRICT,
} from "./endpoints";

/**
 * Function to search cities based on the search term.
 * @param {string} searchTerm - The term to search for cities.
 * @returns {Promise<Object>} - The response data containing cities.
 */
export const searchCitiesApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${CCC_ADDRESS_SEARCH_CITY}?searchTerm=${encodeURIComponent(searchTerm)}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to search provinces based on the search term.
 * @param {string} searchTerm - The term to search for provinces.
 * @returns {Promise<Object>} - The response data containing provinces.
 */
export const searchProvincesApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${CCC_ADDRESS_SEARCH_PROVINCE}?searchTerm=${encodeURIComponent(
        searchTerm
      )}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to search districts based on the search term.
 * @param {string} searchTerm - The term to search for districts.
 * @returns {Promise<Object>} - The response data containing districts.
 */
export const searchDistrictsApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.get(
      `${CCC_ADDRESS_SEARCH_DISTRICT}?searchTerm=${encodeURIComponent(
        searchTerm
      )}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

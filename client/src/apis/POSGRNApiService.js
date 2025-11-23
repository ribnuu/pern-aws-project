import { POS_GRN_SEARCH_BY_NUMBER_OR_DATE } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const searchGrnByNumberOrDateApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_GRN_SEARCH_BY_NUMBER_OR_DATE, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

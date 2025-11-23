import { POS_PO_CREATE, POS_PO_SEARCH_BY_NUMBER_OR_DATE } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const createPoApi = async (poData) => {
  try {
    const response = await API_ENDPOINT.post(POS_PO_CREATE, poData);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchPoByNumberOrDateApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_PO_SEARCH_BY_NUMBER_OR_DATE, {
      searchTerm,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

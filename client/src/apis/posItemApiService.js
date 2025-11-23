import { POS_ITEM_SELECT_BY_ID } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const searchItemApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(POS_ITEM_SELECT_BY_ID, {
      searchTerm,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

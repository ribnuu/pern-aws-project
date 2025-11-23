import API_ENDPOINT from "./httpInterceptor";
import { POS_SEARCH_STOCK_ITEMS_IN_THE_COMPANY } from "./endpoints";

export const searchStockItemHeadersInTheCompanyApi = async (searchTerm) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_SEARCH_STOCK_ITEMS_IN_THE_COMPANY,
      {
        searchTerm,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

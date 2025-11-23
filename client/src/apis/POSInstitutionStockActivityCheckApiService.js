import { POS_GET_INSTITUTION_STOCK_ACTIVITY_CHECK_DATA } from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getInstitutionStockActivityCheckDataApi = async (filters) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_INSTITUTION_STOCK_ACTIVITY_CHECK_DATA,
      { filters }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

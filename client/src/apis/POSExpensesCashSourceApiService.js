import API_ENDPOINT from "./httpInterceptor";
import { POS_GET_ALL_EXPENSES_CASH_SOURCE_HEADERS } from "./endpoints";

export const getAllExpensesCashSourceHeaders = async () => {
  try {
    const response = await API_ENDPOINT.get(
      POS_GET_ALL_EXPENSES_CASH_SOURCE_HEADERS
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

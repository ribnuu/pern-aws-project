import {
  POS_GET_ALL_LATEST_SALES_VISITS,
  POS_INSERT_SALES_VISIT_RECORD,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getAllLatestRepSalesVisitsApi = async () => {
  try {
    const response = await API_ENDPOINT.get(POS_GET_ALL_LATEST_SALES_VISITS);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const insertStockRepVisitApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_INSERT_SALES_VISIT_RECORD,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

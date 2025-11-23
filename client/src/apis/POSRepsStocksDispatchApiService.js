import API_ENDPOINT from "./httpInterceptor";
import {
  POS_CREATE_REPS_STOCK_DISPATCH,
  POS_GET_REPS_STOCK_DISPATCH_BY_FILTERS,
  POS_UPDATE_MULTIPLE_REPS_STOCKS_DISPATCHES,
} from "./endpoints";

export const createRepsStockDispatchRecordApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_CREATE_REPS_STOCK_DISPATCH,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeApi =
  async (filters) => {
    try {
      const response = await API_ENDPOINT.post(
        POS_GET_REPS_STOCK_DISPATCH_BY_FILTERS,
        filters
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const updateMultipleRepsStocksDispatchApi = async (data) => {
  try {
    const response = await API_ENDPOINT.put(
      POS_UPDATE_MULTIPLE_REPS_STOCKS_DISPATCHES,
      data
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

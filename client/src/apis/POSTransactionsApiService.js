import API_ENDPOINT from "./httpInterceptor";
import {
  POS_CREATE_REPS_PAID_COMMISSION_ITEM_WISE,
  POS_GET_ALL_BILLING_INFORMATION_AND_REPS_STOCK_DISPATCH_DATA_BY_FILTERS,
  POS_GET_ALL_PAID_BILL_TRANSACTIONS,
  POS_GET_ALL_PAYMENTS_RECEIVED_BY_FILTERS,
  POS_GET_ALL_TRANSACTIONS_BY_DATE_AND_OTHER_FILTERS,
} from "./endpoints";

export const getAllTransactionsByDateAndOtherFiltersApi = async (filters) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_ALL_TRANSACTIONS_BY_DATE_AND_OTHER_FILTERS,
      { filters }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPaidBillTransactions = async (filters) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_ALL_PAID_BILL_TRANSACTIONS,
      { filters }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRepsPaidComissionItemWiseApi = async (data) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_CREATE_REPS_PAID_COMMISSION_ITEM_WISE,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllBillingInformationAndRepsStockDispatchDataByFiltersApi =
  async (filters) => {
    try {
      const response = await API_ENDPOINT.post(
        POS_GET_ALL_BILLING_INFORMATION_AND_REPS_STOCK_DISPATCH_DATA_BY_FILTERS,
        filters
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getAllPaymentsReceivedByFiltersApi = async (filters) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_ALL_PAYMENTS_RECEIVED_BY_FILTERS,
      { filters }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

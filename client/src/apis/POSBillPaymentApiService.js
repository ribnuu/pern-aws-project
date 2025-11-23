import API_ENDPOINT from "./httpInterceptor";
import {
  POS_GET_ALL_PENDING_BILL_HEADERS_IN_THE_COMPANY,
  POS_GET_ALL_PENDING_BILL_HEADERS_BY_STOCK_CUSTOMER_INSTITUTION_ID,
  POS_MAKE_BILL_PAYMENT,
} from "./endpoints";

export const getAllPendingBillHeadersIntheCompanyApi = async (filters) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_ALL_PENDING_BILL_HEADERS_IN_THE_COMPANY,
      { filters }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllPendingBillHeadersByStockCustomerInstitutionId = async (
  stockCustomerInstitutionId,
  filters
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_GET_ALL_PENDING_BILL_HEADERS_BY_STOCK_CUSTOMER_INSTITUTION_ID,
      {
        stockCustomerInstitutionId,
        filters,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const makeBillPaymenApi = async (reqBody) => {
  try {
    const response = await API_ENDPOINT.post(POS_MAKE_BILL_PAYMENT, reqBody);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

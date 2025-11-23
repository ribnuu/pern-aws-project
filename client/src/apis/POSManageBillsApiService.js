import {
  POS_MANAGE_BILLS_GET_ALL_BILLS_IN_THE_COMPANY_BY_FILTERS,
  POS_MANAGE_BILLS_MARK_BILL_AS_DELETED_BY_BILL_NUMBER,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";

export const getAllBillsInTheCompanyByFiltersForManageBillsApi = async (
  filters,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await API_ENDPOINT.post(
      POS_MANAGE_BILLS_GET_ALL_BILLS_IN_THE_COMPANY_BY_FILTERS,
      { filters, page, pageSize }
    );
    return response.data; // Ensure that this includes `bills` and `total` fields
  } catch (error) {
    throw error;
  }
};

export const markBillAsDeletedByBillNumberApi = async (billNumber) => {
  try {
    const response = await API_ENDPOINT.delete(
      POS_MANAGE_BILLS_MARK_BILL_AS_DELETED_BY_BILL_NUMBER.replace(
        ":billNumber",
        billNumber
      )
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

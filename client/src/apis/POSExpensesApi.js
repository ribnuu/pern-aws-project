import {
  POS_EXPENSES_GET_ALL_BY_FILTERS,
  POS_EXPENSES_GET_EXPENSES_BY_EXPENSES_NUMBER,
  POS_EXPENSES_GET_EXPENSES_DETAILS_BY_EXPENSE_HEADER_ID,
} from "./endpoints";
import API_ENDPOINT from "./httpInterceptor";
import qs from "qs"; // Optional: install qs for query string manipulation

export const getAllExpensesByFiltersApi = async (filters = {}) => {
  try {
    // Convert filters to query string
    const queryString = qs.stringify(filters); // Use qs to stringify the filters object
    // Make the API call with the constructed URL
    const response = await API_ENDPOINT.get(
      `${POS_EXPENSES_GET_ALL_BY_FILTERS}?${queryString}`
    );
    return response.data;
  } catch (error) {
    // Handle error accordingly
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const getExpensesDetailsByExpensesHeaderIdApi = async ({
  headerId,
  includeModels = [],
}) => {
  try {
    const params = {};
    if (includeModels.length > 0) {
      params.includeModels = includeModels; // Add include models to query params
    }

    const response = await API_ENDPOINT.get(
      POS_EXPENSES_GET_EXPENSES_DETAILS_BY_EXPENSE_HEADER_ID.replace(
        ":headerId",
        headerId
      ),
      { params }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Search Expenses by expenses number
export const getExpenseByNumberApi = async (expenseNumber) => {
  try {
    const response = await API_ENDPOINT.get(
      `${POS_EXPENSES_GET_EXPENSES_BY_EXPENSES_NUMBER}${expenseNumber}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
